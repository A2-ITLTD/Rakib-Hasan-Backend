const ProjectsPage = require("../models/ProjectsPage");

const getOrCreateProjectsPage = async () => {
  let doc = await ProjectsPage.findOne();
  if (!doc) {
    doc = await ProjectsPage.create({});
  }
  return doc;
};

const getProjectsPage = async (req, res) => {
  try {
    const doc = await getOrCreateProjectsPage();
    return res.status(200).json({ success: true, projectsPage: doc });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch projects page",
      error: error.message,
    });
  }
};

const getAdminProjectsPage = async (req, res) => {
  try {
    const doc = await getOrCreateProjectsPage();
    return res.status(200).json({ success: true, projectsPage: doc });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch projects page",
      error: error.message,
    });
  }
};

const updateProjectsPage = async (req, res) => {
  try {
    const doc = await getOrCreateProjectsPage();

    if (req.body.hero && typeof req.body.hero === "object") {
      doc.hero = { ...doc.hero.toObject(), ...req.body.hero };
    }

    if (
      req.body.contractsSection &&
      typeof req.body.contractsSection === "object"
    ) {
      doc.contractsSection = {
        ...doc.contractsSection.toObject(),
        ...req.body.contractsSection,
      };
    }

    if (
      req.body.featuredSection &&
      typeof req.body.featuredSection === "object"
    ) {
      doc.featuredSection = {
        ...doc.featuredSection.toObject(),
        ...req.body.featuredSection,
      };
    }

    if (Array.isArray(req.body.stats)) {
      doc.stats = req.body.stats.map((stat) => ({
        value: Number(stat.value) || 0,
        suffix: stat.suffix ?? "+",
        label: stat.label || "",
      }));
    }

    if (Array.isArray(req.body.workCategories)) {
      doc.workCategories = req.body.workCategories.map((cat) => ({
        name: cat.name || "",
        icon: cat.icon || "Building2",
      }));
    }

    if (Array.isArray(req.body.timeline)) {
      doc.timeline = req.body.timeline.map((item) => ({
        year: item.year || "",
        label: item.label || "",
      }));
    }

    if (req.body.cta && typeof req.body.cta === "object") {
      doc.cta = { ...doc.cta.toObject(), ...req.body.cta };
    }

    await doc.save();

    return res.status(200).json({
      success: true,
      message: "Projects page updated successfully",
      projectsPage: doc,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to update projects page",
      error: error.message,
    });
  }
};

module.exports = {
  getProjectsPage,
  getAdminProjectsPage,
  updateProjectsPage,
};
