const Spotlight = require("../models/Spotlight");

const getOrCreateSpotlight = async () => {
  let spotlight = await Spotlight.findOne();
  if (!spotlight) {
    spotlight = await Spotlight.create({});
  }
  return spotlight;
};

const getSpotlight = async (req, res) => {
  try {
    const spotlight = await getOrCreateSpotlight();
    return res.status(200).json({ success: true, spotlight });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch spotlight",
      error: error.message,
    });
  }
};

const getAdminSpotlight = async (req, res) => {
  try {
    const spotlight = await getOrCreateSpotlight();
    return res.status(200).json({ success: true, spotlight });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch spotlight",
      error: error.message,
    });
  }
};

const SCALAR_FIELDS = [
  "image",
  "publicId",
  "quote",
  "name",
  "designation",
  "profileLink",
];

const updateSpotlight = async (req, res) => {
  try {
    const spotlight = await getOrCreateSpotlight();

    SCALAR_FIELDS.forEach((field) => {
      if (req.body[field] !== undefined) spotlight[field] = req.body[field];
    });

    await spotlight.save();

    return res.status(200).json({
      success: true,
      message: "Spotlight updated successfully",
      spotlight,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to update spotlight",
      error: error.message,
    });
  }
};

module.exports = { getSpotlight, getAdminSpotlight, updateSpotlight };
