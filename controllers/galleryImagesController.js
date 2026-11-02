const GalleryImage = require("../models/GalleryImage");

const getGalleryImages = async (req, res) => {
  try {
    const images = await GalleryImage.find({ isActive: true }).sort({
      order: 1,
      createdAt: 1,
    });

    return res.status(200).json({
      success: true,
      count: images.length,
      images,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch gallery images",
      error: error.message,
    });
  }
};

const getAdminGalleryImages = async (req, res) => {
  try {
    const images = await GalleryImage.find().sort({ order: 1, createdAt: 1 });

    return res.status(200).json({
      success: true,
      count: images.length,
      images,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch gallery images",
      error: error.message,
    });
  }
};

const createGalleryImage = async (req, res) => {
  try {
    const { image, publicId, title, category, order, batchId } = req.body;

    if (!image) {
      return res.status(400).json({
        success: false,
        message: "Please provide a gallery image",
      });
    }

    if (!title) {
      return res.status(400).json({
        success: false,
        message: "Please provide a title",
      });
    }

    const newImage = new GalleryImage({
      image,
      publicId: publicId || "",
      title,
      category: category || "",
      batchId: batchId || "",
      order: order ?? 0,
    });

    await newImage.save();

    return res.status(201).json({
      success: true,
      message: "Gallery image created successfully",
      image: newImage,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to create gallery image",
      error: error.message,
    });
  }
};

const updateGalleryImage = async (req, res) => {
  try {
    const { id } = req.params;
    const { image, publicId, title, category, order, isActive, batchId } =
      req.body;

    const item = await GalleryImage.findById(id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Gallery image not found",
      });
    }

    if (image) item.image = image;
    if (publicId !== undefined) item.publicId = publicId;
    if (title !== undefined) item.title = title;
    if (category !== undefined) item.category = category;
    if (batchId !== undefined) item.batchId = batchId;
    if (order !== undefined) item.order = order;
    if (isActive !== undefined) item.isActive = isActive;

    await item.save();

    return res.status(200).json({
      success: true,
      message: "Gallery image updated successfully",
      image: item,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to update gallery image",
      error: error.message,
    });
  }
};

const deleteGalleryImage = async (req, res) => {
  try {
    const { id } = req.params;

    const item = await GalleryImage.findById(id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Gallery image not found",
      });
    }

    await GalleryImage.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Gallery image deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to delete gallery image",
      error: error.message,
    });
  }
};

module.exports = {
  getGalleryImages,
  getAdminGalleryImages,
  createGalleryImage,
  updateGalleryImage,
  deleteGalleryImage,
};
