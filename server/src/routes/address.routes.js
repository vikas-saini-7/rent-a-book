const express = require("express");
const router = express.Router();
const addressController = require("../controllers/address.controller");
const { authenticate } = require("../middlewares/authenticate.middleware");

// All routes require authentication
router.use(authenticate);

// Get all addresses for user
router.get("/", addressController.getAllAddresses);

// Get a specific address
router.get("/:id", addressController.getAddress);

// Create a new address
router.post("/", addressController.createAddress);

// Update an address
router.put("/:id", addressController.updateAddress);

// Delete an address
router.delete("/:id", addressController.deleteAddress);

// Set address as default
router.patch("/:id/default", addressController.setDefaultAddress);

module.exports = router;
