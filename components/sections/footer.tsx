"use client"

import { motion } from "framer-motion"
import { Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react"
import { useSiteContent } from "@/src/lib/content/content-provider"

export function Footer() {
  const { header, footer } = useSiteContent()
  const socialIcons = [Instagram, Linkedin]

  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-4 gap-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="md:col-span-1"
          >
            <h3 className="text-2xl font-bold text-foreground mb-4">
              {header.brand.primary} <span className="text-primary">{header.brand.highlight}</span>
            </h3>
            <p className="text-muted-foreground text-sm mb-2">
              {footer.brandDescription}
            </p>
            <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
              {footer.tagline}
            </p>
            <div className="flex gap-4">
              {footer.socialLinks.map((social, index) => {
                const Icon = socialIcons[index]

                return (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                )
              })}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h4 className="text-lg font-semibold text-foreground mb-4">{footer.quickLinksTitle}</h4>
            <ul className="space-y-3">
              {footer.quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* SAF Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h4 className="text-lg font-semibold text-foreground mb-4">{footer.investorsTitle}</h4>
            <ul className="space-y-3">
              {footer.investorLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-muted-foreground hover:text-primary transition-colors text-sm">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h4 className="text-lg font-semibold text-foreground mb-4">{footer.contactTitle}</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-muted-foreground text-sm">
                  {footer.contact.addressLines[0]}<br />
                  {footer.contact.addressLines[1]}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-muted-foreground text-sm">{footer.contact.phone}</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-muted-foreground text-sm">{footer.contact.email}</span>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-muted-foreground text-sm">
              {footer.copyright}
            </p>
            <div className="flex gap-6">
              {footer.legalLinks.map((link) => (
                <a key={link.label} href={link.href} className="text-muted-foreground hover:text-primary text-sm transition-colors">
                  {link.label}
                </a>
              ))}
            </div>
          </div>
          <p className="text-muted-foreground text-xs text-center mt-4">
            {footer.riskNote}
          </p>
        </div>
      </div>
    </footer>
  )
}
