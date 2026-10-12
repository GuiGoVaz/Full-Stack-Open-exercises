const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({});
  if (blogs) {
    response.json(blogs);
  } else {
    response.status(404).end();
  }
});

blogsRouter.post("/", async (request, response) => {
  const { title, url, likes } = request.body;
  if (!title || !url) {
    return response.status(400).json({ error: "title or url missing" });
  }

  const blog = new Blog(request.body);

  if (!likes) {
    blog.likes = 0;
  }

  const savedBlog = await blog.save();
  response.status(201).json(savedBlog);
});

module.exports = blogsRouter;
