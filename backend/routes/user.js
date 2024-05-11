const express = require("express");
const router = express.Router();
const User = require("../model/user");
const Post = require("../model/post");
const bcrypt = require("bcrypt");

//update
router.put("/:id", async (req, res) => {
  try {
    if (req.body.userId !== req.params.id) {
      return res.status(401).json("You are not authorized to update this account");
    }

    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error during user update:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Delete
router.delete("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const { userId } = req.body;
  
      if (userId !== id) {
        return res.status(401).json("You can delete only your account");
      }
  
      const user = await User.findById(id);
  
      if (!user) {
        return res.status(404).json("User not found");
      }
  
      await Post.deleteMany({ username: user.username });
  
      await User.findByIdAndDelete(id);
  
      res.status(200).json("User and associated posts have been deleted");
    } catch (error) {
      console.error("Error during user deletion:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  
  // get user

  router.get("/:id", async (req, res) => {
    try {
      const user = await User.findById(req.params.id)
      const { password, ...other } = user._doc
      res.status(200).json(other)
    } catch (error) {
      res.status(400).json(error)
    }
  })
  
  module.exports = router;