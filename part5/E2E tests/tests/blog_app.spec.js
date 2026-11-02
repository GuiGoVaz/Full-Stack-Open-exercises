const { test, expect, beforeEach, describe } = require("@playwright/test");
const { createBlog, loginWith } = require("./helper");

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
    await page.getByRole("link", { name: "login" }).click();
    const locator = page.getByText("Log in to application");
    await expect(locator).toBeVisible();
    await expect(page.getByLabel("username")).toBeVisible();
    await expect(page.getByLabel("password")).toBeVisible();
    await expect(page.getByRole("button", { name: "login" })).toBeVisible();
  });

  describe("Login", () => {
    test("succeeds with correct credentials", async ({ page }) => {
      await page.getByRole("link", { name: "login" }).click();
      await loginWith(page, "mluukkai", "salainen");

      await expect(
        page.getByText("wrong username or password"),
      ).not.toBeVisible();
      await expect(page.getByText("new blog")).toBeVisible();
    });

    test("fails with wrong credentials", async ({ page }) => {
      await page.getByRole("link", { name: "login" }).click();
      await loginWith(page, "mluukkai", "wrong");

      await expect(page.getByText("wrong username or password")).toBeVisible();
      await expect(page.getByText("new blog")).not.toBeVisible();
    });
  });

  describe("When logged in", () => {
    beforeEach(async ({ page }) => {
      await page.getByRole("link", { name: "login" }).click();
      await loginWith(page, "mluukkai", "salainen");
    });

    test("a new blog can be created", async ({ page }) => {
      await createBlog(page, "testTitle1", "testAuthor1", "testUrl1.com");

      await expect(
        page.getByText("a new blog testTitle1 by testAuthor1 added"),
      ).toBeVisible();
      //await expect(page.getByText("testTitle1 by testAuthor1")).toBeVisible();
    });

    describe("and several blogs exists", () => {
      beforeEach(async ({ page }) => {
        await createBlog(page, "testTitle1", "testAuthor1", "testUrl1.com");
        await createBlog(page, "testTitle2", "testAuthor2", "testUrl2.com");
      });
      test("a new blog can be liked", async ({ page }) => {
        await page
          .getByRole("link", { name: "testTitle2 by testAuthor2" })
          .click();

        await expect(page.getByText("likes 0")).toBeVisible();
        await expect(page.getByText("likes 1")).not.toBeVisible();

        await page
          .getByText("likes 0")
          .getByRole("button", { name: "like" })
          .click();
        await expect(page.getByText("likes 1")).toBeVisible();
      });

      test("a user who created a blog can delete it", async ({ page }) => {
        await expect(page.getByText("testTitle1 by testAuthor1")).toBeVisible();
        await page
          .getByRole("link", { name: "testTitle1 by testAuthor1" })
          .click();

        page.once("dialog", async (dialog) => {
          expect(dialog.type()).toBe("confirm");
          expect(dialog.message()).toBe(
            "Remove blog testTitle1 by testAuthor1",
          );

          await dialog.accept();
        });

        await page.getByRole("button", { name: "remove" }).click();

        await expect(
          page.getByText("testTitle1 by testAuthor1"),
        ).not.toBeVisible();
      });

      test("a user can't delete someone else's blog", async ({
        //fixed after routers
        page,
        request,
      }) => {
        await request.post("http://localhost:3003/api/users", {
          data: {
            name: "Matti Luukkainen2",
            username: "mluukkai2",
            password: "salainen2",
          },
        });
        await page.getByRole("button", { name: "logout" }).click();
        await page.getByRole("link", { name: "login" }).click();
        await loginWith(page, "mluukkai2", "salainen2");

        await expect(page.getByText("testTitle1 by testAuthor1")).toBeVisible();
        await page
          .getByRole("link", { name: "testTitle1 by testAuthor1" })
          .click();

        const removeButton = await page.getByRole("button", { name: "remove" });
        await expect(removeButton).not.toBeAttached();
        const likeButton = await page.getByRole("button", { name: "like" });
        await expect(likeButton).toBeAttached();
      });

      test("blogs are arranged in the order according to the likes, with most likes first", async ({
        page,
      }) => {
        await createBlog(page, "testTitle3", "testAuthor3", "testUrl3.com");
        const blogLocator = page.locator(".blog");

        await expect(blogLocator).toHaveCount(3);
        await expect(blogLocator.nth(0)).toContainText("testTitle1");
        await expect(blogLocator.nth(1)).toContainText("testTitle2");
        await expect(blogLocator.nth(2)).toContainText("testTitle3");

        await page
          .getByText("testTitle2 testAuthor2")
          .getByRole("button", { name: "view" })
          .click();
        await page
          .getByText("likes 0")
          .getByRole("button", { name: "like" })
          .click();
        await page
          .getByText("testTitle2 testAuthor2")
          .getByRole("button", { name: "hide" })
          .click(); //like the second blog one time

        await page
          .getByText("testTitle3 testAuthor3")
          .getByRole("button", { name: "view" })
          .click();
        await page
          .getByText("likes 0")
          .getByRole("button", { name: "like" })
          .click();
        await page
          .getByText("likes 1")
          .getByRole("button", { name: "like" })
          .click();
        await page
          .getByText("testTitle3 testAuthor3")
          .getByRole("button", { name: "hide" })
          .click(); ////like the third blog two times

        await expect(blogLocator.nth(0)).toContainText("testTitle3");
        await expect(blogLocator.nth(1)).toContainText("testTitle2");
        await expect(blogLocator.nth(2)).toContainText("testTitle1");
      });
    });
  });
});
