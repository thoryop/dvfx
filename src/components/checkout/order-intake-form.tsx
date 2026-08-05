"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { HugeiconsIcon } from "@hugeicons/react";
import { CheckmarkBadge01Icon } from "@hugeicons/core-free-icons";

import { intakeSchema, type IntakeInput } from "@/lib/validation";
import { CTAButton } from "@/components/common/cta-button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

/** Post-payment brief: footage link, brief, deadline — tied to the order ref. */
export function OrderIntakeForm({ orderRef }: { orderRef: string }) {
  const [done, setDone] = React.useState(false);
  const form = useForm<IntakeInput>({
    resolver: zodResolver(intakeSchema),
    defaultValues: { orderRef, footageUrl: "", brief: "", deadline: "", company: "" },
  });

  async function onSubmit(values: IntakeInput) {
    try {
      const res = await fetch("/api/orders/intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error("failed");
      setDone(true);
      toast.success("Brief received — I'll get started and be in touch shortly.");
    } catch {
      toast.error("Couldn't submit. Please email your brief instead.");
    }
  }

  if (done) {
    return (
      <div className="flex items-start gap-3 rounded-2xl border border-brand/30 bg-brand/5 p-5">
        <HugeiconsIcon icon={CheckmarkBadge01Icon} size={22} strokeWidth={2} className="mt-0.5 text-brand" />
        <div>
          <h3 className="font-semibold">Brief received ✅</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Thanks! I have everything I need to start. You&apos;ll hear from me within 24 hours.
          </p>
        </div>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* Honeypot */}
        <input
          type="text"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="hidden"
          {...form.register("company")}
        />
        <FormField
          control={form.control}
          name="footageUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Footage link</FormLabel>
              <FormControl>
                <Input placeholder="Google Drive / Dropbox / WeTransfer link" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="brief"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project brief</FormLabel>
              <FormControl>
                <Textarea
                  rows={4}
                  placeholder="Style/references, must-have moments, music, aspect ratio, anything I should know…"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="deadline"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Deadline (optional)</FormLabel>
              <FormControl>
                <Input placeholder="e.g. within 2 weeks / by 30 Aug" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <CTAButton
          type="submit"
          disabled={form.formState.isSubmitting}
          className="w-full sm:w-auto"
        >
          {form.formState.isSubmitting ? "Sending…" : "Send my brief"}
        </CTAButton>
      </form>
    </Form>
  );
}
