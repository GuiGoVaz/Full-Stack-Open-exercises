const createNote = async (page, content) => {
  await page.getByRole("button", { name: "create new blog" }).click();
  await page.getByLabel("title").fill("testTitle");
  await page.getByLabel("author").fill("testAuthor");
  await page.getByLabel("url").fill("testUrl.com");
  await page.getByRole("button", { name: "create" }).click();
};

export { createBlog };
