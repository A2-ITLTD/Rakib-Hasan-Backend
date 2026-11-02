const Role = require("../models/Role");

const DEFAULT_ROLES = [
  { name: "developer", displayName: "Developer" },
  { name: "marketing", displayName: "Marketing" },
  { name: "designer", displayName: "Designer" },
  { name: "manager", displayName: "Manager" },
  { name: "other", displayName: "Other" },
];

const normalizeRole = (value) =>
  String(value || "")
    .trim()
    .toLowerCase();

const ensureDefaultRoles = async () => {
  const existing = await Role.find({ isActive: true });

  if (existing.length === 0) {
    await Role.insertMany(DEFAULT_ROLES);
    return Role.find({ isActive: true }).sort({ displayName: 1 });
  }

  return Role.find({ isActive: true }).sort({ displayName: 1 });
};

const getRoles = async (req, res) => {
  try {
    const roles = await ensureDefaultRoles();

    return res.status(200).json({
      success: true,
      count: roles.length,
      roles,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch roles",
      error: error.message,
    });
  }
};

const createRole = async (req, res) => {
  try {
    const { name, displayName } = req.body;
    const normalizedName = normalizeRole(name);
    const resolvedDisplayName = String(displayName || name || "").trim();

    if (!normalizedName || !resolvedDisplayName) {
      return res.status(400).json({
        success: false,
        message: "Please provide both name and displayName",
      });
    }

    const existing = await Role.findOne({ name: normalizedName });
    if (existing) {
      if (!existing.isActive) {
        existing.isActive = true;
        existing.displayName = resolvedDisplayName;
        await existing.save();
      }

      return res.status(200).json({
        success: true,
        message: "Role already exists",
        role: existing,
      });
    }

    const role = new Role({
      name: normalizedName,
      displayName: resolvedDisplayName,
    });

    await role.save();

    return res.status(201).json({
      success: true,
      message: "Role created successfully",
      role,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to create role",
      error: error.message,
    });
  }
};

const deleteRole = async (req, res) => {
  try {
    const { name } = req.params;
    const normalizedName = normalizeRole(name);

    if (!normalizedName) {
      return res.status(400).json({
        success: false,
        message: "Please provide a role name",
      });
    }

    const deletedRole = await Role.findOneAndDelete({
      name: normalizedName,
    });

    if (!deletedRole) {
      return res.status(404).json({
        success: false,
        message: "Role not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Role deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to delete role",
      error: error.message,
    });
  }
};

module.exports = {
  getRoles,
  createRole,
  deleteRole,
  ensureDefaultRoles,
};
