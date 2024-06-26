const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "434324324fdsfdsfsdf";
const cookieParser = require("cookie-parser");
const multer = require("multer");
const fs = require("fs");
const Post = require("./model/Post");

const upload = multer({ dest: "uploads/" });

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use("/uploads", express.static("./uploads"));
app.use(cookieParser());

mongoose
  .connect(
    "mongodb+srv://chamathanjula2:tMxY4nOqDr3ZIApi@blog-site.kqillr9.mongodb.net/?retryWrites=true&w=majority&appName=blog-site"
  )
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    const userDoc = await User.create({
      username,
      password: bcrypt.hashSync(password, 12),
    });
    res.send(userDoc);
  } catch (error) {
    console.error(error);
    res.status(400).send("Registration failed");
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const userDoc = await User.findOne({ username });
    if (!userDoc) {
      return res.status(400).send("User not found");
    }
    const passOk = bcrypt.compareSync(password, userDoc.password);
    if (!passOk) {
      return res.status(401).send("Invalid password");
    }
    jwt.sign({ username, id: userDoc._id }, JWT_SECRET, {}, (err, token) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Internal server error");
      }
      res.cookie("authToken", token).json({
        id: userDoc._id,
        username,
      });
    });
  } catch (error) {
    console.error(error);
    res.status(400).send("Login failed");
  }
});
app.post("/profile", async (req, res) => {
  const { authToken } = req.cookies;
  if (!authToken) {
    return res.status(401).send("Authentication token missing");
  }
  try {
    const decoded = await jwt.verify(authToken, JWT_SECRET);
    res.json(decoded);
  } catch (error) {
    console.error(error);
    res.status(400).send("Profile Info not found");
  }
});

app.post("/logout", async (req, res) => {
  res.cookie("authToken", "").json("logout succefully");
});

app.post("/post", upload.single("file"), async (req, res) => {
  try {
    const { authToken } = req.cookies;
    const { originalname, path } = req.file;
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    const newPath = path + "." + ext;
    fs.renameSync(path, newPath);

    const { title, summary, content } = req.body;

    const decoded = await jwt.verify(authToken, JWT_SECRET);

    const postDoc = await Post.create({
      title,
      summary,
      content,
      image: newPath,
      author: decoded.id,
    });

    res.json(postDoc);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/post", async (req, res) => {
  const posts = await Post.find()
    .populate("author", ["username"])
    .sort({ createdAt: -1 })
    .limit(20);
  res.json(posts);
});

app.post("/post/:id", async (req, res) => {
  const { id } = req.params;
  const posts = await Post.findById(id)
    .populate("author", ["username"])
    .sort({ createdAt: -1 })
    .limit(20);
  res.json(posts);
});

app.put("/post/:id/edit", upload.single("file"), async (req, res) => {
  const { id } = req.params;
  const { authToken } = req.cookies;
  const { title, summary, content } = req.body;

  if (req.file) {
    let newPath = null;
    const { originalname, path } = req.file;
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    newPath = path + "." + ext;
    fs.renameSync(path, newPath);
    try {
      const decoded = await jwt.verify(authToken, JWT_SECRET);
      const postDoc = await Post.findById(id);
   
      if (JSON.stringify(postDoc.author) == JSON.stringify( decoded.id)) {
        const posts = await postDoc.updateOne({
          title,
          summary,
          content,
          image: newPath ? newPath : postDoc.image,
        });
        res.json(posts);
      } else {
        res.status(400).send("You're not authorized");
      }
    } catch (error) {
      console.error(error);
      res.status(400).send("Server Error");
    }
  }
});
app.listen(4000, () => {
  console.log("app listening on port 4000!");
});
