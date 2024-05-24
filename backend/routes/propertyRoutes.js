const express = require("express");
const router = express.Router();
const propertyController = require("../controller/propertyController");
const authenticate = require("../middleware/auth");

// Create a new property
router.post("/", authenticate, propertyController.createProperty);

// Get all properties posted by a seller
router.get("/", authenticate, propertyController.getPropertiesBySeller);

// Update a property
router.put("/:propertyId", authenticate, propertyController.updateProperty);

// Delete a property
router.delete("/:propertyId", authenticate, propertyController.deleteProperty);

// Get all properties
router.get(
  "/all-properties",
  authenticate,
  propertyController.getAllProperties
);

// Express interest in a property
router.get(
  "/:propertyId/interested",
  authenticate,
  propertyController.expressInterest
);

// Get properties with filters
router.get("/filter", authenticate, propertyController.getFilteredProperties);
router.post("/emails", authenticate, propertyController.sendEmail);
module.exports = router;
