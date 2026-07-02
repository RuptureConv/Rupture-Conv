type WebApplicationStructuredDataInput = {
  name: string;
  url: string;
  description: string;
  applicationCategory: "BusinessApplication" | "FinanceApplication";
};

export function buildWebApplicationStructuredData({
  name,
  url,
  description,
  applicationCategory
}: WebApplicationStructuredDataInput): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name,
    url,
    description,
    applicationCategory,
    operatingSystem: "Web",
    isAccessibleForFree: true
  };
}
