import express from "express";
import db from "../db/conn.mjs";
import mongoose from "mongoose";
import Booking from "../model/booking.mjs";

const router = express.Router();
// const db = mongoose.connection;

router.get("/getAllBookings", async (req, res) => {
  try {
    let collection = await db.collection("booking");
    let results = await collection.find({}).toArray();
    res.status(200).send({
      resultCode: 1,
      message: "Get all booking successfully",
      data: results,
    });
  } catch (error) {
    res.status(500).send({
      resultCode: -1,
      message: "Get all booking failed",
      data: null,
    });
  }
});

router.post("/createBooking", async (req, res) => {
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
        resultCode: -1,
        message: "Data cannot be empty",
        data: null,
      });
    } else {
      let collection = await db.collection("booking");
      const result = await collection.insertOne(newBooking);

      res.status(201).send({
        resultCode: 1,
        message: "Booking created successfully",
        data: newBooking,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({
      resultCode: -1,
      message: "Failed to create Booking",
      data: result,
    });
  }
});

export default router;
