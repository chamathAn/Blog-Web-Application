const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "434324324fdsfdsfsdf"

app.use(cors(
    {
        origin: "http://localhost:5173",
        credentials: true
    }
));
app.use(express.json());

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
    jwt.sign(
      { username, id: userDoc._id },
      JWT_SECRET,
      {},
      (err, token) => {
        if (err) {
          console.error(err);
          return res.status(500).send("Internal server error");
        }
        res.cookie("auth-token", token).json("Login successful");
      }
    );
  } catch (error) {
    console.error(error);
    res.status(400).send("Login failed");
  }
});

app.listen(4000, () => {
  console.log("app listening on port 4000!");
});
