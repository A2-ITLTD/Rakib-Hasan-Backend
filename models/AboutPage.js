const mongoose = require("mongoose");

const boardMemberSchema = new mongoose.Schema(
  {
    image: { type: String, default: "" },
    publicId: { type: String, default: "" },
    name: { type: String, trim: true, default: "" },
    title: { type: String, trim: true, default: "" },
    speech: { type: String, trim: true, default: "" },
  },
  { _id: false },
);

const milestoneSchema = new mongoose.Schema(
  {
    year: { type: String, trim: true, default: "" },
    description: { type: String, trim: true, default: "" },
  },
  { _id: false },
);

const awardSchema = new mongoose.Schema(
  {
    image: { type: String, default: "" },
    publicId: { type: String, default: "" },
    title: { type: String, trim: true, default: "" },
    description: { type: String, trim: true, default: "" },
  },
  { _id: false },
);

const aboutPageSchema = new mongoose.Schema(
  {
    whoWeAre: {
      label: { type: String, trim: true, default: "Who We Are" },
      heading: {
        type: String,
        trim: true,
        default: "A trusted government contractor since 2012",
      },
      body: {
        type: String,
        trim: true,
        default:
          "M/S. MD. RAKIB HASAN — a 1st Class Government Contractor, Supplier, General Merchant & Auctioneer, proudly serving government departments and institutions across Bangladesh since 2012.\nWe are enlisted with numerous government departments, including the Education Engineering Department, Health Engineering Department, Public Works Department, Bangladesh Agricultural Development Corporation, Directorate General of Food and the Forest Department.\nHeadquartered at House-320, Road-21, New DOHS, Mohakhali, Dhaka-1206, with our registered office in Premchara, Bagherpara, Jashore, we hold valid Trade License, TIN and VAT (BIN) registrations along with DCCI and JCCI membership.",
      },
      image: { type: String, default: "" },
      publicId: { type: String, default: "" },
    },
    mission: {
      label: { type: String, trim: true, default: "Our Mission" },
      heading: {
        type: String,
        trim: true,
        default: "Understanding needs, delivering results",
      },
      body: {
        type: String,
        trim: true,
        default:
          "Each project we undertake has a unique approach. We strive to understand our clients' needs, objectives and expectations, comparing them against what works best to deliver a highly customized service that helps our clients succeed. Every member of our team works toward one common goal: building strong, genuine and lasting relationships with the government bodies and institutions we serve.",
      },
      image: { type: String, default: "" },
      publicId: { type: String, default: "" },
    },
    vision: {
      label: { type: String, trim: true, default: "Our Vision" },
      heading: {
        type: String,
        trim: true,
        default: "Sustainable growth built on trust and quality",
      },
      body: {
        type: String,
        trim: true,
        default:
          "Our journey has never been an easy one — we have faced many difficulties and our vision has met resistance at every step of the way. But we have learned perseverance and resilience, and over the years we have never lost the enthusiasm and passion that drives our sustainable growth. We envision continuing to help government departments and institutions move forward, without ever compromising on quality.",
      },
      image: { type: String, default: "" },
      publicId: { type: String, default: "" },
    },
    boardOfDirectors: {
      type: [boardMemberSchema],
      default: () => [
        { name: "Md. Rakib Hasan", title: "Proprietor" },
        { name: "Md. Tariq Al Karim", title: "Assistant Executive Officer" },
        { name: "Emam Sharif", title: "Personal Secretary" },
      ],
    },
    ourStory: {
      label: { type: String, trim: true, default: "Our Story" },
      heading: {
        type: String,
        trim: true,
        default: "From 2012 to a trusted name in government supply",
      },
      milestones: {
        type: [milestoneSchema],
        default: () => [
          {
            year: "2012",
            description:
              "M/S. MD. RAKIB HASAN was founded by Md. Rakib Hasan as a general merchant and supplier.",
          },
          {
            year: "2016",
            description:
              "Enlisted as a 1st Class Government Contractor and completed our first major projects with the Bangladesh Agricultural Development Corporation.",
          },
          {
            year: "2020",
            description:
              "Expanded enlistment across the Public Works Department, Forest Department and Directorate General of Food.",
          },
          {
            year: "2025",
            description:
              "Continuing to serve government departments and institutions across Bangladesh with trusted supply and contracting services.",
          },
        ],
      },
    },
    awards: {
      type: [awardSchema],
      default: () => [],
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("AboutPage", aboutPageSchema);
