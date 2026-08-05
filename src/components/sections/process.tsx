import { SectionHeading } from "@/components/common/section-heading";
import { Reveal } from "@/components/motion/reveal";

interface Step {
  step: string;
  title: string;
  description: string;
}

export function Process({ steps }: { steps: Step[] }) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Process"
        title="Simple, collaborative, fast"
        description="A clear four-step workflow so you always know what's happening with your project."
      />
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((s, i) => (
          <Reveal key={s.step} delay={i * 0.08}>
            <div className="relative h-full rounded-2xl border border-border bg-card p-6">
              <span className="text-5xl font-extrabold text-brand/20">{s.step}</span>
              <h3 className="mt-3 text-lg font-bold">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.description}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
