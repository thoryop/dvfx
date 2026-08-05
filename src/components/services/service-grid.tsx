import type { Service } from "@/types";
import { ServiceCard } from "./service-card";
import { Stagger, StaggerItem } from "@/components/motion/reveal";

export function ServiceGrid({ services }: { services: Service[] }) {
  if (services.length === 0) {
    return (
      <p className="rounded-xl border border-dashed border-border py-16 text-center text-muted-foreground">
        No services in this category yet.
      </p>
    );
  }

  return (
    <Stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {services.map((service) => (
        <StaggerItem key={service.id}>
          <ServiceCard service={service} />
        </StaggerItem>
      ))}
    </Stagger>
  );
}
