const { test, expect, beforeEach, describe } = require("@playwright/test");

describe("Blog app", () => {
  beforeEach(async ({ page, request }) => {
    await request.post("http://localhost:3003/api/testing/reset");
    await request.post("http://localhost:3003/api/users", {
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

  describe("Login", () => {
    test("succeeds with correct credentials", async ({ page }) => {
      await page.getByLabel("username").fill("mluukkai");
      await page.getByLabel("password").fill("salainen");
      await page.getByRole("button", { name: "login" }).click();

      await expect(page.getByText("Matti Luukkainen logged in")).toBeVisible();
    });

    test("fails with wrong credentials", async ({ page }) => {
      await page.getByLabel("username").fill("mluukkai");
      await page.getByLabel("password").fill("wrong");
      await page.getByRole("button", { name: "login" }).click();

      await expect(page.getByText("wrong username or password")).toBeVisible();
      await expect(
        page.getByText("Matti Luukkainen logged in"),
      ).not.toBeVisible();
    });
  });

  describe("When logged in", () => {
    beforeEach(async ({ page }) => {
      await page.getByLabel("username").fill("mluukkai");
      await page.getByLabel("password").fill("salainen");
      await page.getByRole("button", { name: "login" }).click();
    });

    test("a new blog can be created", async ({ page }) => {
      await page.getByRole("button", { name: "create new blog" }).click();
      await page.getByLabel("title").fill("testTitle");
      await page.getByLabel("author").fill("testAuthor");
      await page.getByLabel("url").fill("testUrl.com");
      await page.getByRole("button", { name: "create" }).click();

      await expect(
        page.getByText("a new blog testTitle by testAuthor added"),
      ).toBeVisible();
      await expect(page.getByText("testTitle testAuthor")).toBeVisible();
    });

    describe("and several blogs exists", () => {
      beforeEach(async ({ page }) => {
        await createNote(page, "first note");
        await createNote(page, "second note");
      });
      test("a new blog can be created", async ({ page }) => {
        await page.getByRole("button", { name: "create new blog" }).click();
        await page.getByLabel("title").fill("testTitle");
        await page.getByLabel("author").fill("testAuthor");
        await page.getByLabel("url").fill("testUrl.com");
        await page.getByRole("button", { name: "create" }).click();

        await expect(
          page.getByText("a new blog testTitle by testAuthor added"),
        ).toBeVisible();
        await expect(page.getByText("testTitle testAuthor")).toBeVisible();
      });
    });
  });
});
