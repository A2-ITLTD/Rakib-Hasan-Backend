const JoinUs = require("../models/JoinUs");

const getOrCreateJoinUs = async () => {
  let joinUs = await JoinUs.findOne();
  if (!joinUs) {
    joinUs = await JoinUs.create({});
  }
  return joinUs;
};

const getJoinUs = async (req, res) => {
  try {
    const joinUs = await getOrCreateJoinUs();
    return res.status(200).json({ success: true, joinUs });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch join us section",
      error: error.message,
    });
  }
};

const getAdminJoinUs = async (req, res) => {
  try {
    const joinUs = await getOrCreateJoinUs();
    return res.status(200).json({ success: true, joinUs });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch join us section",
      error: error.message,
    });
  }
};

const SCALAR_FIELDS = ["title", "description", "buttonText", "buttonLink"];

const updateJoinUs = async (req, res) => {
  try {
    const joinUs = await getOrCreateJoinUs();

    SCALAR_FIELDS.forEach((field) => {
      if (req.body[field] !== undefined) joinUs[field] = req.body[field];
    });

    if (Array.isArray(req.body.cards)) {
      joinUs.cards = req.body.cards.map((card) => ({
        image: card.image || "",
        publicId: card.publicId || "",
        label: card.label || "",
        link: card.link || "",
      }));
    }

    await joinUs.save();

    return res.status(200).json({
      success: true,
      message: "Join Us section updated successfully",
      joinUs,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to update join us section",
      error: error.message,
    });
  }
};

module.exports = { getJoinUs, getAdminJoinUs, updateJoinUs };
