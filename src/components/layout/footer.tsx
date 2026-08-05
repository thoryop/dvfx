import Link from "next/link";
import Image from "next/image";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  InstagramIcon,
  YoutubeIcon,
  Linkedin01Icon,
  Behance01Icon,
  Mail01Icon,
  WhatsappIcon,
} from "@hugeicons/core-free-icons";
import type { IconSvgElement } from "@hugeicons/react";

import { getSiteSettings } from "@/lib/data/source";
import { mainNav, serviceCategories, siteConfig } from "@/config/site";
import { whatsappLink } from "@/lib/format";

const socialIcon: Record<string, IconSvgElement> = {
  instagram: InstagramIcon,
  youtube: YoutubeIcon,
  linkedin: Linkedin01Icon,
  behance: Behance01Icon,
};

export async function Footer() {
  const settings = await getSiteSettings();

  return (
    <footer className="mt-24 border-t border-border bg-card/40">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <Link href="/" className="inline-flex items-center" aria-label={siteConfig.name}>
              <Image
                src="/logo.png"
                alt={`${siteConfig.name} logo`}
                width={848}
                height={144}
                className="h-8 w-auto"
              />
            </Link>
            <p className="max-w-xs text-sm text-muted-foreground">
              {settings.footerContent}
            </p>
            <div className="flex items-center gap-2">
              {settings.socialLinks.map((s) =>
                socialIcon[s.icon] ? (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={s.label}
                    className="grid size-9 place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:border-brand/40 hover:text-brand"
                  >
                    <HugeiconsIcon icon={socialIcon[s.icon]} size={18} strokeWidth={2} />
                  </a>
                ) : null
              )}
            </div>
          </div>

          <nav aria-label="Footer">
            <h3 className="mb-4 text-sm font-semibold">Explore</h3>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              {mainNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="transition-colors hover:text-foreground">
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Services">
            <h3 className="mb-4 text-sm font-semibold">Services</h3>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              {serviceCategories.slice(0, 6).map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/services?category=${c.slug}`}
                    className="transition-colors hover:text-foreground"
                  >
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="mb-4 text-sm font-semibold">Get in touch</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <a
                  href={`mailto:${settings.email}`}
                  className="inline-flex items-center gap-2 transition-colors hover:text-foreground"
                >
                  <HugeiconsIcon icon={Mail01Icon} size={16} strokeWidth={2} />
                  {settings.email}
                </a>
              </li>
              <li>
                <a
                  href={whatsappLink(settings.whatsapp, "Hi! I'd like to discuss a video edit.")}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 transition-colors hover:text-foreground"
                >
                  <HugeiconsIcon icon={WhatsappIcon} size={16} strokeWidth={2} />
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <nav className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2" aria-label="Legal">
            <Link href="/terms" className="transition-colors hover:text-foreground">
              Terms
            </Link>
            <Link href="/privacy" className="transition-colors hover:text-foreground">
              Privacy
            </Link>
            <Link href="/refund-policy" className="transition-colors hover:text-foreground">
              Refund Policy
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
