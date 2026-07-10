import { expect, test } from "@playwright/test";

test.describe("parcours outils RH", () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      window.localStorage.setItem("ruptureconv_analytics_consent", "denied");
    });
  });

  test("rupture conventionnelle vers simulateur chômage ARE", async ({ page }) => {
    await page.goto("/");

    await expect(
      page.getByRole("heading", { name: "Simulez votre indemnité" })
    ).toBeVisible();

    await page.getByLabel("Date d'entrée").fill("2021-05-01");
    await page.getByLabel("Date de rupture").fill("2026-05-04");
    await page.getByLabel("Salaire brut mensuel").fill("2800");

    await expect(page.getByText("Résultat estimé instantanément")).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Que vérifier après votre estimation ?" })
    ).toBeVisible();

    const unemploymentLink = page.getByRole("link", {
      name: /Estimer mes droits au chômage/
    });

    await expect(unemploymentLink).toBeVisible();
    await Promise.all([
      page.waitForURL(/\/simulateur-chomage-rupture-conventionnelle$/),
      unemploymentLink.click()
    ]);
    await expect(
      page.getByRole("heading", {
        name: "Simulateur chômage ARE après rupture conventionnelle"
      })
    ).toBeVisible();
  });

  test("simulateur chômage ARE vers délai de carence", async ({ page }) => {
    await page.goto("/simulateur-chomage-rupture-conventionnelle");

    await expect(
      page.getByRole("heading", {
        name: "Simulateur chômage ARE après rupture conventionnelle"
      })
    ).toBeVisible();
    await expect(page.getByText("Estimation prudente")).toBeVisible();

    await expect(page.getByText("Estimation mensuelle indicative")).toBeVisible();
    await expect(
      page.getByRole("heading", { name: /Délais avant paiement/ })
    ).toBeVisible();

    const delayLink = page.getByRole("main").getByRole("link", {
      name: "Délai de carence chômage"
    });

    await expect(delayLink).toBeVisible();
    await delayLink.click();

    await expect(page).toHaveURL(/\/delai-de-carence-chomage$/);
    await expect(
      page.getByRole("heading", {
        name: /Délai de carence chômage/
      })
    ).toBeVisible();
  });

  test("salaire brut-net vers rupture conventionnelle", async ({ page }) => {
    await page.goto("/salaire-brut-net");

    await expect(
      page.getByRole("heading", { name: "Calcul salaire brut en net" })
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Indiquez votre salaire brut" })
    ).toBeVisible();

    await page.getByLabel("Montant du salaire brut").fill("3200");

    await expect(page.getByText("Net mensuel estimé")).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "À vérifier avec ce montant" })
    ).toBeVisible();

    const terminationLink = page.getByRole("link", {
      name: /Estimer une indemnité de rupture/
    });

    await expect(terminationLink).toBeVisible();
    await terminationLink.click();

    await expect(page).toHaveURL(/\/simulateur-rupture-conventionnelle$/);
    await expect(
      page.getByRole("heading", { name: /Simulateur de rupture conventionnelle/ })
    ).toBeVisible();
    await expect(page.getByLabel("Salaire brut mensuel")).toBeVisible();
  });

  test("le header mobile ne crée pas de débordement horizontal", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");

    const header = page.getByRole("banner");

    await expect(
      header.getByRole("link", { name: "Rupture-Conv, retour à l'accueil" })
    ).toBeVisible();
    await expect(header.getByRole("button", { name: "Ouvrir le menu" })).toBeVisible();

    const hasHorizontalOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth > window.innerWidth
    );

    expect(hasHorizontalOverflow).toBe(false);
  });
});
