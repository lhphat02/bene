import express from "express";
import db from "../db/conn.mjs";
import mongoose from "mongoose";
import { ObjectId } from "mongodb";
import Property from "../model/property.mjs";
import { verifyToken } from "../middleware/verifyToken.mjs";

const router = express.Router();

// Your route file (e.g., getAllPropertiesRoute.mjs)

router.get("/getAllProperties", verifyToken, async (req, res) => {
  try {
    let collection = await db.collection("property");
    let results = await collection.find({}).toArray();

    res.status(200).send({
      statusCode: 1,
      message: "Get all Properties successfully",
      data: results,
    });
  } catch (error) {
    console.error("Get all Properties failed:", error);
    res.status(500).send({
      statusCode: 0,
      message: "Get all Properties failed",
      data: null,
    });
  }
});

router.get("/getPropertyBySearchphase", verifyToken, async (req, res) => {
  try {
    const keyword = req.query.keyword || "";
    let collection = await db.collection("property");
    let resultsByName = await collection
      .find({ property_name: { $regex: new RegExp(keyword, "i") } })
      .toArray();
    let resultsByAddress = await collection
      .find({ address: { $regex: new RegExp(keyword, "i") } })
      .toArray();
    let results = resultsByName.concat(resultsByAddress);
    const filteredResults = results.filter(
      (item, index, self) =>
        index === self.findIndex((t) => JSON.stringify(t) === JSON.stringify(item))
    );

    res.status(200).send({
      statusCode: 1,
      message: "Get Property successfully",
      data: filteredResults,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      statusCode: 0,
      message: "Get Property failed",
      data: null,
    });
  }
});

router.get("/getPropertyById", verifyToken, async (req, res) => {
  try {
    const property_id = req.query.property_id;
    const query = { _id: new ObjectId(property_id) };
    let collection = await db.collection("property");
    let results = await collection.findOne(query);

    res.status(200).send({
      statusCode: 1,
      message: "Get Property successfully",
      data: results,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      statusCode: 0,
      message: "Get Property failed",
      data: null,
    });
  }
});

router.get("/getPropertyByUserId", verifyToken, async (req, res) => {
  try {
    const user_id = req.query.user_id;
    const query = { user_id: user_id };
    let collection = await db.collection("property");
    let results = await collection.find(query).toArray();

    res.status(200).send({
      statusCode: 1,
      message: "Get Property successfully",
      data: results,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      statusCode: 0,
      message: "Get Property failed",
      data: null,
    });
  }
});

router.post("/createProperty", verifyToken, async (req, res) => {
  try {
    // const { username, password, displayName, phoneNumber, email } = req.body;

    // Check if the username is already taken
    // const existingUser = await User.findOne({ username });
    // if (existingUser) {
    //   return res.status(400).send({
    //     statusCode: -1,
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
      req.body.image == null ||
      req.body.availability == null
    ) {
      res.status(500).send({
        statusCode: 0,
        message: "Data cannot be empty",
        data: null,
      });
    } else {
      let collection = await db.collection("property");
      const result = await collection.insertOne(newProperty);

      res.status(201).send({
        statusCode: 1,
        message: "Property created successfully",
        data: newProperty,
      });
    }
  } catch (error) {
    console.error(error);

    res.status(500).send({
      statusCode: 0,
      message: "Failed to create property",
      data: result,
    });
  }
});

router.post("/editProperty", verifyToken, async (req, res) => {
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
      image,
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
        image,
        availability,
      },
    };

    const collection = await db.collection("property");
    const result = await collection.updateOne(query, editProperty);

    res.status(200).send({
      statusCode: 1,
      message: "Property updated successfully",
      data: result,
    });
  } catch (error) {
    console.error("Error in updateProperty:", error);
    res.status(500).send({
      statusCode: 0,
      message: "Failed to update property",
      data: null,
    });
  }
});

router.post("/deleteProperty", verifyToken, async (req, res) => {
  try {
    const { property_id } = req.body;
    const query = { _id: new ObjectId(property_id) };
    const collection = await db.collection("property");
    const result = await collection.deleteOne(query);

    res.status(200).send({
      statusCode: 1,
      message: "Property deleted successfully",
      data: result,
    });
  } catch (error) {
    console.error("Error in deleteProperty:", error);
    res.status(500).send({
      statusCode: 0,
      message: "Failed to delete property",
      data: null,
    });
  }
});

export default router;
