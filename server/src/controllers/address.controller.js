const addressService = require("../services/address.service");

/**
 * @route   GET /api/addresses
 * @desc    Get all addresses for logged-in user
 * @access  Private
 */
async function getAllAddresses(req, res, next) {
  try {
    const { id: userId } = req.user;

    const addresses = await addressService.getUserAddresses({ userId });

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
    const { id: userId } = req.user;
    const { id: addressId } = req.params;

    const address = await addressService.getAddressById({ addressId, userId });

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
    const { id: userId } = req.user;
    const {
      addressLine1,
      addressLine2,
      city,
      state,
      postalCode,
      country,
      isDefault,
    } = req.body;

    const newAddress = await addressService.createAddress({
      userId,
      addressLine1,
      addressLine2,
      city,
      state,
      postalCode,
      country,
      isDefault,
    });

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
    const { id: userId } = req.user;
    const { id: addressId } = req.params;
    const {
      addressLine1,
      addressLine2,
      city,
      state,
      postalCode,
      country,
      isDefault,
    } = req.body;

    const updatedAddress = await addressService.updateAddress({
      addressId,
      userId,
      addressLine1,
      addressLine2,
      city,
      state,
      postalCode,
      country,
      isDefault,
    });

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
    const { id: userId } = req.user;
    const { id: addressId } = req.params;

    const deletedAddress = await addressService.deleteAddress({
      addressId,
      userId,
    });

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
    const { id: userId } = req.user;
    const { id: addressId } = req.params;

    const updatedAddress = await addressService.setDefaultAddress({
      addressId,
      userId,
    });

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
