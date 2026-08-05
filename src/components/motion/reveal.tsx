"use client";

import * as React from "react";
import {
  motion,
  useReducedMotion,
  type HTMLMotionProps,
  type Variants,
} from "motion/react";

import { cn } from "@/lib/utils";

type Direction = "up" | "down" | "left" | "right" | "none";

const offset: Record<Direction, { x?: number; y?: number }> = {
  up: { y: 24 },
  down: { y: -24 },
  left: { x: 24 },
  right: { x: -24 },
  none: {},
};

interface RevealProps extends HTMLMotionProps<"div"> {
  direction?: Direction;
  delay?: number;
  once?: boolean;
}

/** Fade + slide a single element in when it scrolls into view. */
export function Reveal({
  children,
  direction = "up",
  delay = 0,
  once = true,
  className,
  ...props
}: RevealProps) {
  const reduce = useReducedMotion();
  const from = reduce ? {} : offset[direction];

  return (
    <motion.div
      className={cn(className)}
      initial={{ opacity: 0, ...from }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, margin: "-80px" }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

/** Wrap a list of <Stagger.Item> to reveal children in sequence. */
export function Stagger({
  children,
  className,
  once = true,
  ...props
}: HTMLMotionProps<"div"> & { once?: boolean }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={cn(className)}
      variants={reduce ? undefined : containerVariants}
      initial={reduce ? undefined : "hidden"}
      whileInView={reduce ? undefined : "show"}
      viewport={{ once, margin: "-60px" }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
  ...props
}: HTMLMotionProps<"div">) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={cn(className)}
      variants={reduce ? undefined : itemVariants}
      {...props}
    >
      {children}
    </motion.div>
  );
}
