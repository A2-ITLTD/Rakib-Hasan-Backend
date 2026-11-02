const GovernmentEnlistment = require("../models/GovernmentEnlistment");

const getOrCreateGovernmentEnlistment = async () => {
  let doc = await GovernmentEnlistment.findOne();
  if (!doc) {
    doc = await GovernmentEnlistment.create({});
  }
  return doc;
};

const getGovernmentEnlistment = async (req, res) => {
  try {
    const doc = await getOrCreateGovernmentEnlistment();
    return res.status(200).json({ success: true, governmentEnlistment: doc });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch government enlistment page",
      error: error.message,
    });
  }
};

const getAdminGovernmentEnlistment = async (req, res) => {
  try {
    const doc = await getOrCreateGovernmentEnlistment();
    return res.status(200).json({ success: true, governmentEnlistment: doc });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch government enlistment page",
      error: error.message,
    });
  }
};

const updateGovernmentEnlistment = async (req, res) => {
  try {
    const doc = await getOrCreateGovernmentEnlistment();

    if (typeof req.body.label === "string") doc.label = req.body.label;
    if (typeof req.body.heading === "string") doc.heading = req.body.heading;
    if (typeof req.body.description === "string")
      doc.description = req.body.description;

    if (Array.isArray(req.body.items)) {
      doc.items = req.body.items.map((item) => ({
        name: item.name || "",
        logo: item.logo || "",
        logoPublicId: item.logoPublicId || "",
        certificateFiles: Array.isArray(item.certificateFiles)
          ? item.certificateFiles.filter(Boolean)
          : [],
        enlisted: item.enlisted !== false,
      }));
    }

    await doc.save();

    return res.status(200).json({
      success: true,
      message: "Government enlistment page updated successfully",
      governmentEnlistment: doc,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to update government enlistment page",
      error: error.message,
    });
  }
};

module.exports = {
  getGovernmentEnlistment,
  getAdminGovernmentEnlistment,
  updateGovernmentEnlistment,
};
