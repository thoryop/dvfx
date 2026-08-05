"use client";

import * as React from "react";
import { AnimatePresence, motion } from "motion/react";
import { HugeiconsIcon } from "@hugeicons/react";
import { Tick02Icon } from "@hugeicons/core-free-icons";

import { cn } from "@/lib/utils";
import { formatINR } from "@/lib/format";
import { oneTimePlans, supportPlans, type Plan } from "@/lib/data/plans";
import { CTAButton } from "@/components/common/cta-button";
import { Badge } from "@/components/ui/badge";

function PlanCard({ plan, suffix }: { plan: Plan; suffix?: string }) {
  return (
    <div
      className={cn(
        "relative flex h-full flex-col rounded-2xl border bg-card p-6",
        plan.recommended ? "border-brand/60 brand-glow" : "border-border"
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
        <span className="text-4xl font-extrabold tracking-tight">
          {formatINR(plan.price)}
        </span>
        {suffix ? (
          <span className="text-sm text-muted-foreground">{suffix}</span>
        ) : null}
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
        href="/contact"
        variant={plan.recommended ? "brand" : "outline"}
        className="w-full"
      >
        Get started
      </CTAButton>
    </div>
  );
}

export function PricingPlans() {
  const [mode, setMode] = React.useState<"onetime" | "support">("onetime");
  const plans = mode === "onetime" ? oneTimePlans : supportPlans;

  return (
    <div>
      {/* Toggle */}
      <div className="flex justify-center">
        <div className="inline-flex rounded-full border border-border bg-card p-1">
          {(
            [
              { key: "onetime", label: "One-time projects" },
              { key: "support", label: "Monthly plans" },
            ] as const
          ).map((opt) => (
            <button
              key={opt.key}
              onClick={() => setMode(opt.key)}
              className="relative rounded-full px-5 py-2 text-sm font-medium transition-colors"
            >
              {mode === opt.key ? (
                <motion.span
                  layoutId="pricing-toggle"
                  className="absolute inset-0 rounded-full bg-brand"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              ) : null}
              <span
                className={cn(
                  "relative z-10",
                  mode === opt.key ? "text-brand-foreground" : "text-muted-foreground"
                )}
              >
                {opt.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={mode}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.25 }}
          className={cn(
            "mt-12 grid gap-6",
            mode === "onetime" ? "md:grid-cols-3" : "md:grid-cols-2 lg:max-w-4xl lg:mx-auto"
          )}
        >
          {plans.map((plan) => (
            <PlanCard
              key={plan.id}
              plan={plan}
              suffix={mode === "support" ? "/month" : undefined}
            />
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
