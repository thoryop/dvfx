import * as React from "react";
import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight01Icon } from "@hugeicons/core-free-icons";

import { cn } from "@/lib/utils";

/**
 * Marketing-scale CTA. The shadcn Button is tuned for dense dashboards (h-7);
 * this gives the larger, brand-forward buttons the landing pages need.
 */
const ctaVariants = cva(
  "group inline-flex items-center justify-center gap-2 rounded-full font-semibold whitespace-nowrap transition-all outline-none focus-visible:ring-2 focus-visible:ring-brand/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        brand:
          "bg-brand text-brand-foreground hover:brightness-105 active:translate-y-px brand-glow",
        outline:
          "border border-border bg-transparent text-foreground hover:bg-muted",
        ghost: "text-foreground hover:bg-muted",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
      },
      size: {
        sm: "h-9 px-4 text-sm",
        md: "h-11 px-6 text-sm",
        lg: "h-12 px-7 text-base",
      },
    },
    defaultVariants: { variant: "brand", size: "md" },
  }
);

type CommonProps = VariantProps<typeof ctaVariants> & {
  className?: string;
  children: React.ReactNode;
  withArrow?: boolean;
};

type CTAButtonProps = CommonProps &
  (
    | ({ href: string } & Omit<React.ComponentProps<typeof Link>, "href" | "className">)
    | ({ href?: undefined } & React.ComponentProps<"button">)
  );

export function CTAButton({
  variant,
  size,
  className,
  children,
  withArrow,
  ...props
}: CTAButtonProps) {
  const classes = cn(ctaVariants({ variant, size }), className);
  const content = (
    <>
      {children}
      {withArrow ? (
        <HugeiconsIcon
          icon={ArrowRight01Icon}
          className="size-4 transition-transform group-hover:translate-x-0.5"
          strokeWidth={2}
        />
      ) : null}
    </>
  );

  if ("href" in props && props.href !== undefined) {
    const { href, ...rest } = props as { href: string };
    return (
      <Link href={href} className={classes} {...rest}>
        {content}
      </Link>
    );
  }

  return (
    <button className={classes} {...(props as React.ComponentProps<"button">)}>
      {content}
    </button>
  );
}
