const _ = require("lodash");

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  const total = blogs.reduce((sum, blog) => sum + blog.likes, 0);
  return total;
};

const favoriteBlog = (blogs) => {
  return blogs.length
    ? blogs.reduce((highest, current) =>
        current.likes > highest.likes ? current : highest,
      )
    : null;
};

const mostBlogs = (blogs) => {
  const [mostRepeatedAuthor, count] = _(blogs)
    .countBy("author")
    .toPairs()
    .maxBy(([author, count]) => count) || [null, 0];

  return { author: mostRepeatedAuthor, blogs: count };
};

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return {
      author: null,
      likes: 0,
    };
  }

  return (topUser = _(blogs)
    .groupBy("author")
    .map((group, author) => ({ author, likes: _.sumBy(group, "likes") }))
    .maxBy("likes"));
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
