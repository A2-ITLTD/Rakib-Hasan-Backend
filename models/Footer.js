const mongoose = require("mongoose");

const linkSchema = new mongoose.Schema(
  {
    label: { type: String, trim: true, required: true },
    url: { type: String, trim: true, default: "" },
    order: { type: Number, default: 0 },
  },
  { _id: true },
);

const footerColumnSchema = new mongoose.Schema(
  {
    title: { type: String, trim: true, required: true },
    order: { type: Number, default: 0 },
    links: { type: [linkSchema], default: [] },
  },
  { _id: true },
);

const footerButtonSchema = new mongoose.Schema(
  {
    text: { type: String, trim: true, default: "" },
    link: { type: String, trim: true, default: "" },
  },
  { _id: true },
);

const socialLinkSchema = new mongoose.Schema(
  {
    platform: { type: String, trim: true, required: true },
    url: { type: String, trim: true, default: "" },
  },
  { _id: true },
);

const footerSchema = new mongoose.Schema(
  {
    // Top hero band (background image + heading + CTA buttons)
    topBandImage: { type: String, default: "" },
    topBandPublicId: { type: String, default: "" },
    topBandEyebrow: { type: String, trim: true, default: "Let's Work Together" },
    topBandHeading: {
      type: String,
      trim: true,
      default: "Ready to build your next digital product?",
    },
    topBandSubtitle: {
      type: String,
      trim: true,
      default:
        "Tell us about your project and our team will get back to you within one business day.",
    },
    topBandButtons: {
      type: [footerButtonSchema],
      default: () => [
        { text: "Get In Touch", link: "/contact" },
        { text: "View Our Work", link: "/portfolio" },
      ],
    },

    // Logo & tagline
    logoImage: { type: String, default: "" },
    logoPublicId: { type: String, default: "" },
    tagline: {
      type: String,
      trim: true,
      default: "Transforming ideas into digital reality.",
    },

    // Fully dynamic link columns
    columns: {
      type: [footerColumnSchema],
      default: () => [
        {
          title: "Quick Links",
          order: 0,
          links: [
            { label: "Home", url: "/", order: 0 },
            { label: "Portfolio", url: "/portfolio", order: 1 },
            { label: "About Us", url: "/about", order: 2 },
            { label: "Blogs", url: "/blog", order: 3 },
            { label: "Contact", url: "/contact", order: 4 },
          ],
        },
        {
          title: "Services",
          order: 1,
          links: [
            { label: "Design & Development", url: "/services/category/development", order: 0 },
            { label: "E-Commerce", url: "/services/e-commerce", order: 1 },
            { label: "Amazon", url: "/services/category/ecommerce", order: 2 },
            { label: "Shopify", url: "/services/shopify", order: 3 },
            { label: "ERP System Development", url: "/services/erp", order: 4 },
            { label: "SEO / SEM / PPC", url: "/services/seo", order: 5 },
          ],
        },
      ],
    },

    // Contact
    address: {
      type: String,
      trim: true,
      default: "House-320, Road-21, DOHS, Mohakhali, Dhaka, Bangladesh",
    },
    phone: {
      type: String,
      trim: true,
      default: "+880 1711-270825 (Mobile) / +880 2-9833330 (Landline)",
    },
    email: { type: String, trim: true, default: "msmdrakibhasan1992@gmail.com" },

    // Social links (data-driven, mapped to icons on the frontend by platform)
    socialLinks: {
      type: [socialLinkSchema],
      default: () => [
        { platform: "facebook", url: "https://www.facebook.com/" },
        { platform: "twitter", url: "https://twitter.com" },
        { platform: "linkedin", url: "https://www.linkedin.com/" },
      ],
    },

    // "{year}" is replaced with the current year on render
    copyrightText: {
      type: String,
      trim: true,
      default: "© {year} MRH. All Rights Reserved",
    },

    legalLinks: {
      type: [linkSchema],
      default: () => [
        { label: "Privacy Policy", url: "/privacy-policy", order: 0 },
        { label: "Terms of Service", url: "/terms-of-service", order: 1 },
        { label: "Sitemap", url: "/contact", order: 2 },
      ],
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Footer", footerSchema);
