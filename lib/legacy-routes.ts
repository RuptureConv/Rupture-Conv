export const legacyBlogRedirects = [
  {
    source: "/blog/rupture-conventionnelle-ou-licenciement-que-choisir",
    destination: "/rupture-conventionnelle-ou-licenciement",
    permanent: true
  }
] as const;

export const nonCanonicalBlogSlugs = new Set(
  legacyBlogRedirects.map((redirect) => redirect.source.replace("/blog/", ""))
);
