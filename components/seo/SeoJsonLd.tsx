import { serializeJsonLd } from "@/lib/json-ld";

type JsonLdProps = {
  data: Record<string, unknown>;
};

export function SeoJsonLd({ data }: JsonLdProps) {
  if (!data) return null;

  return (
    <script
      type="application/ld+json"
      suppressHydrationWarning
      dangerouslySetInnerHTML={{
        __html: serializeJsonLd(data)
      }}
    />
  );
}
