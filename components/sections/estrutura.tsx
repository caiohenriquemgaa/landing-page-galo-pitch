"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { useSiteContent } from "@/src/lib/content/content-provider"

export function Estrutura() {
  const { estrutura } = useSiteContent()

  return (
    <section id="estrutura" className="py-24 bg-secondary">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-medium tracking-wider uppercase mb-4 block">
            {estrutura.eyebrow}
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6 text-balance">
            {estrutura.title}
          </h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            {estrutura.description}
          </p>
        </motion.div>

        <div className="space-y-16">
          {estrutura.items.map((facility, index) => (
            <motion.div
              key={facility.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className={`grid md:grid-cols-2 gap-8 items-center ${
                index % 2 === 1 ? "md:flex-row-reverse" : ""
              }`}
            >
              <div className={index % 2 === 1 ? "md:order-2" : ""}>
                <div className="relative aspect-video rounded-lg overflow-hidden">
                  <Image
                    src={facility.image}
                    alt={facility.imageAlt}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent" />
                </div>
              </div>
              <div className={index % 2 === 1 ? "md:order-1" : ""}>
                <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                  {facility.title}
                </h3>
                <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                  {facility.description}
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {facility.features.map((feature, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 text-foreground"
                    >
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
