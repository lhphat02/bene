import { Mongoose } from "mongoose";

const userSchema = new Mongoose.Schema({
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
    type: Number,
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

export default Mongoose.model("User", userSchema);
