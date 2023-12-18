import Mongoose from "mongoose";

const notificationSchema = new Mongoose.Schema({
  user_id: {
    type: String,
    required: true,
  },
  sender_id: {
    type: String,
    required: true,
  },
  receiver_id: {
    type: String,
    required: true,
  },
  booking_id: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  time_stamp: {
    type: Date,
    default: new Date(),
  },
  seen: {
    type: Number,
    default: 0,
  },
});

const Notification = Mongoose.model("Notification", notificationSchema);
export default Notification;
