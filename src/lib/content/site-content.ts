import { unstable_noStore as noStore } from "next/cache"
import {
  defaultSectionVisibility,
  defaultSiteSections,
  resolveSiteContent,
} from "@/src/lib/content/default-sections"
import { sectionOrder, sectionRegistry } from "@/src/lib/content/section-registry"
import { isSupabaseConfigured } from "@/src/lib/supabase/config"
import { createClient } from "@/src/lib/supabase/server"
import type {
  AdminSectionRecord,
  JsonObject,
  JsonValue,
  ResolvedSiteContent,
  SectionVisibility,
  SectionKey,
  SiteContentRow,
  SiteSections,
} from "@/src/types/content"

function isSectionKey(value: string): value is SectionKey {
  return value in defaultSiteSections
}

function mergeSections(rows: SiteContentRow[]): SiteSections {
  const merged = structuredClone(defaultSiteSections)

  rows.forEach((row) => {
    if (!isSectionKey(row.key)) {
      return
    }

    merged[row.key] = row.value_json as SiteSections[typeof row.key]
  })

  return merged
}

function mergeVisibility(rows: SiteContentRow[]): SectionVisibility {
  const merged = structuredClone(defaultSectionVisibility)

  rows.forEach((row) => {
    if (!isSectionKey(row.key)) {
      return
    }

    merged[row.key] = row.is_published
  })

  return merged
}

async function getContentState(): Promise<{
  sections: SiteSections
  visibility: SectionVisibility
}> {
  noStore()

  if (!isSupabaseConfigured()) {
    return {
      sections: structuredClone(defaultSiteSections),
      visibility: structuredClone(defaultSectionVisibility),
    }
  }

  try {
    const supabase = await createClient()
    const { data, error } = await supabase.from("site_content").select("*")

    if (error || !data) {
      return {
        sections: structuredClone(defaultSiteSections),
        visibility: structuredClone(defaultSectionVisibility),
      }
    }

    const rows = data as SiteContentRow[]

    return {
      sections: mergeSections(rows),
      visibility: mergeVisibility(rows),
    }
  } catch {
    return {
      sections: structuredClone(defaultSiteSections),
      visibility: structuredClone(defaultSectionVisibility),
    }
  }
}

export async function getPublishedSections(): Promise<SiteSections> {
  const { sections } = await getContentState()
  return sections
}

export async function getResolvedSiteContent(): Promise<ResolvedSiteContent> {
  const { sections, visibility } = await getContentState()
  return resolveSiteContent(sections, visibility)
}

export async function getSectionByKey<K extends SectionKey>(key: K): Promise<SiteSections[K]> {
  noStore()

  if (!isSupabaseConfigured()) {
    return structuredClone(defaultSiteSections[key])
  }

  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from("site_content")
      .select("*")
      .eq("key", key)
      .maybeSingle()

    if (error || !data || !data.is_published) {
      return structuredClone(defaultSiteSections[key])
    }

    return (data.value_json as SiteSections[K]) ?? structuredClone(defaultSiteSections[key])
  } catch {
    return structuredClone(defaultSiteSections[key])
  }
}

export function sectionExists(key: string): key is SectionKey {
  return isSectionKey(key)
}

export async function getAdminSections(): Promise<AdminSectionRecord[]> {
  noStore()

  const defaults = sectionOrder.map((key) => ({
    key,
    label: sectionRegistry[key].label,
    description: sectionRegistry[key].description,
    isPublished: true,
    valueJson: structuredClone(defaultSiteSections[key]),
  })) as AdminSectionRecord[]

  if (!isSupabaseConfigured()) {
    return defaults
  }

  try {
    const supabase = await createClient()
    const { data, error } = await supabase.from("site_content").select("*")

    if (error || !data) {
      return defaults
    }

    const rowMap = new Map((data as SiteContentRow[]).map((row) => [row.key, row]))

    return sectionOrder.map((key) => {
      const row = rowMap.get(key)
      return {
        key,
        label: sectionRegistry[key].label,
        description: sectionRegistry[key].description,
        isPublished: row?.is_published ?? true,
        valueJson: (row?.value_json as SiteSections[typeof key]) ?? structuredClone(defaultSiteSections[key]),
        updatedAt: row?.updated_at,
        createdAt: row?.created_at,
      }
    }) as AdminSectionRecord[]
  } catch {
    return defaults
  }
}

export async function updateSection<K extends SectionKey>(
  key: K,
  valueJson: SiteSections[K] | JsonValue,
  isPublished: boolean,
) {
  if (!sectionExists(key)) {
    throw new Error(`Seção inválida: ${key}`)
  }

  if (!isSupabaseConfigured()) {
    return { key, valueJson, isPublished }
  }

  const supabase = await createClient()
  const payload: {
    key: K
    value_json: JsonObject
    is_published: boolean
  } = {
    key,
    value_json: valueJson as JsonObject,
    is_published: isPublished,
  }

  const { data, error } = await supabase
    .from("site_content")
    .upsert(payload, { onConflict: "key" })
    .select("*")
    .single()

  if (error) {
    throw error
  }

  return data
}
