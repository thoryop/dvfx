import { CTAButton } from "@/components/common/cta-button";
import { Reveal } from "@/components/motion/reveal";

export function FinalCta() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <Reveal className="relative overflow-hidden rounded-3xl border border-brand/30 bg-card px-6 py-16 text-center sm:px-12">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-grid opacity-50 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
        <div className="pointer-events-none absolute -bottom-32 left-1/2 -z-10 size-[30rem] -translate-x-1/2 rounded-full bg-brand/20 blur-[100px]" />
        <h2 className="mx-auto max-w-2xl text-balance text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl">
          Ready to make your next video unforgettable?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-pretty text-muted-foreground">
          Tell me about your project and I&apos;ll get back within 24 hours with a
          plan and a quote.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <CTAButton href="/contact" size="lg" withArrow>
            Start a project
          </CTAButton>
          <CTAButton href="/pricing" size="lg" variant="outline">
            See pricing
          </CTAButton>
        </div>
      </Reveal>
    </section>
  );
}
