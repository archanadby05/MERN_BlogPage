const express = require("express");
const cors = require('cors');
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");

const authRoute = require("./routes/auth");
const authUser = require("./routes/user");
const authPost = require("./routes/posts");
const authCat = require("./routes/categories");
const initializeCategoriesAndPosts = require("./routes/dataInit");

require('dotenv').config();
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/images", express.static(path.join(__dirname, "/images")));

app.use((req, res, next) => {
  res.setHeader("Content-Type", "application/json");
  next();
});

mongoose
  .connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log("Connected to MongoDB");

    // Initialize categories and posts upon MongoDB connection
    await initializeCategoriesAndPosts();

    const storage = multer.diskStorage({
      destination: (req, file, callback) => {
        callback(null, "images");
      },
      filename: (req, file, callback) => {
        callback(null, file.originalname);
      },
    });

    const upload = multer({ storage: storage });

    app.post("/upload", upload.single("file"), (req, res) => {
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }
      res.status(200).json({ message: "File has been uploaded" });
    });

    app.use("/auth", authRoute);
    app.use("/users", authUser);
    app.use("/posts", authPost);
    app.use("/categories", authCat);

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Backend running on port ${PORT}`);
    });
  })
  .catch((err) => console.error("MongoDB connection error:", err));
