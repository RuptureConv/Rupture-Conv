import { expect, test } from "@playwright/test";

test("la mesure d'audience attend un consentement explicite", async ({ page }) => {
  await page.goto("/");

  await expect(
    page.getByRole("complementary", {
      name: "Préférences de mesure d'audience"
    })
  ).toBeVisible();

  const trackingScriptsBeforeConsent = await page.evaluate(() =>
    Array.from(document.scripts).filter((script) =>
      script.src.includes("googletagmanager.com")
    ).length
  );

  expect(trackingScriptsBeforeConsent).toBe(0);

  await page.getByRole("button", { name: "Refuser" }).click();
  await expect(
    page.getByRole("complementary", {
      name: "Préférences de mesure d'audience"
    })
  ).toBeHidden();

  await page.reload();
  await expect(
    page.getByRole("complementary", {
      name: "Préférences de mesure d'audience"
    })
  ).toBeHidden();
});
