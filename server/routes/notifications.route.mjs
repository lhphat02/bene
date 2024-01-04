import express from "express";
import db from "../db/conn.mjs";
import mongoose from "mongoose";
import Notification from "../model/notifications.mjs";
import { ObjectId } from "mongodb";
import { verifyToken } from "../middleware/verifyToken.mjs";

const router = express.Router();
// const db = mongoose.connection;

router.get("/getAllNotificaitons", verifyToken, async (req, res) => {
  try {
    let collection = await db.collection("notification");
    let results = await collection.find({}).toArray();
    res.status(200).send({
      statusCode: 1,
      message: "Get all notification successfully",
      data: results,
    });
  } catch (error) {
    res.status(500).send({
      statusCode: 0,
      message: "Get all notification failed",
      data: null,
    });
  }
});

router.post("/createNotification", verifyToken, async (req, res) => {
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

    const newNotification = new Notification(req.body);
    if (
      req.body.user_id == null ||
      req.body.sender_id == null ||
      req.body.receiver_id == null ||
      req.body.booking_id == null ||
      req.body.message == null
      // req.body.time_stamp == null
    ) {
      res.status(500).send({
        statusCode: 0,
        message: "Data cannot be empty",
        data: null,
      });
    } else {
      let collection = await db.collection("notification");
      const result = await collection.insertOne(newNotification);

      res.status(201).send({
        statusCode: 1,
        message: "Notification created successfully",
        data: newNotification,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({
      statusCode: 0,
      message: "Failed to create Notification",
      data: result,
    });
  }
});

router.get("/getNotificationByUserId", verifyToken, async (req, res) => {
  try {
    const userId = req.query.user_id || 0;
    const query = { user_id: userId };

    let collection = await db.collection("notification");
    let results = await collection.find(query).toArray();

    console.log(results);

    res.status(200).send({
      statusCode: 1,
      message: "Get notification by id successfully",
      data: results,
    });
  } catch (error) {
    res.status(500).send({
      statusCode: 0,
      message: "Get notification by id failed",
      data: null,
    });
  }
});

router.post("/updateNotification", verifyToken, async (req, res) => {
  try {
    const { noti_id, seen } = req.body;

    const query = { _id: new ObjectId(noti_id) };
    const update = {
      $set: {
        seen: seen,
      },
    };

    let collection = await db.collection("notification");
    let results = await collection.updateOne(query, update);

    res.status(200).send({
      statusCode: 1,
      message: "Update notification successfully",
    });
  } catch (error) {
    res.status(500).send({
      statusCode: 0,
      message: "Update notification failed",
      data: null,
    });
  }
});

export default router;
