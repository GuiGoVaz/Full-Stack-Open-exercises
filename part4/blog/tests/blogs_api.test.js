const { test, after, beforeEach } = require("node:test");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const assert = require("node:assert");
const helper = require("./test_helper");
const Blog = require("../models/blog");
const jwt = require("jsonwebtoken");

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

  const userResponse = await api.get("/api/users");
  const userForToken = {
    username: userResponse.body[0].username,
    id: userResponse.body[0].id,
  };

  const token = jwt.sign(userForToken, process.env.SECRET);

  await api
    .post("/api/blogs")
    .set("Authorization", `Bearer ${token}`)
    .send(newBlog)
    .expect(201);

  const response = await api.get("/api/blogs");

  const titles = response.body.map((r) => r.title);

  assert.strictEqual(response.body.length, helper.initialBlogs.length + 1);

  assert(titles.includes("Go To Statement Considered Harmful"));
});

test("with likes properties missing is set to 0", async () => {
  const newBlog = {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
    __v: 0,
  };

  const userResponse = await api.get("/api/users");
  const userForToken = {
    username: userResponse.body[0].username,
    id: userResponse.body[0].id,
  };

  const token = jwt.sign(userForToken, process.env.SECRET);

  await api
    .post("/api/blogs")
    .set("Authorization", `Bearer ${token}`)
    .send(newBlog)
    .expect(201);

  const response = await api.get("/api/blogs");

  const sentBlog = response.body.find((blog) => blog.id === newBlog._id);

  assert.strictEqual(sentBlog.likes, 0);
});

test("without title or url receives 400 Bad Request", async () => {
  const newBlog1 = {
    _id: "5a422aa71b54a676234d17f8",
    //title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
    likes: 5,
    __v: 0,
  };
  const newBlog2 = {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    //url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
    likes: 5,
    __v: 0,
  };

  const userResponse = await api.get("/api/users");
  const userForToken = {
    username: userResponse.body[0].username,
    id: userResponse.body[0].id,
  };

  const token = jwt.sign(userForToken, process.env.SECRET);

  await api
    .post("/api/blogs")
    .set("Authorization", `Bearer ${token}`)
    .send(newBlog1)
    .expect(400);
  await api
    .post("/api/blogs")
    .set("Authorization", `Bearer ${token}`)
    .send(newBlog2)
    .expect(400);
});

test("update likes", async () => {
  const update = {
    likes: 5,
  };
  const response = await api
    .put("/api/blogs/5a422a851b54a676234d17f7")
    .send(update)
    .expect(200);

  const updatedBlog = response.body;

  assert.strictEqual(updatedBlog.likes, 5);
});

test("delete specific blog", async () => {
  const newBlog = {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
    likes: 5,
    __v: 0,
  };

  const userResponse = await api.get("/api/users");
  const userForToken = {
    username: userResponse.body[0].username,
    id: userResponse.body[0].id,
  };

  const token = jwt.sign(userForToken, process.env.SECRET);

  await api
    .post("/api/blogs")
    .set("Authorization", `Bearer ${token}`)
    .send(newBlog)
    .expect(201);

  await api
    .delete("/api/blogs/5a422aa71b54a676234d17f8")
    .set("Authorization", `Bearer ${token}`)
    .expect(204);

  const response = await api.get("/api/blogs");

  const ids = response.body.map((blog) => blog.id);

  assert(!ids.includes("5a422aa71b54a676234d17f8"));

  assert.strictEqual(response.body.length, helper.initialBlogs.length); //the one deleted was also added now
});

after(async () => {
  await mongoose.connection.close();
});
