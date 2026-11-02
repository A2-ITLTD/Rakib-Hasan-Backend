const mongoose = require("mongoose");

const slugifyString = (value) => {
  return String(value || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
};

const csrActivitySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide a title"],
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    excerpt: {
      type: String,
      trim: true,
      maxlength: 500,
      default: "",
    },
    content: {
      type: String,
      default: "",
    },
    image: {
      type: String,
      default: "",
    },
    imagePublicId: {
      type: String,
      default: "",
    },
    date: {
      type: String,
      trim: true,
      default: "",
    },
    order: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "published",
    },
  },
  { timestamps: true },
);

csrActivitySchema.pre("validate", async function (next) {
  if (this.isModified("title") && (!this.slug || this.slug === "")) {
    let baseSlug = slugifyString(this.title) || "csr-activity";
    let slug = baseSlug;
    let counter = 0;

    while (
      await mongoose.models.CSRActivity.findOne({
        slug,
        _id: { $ne: this._id },
      })
    ) {
      counter++;
      slug = `${baseSlug}-${counter}`;
    }

    this.slug = slug;
  }

  next();
});

csrActivitySchema.index({ status: 1, order: 1, createdAt: -1 });

module.exports = mongoose.model("CSRActivity", csrActivitySchema);
