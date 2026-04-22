"use client"

import { useRef, useState, useTransition } from "react"
import { ImagePlus, Loader2, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { uploadSiteAsset } from "@/src/lib/supabase/storage"
import type { ImageRequirement } from "@/components/admin/image-requirements"

type ImageUploadFieldProps = {
  label: string
  value: string
  onChange: (value: string) => void
  requirement?: ImageRequirement | null
}

function getImageDimensions(file: File) {
  return new Promise<{ width: number; height: number }>((resolve, reject) => {
    const objectUrl = URL.createObjectURL(file)
    const image = new Image()

    image.onload = () => {
      resolve({ width: image.width, height: image.height })
      URL.revokeObjectURL(objectUrl)
    }

    image.onerror = () => {
      URL.revokeObjectURL(objectUrl)
      reject(new Error("Não foi possível ler as dimensões da imagem."))
    }

    image.src = objectUrl
  })
}

export function ImageUploadField({ label, value, onChange, requirement }: ImageUploadFieldProps) {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [dimensionMessage, setDimensionMessage] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()
  const [preview, setPreview] = useState(value)

  function handleFile(file: File) {
    setErrorMessage(null)
    setDimensionMessage(null)

    startTransition(async () => {
      try {
        if (requirement) {
          const dimensions = await getImageDimensions(file)
          if (dimensions.width !== requirement.width || dimensions.height !== requirement.height) {
            setDimensionMessage(
              `Imagem enviada com ${dimensions.width}x${dimensions.height}px. Recomendado: ${requirement.width}x${requirement.height}px.`,
            )
          }
        }

        const publicUrl = await uploadSiteAsset(file)
        setPreview(publicUrl)
        onChange(publicUrl)
      } catch (error) {
        setErrorMessage(error instanceof Error ? error.message : "Falha ao enviar imagem.")
      }
    })
  }

  return (
    <div className="space-y-3">
      <label className="text-sm font-medium text-foreground">{label}</label>

      {requirement ? (
        <div className="rounded-2xl border border-primary/20 bg-primary/5 px-4 py-3">
          <p className="text-sm font-medium text-foreground">{requirement.label}</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Dimensão recomendada: {requirement.width} x {requirement.height}px.
            {requirement.notes ? ` ${requirement.notes}` : ""}
          </p>
        </div>
      ) : null}

      <div className="overflow-hidden rounded-2xl border border-border bg-secondary/20">
        <div className="flex aspect-[16/8] items-center justify-center bg-muted/40">
          {preview ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={preview} alt={label} className="h-full w-full object-cover" />
          ) : (
            <div className="flex flex-col items-center gap-2 text-muted-foreground">
              <ImagePlus className="h-8 w-8" />
              <span className="text-sm">Nenhuma imagem selecionada</span>
            </div>
          )}
        </div>

        <div className="space-y-3 p-4">
          <Input
            value={value}
            placeholder="Cole uma URL ou envie uma nova imagem"
            onChange={(event) => {
              setPreview(event.target.value)
              onChange(event.target.value)
            }}
          />

          <input
            ref={inputRef}
            type="file"
            accept="image/png,image/jpeg,image/webp,image/svg+xml"
            className="hidden"
            onChange={(event) => {
              const file = event.target.files?.[0]
              if (file) handleFile(file)
            }}
          />

          <div className="flex flex-wrap gap-3">
            <Button type="button" variant="outline" onClick={() => inputRef.current?.click()} disabled={isPending}>
              {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Upload className="mr-2 h-4 w-4" />}
              Enviar imagem
            </Button>
          </div>

          {errorMessage ? (
            <div className="rounded-xl border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-foreground">
              {errorMessage}
            </div>
          ) : null}

          {dimensionMessage ? (
            <div className="rounded-xl border border-amber-400/30 bg-amber-400/10 px-3 py-2 text-sm text-foreground">
              {dimensionMessage}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}
