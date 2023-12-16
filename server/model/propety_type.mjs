import Mongoose from "mongoose";

const propertyTypeSchema = new Mongoose.Schema({
  property_type: {
    type: String,
    required: true,
    unique: true,
  },
});

const PropertyType = Mongoose.model("PropertyType", propertyTypeSchema);
export default PropertyType;
