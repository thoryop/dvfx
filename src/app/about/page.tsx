import type { Metadata } from "next";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  PaintBoardIcon,
  VideoReplayIcon,
  SparklesIcon,
  Image01Icon,
  Layers01Icon,
} from "@hugeicons/core-free-icons";
import type { IconSvgElement } from "@hugeicons/react";

import { buildMetadata } from "@/lib/seo";
import { stats } from "@/lib/data/source";
import { PageHeader } from "@/components/common/page-header";
import { SectionHeading } from "@/components/common/section-heading";
import { Stats } from "@/components/sections/stats";
import { Process } from "@/components/sections/process";
import { processSteps } from "@/lib/data/source";
import { CTAButton } from "@/components/common/cta-button";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";

export const metadata: Metadata = buildMetadata({
  title: "About",
  description:
    "Meet the editor behind DVFX — six years crafting cinematic edits across DaVinci Resolve, Premiere Pro, After Effects, Photoshop and AI tools.",
  path: "/about",
});

const software: { name: string; level: string; icon: IconSvgElement }[] = [
  { name: "DaVinci Resolve", level: "Color & finishing", icon: PaintBoardIcon },
  { name: "Premiere Pro", level: "Editing & assembly", icon: VideoReplayIcon },
  { name: "After Effects", level: "Motion & VFX", icon: Layers01Icon },
  { name: "Photoshop", level: "Thumbnails & design", icon: Image01Icon },
  { name: "AI Tools", level: "Generative visuals", icon: SparklesIcon },
];

const skills = [
  "Cinematic storytelling",
  "Pacing & rhythm",
  "Color grading",
  "Sound design",
  "Motion graphics",
  "Short-form retention",
  "Multi-cam editing",
  "VFX compositing",
];

export const revalidate = 120;

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="The editor behind the edits"
        description="I'm a professional video editor helping creators, artists and brands turn raw footage into stories worth watching."
      >
        <div className="mt-4">
          <CTAButton href="/contact" withArrow>
            Work with me
          </CTAButton>
        </div>
      </PageHeader>

      {/* Story */}
      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="space-y-5 text-lg leading-relaxed text-muted-foreground">
          <p>
            For over six years I&apos;ve lived in the timeline — cutting travel
            films at 3am, syncing music videos to the beat, and shaving seconds
            off retention curves for creators chasing their next milestone.
          </p>
          <p>
            My approach is simple: <span className="text-foreground">story first, craft always</span>.
            Every cut, color choice and sound effect serves the emotion you want
            your audience to feel. The result is work that looks premium and
            performs.
          </p>
          <p>
            Whether it&apos;s a cinematic brand piece or a batch of scroll-stopping
            reels, I treat your footage like it&apos;s my own.
          </p>
        </div>
      </section>

      <Stats stats={stats} />

      {/* Skills */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Skills" title="What I bring to the table" />
        <Stagger className="mt-10 flex flex-wrap justify-center gap-3">
          {skills.map((skill) => (
            <StaggerItem key={skill}>
              <span className="rounded-full border border-border bg-card px-4 py-2 text-sm font-medium">
                {skill}
              </span>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* Software */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Toolkit"
          title="Software expertise"
          description="Industry-standard tools, used fluently to deliver broadcast-quality results."
        />
        <Stagger className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {software.map((s) => (
            <StaggerItem key={s.name}>
              <div className="flex h-full flex-col items-center gap-3 rounded-2xl border border-border bg-card p-6 text-center">
                <span className="grid size-12 place-items-center rounded-xl bg-brand/10 text-brand">
                  <HugeiconsIcon icon={s.icon} size={26} strokeWidth={1.8} />
                </span>
                <h3 className="text-sm font-bold">{s.name}</h3>
                <p className="text-xs text-muted-foreground">{s.level}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* Workflow */}
      <Process steps={processSteps} />

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <Reveal className="flex flex-col items-center gap-5 rounded-3xl border border-brand/30 bg-card px-6 py-12 text-center">
          <SectionHeading
            title="Let's create something great"
            description="Tell me about your project and I'll show you what's possible."
          />
          <CTAButton href="/contact" size="lg" withArrow>
            Get in touch
          </CTAButton>
        </Reveal>
      </section>
    </>
  );
}
