const Banner = require("../models/Banner");

const getBanners = async (req, res) => {
  try {
    const banners = await Banner.find({ isActive: true }).sort({
      order: 1,
      createdAt: 1,
    });

    return res.status(200).json({
      success: true,
      count: banners.length,
      banners,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch banners",
      error: error.message,
    });
  }
};

const getAdminBanners = async (req, res) => {
  try {
    const banners = await Banner.find().sort({ order: 1, createdAt: 1 });

    return res.status(200).json({
      success: true,
      count: banners.length,
      banners,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch banners",
      error: error.message,
    });
  }
};

const createBanner = async (req, res) => {
  try {
    const {
      image,
      publicId,
      title,
      subtitle,
      buttonText,
      buttonLink,
      order,
    } = req.body;

    if (!image) {
      return res.status(400).json({
        success: false,
        message: "Please provide a banner image",
      });
    }

    if (!title) {
      return res.status(400).json({
        success: false,
        message: "Please provide a banner title",
      });
    }

    const newBanner = new Banner({
      image,
      publicId: publicId || "",
      title,
      subtitle: subtitle || "",
      buttonText: buttonText || "",
      buttonLink: buttonLink || "",
      order: order ?? 0,
    });

    await newBanner.save();

    return res.status(201).json({
      success: true,
      message: "Banner created successfully",
      banner: newBanner,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to create banner",
      error: error.message,
    });
  }
};

const updateBanner = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      image,
      publicId,
      title,
      subtitle,
      buttonText,
      buttonLink,
      order,
      isActive,
    } = req.body;

    const banner = await Banner.findById(id);

    if (!banner) {
      return res.status(404).json({
        success: false,
        message: "Banner not found",
      });
    }

    if (image) banner.image = image;
    if (publicId !== undefined) banner.publicId = publicId;
    if (title !== undefined) banner.title = title;
    if (subtitle !== undefined) banner.subtitle = subtitle;
    if (buttonText !== undefined) banner.buttonText = buttonText;
    if (buttonLink !== undefined) banner.buttonLink = buttonLink;
    if (order !== undefined) banner.order = order;
    if (isActive !== undefined) banner.isActive = isActive;

    await banner.save();

    return res.status(200).json({
      success: true,
      message: "Banner updated successfully",
      banner,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to update banner",
      error: error.message,
    });
  }
};

const deleteBanner = async (req, res) => {
  try {
    const { id } = req.params;

    const banner = await Banner.findById(id);

    if (!banner) {
      return res.status(404).json({
        success: false,
        message: "Banner not found",
      });
    }

    await Banner.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Banner deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to delete banner",
      error: error.message,
    });
  }
};

module.exports = {
  getBanners,
  getAdminBanners,
  createBanner,
  updateBanner,
  deleteBanner,
};
