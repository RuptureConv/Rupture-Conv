import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

function read(path: string) {
  return readFileSync(path, "utf8");
}

describe("main editorial hubs", () => {
  it("uses the real salary hub route in the complete guides page", () => {
    const source = read("app/guides-complets/page.tsx");

    expect(source).toContain('href: "/salaire-brut-net"');
    expect(source).not.toContain("← Retour au simulateur");
  });

  it("keeps the salary hub connected to the editorial system", () => {
    const source = read("app/salaire-brut-net/page.tsx");

    expect(source).toContain("Salaire brut/net : ce qu&apos;il faut retenir");
    expect(source).toContain('href="/rupture-conventionnelle"');
    expect(source).toContain('href="/chomage-are"');
    expect(source).toContain('href="/guide-preavis"');
    expect(source).toContain('href="/guides-complets"');
  });
});
