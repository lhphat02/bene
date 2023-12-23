import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  displayName: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  registration_date: {
    type: Date,
    default: Date.now,
  },
  deactivated: {
    type: Number,
    default: 0,
  },
});

const User = mongoose.model("User", userSchema);

export default User;
