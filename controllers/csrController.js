const CSR = require("../models/CSR");

const getOrCreateCSR = async () => {
  let doc = await CSR.findOne();
  if (!doc) {
    doc = await CSR.create({});
  }
  return doc;
};

const getCSR = async (req, res) => {
  try {
    const doc = await getOrCreateCSR();
    return res.status(200).json({ success: true, csr: doc });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch CSR page",
      error: error.message,
    });
  }
};

const getAdminCSR = async (req, res) => {
  try {
    const doc = await getOrCreateCSR();
    return res.status(200).json({ success: true, csr: doc });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch CSR page",
      error: error.message,
    });
  }
};

const updateCSR = async (req, res) => {
  try {
    const doc = await getOrCreateCSR();

    if (typeof req.body.label === "string") doc.label = req.body.label;
    if (typeof req.body.heading === "string") doc.heading = req.body.heading;
    if (typeof req.body.description === "string")
      doc.description = req.body.description;

    if (req.body.chairman && typeof req.body.chairman === "object") {
      doc.chairman = {
        image: req.body.chairman.image || "",
        imagePublicId: req.body.chairman.imagePublicId || "",
        name: req.body.chairman.name || "",
        designation: req.body.chairman.designation || "",
        message: req.body.chairman.message || "",
      };
    }

    await doc.save();

    return res.status(200).json({
      success: true,
      message: "CSR page updated successfully",
      csr: doc,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to update CSR page",
      error: error.message,
    });
  }
};

module.exports = {
  getCSR,
  getAdminCSR,
  updateCSR,
};
