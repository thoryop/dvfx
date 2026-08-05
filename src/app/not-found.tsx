import { CTAButton } from "@/components/common/cta-button";

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center px-4 py-20 text-center">
      <span className="text-7xl font-extrabold tracking-tight text-brand">404</span>
      <h1 className="mt-4 text-3xl font-extrabold tracking-tight">Page not found</h1>
      <p className="mt-3 text-muted-foreground">
        The page you&apos;re looking for doesn&apos;t exist or has moved.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <CTAButton href="/" variant="outline">
          Back home
        </CTAButton>
        <CTAButton href="/services" withArrow>
          Browse services
        </CTAButton>
      </div>
    </section>
  );
}
