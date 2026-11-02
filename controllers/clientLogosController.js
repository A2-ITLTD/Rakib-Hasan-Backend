const ClientLogo = require("../models/ClientLogo");

const getClientLogos = async (req, res) => {
  try {
    const logos = await ClientLogo.find({ isActive: true }).sort({
      order: 1,
      createdAt: 1,
    });

    return res.status(200).json({
      success: true,
      count: logos.length,
      logos,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch client logos",
      error: error.message,
    });
  }
};

const getAdminClientLogos = async (req, res) => {
  try {
    const logos = await ClientLogo.find().sort({ order: 1, createdAt: 1 });

    return res.status(200).json({
      success: true,
      count: logos.length,
      logos,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch client logos",
      error: error.message,
    });
  }
};

const createClientLogo = async (req, res) => {
  try {
    const { image, publicId, order } = req.body;

    if (!image) {
      return res.status(400).json({
        success: false,
        message: "Please provide a logo image",
      });
    }

    const newLogo = new ClientLogo({
      image,
      publicId: publicId || "",
      order: order ?? 0,
    });

    await newLogo.save();

    return res.status(201).json({
      success: true,
      message: "Client logo created successfully",
      logo: newLogo,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to create client logo",
      error: error.message,
    });
  }
};

const updateClientLogo = async (req, res) => {
  try {
    const { id } = req.params;
    const { image, publicId, order, isActive } = req.body;

    const logo = await ClientLogo.findById(id);

    if (!logo) {
      return res.status(404).json({
        success: false,
        message: "Client logo not found",
      });
    }

    if (image) logo.image = image;
    if (publicId !== undefined) logo.publicId = publicId;
    if (order !== undefined) logo.order = order;
    if (isActive !== undefined) logo.isActive = isActive;

    await logo.save();

    return res.status(200).json({
      success: true,
      message: "Client logo updated successfully",
      logo,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to update client logo",
      error: error.message,
    });
  }
};

const deleteClientLogo = async (req, res) => {
  try {
    const { id } = req.params;

    const logo = await ClientLogo.findById(id);

    if (!logo) {
      return res.status(404).json({
        success: false,
        message: "Client logo not found",
      });
    }

    await ClientLogo.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Client logo deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to delete client logo",
      error: error.message,
    });
  }
};

module.exports = {
  getClientLogos,
  getAdminClientLogos,
  createClientLogo,
  updateClientLogo,
  deleteClientLogo,
};
