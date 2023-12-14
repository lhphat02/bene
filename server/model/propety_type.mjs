import { Mongoose } from "mongoose";

const propertyTypeSchema = new Mongoose.Schema({
  property_type: {
    type: String,
    required: true,
    unique: true,
  },
});

export default Mongoose.model("PropertyType", propertyTypeSchema);
