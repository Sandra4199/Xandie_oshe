const mongoose = require("mongoose");
const userModel = require("../model/User");
const blogModel = require("../model/Blog");

exports.getAllBlogs = async (req, res, next) => {
  let blogs;
  try {
    blogs = await blogModel.find().populate("user");
  } catch (err) {
    return console.log(err);
  }
  if (!blogs) {
    return res.status(404).json({ message: "No Blogs Found" });
  }
  return res.status(200).json({ blogs });
};

exports.addBlog = async (req, res, next) => {
  console.log(req.body);
  const { title, description, image, user } = req.body;
  let existingUser;
  try {
    existingUser = await userModel.findById(user);
  } catch (err) {
    return res.status(500).json({ message: "Unable create blog" });
  }
  if (!existingUser) {
    return res.status(404).json({ message: "Unable To Find User By This Id" });
  }

  const blog = new blogModel({
    title,
    description,
    image,
    user,
  });
  try {
    const session = await mongoose.startSession();
    session.startTransaction();

    existingUser.blogs.push(blog._id);

    await blog.save({ session });
    await existingUser.save({ session });

    await session.commitTransaction();
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err });
  }
  return res.status(200).json({ blog });
};

exports.updateBlog = async (req, res, next) => {
  const { title, description } = req.body;
  const blogId = req.params.id;
  let blog;
  try {
    blog = await blogModel.findByIdAndUpdate(blogId, {
      title,
      description,
    });
  } catch (err) {
    return console.log(err);
  }
  if (!blog) {
    return res.status(500).json({ message: "Unable To Update Blog" });
  }
  return res.status(200).json({ blog });
};

exports.getById = async (req, res, next) => {
  const id = req.params.id;
  let blog;
  try {
    blog = await blogModel.findById(id);
  } catch (err) {
    return console.log(err);
  }
  if (!blog) {
    return res.status(404).json({ message: "No Blog Found" });
  }
  return res.status(200).json({ blog });
};

exports.deleteBlog = async (req, res, next) => {
  const id = req.params.id;

  let blog;
  try {
    blog = await blogModel.findByIdAndRemove(id).populate("user");
    await blog.user.blogs.pull(blog);
    await blog.user.save();
  } catch (err) {
    console.log(err);
  }
  if (!blog) {
    return res.status(500).json({ message: "Unable To Delete" });
  }
  return res.status(200).json({ message: "Succesfully Deleted" });
};

exports.getByUserId = async (req, res, next) => {
  const userId = req.params.id;
  let userBlogs;
  try {
    userBlogs = await userModel.findById(userId).populate("blogs");
  } catch (err) {
    return console.log(err);
  }
  if (!userBlogs) {
    return res.status(404).json({ message: "No Blog Found" });
  }
  return res.status(200).json({ blogs: userBlogs });
};
