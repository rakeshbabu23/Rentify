const mongoose = require("mongoose");
const { Schema } = mongoose;
const propertySchema = new Schema(
  {
    address: {
      type: String,
      required: [true, "Place is required"],
    },
    area: {
      type: Number,
      required: [true, "Area is required"],
    },
    numberOfBedrooms: {
      type: Number,
      required: [true, "Number of bedrooms is required"],
    },
    numberOfBathrooms: {
      type: Number,
      required: [true, "Number of bathrooms is required"],
    },
    nearbyHospitals: {
      type: [String],
      default: [],
    },
    nearbyColleges: {
      type: [String],
      default: [],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
    },
    image: {
      type: String,
    },
    seller: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Create a model from the schema
const Property = mongoose.model("Property", propertySchema);

module.exports = Property;
