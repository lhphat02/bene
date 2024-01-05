import express from "express";
import db from "../db/conn.mjs";
import mongoose from "mongoose";
import Booking from "../model/booking.mjs";
import { ObjectId } from "mongodb";
import { verifyToken } from "../middleware/verifyToken.mjs";
import Notification from "../model/notifications.mjs";

const router = express.Router();
// const db = mongoose.connection;

router.get("/getAllBookings", verifyToken, async (req, res) => {
  try {
    let collection = await db.collection("booking");
    let results = await collection.find({}).toArray();
    res.status(200).send({
      statusCode: 1,
      message: "Get all booking successfully",
      data: results,
    });
  } catch (error) {
    res.status(500).send({
      statusCode: 0,
      message: "Get all booking failed",
      data: null,
    });
  }
});

router.post("/createBooking", verifyToken, async (req, res) => {
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

    const newBooking = new Booking(req.body);
    if (
      req.body.user_id == null ||
      req.body.property_id == null ||
      req.body.check_in_date == null ||
      req.body.check_out_date == null ||
      req.body.guests == null ||
      req.body.total_price == null ||
      //   req.body.booking_date == null ||
      req.body.booking_status == null
    ) {
      res.status(500).send({
        statusCode: 0,
        message: "Data cannot be empty",
        data: null,
      });
    } else {
      let collection = await db.collection("booking");
      const result = await collection.insertOne(newBooking);

      res.status(201).send({
        statusCode: 1,
        message: "Booking created successfully",
        data: newBooking,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({
      statusCode: 0,
      message: "Failed to create Booking",
      data: result,
    });
  }
});

router.post("/updateBooking", verifyToken, async (req, res) => {
  try {
    const {
      booking_id,
      booking_status,
    } = req.body;

    const booking = {
      $set: {
        booking_date: new Date(),
        booking_status,
      },
    };

    if (booking_id == null) {
      res.status(500).send({
        statusCode: 0,
        message: "Booking ID cannot be empty",
        data: null,
      });
    } else {
      const query = { _id: new ObjectId(booking_id) };

      let collection = await db.collection("booking");
      const result = await collection.updateOne(query, booking);

      res.status(201).send({
        statusCode: 1,
        message: "Booking updated successfully",
        data: result,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({
      statusCode: 0,
      message: "Failed to update booking",
      data: result,
    });
  }
});

router.post("/deleteBooking", verifyToken, async (req, res) => {
  try {
    const { booking_id } = req.body;

    if (booking_id == null) {
      res.status(500).send({
        statusCode: 0,
        message: "Booking ID cannot be empty",
        data: null,
      });
    } else {
      const query = { _id: new ObjectId(booking_id) };

      let collection = await db.collection("booking");
      const result = await collection.deleteOne(query);

      res.status(201).send({
        statusCode: 1,
        message: "Booking deleted successfully",
        data: result,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({
      statusCode: 0,
      message: "Failed to delete booking",
      data: result,
    });
  }
});

async function getUserByPropertyId(propertyId) {
  let collection = await db.collection("property");
  const property = await collection.findOne({ _id: new ObjectId(propertyId) });
  return property ? property.user_id : null;
}

router.post("/createBookingWithNoti", verifyToken, async (req, res) => {
  try {
    const newBooking = new Booking(req.body);

    // Your existing validation code...

    let collection = await db.collection("booking");
    const result = await collection.insertOne(newBooking);


    const receiverId = await getUserByPropertyId(req.body.property_id);
    console.log('receiverId: ',receiverId);

    const newNotification = new Notification({
      user_id: receiverId, 
      sender_id: req.body.user_id, 
      receiver_id: receiverId, 
      booking_id: newBooking._id, 
      message: "New reservation available",
    });


    let notiCollection = await db.collection("notification");
    const notiResult = await notiCollection.insertOne(newNotification);

    res.status(201).send({
      statusCode: 1,
      message: "Booking created successfully",
      dataBooking: newBooking,
      dataNotification: newNotification,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      statusCode: 0,
      message: "Failed to create Booking",
      data: null,
    });
  }
});

router.get("/getBookingById", verifyToken, async (req, res) => {
  try {
    const booking_id = req.query.booking_id;
    const query = { _id: new ObjectId(booking_id) };
    console.log(query);
    let collection = await db.collection("booking");
    let results = await collection.findOne(query);

    res.status(200).send({
      statusCode: 1,
      message: "Get Booking successfully",
      data: results,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      statusCode: 0,
      message: "Get Booking failed",
      data: null,
    });
  }
});

router.get("/getBookingByUserIdPropId", verifyToken, async (req, res) => {
  try {
    const user_id = req.query.user_id;
    const property_id = req.query.property_id;
    const query = { user_id: user_id, property_id: property_id };
    console.log(query);
    let collection = await db.collection("booking");
    let results = await collection.findOne(query);

    res.status(200).send({
      statusCode: 1,
      message: "Get Booking successfully",
      data: results,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      statusCode: 0,
      message: "Get Booking failed",
      data: null,
    });
  }
});



export default router;
