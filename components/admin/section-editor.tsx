"use client"

import { useEffect, useMemo, useState, useTransition } from "react"
import { Loader2, Plus, Save, Trash2 } from "lucide-react"
import { ImageUploadField } from "@/components/admin/image-upload-field"
import { getImageRequirement } from "@/components/admin/image-requirements"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import type { AdminSectionRecord, JsonValue, SectionKey } from "@/src/types/content"

type SectionEditorProps = {
  section: AdminSectionRecord
  onSaved: (section: AdminSectionRecord) => void
  canSave: boolean
}

function prettyLabel(value: string) {
  return value
    .replaceAll("_", " ")
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/\b\w/g, (char) => char.toUpperCase())
}

function createBlankValue(sample: JsonValue): JsonValue {
  if (typeof sample === "string") return ""
  if (typeof sample === "number") return 0
  if (typeof sample === "boolean") return false
  if (sample === null) return null
  if (Array.isArray(sample)) return sample.length > 0 ? [createBlankValue(sample[0])] : [""]

  return Object.fromEntries(
    Object.entries(sample).map(([key, value]) => [key, createBlankValue(value)]),
  )
}

function getAtPath(target: JsonValue, path: (string | number)[]): JsonValue {
  return path.reduce<JsonValue>((acc, segment) => {
    if (Array.isArray(acc) && typeof segment === "number") {
      return acc[segment]
    }

    if (acc && typeof acc === "object" && !Array.isArray(acc) && typeof segment === "string") {
      return (acc as Record<string, JsonValue>)[segment]
    }

    return acc
  }, target)
}

function setAtPath(target: JsonValue, path: (string | number)[], nextValue: JsonValue): JsonValue {
  if (path.length === 0) return nextValue

  const [head, ...tail] = path

  if (Array.isArray(target) && typeof head === "number") {
    return target.map((item, index) =>
      index === head ? setAtPath(item, tail, nextValue) : item,
    )
  }

  if (target && typeof target === "object" && !Array.isArray(target) && typeof head === "string") {
    return {
      ...target,
      [head]: setAtPath((target as Record<string, JsonValue>)[head], tail, nextValue),
    }
  }

  return target
}

function updateArrayAtPath(
  target: JsonValue,
  path: (string | number)[],
  updater: (value: JsonValue[]) => JsonValue[],
): JsonValue {
  const current = getAtPath(target, path)
  if (!Array.isArray(current)) return target
  return setAtPath(target, path, updater(current))
}

function isLongText(fieldName: string, value: string) {
  return value.length > 120 || /description|text|subtitle|note|summary|privacy/i.test(fieldName)
}

function isImageField(fieldName: string) {
  return /(^image$|image$|backgroundImage|logo|photo|banner)/i.test(fieldName)
}

type JsonFieldEditorProps = {
  label: string
  path: (string | number)[]
  value: JsonValue
  onChange: (path: (string | number)[], value: JsonValue) => void
  onArrayAdd: (path: (string | number)[], sample: JsonValue) => void
  onArrayRemove: (path: (string | number)[], index: number) => void
}

function JsonFieldEditor({
  label,
  path,
  value,
  onChange,
  onArrayAdd,
  onArrayRemove,
}: JsonFieldEditorProps) {
  if (typeof value === "string") {
    if (isImageField(label)) {
      return (
        <ImageUploadField
          label={prettyLabel(label)}
          value={value}
          requirement={getImageRequirement(path)}
          onChange={(nextValue) => onChange(path, nextValue)}
        />
      )
    }

    if (isLongText(label, value)) {
      return (
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">{prettyLabel(label)}</label>
          <Textarea value={value} rows={5} onChange={(event) => onChange(path, event.target.value)} />
        </div>
      )
    }

    return (
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">{prettyLabel(label)}</label>
        <Input value={value} onChange={(event) => onChange(path, event.target.value)} />
      </div>
    )
  }

  if (typeof value === "number") {
    return (
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">{prettyLabel(label)}</label>
        <Input
          type="number"
          value={value}
          onChange={(event) => onChange(path, Number(event.target.value))}
        />
      </div>
    )
  }

  if (typeof value === "boolean") {
    return (
      <div className="flex items-center justify-between rounded-2xl border border-border bg-secondary/30 px-4 py-3">
        <div>
          <p className="text-sm font-medium text-foreground">{prettyLabel(label)}</p>
          <p className="text-xs text-muted-foreground">Alterna o estado publicado desta informação.</p>
        </div>
        <Switch checked={value} onCheckedChange={(checked) => onChange(path, checked)} />
      </div>
    )
  }

  if (Array.isArray(value)) {
    const isPrimitiveList = value.every((item) => typeof item !== "object" || item === null)
    const sample = value[0] ?? ""

    return (
      <div className="space-y-3 rounded-2xl border border-border bg-secondary/20 p-4">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-foreground">{prettyLabel(label)}</p>
            <p className="text-xs text-muted-foreground">Lista editável desta seção.</p>
          </div>
          <Button type="button" variant="outline" size="sm" onClick={() => onArrayAdd(path, sample)}>
            <Plus className="mr-2 h-4 w-4" />
            Adicionar
          </Button>
        </div>

        <div className="space-y-3">
          {value.map((item, index) => (
            <Card key={`${label}-${index}`} className="gap-4 p-4">
              <div className="flex items-center justify-between gap-4">
                <p className="text-sm font-medium text-foreground">
                  {prettyLabel(label)} {index + 1}
                </p>
                <Button type="button" variant="ghost" size="icon" onClick={() => onArrayRemove(path, index)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>

              {isPrimitiveList ? (
                <JsonFieldEditor
                  label={`${label} item`}
                  path={[...path, index]}
                  value={item}
                  onChange={onChange}
                  onArrayAdd={onArrayAdd}
                  onArrayRemove={onArrayRemove}
                />
              ) : (
                <div className="grid gap-4">
                  {Object.entries(item as Record<string, JsonValue>).map(([childKey, childValue]) => (
                    <JsonFieldEditor
                      key={childKey}
                      label={childKey}
                      path={[...path, index, childKey]}
                      value={childValue}
                      onChange={onChange}
                      onArrayAdd={onArrayAdd}
                      onArrayRemove={onArrayRemove}
                    />
                  ))}
                </div>
              )}
            </Card>
          ))}
        </div>
      </div>
    )
  }

  if (value && typeof value === "object") {
    return (
      <div className="space-y-4 rounded-2xl border border-border bg-secondary/20 p-4">
        {path.length > 0 ? (
          <div>
            <p className="text-sm font-semibold text-foreground">{prettyLabel(label)}</p>
            <p className="text-xs text-muted-foreground">Campos agrupados desta área.</p>
          </div>
        ) : null}

        <div className="grid gap-4">
          {Object.entries(value).map(([childKey, childValue]) => (
            <JsonFieldEditor
              key={childKey}
              label={childKey}
              path={[...path, childKey]}
              value={childValue}
              onChange={onChange}
              onArrayAdd={onArrayAdd}
              onArrayRemove={onArrayRemove}
            />
          ))}
        </div>
      </div>
    )
  }

  return null
}

export function SectionEditor({ section, onSaved, canSave }: SectionEditorProps) {
  const [draft, setDraft] = useState<JsonValue>(section.valueJson)
  const [isPublished, setIsPublished] = useState(section.isPublished)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)
  const [isPending, startTransition] = useTransition()

  useEffect(() => {
    setDraft(section.valueJson)
    setIsPublished(section.isPublished)
    setMessage(null)
  }, [section])

  const updatedAtLabel = useMemo(() => {
    if (!section.updatedAt) return "Ainda não sincronizado com o Supabase."
    return new Intl.DateTimeFormat("pt-BR", {
      dateStyle: "short",
      timeStyle: "short",
    }).format(new Date(section.updatedAt))
  }, [section.updatedAt])

  function handleChange(path: (string | number)[], nextValue: JsonValue) {
    setDraft((current) => setAtPath(current, path, nextValue))
  }

  function handleArrayAdd(path: (string | number)[], sample: JsonValue) {
    setDraft((current) =>
      updateArrayAtPath(current, path, (arrayValue) => [...arrayValue, createBlankValue(sample)]),
    )
  }

  function handleArrayRemove(path: (string | number)[], index: number) {
    setDraft((current) =>
      updateArrayAtPath(current, path, (arrayValue) => arrayValue.filter((_, itemIndex) => itemIndex !== index)),
    )
  }

  function handleSave() {
    setMessage(null)

    startTransition(async () => {
      try {
        const response = await fetch(`/api/admin/content/${section.key}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            valueJson: draft,
            isPublished,
          }),
        })

        if (!response.ok) {
          throw new Error("Falha ao salvar conteúdo.")
        }

        const payload = (await response.json()) as {
          key: SectionKey
          valueJson: JsonValue
          isPublished: boolean
          updatedAt?: string
          createdAt?: string
        }

        onSaved({
          ...section,
          valueJson: payload.valueJson as AdminSectionRecord["valueJson"],
          isPublished: payload.isPublished,
          updatedAt: payload.updatedAt,
          createdAt: payload.createdAt ?? section.createdAt,
        })

        setMessage({ type: "success", text: "Conteúdo salvo com sucesso no Supabase." })
      } catch (error) {
        setMessage({
          type: "error",
          text: error instanceof Error ? error.message : "Erro inesperado ao salvar.",
        })
      }
    })
  }

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">{section.label}</p>
            <h1 className="mt-2 text-3xl font-bold text-foreground">{section.label}</h1>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">{section.description}</p>
            <p className="mt-3 text-xs text-muted-foreground">Última atualização: {updatedAtLabel}</p>
          </div>
          <div className="flex flex-col items-start gap-4 rounded-2xl border border-border bg-secondary/20 p-4">
            <div className="flex items-center gap-3">
              <Switch checked={isPublished} onCheckedChange={setIsPublished} />
              <div>
                <p className="text-sm font-medium text-foreground">{isPublished ? "Seção visível" : "Seção oculta"}</p>
                <p className="text-xs text-muted-foreground">
                  Controla se a seção aparece na landing pública sem apagar o conteúdo salvo.
                </p>
              </div>
            </div>
            <Button onClick={handleSave} disabled={!canSave || isPending}>
              {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
              Salvar alterações
            </Button>
          </div>
        </div>

        {message ? (
          <div
            className={`mt-6 rounded-2xl border px-4 py-3 text-sm ${
              message.type === "success"
                ? "border-primary/30 bg-primary/10 text-foreground"
                : "border-destructive/30 bg-destructive/10 text-foreground"
            }`}
          >
            {message.text}
          </div>
        ) : null}
      </Card>

      <Separator />

      <JsonFieldEditor
        label={section.label}
        path={[]}
        value={draft}
        onChange={handleChange}
        onArrayAdd={handleArrayAdd}
        onArrayRemove={handleArrayRemove}
      />
    </div>
  )
}
