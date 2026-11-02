const ClientShowcaseSettings = require("../models/ClientShowcaseSettings");

const getOrCreateClientShowcaseSettings = async () => {
  let settings = await ClientShowcaseSettings.findOne();
  if (!settings) {
    settings = await ClientShowcaseSettings.create({});
  }
  return settings;
};

const getClientShowcaseSettings = async (req, res) => {
  try {
    const settings = await getOrCreateClientShowcaseSettings();
    return res.status(200).json({ success: true, settings });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch client showcase settings",
      error: error.message,
    });
  }
};

const getAdminClientShowcaseSettings = async (req, res) => {
  try {
    const settings = await getOrCreateClientShowcaseSettings();
    return res.status(200).json({ success: true, settings });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch client showcase settings",
      error: error.message,
    });
  }
};

const SCALAR_FIELDS = ["description"];

const updateClientShowcaseSettings = async (req, res) => {
  try {
    const settings = await getOrCreateClientShowcaseSettings();

    SCALAR_FIELDS.forEach((field) => {
      if (req.body[field] !== undefined) settings[field] = req.body[field];
    });

    await settings.save();

    return res.status(200).json({
      success: true,
      message: "Client showcase settings updated successfully",
      settings,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to update client showcase settings",
      error: error.message,
    });
  }
};

module.exports = {
  getClientShowcaseSettings,
  getAdminClientShowcaseSettings,
  updateClientShowcaseSettings,
};
