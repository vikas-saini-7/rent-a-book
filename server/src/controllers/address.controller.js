const addressService = require("../services/address.service");

/**
 * @route   GET /api/addresses
 * @desc    Get all addresses for logged-in user
 * @access  Private
 */
async function getAllAddresses(req, res, next) {
  try {
    const userId = req.user.id;
    const addresses = await addressService.getUserAddresses(userId);

    res.json({
      success: true,
      data: addresses,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * @route   GET /api/addresses/:id
 * @desc    Get a specific address
 * @access  Private
 */
async function getAddress(req, res, next) {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const address = await addressService.getAddressById(id, userId);

    if (!address) {
      return res.status(404).json({
        success: false,
        message: "Address not found",
      });
    }

    res.json({
      success: true,
      data: address,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * @route   POST /api/addresses
 * @desc    Create a new address
 * @access  Private
 */
async function createAddress(req, res, next) {
  try {
    const userId = req.user.id;
    const addressData = req.body;

    // Validate required fields
    const requiredFields = ["addressLine1", "city", "state", "postalCode"];

    for (const field of requiredFields) {
      if (!addressData[field]) {
        return res.status(400).json({
          success: false,
          message: `${field} is required`,
        });
      }
    }

    const newAddress = await addressService.createAddress(userId, addressData);

    res.status(201).json({
      success: true,
      message: "Address created successfully",
      data: newAddress,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * @route   PUT /api/addresses/:id
 * @desc    Update an address
 * @access  Private
 */
async function updateAddress(req, res, next) {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    const addressData = req.body;

    // Verify address exists and belongs to user
    const existingAddress = await addressService.getAddressById(id, userId);
    if (!existingAddress) {
      return res.status(404).json({
        success: false,
        message: "Address not found",
      });
    }

    const updatedAddress = await addressService.updateAddress(
      id,
      userId,
      addressData
    );

    res.json({
      success: true,
      message: "Address updated successfully",
      data: updatedAddress,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * @route   DELETE /api/addresses/:id
 * @desc    Delete an address
 * @access  Private
 */
async function deleteAddress(req, res, next) {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const deletedAddress = await addressService.deleteAddress(id, userId);

    if (!deletedAddress) {
      return res.status(404).json({
        success: false,
        message: "Address not found",
      });
    }

    res.json({
      success: true,
      message: "Address deleted successfully",
    });
  } catch (error) {
    next(error);
  }
}

/**
 * @route   PATCH /api/addresses/:id/default
 * @desc    Set an address as default
 * @access  Private
 */
async function setDefaultAddress(req, res, next) {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const updatedAddress = await addressService.setDefaultAddress(id, userId);

    if (!updatedAddress) {
      return res.status(404).json({
        success: false,
        message: "Address not found",
      });
    }

    res.json({
      success: true,
      message: "Default address updated successfully",
      data: updatedAddress,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getAllAddresses,
  getAddress,
  createAddress,
  updateAddress,
  deleteAddress,
  setDefaultAddress,
};
