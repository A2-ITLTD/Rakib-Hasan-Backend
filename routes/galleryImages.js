const express = require("express");
const {
  authMiddleware,
  adminMiddleware,
  requireModuleAccess,
} = require("../middleware/auth");
const {
  getGalleryImages,
  getAdminGalleryImages,
  createGalleryImage,
  updateGalleryImage,
  deleteGalleryImage,
} = require("../controllers/galleryImagesController");

const router = express.Router();

router.get("/", getGalleryImages);

router.get("/admin/all", authMiddleware, requireModuleAccess("gallery"), getAdminGalleryImages);

router.post("/", authMiddleware, requireModuleAccess("gallery"), createGalleryImage);

router.put(
  "/:id",
  authMiddleware,
  requireModuleAccess("gallery"),
  updateGalleryImage,
);

router.delete("/:id", authMiddleware, adminMiddleware, deleteGalleryImage);

module.exports = router;
