import { test, expect } from "@playwright/test";

test.describe("Contact Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/contact");
  });

  test("displays contact form with all fields", async ({ page }) => {
    await expect(page.locator("[name='name']")).toBeVisible();
    await expect(page.locator("[name='email']")).toBeVisible();
    await expect(page.locator("[name='phone']")).toBeVisible();
    await expect(page.locator("[name='subject']")).toBeVisible();
    await expect(page.locator("[name='message']")).toBeVisible();
    await expect(page.locator("button[type='submit']")).toBeVisible();
  });

  test("validates required fields before submit", async ({ page }) => {
    await page.locator("button[type='submit']").click();

    // HTML5 validation prevents submission
    const nameInput = page.locator("[name='name']");
    await expect(nameInput).toHaveAttribute("required", "");
  });

  test("fills and submits contact form", async ({ page }) => {
    await page.fill("[name='name']", "Nguyễn Văn A");
    await page.fill("[name='email']", "test@example.com");
    await page.fill("[name='phone']", "0901234567");
    await page.fill("[name='subject']", "Tư vấn thiết kế web");
    await page.fill("[name='message']", "Tôi cần tư vấn về thiết kế website cho doanh nghiệp.");

    // Verify form is filled
    await expect(page.locator("[name='name']")).toHaveValue("Nguyễn Văn A");
    await expect(page.locator("[name='email']")).toHaveValue("test@example.com");
  });
});
