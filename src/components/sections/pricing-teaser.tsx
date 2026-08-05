import { HugeiconsIcon } from "@hugeicons/react";
import { Tick02Icon } from "@hugeicons/core-free-icons";

import { oneTimePlans } from "@/lib/data/plans";
import { cn } from "@/lib/utils";
import { formatINR } from "@/lib/format";
import { SectionHeading } from "@/components/common/section-heading";
import { CTAButton } from "@/components/common/cta-button";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/motion/reveal";

export function PricingTeaser() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Pricing"
        title="Transparent, flexible pricing"
        description="Pay per project or set up a monthly content plan. No hidden fees, ever."
      />
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {oneTimePlans.map((plan, i) => (
          <Reveal key={plan.id} delay={i * 0.08}>
            <div
              className={cn(
                "relative flex h-full flex-col rounded-2xl border bg-card p-6",
                plan.recommended ? "border-brand/60" : "border-border"
              )}
            >
              {plan.badge ? (
                <Badge className="absolute -top-3 left-6 border-0 bg-brand text-brand-foreground">
                  {plan.badge}
                </Badge>
              ) : null}
              <h3 className="text-lg font-bold">{plan.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{plan.tagline}</p>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-sm text-muted-foreground">from</span>
                <span className="text-3xl font-extrabold tracking-tight">
                  {formatINR(plan.price)}
                </span>
              </div>
              <ul className="my-6 flex flex-1 flex-col gap-3">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm">
                    <HugeiconsIcon
                      icon={Tick02Icon}
                      size={18}
                      strokeWidth={2.5}
                      className="mt-0.5 shrink-0 text-brand"
                    />
                    <span className="text-foreground/90">{f}</span>
                  </li>
                ))}
              </ul>
              <CTAButton
                href="/pricing"
                variant={plan.recommended ? "brand" : "outline"}
                className="w-full"
              >
                Choose {plan.name}
              </CTAButton>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
