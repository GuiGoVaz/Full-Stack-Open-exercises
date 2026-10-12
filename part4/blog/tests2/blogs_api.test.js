const { test, after, beforeEach } = require("node:test");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const assert = require("node:assert");
const helper = require("./test_helper");
const Blog = require("../models/blog");

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});

  for (const blog of helper.initialBlogs) {
    const blogObject = new Blog(blog);
    await blogObject.save();
  }
});

test("identifier is id (not _id)", async () => {
  const response = await api.get("/api/blogs");

  assert("id" in response.body[0]);
});

test("all blogs are returned as json", async () => {
  const response = await api
    .get("/api/blogs")
    .expect("Content-Type", /application\/json/);

  assert.strictEqual(response.body.length, helper.initialBlogs.length);
});

test("a valid blog can be added ", async () => {
  const newBlog = {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
    likes: 5,
    __v: 0,
  };
  await api.post("/api/blogs").send(newBlog).expect(201);

  const response = await api.get("/api/blogs");

  const titles = response.body.map((r) => r.title);

  assert.strictEqual(response.body.length, helper.initialBlogs.length + 1);

  assert(titles.includes("Go To Statement Considered Harmful"));
});

/* test("a specific note is within the returned notes", async () => {
  const response = await api.get("/api/notes");

  const contents = response.body.map((e) => e.content);
  assert(contents.includes("HTML is easy"));
}); */

after(async () => {
  await mongoose.connection.close();
});
