const Property = require("../models/property.model");
const User = require("../models/user.model");
const nodemailer = require("nodemailer");
// Create a new property
exports.createProperty = async (req, res) => {
  try {
    const {
      address,
      area,
      numberOfBedrooms,
      numberOfBathrooms,
      nearbyHospitals,
      nearbyColleges,
      price,
      image,
    } = req.body;

    const sellerId = req.auth.id; // Extract seller ID from the authenticated user

    const property = new Property({
      address,
      area,
      numberOfBedrooms,
      numberOfBathrooms,
      nearbyHospitals,
      nearbyColleges,
      price,
      image,
      seller: sellerId,
    });

    const savedProperty = await property.save();

    await User.findByIdAndUpdate(sellerId, {
      $push: { properties: savedProperty._id },
    });
    res.status(201).json(savedProperty);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

// Get all properties posted by a seller
exports.getPropertiesBySeller = async (req, res) => {
  try {
    // Ensure seller ID is available
    const sellerId = req.auth && req.auth.id;
    if (!sellerId) {
      return res
        .status(400)
        .json({ error: "Seller ID is missing in the request" });
    }

    // Fetch properties from the database
    const properties = await Property.find({ seller: sellerId });

    // Respond with properties
    res.status(200).json(properties);
  } catch (error) {
    // Handle various potential errors
    if (error.name === "CastError") {
      return res.status(400).json({ error: "Invalid seller ID format" });
    }
    if (error.name === "ValidationError") {
      return res.status(400).json({ error: error.message });
    }

    // Generic error handler
    res.status(500).json({ error: "An unexpected error occurred" });
  }
};

// Update a property
exports.updateProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.propertyId);

    if (!property)
      return res.status(404).json({ message: "Property not found" });

    // Ensure that the authenticated user is the owner of the property
    if (property.seller.toString() !== req.auth.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    Object.assign(property, req.body);
    const updatedProperty = await property.save();

    res.status(200).json(updatedProperty);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a property
exports.deleteProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.propertyId);

    if (!property)
      return res.status(404).json({ message: "Property not found" });

    // Ensure that the authenticated user is the owner of the property
    if (property.seller.toString() !== req.auth.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await Property.deleteOne({ _id: req.params.propertyId });
    await User.findByIdAndUpdate(property.seller, {
      $pull: { properties: req.params.propertyId },
    });

    res.status(200).json({ message: "Property deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all properties
exports.getAllProperties = async (req, res) => {
  try {
    const { page = 1, limit = 4 } = req.query;
    const properties = await Property.find()
      .skip((page - 1) * limit)
      .limit(parseInt(limit));
    const total = await Property.countDocuments();
    res.status(200).json({
      properties,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Express interest in a property
exports.expressInterest = async (req, res) => {
  try {
    const property = await Property.findById(req.params.propertyId).populate(
      "seller"
    );
    if (property) {
      res.status(200).json({
        sellerDetails: {
          name: `${property.seller.firstName} ${property.seller.lastName}`,
          email: property.seller.email,
          phoneNumber: property.seller.phoneNumber,
          sellerId: property.seller._id,
        },
      });
    } else {
      res.status(404).json({ message: "Property not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get properties with filters
exports.getFilteredProperties = async (req, res) => {
  try {
    let { minPrice, maxPrice, numberOfBathrooms, numberOfBedrooms } = req.query;

    // Convert query parameters to appropriate types
    minPrice = minPrice > 0 ? Number(minPrice) : -Infinity;
    maxPrice = maxPrice > 0 ? Number(maxPrice) : Infinity;

    // Construct query object
    const query = {};

    if (numberOfBathrooms) {
      if (numberOfBathrooms === "5+") {
        query.numberOfBathrooms = { $gte: 5 };
      } else {
        query.numberOfBathrooms = Number(numberOfBathrooms) || { $gte: 0 };
      }
    }

    if (numberOfBedrooms) {
      if (numberOfBedrooms === "5+") {
        query.numberOfBedrooms = { $gte: 5 };
      } else {
        query.numberOfBedrooms = Number(numberOfBedrooms) || { $gte: 0 };
      }
    }

    if (minPrice !== -Infinity || maxPrice !== Infinity) {
      query.price = {};
      if (minPrice !== -Infinity) {
        query.price.$gte = minPrice;
      }
      if (maxPrice !== Infinity) {
        query.price.$lte = maxPrice;
      }
    }

    // Fetch properties matching the query
    const properties = await Property.find(query);

    // Send response
    res.status(200).json({ properties });
  } catch (error) {
    console.error("Error fetching properties:", error);
    res.status(400).json({ error: error.message });
  }
};

const transporter = nodemailer.createTransport({
  service: "gmail", // or any other email service
  auth: {
    user: process.env.EMAIL_USER, // Your email address
    pass: process.env.EMAIL_PASS, // Your email password
  },
});
exports.sendEmail = async (req, res) => {
  const buyerId = req.auth;
  const { sellerId, propertyId } = req.body;

  try {
    const buyerDetails = await User.findById(buyerId.id);
    if (!buyerDetails) {
      return res.status(404).json({ message: "Buyer not found" });
    }

    const sellerDetails = await User.findById(sellerId);
    if (!sellerDetails) {
      return res.status(404).json({ message: "Seller not found" });
    }

    const propertyDetails = await Property.findById(propertyId);
    if (!propertyDetails) {
      return res.status(404).json({ message: "Property details not found" });
    }

    const buyerName = `${buyerDetails.firstName} ${buyerDetails.lastName}`;
    const buyerEmail = buyerDetails.email;
    const buyerPhoneNumber = buyerDetails.phoneNumber;

    const sellerName = `${sellerDetails.firstName} ${sellerDetails.lastName}`;
    const sellerEmail = sellerDetails.email;
    const sellerPhoneNumber = sellerDetails.phoneNumber;

    const propertyInfo = `
      Address: ${propertyDetails.address}
      Area: ${propertyDetails.area} sq.ft
      Number of Bedrooms: ${propertyDetails.numberOfBedrooms}
      Number of Bathrooms: ${propertyDetails.numberOfBathrooms}
      Nearby Hospitals: ${propertyDetails.nearbyHospitals.join(", ")}
      Nearby Colleges: ${propertyDetails.nearbyColleges.join(", ")}
      Price: ${propertyDetails.price}
      Image: ${propertyDetails.image}
    `;

    const mailOptionsToBuyer = {
      from: process.env.EMAIL_USER,
      to: buyerEmail,
      subject: "Seller and Property Details",
      text: `Seller Name: ${sellerName}
Seller Email: ${sellerEmail}
Seller Phone: ${sellerPhoneNumber}

Property Details:
${propertyInfo}`,
    };

    const mailOptionsToSeller = {
      from: process.env.EMAIL_USER,
      to: sellerEmail,
      subject: "Someone is interested in your property",
      text: `Buyer Name: ${buyerName}
Buyer Email: ${buyerEmail}
Buyer Phone: ${buyerPhoneNumber}

Interested Property Details:
${propertyInfo}`,
    };

    await transporter.sendMail(mailOptionsToBuyer);
    await transporter.sendMail(mailOptionsToSeller);

    res.status(200).send("Emails sent successfully");
  } catch (error) {
    console.error("Error sending emails:", error);
    res.status(500).send("Error sending emails");
  }
};
