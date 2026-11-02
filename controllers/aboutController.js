const AboutPage = require("../models/AboutPage");

const getOrCreateAboutPage = async () => {
  let about = await AboutPage.findOne();
  if (!about) {
    about = await AboutPage.create({});
  }
  return about;
};

const getAboutPage = async (req, res) => {
  try {
    const about = await getOrCreateAboutPage();
    return res.status(200).json({ success: true, about });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch about page",
      error: error.message,
    });
  }
};

const getAdminAboutPage = async (req, res) => {
  try {
    const about = await getOrCreateAboutPage();
    return res.status(200).json({ success: true, about });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch about page",
      error: error.message,
    });
  }
};

const NESTED_FIELDS = ["whoWeAre", "mission", "vision", "ourStory"];

const updateAboutPage = async (req, res) => {
  try {
    const about = await getOrCreateAboutPage();

    NESTED_FIELDS.forEach((field) => {
      if (req.body[field] && typeof req.body[field] === "object") {
        about[field] = { ...about[field].toObject(), ...req.body[field] };
      }
    });

    if (Array.isArray(req.body.boardOfDirectors)) {
      about.boardOfDirectors = req.body.boardOfDirectors.map((member) => ({
        image: member.image || "",
        publicId: member.publicId || "",
        name: member.name || "",
        title: member.title || "",
        speech: member.speech || "",
      }));
    }

    if (Array.isArray(req.body.awards)) {
      about.awards = req.body.awards.map((award) => ({
        image: award.image || "",
        publicId: award.publicId || "",
        title: award.title || "",
        description: award.description || "",
      }));
    }

    await about.save();

    return res.status(200).json({
      success: true,
      message: "About page updated successfully",
      about,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to update about page",
      error: error.message,
    });
  }
};

module.exports = { getAboutPage, getAdminAboutPage, updateAboutPage };
