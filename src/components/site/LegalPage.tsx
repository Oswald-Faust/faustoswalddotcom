import { Prose } from "./Prose";
import { Section } from "./ui";

export function LegalPage({
  title,
  updated,
  updatedLabel,
  source,
}: {
  title: string;
  updated: string;
  updatedLabel: string;
  source: string;
}) {
  return (
    <>
      <Section divider={false} innerClassName="pb-12 pt-36 md:pt-40">
        <div className="mx-auto max-w-[580px]">
          <h1 className="text-[clamp(2.25rem,1.6rem+2.6vw,3rem)] font-medium leading-[1.1] tracking-[-0.03em]">
            {title}
          </h1>
          <p className="t-cap mt-6 text-soft">
            {updatedLabel}: {updated}
          </p>
        </div>
      </Section>
      <Section innerClassName="py-16 md:py-20">
        <div className="mx-auto max-w-[580px]">
          <Prose source={source} />
        </div>
      </Section>
    </>
  );
}
