const LegalPage = require("../models/LegalPage");

const getOrCreateLegalPage = async () => {
  let legalPage = await LegalPage.findOne();
  if (!legalPage) {
    legalPage = await LegalPage.create({});
  }
  return legalPage;
};

const getLegalPage = async (req, res) => {
  try {
    const legalPage = await getOrCreateLegalPage();
    return res.status(200).json({ success: true, legalPage });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch legal page content",
      error: error.message,
    });
  }
};

const getAdminLegalPage = async (req, res) => {
  try {
    const legalPage = await getOrCreateLegalPage();
    return res.status(200).json({ success: true, legalPage });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch legal page content",
      error: error.message,
    });
  }
};

const updateLegalPage = async (req, res) => {
  try {
    const legalPage = await getOrCreateLegalPage();
    const { privacyPolicy, termsOfService } = req.body;

    if (privacyPolicy) {
      if (privacyPolicy.title !== undefined) {
        legalPage.privacyPolicy.title = privacyPolicy.title;
      }
      if (privacyPolicy.content !== undefined) {
        legalPage.privacyPolicy.content = privacyPolicy.content;
      }
    }

    if (termsOfService) {
      if (termsOfService.title !== undefined) {
        legalPage.termsOfService.title = termsOfService.title;
      }
      if (termsOfService.content !== undefined) {
        legalPage.termsOfService.content = termsOfService.content;
      }
    }

    await legalPage.save();

    return res.status(200).json({
      success: true,
      message: "Legal page content updated successfully",
      legalPage,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to update legal page content",
      error: error.message,
    });
  }
};

module.exports = {
  getLegalPage,
  getAdminLegalPage,
  updateLegalPage,
};
