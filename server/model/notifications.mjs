import Mongoose from "mongoose";

const notificationSchema = new Mongoose.Schema({
  user_id: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  time_stamp: {
    type: Date,
    default: Date.now,
  },
});

const Notification = Mongoose.model("Notification", notificationSchema);
export default Notification;
