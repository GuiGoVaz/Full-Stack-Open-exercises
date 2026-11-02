const createBlog = async (page, title, author, url) => {
<<<<<<< HEAD
  await page.getByRole("button", { name: "create new blog" }).click();
=======
  await page.getByRole("link", { name: "new blog" }).click();
>>>>>>> draft
  await page.getByLabel("title").fill(title);
  await page.getByLabel("author").fill(author);
  await page.getByLabel("url").fill(url);
  await page.getByRole("button", { name: "create" }).click();
<<<<<<< HEAD
  await page.getByRole("button", { name: "cancel" }).click();
  await page.getByText(`${title} ${author}`).waitFor();
=======
  await page.getByText(`a new blog ${title} by ${author} added`).waitFor();
>>>>>>> draft
};

const loginWith = async (page, username, password) => {
  await page.getByLabel("username").fill(username);
  await page.getByLabel("password").fill(password);
  await page.getByRole("button", { name: "login" }).click();
};

export { createBlog, loginWith };
