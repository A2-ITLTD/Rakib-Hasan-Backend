const Portfolio = require("../models/Portfolio");

const getPortfolios = async (req, res) => {
  try {
    const { category } = req.query;

    const filter = { isActive: true };
    if (category && category !== "All") {
      filter.category = category;
    }

    const portfolios = await Portfolio.find(filter).sort({ createdAt: 1 });

    return res.status(200).json({
      success: true,
      count: portfolios.length,
      portfolios,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch portfolio items",
      error: error.message,
    });
  }
};

const getAdminPortfolios = async (req, res) => {
  try {
    const portfolios = await Portfolio.find().sort({ createdAt: 1 });

    return res.status(200).json({
      success: true,
      count: portfolios.length,
      portfolios,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch portfolio items",
      error: error.message,
    });
  }
};

const createPortfolio = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      image,
      images,
      link,
      client,
      contractNo,
      location,
      contractValue,
      status,
      completionYear,
      duration,
      teamSize,
      role,
      challenge,
      solution,
      technologies,
      features,
      result,
      metrics,
      featured,
    } = req.body;

    if (!title || !description || !category || !image) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields",
      });
    }

    const newPortfolio = new Portfolio({
      title,
      description,
      category,
      image,
      images: images || [],
      link: link || "",
      client: client || "",
      contractNo: contractNo || "",
      location: location || "",
      contractValue: contractValue || "",
      status: status || "Completed",
      completionYear: completionYear || "",
      duration: duration || "",
      teamSize: teamSize || "",
      role: role || "",
      challenge: challenge || "",
      solution: solution || "",
      technologies: technologies || [],
      features: features || [],
      result: result || "",
      metrics: metrics || [],
      featured: featured || false,
    });

    await newPortfolio.save();

    return res.status(201).json({
      success: true,
      message: "Portfolio item created successfully",
      portfolio: newPortfolio,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to create portfolio item",
      error: error.message,
    });
  }
};

const updatePortfolio = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      description,
      category,
      image,
      images,
      link,
      client,
      contractNo,
      location,
      contractValue,
      status,
      completionYear,
      duration,
      teamSize,
      role,
      challenge,
      solution,
      technologies,
      features,
      result,
      metrics,
      featured,
      isActive,
    } = req.body;

    const portfolio = await Portfolio.findById(id);

    if (!portfolio) {
      return res.status(404).json({
        success: false,
        message: "Portfolio item not found",
      });
    }

    if (title) portfolio.title = title;
    if (description) portfolio.description = description;
    if (category) portfolio.category = category;
    if (image) portfolio.image = image;
    if (images) portfolio.images = images;
    if (link) portfolio.link = link;
    if (client) portfolio.client = client;
    if (contractNo !== undefined) portfolio.contractNo = contractNo;
    if (location !== undefined) portfolio.location = location;
    if (contractValue !== undefined) portfolio.contractValue = contractValue;
    if (status) portfolio.status = status;
    if (completionYear !== undefined) portfolio.completionYear = completionYear;
    if (duration) portfolio.duration = duration;
    if (teamSize) portfolio.teamSize = teamSize;
    if (role) portfolio.role = role;
    if (challenge) portfolio.challenge = challenge;
    if (solution) portfolio.solution = solution;
    if (technologies) portfolio.technologies = technologies;
    if (features) portfolio.features = features;
    if (result) portfolio.result = result;
    if (metrics) portfolio.metrics = metrics;
    if (featured !== undefined) portfolio.featured = featured;
    if (isActive !== undefined) portfolio.isActive = isActive;

    await portfolio.save();

    return res.status(200).json({
      success: true,
      message: "Portfolio item updated successfully",
      portfolio,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to update portfolio item",
      error: error.message,
    });
  }
};

const deletePortfolio = async (req, res) => {
  try {
    const { id } = req.params;

    const portfolio = await Portfolio.findById(id);

    if (!portfolio) {
      return res.status(404).json({
        success: false,
        message: "Portfolio item not found",
      });
    }

    await Portfolio.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Portfolio item deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to delete portfolio item",
      error: error.message,
    });
  }
};

module.exports = {
  getPortfolios,
  getAdminPortfolios,
  createPortfolio,
  updatePortfolio,
  deletePortfolio,
};
