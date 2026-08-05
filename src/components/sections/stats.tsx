import { NumberCounter } from "@/components/motion/number-counter";

interface Stat {
  label: string;
  value: number;
  suffix?: string;
}

export function Stats({ stats }: { stats: Stat[] }) {
  return (
    <section className="border-y border-border bg-card/30 py-16">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 sm:px-6 lg:grid-cols-4 lg:px-8">
        {stats.map((s) => (
          <div key={s.label} className="flex flex-col items-center text-center">
            <span className="text-4xl font-extrabold tracking-tight text-brand md:text-5xl">
              <NumberCounter value={s.value} suffix={s.suffix} />
            </span>
            <span className="mt-2 text-sm text-muted-foreground">{s.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
