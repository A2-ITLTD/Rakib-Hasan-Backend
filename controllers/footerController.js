const Footer = require("../models/Footer");

const getOrCreateFooter = async () => {
  let footer = await Footer.findOne();
  if (!footer) {
    footer = await Footer.create({});
  }
  return footer;
};

const getFooterSection = async (req, res) => {
  try {
    const footer = await getOrCreateFooter();
    return res.status(200).json({ success: true, footer });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch footer",
      error: error.message,
    });
  }
};

const getAdminFooterSection = async (req, res) => {
  try {
    const footer = await getOrCreateFooter();
    return res.status(200).json({ success: true, footer });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch footer",
      error: error.message,
    });
  }
};

const SCALAR_FIELDS = [
  "topBandImage",
  "topBandPublicId",
  "topBandEyebrow",
  "topBandHeading",
  "topBandSubtitle",
  "logoImage",
  "logoPublicId",
  "tagline",
  "address",
  "phone",
  "email",
  "copyrightText",
];

const ARRAY_FIELDS = ["topBandButtons", "columns", "socialLinks", "legalLinks"];

const updateFooter = async (req, res) => {
  try {
    const footer = await getOrCreateFooter();

    SCALAR_FIELDS.forEach((field) => {
      if (req.body[field] !== undefined) footer[field] = req.body[field];
    });

    ARRAY_FIELDS.forEach((field) => {
      if (Array.isArray(req.body[field])) footer[field] = req.body[field];
    });

    await footer.save();

    return res.status(200).json({
      success: true,
      message: "Footer updated successfully",
      footer,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to update footer",
      error: error.message,
    });
  }
};

module.exports = { getFooterSection, getAdminFooterSection, updateFooter };
