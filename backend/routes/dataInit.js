const Category = require("../model/category");
const Post = require("../model/post");
const { category, blog } = require("../assets/data/data");

async function initializeCategoriesAndPosts() {
  try {
    // Initialize categories
    const existingCategories = await Category.find();
    if (existingCategories.length === 0) {
      console.log("Initializing categories...");
      await Category.insertMany(category);
      console.log("Categories initialized successfully.");
    } else {
      console.log("Categories already exist in the database.");
    }

    // Initialize posts
    const existingPosts = await Post.find();
    if (existingPosts.length === 0) {
      console.log("Initializing posts...");
      await Post.insertMany(blog);
      console.log("Posts initialized successfully.");
    } else {
      console.log("Posts already exist in the database.");
    }
  } catch (error) {
    console.error("Error initializing categories and posts:", error);
  }
}

module.exports = initializeCategoriesAndPosts;
