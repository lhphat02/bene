import express from "express";
import db from "../db/conn.mjs";
import mongoose from "mongoose";
import User from "../model/user.mjs";

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

export default router;
