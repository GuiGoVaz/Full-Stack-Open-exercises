const { test, expect, beforeEach, describe } = require("@playwright/test");

describe("Blog app", () => {
  beforeEach(async ({ page }) => {
    await page.goto("http://localhost:5173");
  });

  test("Login form is shown", async ({ page }) => {
    await expect(page.getByText("Log in to application")).toBeVisible();
    await expect(page.getByText("username")).toBeVisible();
    await expect(page.getByText("password")).toBeVisible();
    await expect(page.getByText("login")).toBeVisible();
  });
});

test("front page can be opened", async ({ page }) => {
  await page.goto("http://localhost:5173");

  const locator = page.getByText("Notes");
  await expect(locator).toBeVisible();
  await expect(
    page.getByText(
      "Note app, Department of Computer Science, University of Helsinki 2024",
    ),
  ).toBeVisible();
});
