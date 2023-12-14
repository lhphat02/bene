import { Mongoose } from "mongoose";

const bookingSchema = new Mongoose.Schema({
  user_id: {
    type: String,
    required: true,
  },
  property_id: {
    type: String,
    required: true,
  },
  check_in_date: {
    type: Date,
    required: true,
  },
  check_out_date: {
    type: Date,
    required: true,
  },
  guests: {
    type: Number,
    required: true,
  },
  total_price: {
    type: Number,
    required: true,
  },
  booking_date: {
    type: Date,
    default: Date.now,
  },
  booking_status: {
    type: String,
    default: "pending",
  },
});

export default Mongoose.model("Booking", bookingSchema);
