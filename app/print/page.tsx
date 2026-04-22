import type { Metadata } from "next"
import { PrintVersion } from "@/components/page/print-version"
import { getResolvedSiteContent } from "@/src/lib/content/site-content"

export async function generateMetadata(): Promise<Metadata> {
  const content = await getResolvedSiteContent()

  return {
    title: `${content.meta.title} | Versão para Impressão`,
    description: "Versão em A4 da apresentação institucional do Galo Maringá SAF para impressão e exportação em PDF.",
  }
}

export default async function PrintPage() {
  const content = await getResolvedSiteContent()

  return <PrintVersion content={content} />
}
