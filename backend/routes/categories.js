const router = require("express").Router();
const Category = require("../model/category");

router.post("/", async (req, res) => {
  const newCat = new Category(req.body)
  try {
    const savedCat = await newCat.save()
    res.status(200).json(savedCat)
  } catch (error) {
    res.status(500).json(error)
  }
})

// Get all categories
router.get("/", async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;