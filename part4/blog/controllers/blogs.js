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

blogsRouter.put("/:id", (request, response) => {
  const { likes } = request.body;

  Blog.findById(request.params.id).then((blog) => {
    if (!blog) {
      console.log(request.params.id);
      return response.status(404).end();
    }

    blog.likes = likes;

    return blog.save().then((updatedBlog) => {
      response.json(updatedBlog);
    });
  });
  //.catch((error) => next(error))
});

blogsRouter.delete("/:id", (request, response) => {
  Blog.findByIdAndDelete(request.params.id).then(() => {
    response.status(204).end();
  });
  //.catch((error) => next(error))
});

module.exports = blogsRouter;
