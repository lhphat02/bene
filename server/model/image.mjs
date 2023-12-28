import Mongoose from "mongoose";

const imageSchema = new Mongoose.Schema({
  property_id: {
    type: String,
    required: true,
  },
  image_name: {
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

const Image = Mongoose.model("Image", imageSchema);
export default Image;
