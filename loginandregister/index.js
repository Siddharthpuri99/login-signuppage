import express from "express";
import cors from "cors";
import mongoose from "mongoose";

const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());
mongoose.connect(
  "mongodb://127.0.0.1:27017/myappo",
  {
    // useNewUrlParser:true,
    // usefiedTopology:true
  },
  (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Db connected");
    }
  }
);
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});
const User = new mongoose.model("User", userSchema);

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email: email }, (err, user) => {
    if (user) {
      if (password === user.password) {
        res.send({ message: "Login Successfully", user: user });
      } else {
        res.send({ message: "Password Invalid" });
      }
    } else {
      res.send({ message: "User not registered" });
    }
  });
});
app.post("/register", (req, res) => {
  const { name, email, password } = req.body;
  User.findOne({ email: email }, (err, user) => {
    if (user) {
      res.send("User Already Exist");
    } else {
      const user = new User({
        name,
        email,
        password,
      });
      user.save((err) => {
        if (err) {
          res.send(err);
        } else {
          res.send({ message: "Successfully register" });
        }
      });
    }
  });
});
app.listen(8000, () => {
  console.log("BE started At port 8000");
});
