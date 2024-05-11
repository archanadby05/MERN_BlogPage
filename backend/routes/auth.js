const express = require("express");
const router = express.Router();
const User = require("../model/user");
const bcrypt = require("bcrypt");

//register

router.post("/register", async (req, res) => {
  try {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    // Log the req.body to inspect data being sent
    console.log("Received registration request:", req.body);

    const savedUser = await newUser.save();
    res.status(200).json(savedUser);
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


// login

router.post("/login", async (req, res) => {
    try {
      const user = await User.findOne({ username: req.body.username })
      //if no user
      !user && res.status(400).json("Wrong Credntials!")
  
      //if same user then compare password
      const validate = await bcrypt.compare(req.body.password, user.password)
      //if not validate
      !validate && res.status(400).json("Wrong Credentials!")
  
      const { password, ...other } = user._doc
      res.status(200).json(other)
    } catch (error) {
      res.status(500).json(error)
    }
  })


module.exports = router;
