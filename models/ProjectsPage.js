const mongoose = require("mongoose");

const statSchema = new mongoose.Schema(
  {
    value: { type: Number, default: 0 },
    suffix: { type: String, trim: true, default: "+" },
    label: { type: String, trim: true, default: "" },
  },
  { _id: false },
);

const workCategorySchema = new mongoose.Schema(
  {
    name: { type: String, trim: true, default: "" },
    icon: { type: String, trim: true, default: "Building2" },
  },
  { _id: false },
);

const timelineItemSchema = new mongoose.Schema(
  {
    year: { type: String, trim: true, default: "" },
    label: { type: String, trim: true, default: "" },
  },
  { _id: false },
);

const projectsPageSchema = new mongoose.Schema(
  {
    hero: {
      label: { type: String, trim: true, default: "Government Contracts" },
      heading: { type: String, trim: true, default: "Our Projects" },
      highlight: { type: String, trim: true, default: "" },
      description: {
        type: String,
        trim: true,
        default:
          "Delivering quality works and supplying essential goods through government contracts across Bangladesh.",
      },
      backgroundImage: { type: String, default: "" },
    },
    contractsSection: {
      heading: { type: String, trim: true, default: "Recent Government Contracts" },
      viewAllLink: { type: String, trim: true, default: "" },
    },
    featuredSection: {
      heading: { type: String, trim: true, default: "Featured Government Projects" },
      viewAllLink: { type: String, trim: true, default: "" },
    },
    stats: {
      type: [statSchema],
      default: () => [
        { value: 100, suffix: "+", label: "Completed Projects" },
        { value: 12, suffix: "+", label: "Years of Experience" },
        { value: 20, suffix: "+", label: "Government Clients" },
        { value: 64, suffix: "", label: "Districts Coverage" },
      ],
    },
    workCategories: {
      type: [workCategorySchema],
      default: () => [
        { name: "Construction", icon: "Building2" },
        { name: "Government Supply", icon: "Truck" },
        { name: "General Merchant", icon: "ShoppingCart" },
        { name: "Auction Services", icon: "Gavel" },
        { name: "Procurement", icon: "ClipboardCheck" },
        { name: "Infrastructure", icon: "Milestone" },
      ],
    },
    timeline: {
      type: [timelineItemSchema],
      default: () => [
        { year: "2012", label: "Company Established" },
        { year: "2016", label: "1st Class Contractor Enlistment" },
        { year: "2019", label: "Expanded Supply Operations" },
        { year: "2022", label: "Completed 50+ Projects" },
        { year: "2023", label: "Nationwide Project Expansion" },
        { year: "2024", label: "Continuous Growth & Excellence" },
        { year: "2025", label: "Stronger Commitment to the Nation" },
        { year: "2026", label: "Moving Forward Together" },
      ],
    },
    cta: {
      heading: {
        type: String,
        trim: true,
        default: "Let's Build a Better Tomorrow Together",
      },
      description: {
        type: String,
        trim: true,
        default:
          "We are ready to deliver quality projects and supply solutions for your next requirement.",
      },
      buttonText: { type: String, trim: true, default: "Contact Us" },
      buttonLink: { type: String, trim: true, default: "/contact" },
      secondaryButtonText: {
        type: String,
        trim: true,
        default: "Download Company Profile",
      },
      secondaryButtonLink: {
        type: String,
        trim: true,
        default: "/RakibHasanPortfolio.pdf",
      },
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("ProjectsPage", projectsPageSchema);
