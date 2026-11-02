const Service = require("../models/Service");
const ServiceCategory = require("../models/ServiceCategory");

const normalizeCategory = (value) =>
  String(value || "")
    .trim()
    .toLowerCase();

const ensureServiceCategory = async (category) => {
  const normalizedCategory = normalizeCategory(category);

  if (!normalizedCategory) return null;

  const existing = await ServiceCategory.findOne({ name: normalizedCategory });

  if (existing) return existing;

  const displayName = normalizedCategory
    .split(/[-_\s]+/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  const categoryDoc = new ServiceCategory({
    name: normalizedCategory,
    displayName: displayName || normalizedCategory,
  });

  await categoryDoc.save();
  return categoryDoc;
};

const getServices = async (req, res) => {
  try {
    const { category } = req.query;

    const filter = { isActive: true };
    if (category && category !== "all") filter.category = category;

    const services = await Service.find(filter).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: services.length,
      services,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch services",
      error: error.message,
    });
  }
};

const getAdminServices = async (req, res) => {
  try {
    const services = await Service.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: services.length,
      services,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch services",
      error: error.message,
    });
  }
};

const createService = async (req, res) => {
  try {
    const {
      title,
      description,
      icon,
      features,
      category,
      path,
      color,
      image,
      images,
      details,
      process: processSteps,
      stats,
      sections,
      blockOrder,
    } = req.body;

    if (!title || !description || !icon || !features || !category || !path) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields",
      });
    }

    const newService = new Service({
      title,
      description,
      icon,
      features,
      category,
      path,
      color: color || "bg-[#0066ff]",
      image: image || "",
      images: Array.isArray(images) ? images : [],
      details: details || "",
      process: Array.isArray(processSteps) ? processSteps : [],
      stats: Array.isArray(stats) ? stats : [],
      sections: Array.isArray(sections) ? sections : [],
      blockOrder: Array.isArray(blockOrder) ? blockOrder : undefined,
    });

    await newService.save();
    await ensureServiceCategory(category);

    return res.status(201).json({
      success: true,
      message: "Service created successfully",
      service: newService,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to create service",
      error: error.message,
    });
  }
};

const updateService = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      description,
      icon,
      features,
      category,
      path,
      color,
      image,
      images,
      details,
      process: processSteps,
      stats,
      sections,
      blockOrder,
      isActive,
    } = req.body;

    const service = await Service.findById(id);

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    if (title) service.title = title;
    if (description) service.description = description;
    if (icon) service.icon = icon;
    if (features) service.features = features;
    if (category) service.category = category;
    if (path) service.path = path;
    if (color) service.color = color;
    if (image !== undefined) service.image = image;
    if (images !== undefined) service.images = Array.isArray(images) ? images : [];
    if (details !== undefined) service.details = details;
    if (processSteps !== undefined)
      service.process = Array.isArray(processSteps) ? processSteps : [];
    if (stats !== undefined) service.stats = Array.isArray(stats) ? stats : [];
    if (sections !== undefined)
      service.sections = Array.isArray(sections) ? sections : [];
    if (blockOrder !== undefined && Array.isArray(blockOrder))
      service.blockOrder = blockOrder;
    if (isActive !== undefined) service.isActive = isActive;

    await service.save();
    if (category) {
      await ensureServiceCategory(category);
    }

    return res.status(200).json({
      success: true,
      message: "Service updated successfully",
      service,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to update service",
      error: error.message,
    });
  }
};

const deleteService = async (req, res) => {
  try {
    const { id } = req.params;

    const service = await Service.findById(id);

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    await Service.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Service deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to delete service",
      error: error.message,
    });
  }
};

module.exports = {
  getServices,
  getAdminServices,
  createService,
  updateService,
  deleteService,
};
