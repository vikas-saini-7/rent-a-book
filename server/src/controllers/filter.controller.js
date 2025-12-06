const {
  getFilterOptionsService,
  getAllGenresService,
} = require("../services/filter.service.js");

/**
 * Get all available filter options
 */
exports.getFilterOptions = async (req, res, next) => {
  try {
    const options = await getFilterOptionsService();

    res.status(200).json({
      success: true,
      message: "Filter options fetched successfully",
      data: options,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get all genres with book count
 */
exports.getAllGenres = async (req, res, next) => {
  try {
    const genresData = await getAllGenresService();

    res.status(200).json({
      success: true,
      message: "Genres fetched successfully",
      data: genresData,
    });
  } catch (error) {
    next(error);
  }
};
