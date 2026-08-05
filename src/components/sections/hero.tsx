"use client";

import * as React from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { HugeiconsIcon } from "@hugeicons/react";
import { SparklesIcon } from "@hugeicons/core-free-icons";

import { siteConfig } from "@/config/site";
import { CTAButton } from "@/components/common/cta-button";
import { ResponsiveVideo } from "@/components/media/responsive-video";

interface HeroProps {
  showreel?: string;
  poster: string;
}

export function Hero({ showreel, poster }: HeroProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, reduce ? 1 : 0.3]);

  return (
    <section ref={ref} className="relative overflow-hidden">
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-grid [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
      <div className="pointer-events-none absolute -top-40 left-1/2 -z-10 size-[40rem] -translate-x-1/2 rounded-full bg-brand/15 blur-[120px]" />

      <div className="mx-auto max-w-7xl px-4 pb-10 pt-20 sm:px-6 sm:pt-28 lg:px-8">
        <motion.div style={{ y, opacity }} className="flex flex-col items-center text-center">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-brand/30 bg-brand/10 px-4 py-1.5 text-sm font-medium text-brand"
          >
            <HugeiconsIcon icon={SparklesIcon} size={16} strokeWidth={2} />
            Professional Video Editing Studio
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="mt-6 max-w-4xl text-balance text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl"
          >
            Edits that make people{" "}
            <span className="text-brand">stop scrolling.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.12 }}
            className="mt-6 max-w-2xl text-pretty text-lg text-muted-foreground"
          >
            {siteConfig.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.18 }}
            className="mt-8 flex flex-col gap-3 sm:flex-row"
          >
            <CTAButton href="/services" size="lg" withArrow>
              Explore services
            </CTAButton>
            <CTAButton href="/portfolio" size="lg" variant="outline">
              Watch showreel
            </CTAButton>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="mx-auto mt-14 max-w-5xl"
        >
          <ResponsiveVideo
            orientation="16:9"
            poster={poster}
            src={showreel}
            title="DVFX showreel"
            priority
          />
        </motion.div>
      </div>
    </section>
  );
}
