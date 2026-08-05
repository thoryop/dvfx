import { PageHeader } from "@/components/common/page-header";
import { LEGAL_UPDATED, type LegalDoc } from "@/config/legal";

/** Renders a policy document (terms / privacy / refund) in a readable layout. */
export function LegalDocument({ doc }: { doc: LegalDoc }) {
  return (
    <>
      <PageHeader eyebrow="Legal" title={doc.title} description={doc.intro} />
      <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <p className="text-sm text-muted-foreground">Last updated: {LEGAL_UPDATED}</p>
        <div className="mt-8 space-y-10">
          {doc.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="text-xl font-bold tracking-tight">{section.heading}</h2>
              <div className="mt-3 space-y-3 text-sm leading-relaxed text-muted-foreground">
                {section.body.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </article>
    </>
  );
}
