import type { Metadata } from "next"
import { LandingPage } from "@/components/page/landing-page"
import { getResolvedSiteContent } from "@/src/lib/content/site-content"

export async function generateMetadata(): Promise<Metadata> {
  const content = await getResolvedSiteContent()

  return {
    title: content.meta.title,
    description: content.meta.description,
  }
}

export default async function Home() {
  const content = await getResolvedSiteContent()

  return <LandingPage content={content} />
}
