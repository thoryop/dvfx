import { Marquee } from "@/components/motion/marquee";

export function BrandMarquee({ brands }: { brands: string[] }) {
  return (
    <section className="border-y border-border bg-card/30 py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="mb-6 text-center text-xs font-medium uppercase tracking-widest text-muted-foreground">
          Trusted by creators &amp; brands
        </p>
        <div className="relative [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
          <Marquee speed={32}>
            {brands.map((brand) => (
              <span
                key={brand}
                className="text-xl font-bold text-muted-foreground/70 transition-colors hover:text-foreground"
              >
                {brand}
              </span>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
}
