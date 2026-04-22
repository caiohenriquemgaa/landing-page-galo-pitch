"use client"

import { createClient } from "@/src/lib/supabase/client"

export const SITE_ASSETS_BUCKET = "site-assets"

function sanitizeFileName(fileName: string) {
  return fileName
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9.-]/g, "-")
    .replace(/-+/g, "-")
    .toLowerCase()
}

export async function uploadSiteAsset(file: File) {
  const supabase = createClient()
  const extension = file.name.split(".").pop() ?? "jpg"
  const safeName = sanitizeFileName(file.name.replace(/\.[^.]+$/, ""))
  const filePath = `content/${Date.now()}-${safeName}.${extension}`

  const { error } = await supabase.storage.from(SITE_ASSETS_BUCKET).upload(filePath, file, {
    cacheControl: "3600",
    upsert: true,
  })

  if (error) {
    throw error
  }

  const { data } = supabase.storage.from(SITE_ASSETS_BUCKET).getPublicUrl(filePath)
  return data.publicUrl
}
