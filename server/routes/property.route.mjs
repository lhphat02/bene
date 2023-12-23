import express from "express";
import db from "../db/conn.mjs";
import mongoose from "mongoose";
import { ObjectId } from "mongodb";
import Property from "../model/property.mjs";
import verifyToken from "../middleware/createToken.mjs";

const router = express.Router();

router.get("/getAllProperties", verifyToken, async (req, res) => {
  try {
    if (verifyToken) {
      let collection = await db.collection("property");
      let results = await collection.find({}).toArray();

      res.status(200).send({
        resultCode: 1,
        message: "Get all Properties successfully",
        data: results,
      });
    } else {
      res.status(401).send({
        resultCode: -1,
        message: "Unauthorized: Token not provided",
      });
    }
  } catch (error) {
    console.error("Get all Properties failed:", error);
    res.status(500).send({
      resultCode: -1,
      message: "Get all Properties failed",
      data: null,
    });
  }
});

router.get("/getPropertiesByName", async (req, res) => {
  try {
    const property_name = req.body.property_name;
    let collection = await db.collection("property");
    let results = await collection
      .find({ property_name: { $regex: new RegExp(property_name, "i") } })
      .toArray();
    res.status(200).send({
      resultCode: 1,
      message: "Get Property successfully",
      data: results,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      resultCode: -1,
      message: "Get Property failed",
      data: null,
    });
  }
});

router.get("/getPropertiesByName", async (req, res) => {
  try {
    const property_name = req.body.property_name;
    let collection = await db.collection("property");
    let results = await collection
      .find({ property_name: { $regex: new RegExp(property_name, "i") } })
      .toArray();
    res.status(200).send({
      resultCode: 1,
      message: "Get Property successfully",
      data: results,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      resultCode: -1,
      message: "Get Property failed",
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

router.post("/editProperty", async (req, res) => {
  try {
    const {
      property_id,
      // user_id,
      property_name,
      description,
      address,
      price_per_night,
      max_guests,
      beds,
      bedrooms,
      size,
      long_lat,
      availability,
    } = req.body;
    console.log(req.body);
    const query = { _id: new ObjectId(property_id) };
    const editProperty = {
      $set: {
        property_name,
        // user_id,
        description,
        address,
        price_per_night,
        max_guests,
        beds,
        bedrooms,
        size,
        long_lat,
        availability,
      },
    };

    const collection = await db.collection("property");
    const result = await collection.updateOne(query, editProperty);

    res.status(200).send({
      resultCode: 1,
      message: "Property updated successfully",
      data: result,
    });
  } catch (error) {
    console.error("Error in updateProperty:", error);
    res.status(500).send({
      resultCode: -1,
      message: "Failed to update property",
      data: null,
    });
  }
});

router.post("/deleteProperty", async (req, res) => {
  try {
    const { property_id } = req.body;
    const query = { _id: new ObjectId(property_id) };
    const collection = await db.collection("property");
    const result = await collection.deleteOne(query);

    res.status(200).send({
      resultCode: 1,
      message: "Property deleted successfully",
      data: result,
    });
  } catch (error) {
    console.error("Error in deleteProperty:", error);
    res.status(500).send({
      resultCode: -1,
      message: "Failed to delete property",
      data: null,
    });
  }
});

export default router;
