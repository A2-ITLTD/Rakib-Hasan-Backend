const JobOpportunity = require("../models/JobOpportunity");

const getJobOpportunities = async (req, res) => {
  try {
    const jobs = await JobOpportunity.find({
      isActive: true,
    }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: jobs.length,
      jobs,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch job opportunities",
      error: error.message,
    });
  }
};

const getAdminJobOpportunities = async (req, res) => {
  try {
    const jobs = await JobOpportunity.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: jobs.length,
      jobs,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch job opportunities",
      error: error.message,
    });
  }
};

const createJobOpportunity = async (req, res) => {
  try {
    const {
      title,
      location,
      jobType,
      description,
      deadline,
      applyLink,
      applyEmail,
      isActive,
    } = req.body;

    if (!title || !description || !deadline) {
      return res.status(400).json({
        success: false,
        message: "Please provide title, description and deadline",
      });
    }

    const newJob = new JobOpportunity({
      title,
      location: location || "",
      jobType: jobType || "Full-time",
      description,
      deadline,
      applyLink: applyLink || "",
      applyEmail: applyEmail || "",
      isActive: isActive !== undefined ? isActive : true,
    });

    await newJob.save();

    return res.status(201).json({
      success: true,
      message: "Job opportunity created successfully",
      job: newJob,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to create job opportunity",
      error: error.message,
    });
  }
};

const updateJobOpportunity = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      location,
      jobType,
      description,
      deadline,
      applyLink,
      applyEmail,
      isActive,
    } = req.body;

    const job = await JobOpportunity.findById(id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job opportunity not found",
      });
    }

    if (title) job.title = title;
    if (location !== undefined) job.location = location;
    if (jobType) job.jobType = jobType;
    if (description) job.description = description;
    if (deadline) job.deadline = deadline;
    if (applyLink !== undefined) job.applyLink = applyLink;
    if (applyEmail !== undefined) job.applyEmail = applyEmail;
    if (isActive !== undefined) job.isActive = isActive;

    await job.save();

    return res.status(200).json({
      success: true,
      message: "Job opportunity updated successfully",
      job,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to update job opportunity",
      error: error.message,
    });
  }
};

const deleteJobOpportunity = async (req, res) => {
  try {
    const { id } = req.params;

    const job = await JobOpportunity.findById(id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job opportunity not found",
      });
    }

    await JobOpportunity.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Job opportunity deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to delete job opportunity",
      error: error.message,
    });
  }
};

module.exports = {
  getJobOpportunities,
  getAdminJobOpportunities,
  createJobOpportunity,
  updateJobOpportunity,
  deleteJobOpportunity,
};
