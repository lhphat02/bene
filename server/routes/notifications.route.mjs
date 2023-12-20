import express from 'express';
import db from '../db/conn.mjs';
import mongoose from 'mongoose';
import Notification from '../model/notifications.mjs';

const router = express.Router();
// const db = mongoose.connection;

router.get('/getAllNotificaitons', async (req, res) => {
  try {
    let collection = await db.collection('notification');
    let results = await collection.find({}).toArray();
    res.status(200).send({
      resultCode: 1,
      message: 'Get all notification successfully',
      data: results,
    });
  } catch (error) {
    res.status(500).send({
      resultCode: -1,
      message: 'Get all notification failed',
      data: null,
    });
  }
});

router.post('/createNotification', async (req, res) => {
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
        resultCode: -1,
        message: 'Data cannot be empty',
        data: null,
      });
    } else {
      let collection = await db.collection('notification');
      const result = await collection.insertOne(newNotification);

      res.status(201).send({
        resultCode: 1,
        message: 'Notification created successfully',
        data: newNotification,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({
      resultCode: -1,
      message: 'Failed to create Notification',
      data: result,
    });
  }
});

export default router;
