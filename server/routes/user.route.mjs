import express from "express";
import db from "../db/conn.mjs";
import mongoose from "mongoose";
import User from "../model/user.mjs";
import bcrypt from "bcrypt";
import { ObjectId } from "mongodb";

const router = express.Router();
// const db = mongoose.connection;

router.get("/getAllUsers", async (req, res) => {
  try {
    let collection = await db.collection("users");
    let results = await collection.find({}).toArray();
    res.status(200).send({
      resultCode: 1,
      message: "Get all users successfully",
      data: results,
    });
  } catch (error) {
    res.status(500).send({
      resultCode: -1,
      message: "Get all users failed",
      data: null,
    });
  }
});

router.post("/createUser", async (req, res) => {
  try {
    // const { username, password, displayName, phoneNumber, email } = req.body;

    // Check if the username is already taken
    // const existingUser = await User.findOne({ username });
    // if (existingUser) {
    //   return res.status(400).send({
    //     resultCode: -1,
    //     message: "Username is already taken",
    //     data: null,
    //   });
    // }

    // Create a new user using the User model
    // const newUser = new User({
    //   username,
    //   password,
    //   displayName,
    //   phoneNumber,
    //   email,
    // });

    const newUser = new User(req.body);
    if (
      req.body.username == null ||
      req.body.password == null ||
      req.body.displayName == null ||
      req.body.phoneNumber == null ||
      req.body.email == null
    ) {
      res.status(500).send({
        resultCode: -1,
        message: "Data cannot be empty",
        data: null,
      });
    } else {
      newUser.password = await bcrypt.hash(newUser.password, 10);
      let collection = await db.collection("users");
      const result = await collection.insertOne(newUser);

      res.status(201).send({
        resultCode: 1,
        message: "User created successfully",
        data: newUser,
      });
    }
    // Save the new user to the database
  } catch (error) {
    console.error(error);
    res.status(500).send({
      resultCode: -1,
      message: "Failed to create user",
      data: result,
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const collection = await db.collection("users");
    const user = await collection.findOne({ username: req.body.username });
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        // user.token = createToken(user._id);
        res.status(200).send({
          resultCode: 1,
          message: "Login successfully",
          data: user,
        });
      } else {
        res.status(400).send({
          resultCode: -1,
          message: "Login failed",
        });
      }
    }
  } catch (error) {
    console.error("Login Failed:", error);
    res.status(500).send({
      resultCode: -1,
      message: "Login failed",
    });
  }
});

router.post("/updateUser", async (req, res) => {
  try {
    const { user_id, password, displayName, phoneNumber, email, deactivated } =
      req.body;
    const newPassword = await bcrypt.hash(password, 10);
    const query = { _id: new ObjectId(user_id) };
    const update = {
      $set: {
        password: newPassword,
        displayName,
        phoneNumber,
        email,
        deactivated,
      },
    };

    const collection = await db.collection("users");
    const result = await collection.updateOne(query, update);

    res.status(200).send({
      resultCode: 1,
      message: "Update user successfully",
      data: result,
    });
  } catch (error) {
    console.error("Update user failed:", error);
    res.status(500).send({
      resultCode: -1,
      message: "Update user failed",
    });
  }
});

export default router;
