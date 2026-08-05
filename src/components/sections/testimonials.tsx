"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import { QuoteUpIcon } from "@hugeicons/core-free-icons";

import type { Testimonial } from "@/types";
import { SectionHeading } from "@/components/common/section-heading";
import { Rating } from "@/components/common/rating";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export function Testimonials({ testimonials }: { testimonials: Testimonial[] }) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Testimonials"
        title="Loved by the people I work with"
        description="A few words from creators, artists and brands I've edited for."
      />

      <Carousel
        opts={{ align: "start", loop: true }}
        className="mt-12 [&_[data-slot=carousel-content]]:-ml-4"
      >
        <CarouselContent>
          {testimonials.map((t) => (
            <CarouselItem key={t.id} className="pl-4 sm:basis-1/2 lg:basis-1/3">
              <figure className="flex h-full flex-col rounded-2xl border border-border bg-card p-6">
                <HugeiconsIcon
                  icon={QuoteUpIcon}
                  size={28}
                  strokeWidth={2}
                  className="text-brand/40"
                />
                <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-foreground/90">
                  “{t.review}”
                </blockquote>
                <Rating value={t.rating} className="mt-4" />
                <figcaption className="mt-4 flex items-center gap-3 border-t border-border pt-4">
                  <Avatar className="size-10">
                    {t.avatar ? <AvatarImage src={t.avatar} alt={t.name} /> : null}
                    <AvatarFallback>{t.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="text-sm font-semibold">{t.name}</div>
                    <div className="text-xs text-muted-foreground">{t.role}</div>
                  </div>
                </figcaption>
              </figure>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="mt-6 flex justify-center gap-2">
          <CarouselPrevious className="static translate-y-0" />
          <CarouselNext className="static translate-y-0" />
        </div>
      </Carousel>
    </section>
  );
}
