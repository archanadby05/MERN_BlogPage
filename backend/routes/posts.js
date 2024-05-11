const router = require("express").Router();
const Post = require("../model/post");

//create post
router.post("/", async (req, res) => {
    const newPost = new Post(req.body)
    try {
      const savePost = await newPost.save()
      res.status(200).json(savePost)
    } catch (error) {
      res.status(500).json(error)
    }
  })

  // update post
router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    if (post.username === req.body.username) {
      try {
        const updatePost = await Post.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        )
        res.status(200).json(updatePost)
      } catch (error) {
        res.status(500).json(error)
      }
    } else {
      res.status(401).json("You can update only your post!")
    }
  } catch (error) {
    res.status(500).json(error)
  }
})

// delete
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    if (post.username === req.body.username) {
      try {
        await post.delete()
        res.status(200).json("Post Has been delete!")
      } catch (error) {
        res.status(500).json(error)
      }
    } else {
      res.status(401).json("You can delete only your post!")
    }
  } catch (error) {
    res.status(500).json(error)
  }
})

// get post
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    res.status(200).json(post)
  } catch (error) {
    res.status(404).json(error)
  }
})


// Get all posts
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find();
    // console.log("The data returned:");
    // console.log(posts);

    res.setHeader('Content-Type', 'application/json'); // Set content type to JSON
    res.status(200).json(posts); // Send JSON response with posts array
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ message: "Failed to fetch posts", error });
  }
});



module.exports = router;
