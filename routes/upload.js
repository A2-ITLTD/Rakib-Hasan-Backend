const express = require("express");
const { authMiddleware } = require("../middleware/auth");
const {
  upload,
  uploadImageByType,
  uploadBlogImage,
  uploadPortfolioImage,
  uploadServiceImage,
  uploadClientLogoImage,
  uploadGalleryImage,
  uploadBannerImage,
  uploadFooterLogoImage,
  uploadFooterTopBandImage,
  uploadNewsImage,
  uploadSiteLogoImage,
  uploadFaviconImage,
  uploadSpotlightImage,
  uploadJoinUsImage,
  uploadAboutImage,
  uploadGovernmentEnlistmentImage,
  uploadGovernmentEnlistmentCertificate,
  uploadProjectsPageImage,
  uploadCSRImage,
  listPortfolioResources,
  listMediaResources,
  deletePortfolioResource,
} = require("../controllers/uploadController");

const router = express.Router();

router.post(
  "/image/:type",
  authMiddleware,
  upload.single("image"),
  uploadImageByType,
);
router.post("/blogs", authMiddleware, upload.single("image"), uploadBlogImage);
router.post(
  "/portfolio",
  authMiddleware,
  upload.single("image"),
  uploadPortfolioImage,
);
router.post(
  "/services",
  authMiddleware,
  upload.single("image"),
  uploadServiceImage,
);
router.post(
  "/clients",
  authMiddleware,
  upload.single("image"),
  uploadClientLogoImage,
);
router.post(
  "/gallery",
  authMiddleware,
  upload.single("image"),
  uploadGalleryImage,
);
router.post(
  "/banners",
  authMiddleware,
  upload.single("image"),
  uploadBannerImage,
);
router.post(
  "/footer-logo",
  authMiddleware,
  upload.single("image"),
  uploadFooterLogoImage,
);
router.post(
  "/footer-top-band",
  authMiddleware,
  upload.single("image"),
  uploadFooterTopBandImage,
);
router.post(
  "/news",
  authMiddleware,
  upload.single("image"),
  uploadNewsImage,
);
router.post(
  "/site-logo",
  authMiddleware,
  upload.single("image"),
  uploadSiteLogoImage,
);
router.post(
  "/favicon",
  authMiddleware,
  upload.single("image"),
  uploadFaviconImage,
);
router.post(
  "/spotlight",
  authMiddleware,
  upload.single("image"),
  uploadSpotlightImage,
);
router.post(
  "/join-us",
  authMiddleware,
  upload.single("image"),
  uploadJoinUsImage,
);
router.post(
  "/about",
  authMiddleware,
  upload.single("image"),
  uploadAboutImage,
);
router.post(
  "/government-enlistment",
  authMiddleware,
  upload.single("image"),
  uploadGovernmentEnlistmentImage,
);
router.post(
  "/government-enlistment-certificate",
  authMiddleware,
  upload.single("image"),
  uploadGovernmentEnlistmentCertificate,
);
router.post(
  "/projects-page",
  authMiddleware,
  upload.single("image"),
  uploadProjectsPageImage,
);
router.post("/csr", authMiddleware, upload.single("image"), uploadCSRImage);
router.get("/portfolio/list", authMiddleware, listPortfolioResources);
router.get("/media/list", authMiddleware, listMediaResources);
router.delete("/portfolio", authMiddleware, deletePortfolioResource);

module.exports = router;
