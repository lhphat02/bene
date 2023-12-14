import { Mongoose } from "mongoose";

const propertySchema = new Mongoose.Schema({
  user_id: {
    type: String,
    required: true,
  },
  property_name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  price_per_night: {
    type: Number,
    required: true,
  },
  max_guests: {
    type: Number,
    required: true,
  },
  beds: {
    type: Number,
    required: true,
  },
  bedrooms: {
    type: Number,
    required: true,
  },
  size: {
    type: Number,
    required: true,
  },
  long_lat: {
    type: String,
    required: true,
  },
  availability: {
    type: Number,
    default: 1,
  },
});

export default Mongoose.model("Property", propertySchema);
