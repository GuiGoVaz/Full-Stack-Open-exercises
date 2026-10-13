const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const middleware = require("../middleware/token");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  if (blogs) {
    response.json(blogs);
  } else {
    response.status(404).end();
  }
});

blogsRouter.post("/", middleware.userExtractor, async (request, response) => {
  const { title, url, likes } = request.body;
  if (!title || !url) {
    return response.status(400).json({ error: "title or url missing" });
  }

  //const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET);
  /* const decodedToken = jwt.verify(request.token, process.env.SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: "token invalid" });
  }
  const user = await User.findById(decodedToken.id);
  if (!user) {
    return response.status(400).json({ error: "UserId missing or not valid" });
  } */
  const user = request.user;

  const blog = new Blog(request.body);
  blog.user = user._id;

  if (!likes) {
    blog.likes = 0;
  }

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();
  response.status(201).json(savedBlog);
});

blogsRouter.put("/:id", async (request, response) => {
  const { likes } = request.body;
  const blog = await Blog.findById(request.params.id);
  if (!blog) {
    return response.status(404).end();
  }
  blog.likes = likes;
  const updatedBlog = await blog.save();
  response.json(updatedBlog);
});

blogsRouter.delete(
  "/:id",
  middleware.userExtractor,
  async (request, response) => {
    /* const decodedToken = jwt.verify(request.token, process.env.SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: "token invalid" });
  }
  const user = await User.findById(decodedToken.id);
  if (!user) {
    return response.status(400).json({ error: "UserId missing or not valid" });
  } */
    const user = request.user;
    const blog = await Blog.findById(request.params.id);
    if (!blog) {
      return response.status(400).json({ error: "Blog not found" });
    }
    if (blog.user.toString() === user._id.toString()) {
      await blog.deleteOne();
      return response.status(204).end();
    }
    return response
      .status(401)
      .json({ error: "token user isn't creator of blog to be deleted" });
  },
);

module.exports = blogsRouter;
