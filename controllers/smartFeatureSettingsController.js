const SmartFeatureSettings = require("../models/SmartFeatureSettings");

const getOrCreateSmartFeatureSettings = async () => {
  let settings = await SmartFeatureSettings.findOne();
  if (!settings) {
    settings = await SmartFeatureSettings.create({});
  }
  return settings;
};

const getSmartFeatureSettings = async (req, res) => {
  try {
    const settings = await getOrCreateSmartFeatureSettings();
    return res.status(200).json({ success: true, settings });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch smart feature settings",
      error: error.message,
    });
  }
};

const SCALAR_FIELDS = ["eyebrow", "title", "titleAccent"];

const updateSmartFeatureSettings = async (req, res) => {
  try {
    const settings = await getOrCreateSmartFeatureSettings();

    SCALAR_FIELDS.forEach((field) => {
      if (req.body[field] !== undefined) settings[field] = req.body[field];
    });

    await settings.save();

    return res.status(200).json({
      success: true,
      message: "Smart feature settings updated successfully",
      settings,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to update smart feature settings",
      error: error.message,
    });
  }
};

module.exports = {
  getSmartFeatureSettings,
  updateSmartFeatureSettings,
};
