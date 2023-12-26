import express from "express";
import db from "../db/conn.mjs";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { ObjectId } from "mongodb";
import { verifyToken } from "../middleware/verifyToken.mjs";

import User from "../model/user.mjs";
import createToken from "../middleware/createToken.mjs";

const router = express.Router();
// const db = mongoose.connection;

router.get("/getAllUsers", async (req, res) => {
  try {
    let collection = await db.collection("users");
    let results = await collection.find({}).toArray();
    res.status(200).send({
      statusCode: 1,
      message: "Get all users successfully",
      data: results,
    });
  } catch (error) {
    res.status(500).send({
      statusCode: 0,
      message: "Get all users failed",
      data: null,
    });
  }
});
// de commit th

router.get("/getUserById", async (req, res) => {
  try {
    let collection = await db.collection("users");
    const query = { _id: new ObjectId(req.body.user_id) };
    let results = await collection.findOne(query);
    res.status(200).send({
      statusCode: 1,
      message: "Get user by id successfully",
      data: results,
    });
  } catch (error) {
    res.status(500).send({
      statusCode: 0,
      message: "Get user by id failed",
      data: null,
    });
  }
});

router.post("/createUser", async (req, res) => {
  try {
    const { username, email } = req.body;
    let collection = await db.collection("users");
    // Check if the username is already taken
    const existingUser = await collection.findOne({ username: username });
    const existingEmail = await collection.findOne({ email: email });
    if (existingUser || existingEmail) {
      return res.status(400).send({
        statusCode: 0,
        message:
          "User is already existed, please check username or email again",
        data: null,
      });
    }

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
        statusCode: 0,
        message: "Data cannot be empty",
        data: null,
      });
    } else {
      newUser.password = await bcrypt.hash(newUser.password, 10);
      let collection = await db.collection("users");
      const result = await collection.insertOne(newUser);

      res.status(201).send({
        statusCode: 1,
        message: "User created successfully",
        data: newUser,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({
      statusCode: 0,
      message: "Failed to create user",
      data: result,
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const collection = await db.collection("users");
    const user = await collection.findOne({ username: req.body.username });
    console.log("user:", user);
    if (user === null) {
      res.status(400).send({
        statusCode: 0,
        message: "User not found",
      });
    } else {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        user.token = createToken(user._id);

        res.status(200).send({
          statusCode: 1,
          message: "Login successfully",
          data: {
            id: user._id,
            username: user.username,
            displayName: user.displayName,
            phoneNumber: user.phoneNumber,
            email: user.email,
            deactivated: user.deactivated,
            registration_date: user.registration_date,
            token: user.token,
          },
        });
      } else {
        res.status(400).send({
          statusCode: 0,
          message: "Wrong password",
        });
      }
    }
    return user;
  } catch (error) {
    console.error("Login Failed:", error);
    res.status(500).send({
      statusCode: 0,
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
      statusCode: 1,
      message: "Update user successfully",
      data: result,
    });
  } catch (error) {
    console.error("Update user failed:", error);
    res.status(500).send({
      statusCode: 0,
      message: "Update user failed",
    });
  }
});

export default router;
