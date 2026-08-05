"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { HugeiconsIcon } from "@hugeicons/react";
import { Menu03Icon, Cancel01Icon } from "@hugeicons/core-free-icons";

import { cn } from "@/lib/utils";
import { mainNav, siteConfig } from "@/config/site";
import { CTAButton } from "@/components/common/cta-button";
import {
  Sheet,
  SheetContent,
  SheetClose,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-colors duration-300",
        scrolled
          ? "border-b border-border bg-background/80 backdrop-blur-md"
          : "border-b border-transparent"
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center" aria-label={siteConfig.name}>
          <Image
            src="/logo.png"
            alt={`${siteConfig.name} logo`}
            width={848}
            height={144}
            className="h-7 w-auto"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
          {mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-full px-3.5 py-2 text-sm font-medium transition-colors",
                isActive(item.href)
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {item.title}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <CTAButton href="/services" size="sm" withArrow>
            Hire me
          </CTAButton>
        </div>

        {/* Mobile */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger
            className="inline-flex size-10 items-center justify-center rounded-md text-foreground md:hidden"
            aria-label="Open menu"
          >
            <HugeiconsIcon icon={Menu03Icon} size={24} strokeWidth={2} />
          </SheetTrigger>
          <SheetContent side="right" className="w-[min(20rem,85vw)] p-0">
            <SheetTitle className="sr-only">Navigation</SheetTitle>
            <div className="flex items-center justify-between border-b border-border p-4">
              <Image
                src="/logo.png"
                alt={`${siteConfig.name} logo`}
                width={848}
                height={144}
                className="h-6 w-auto"
              />
              <SheetClose
                className="inline-flex size-9 items-center justify-center rounded-md text-muted-foreground hover:text-foreground"
                aria-label="Close menu"
              >
                <HugeiconsIcon icon={Cancel01Icon} size={20} strokeWidth={2} />
              </SheetClose>
            </div>
            <nav className="flex flex-col p-2" aria-label="Mobile">
              {mainNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "rounded-lg px-4 py-3 text-base font-medium transition-colors",
                    isActive(item.href)
                      ? "bg-muted text-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  {item.title}
                </Link>
              ))}
              <div className="p-2 pt-4">
                <CTAButton href="/services" className="w-full" withArrow>
                  Hire me
                </CTAButton>
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
