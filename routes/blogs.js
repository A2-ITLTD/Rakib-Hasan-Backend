const express = require("express");
const { authMiddleware } = require("../middleware/auth");
const {
  getBlogs,
  getBlogBySlug,
  getAdminBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
} = require("../controllers/blogsController");

const router = express.Router();

router.get("/", getBlogs);

router.get("/slug/:slug", getBlogBySlug);

router.get("/admin/all", authMiddleware, getAdminBlogs);

router.post("/", authMiddleware, createBlog);

router.put("/:id", authMiddleware, updateBlog);

router.delete("/:id", authMiddleware, deleteBlog);

module.exports = router;
