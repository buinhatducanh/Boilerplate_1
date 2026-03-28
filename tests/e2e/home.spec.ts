import { test, expect } from "@playwright/test";

test.describe("Home Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("has correct page title", async ({ page }) => {
    await expect(page).toHaveTitle(/Agency/);
  });

  test("displays header with navigation links", async ({ page }) => {
    const header = page.locator("header");
    await expect(header).toBeVisible();

    await expect(header.locator("a", { hasText: "Dịch vụ" })).toBeVisible();
    await expect(header.locator("a", { hasText: "Dự án" })).toBeVisible();
    await expect(header.locator("a", { hasText: "Liên hệ" })).toBeVisible();
  });

  test("displays footer", async ({ page }) => {
    const footer = page.locator("footer");
    await expect(footer).toBeVisible();
    await expect(footer).toContainText("All rights reserved");
  });

  test("navigates to services page", async ({ page }) => {
    await page.locator("header").locator("a", { hasText: "Dịch vụ" }).click();
    await expect(page).toHaveURL("/services");
    await expect(page.locator("h1")).toContainText("Dịch vụ");
  });

  test("navigates to contact page", async ({ page }) => {
    await page.locator("header").locator("a", { hasText: "Liên hệ" }).click();
    await expect(page).toHaveURL("/contact");
    await expect(page.locator("h1")).toContainText("Liên hệ");
  });
});
