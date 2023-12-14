import { Mongoose } from "mongoose";

const imageSchema = new Mongoose.Schema({
  property_id: {
    type: String,
    required: true,
  },
  image_url: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

export default Mongoose.model("Image", imageSchema);
