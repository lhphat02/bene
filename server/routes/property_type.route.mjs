import express from "express";
import db from "../db/conn.mjs";
import mongoose from "mongoose";
import PropertyType from "../model/propety_type.mjs";
import { verifyToken } from "../middleware/verifyToken.mjs";

const router = express.Router();
// const db = mongoose.connection;

router.get("/getAllPropertyTypes", verifyToken, async (req, res) => {
  try {
    let collection = await db.collection("property_type");
    let results = await collection.find({}).toArray();
    res.status(200).send({
      statusCode: 1,
      message: "Get all property_type successfully",
      data: results,
    });
  } catch (error) {
    res.status(500).send({
      statusCode: 0,
      message: "Get all property_type failed",
      data: null,
    });
  }
});

router.post("/createPropertyType", verifyToken, async (req, res) => {
  try {
    // const { username, password, displayName, phoneNumber, email } = req.body;

    // Check if the username is already taken
    // const existingUser = await User.findOne({ username });
    // if (existingUser) {
    //   return res.status(400).send({
    //     statusCode: 0,
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

    const newPropertyType = new PropertyType(req.body);
    if (req.body.property_type == null) {
      res.status(500).send({
        statusCode: 0,
        message: "Data cannot be empty",
        data: null,
      });
    } else {
      let collection = await db.collection("property_type");
      const result = await collection.insertOne(newPropertyType);

      res.status(201).send({
        statusCode: 1,
        message: "PropertyType created successfully",
        data: newPropertyType,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({
      statusCode: 0,
      message: "Failed to create PropertyType",
      data: result,
    });
  }
});

export default router;
