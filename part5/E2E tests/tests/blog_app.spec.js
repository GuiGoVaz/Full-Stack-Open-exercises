const { test, expect, beforeEach, describe } = require("@playwright/test");

describe("Blog app", () => {
  beforeEach(async ({ page, request }) => {
    await request.post("http://localhost:3001/api/testing/reset");
    await request.post("http://localhost:3001/api/users", {
      data: {
        name: "Matti Luukkainen",
        username: "mluukkai",
        password: "salainen",
      },
    });

    await page.goto("http://localhost:5173");
  });

  test("Login form is shown", async ({ page }) => {
    const locator = page.getByText("Log in to application");
    await expect(locator).toBeVisible();
    await expect(page.getByLabel("username")).toBeVisible();
    await expect(page.getByLabel("password")).toBeVisible();
    await expect(page.getByRole("button", { name: "login" })).toBeVisible();
  });
});

/* describe("Login", () => {
  test.only("succeeds with correct credentials", async ({ page }) => {
    await page.getByLabel("username").fill("mluukkai");
    await page.getByLabel("password").fill("salainen");
    await page.getByRole("button", { name: "login" }).click();

    await expect(page.getByText("Matti Luukkainen logged in")).toBeVisible();
  });

   test('fails with wrong credentials', async ({ page }) => {
      
    }) 
}); */

//test.only
