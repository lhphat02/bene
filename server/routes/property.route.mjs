import express from "express";
import db from "../db/conn.mjs";
import mongoose from "mongoose";
import Property from "../model/property.mjs";

const router = express.Router();
// const db = mongoose.connection;

router.get("/getAllProperties", async (req, res) => {
  try {
    let collection = await db.collection("property");
    let results = await collection.find({}).toArray();
    res.status(200).send({
      resultCode: 1,
      message: "Get all Property successfully",
      data: results,
    });
  } catch (error) {
    res.status(500).send({
      resultCode: -1,
      message: "Get all Property failed",
      data: null,
    });
  }
});

router.post("/createProperty", async (req, res) => {
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

    const newProperty = new Property(req.body);
    if (
      req.body.user_id == null ||
      req.body.property_name == null ||
      req.body.description == null ||
      req.body.address == null ||
      req.body.price_per_night == null ||
      req.body.max_guests == null ||
      req.body.beds == null ||
      req.body.bedrooms == null ||
      req.body.size == null ||
      req.body.long_lat == null ||
      req.body.availability == null
    ) {
      res.status(500).send({
        resultCode: -1,
        message: "Data cannot be empty",
        data: null,
      });
    } else {
      let collection = await db.collection("property");
      const result = await collection.insertOne(newProperty);

      res.status(201).send({
        resultCode: 1,
        message: "Property created successfully",
        data: newProperty,
      });
    }
  } catch (error) {
    console.error(error);
    
    res.status(500).send({
      resultCode: -1,
      message: "Failed to create property",
      data: result,
    });
  }
});

export default router;
