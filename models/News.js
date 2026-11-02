const mongoose = require("mongoose");

const slugifyString = (value) => {
  return String(value || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
};

const newsSchema = new mongoose.Schema(
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
    featuredImage: {
      type: String,
      default: "",
    },
    publicId: {
      type: String,
      default: "",
    },
    category: {
      type: String,
      trim: true,
      default: "",
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ["draft", "published", "archived"],
      default: "draft",
    },
    publishDate: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true },
);

newsSchema.pre("validate", async function (next) {
  if (this.isModified("title") && (!this.slug || this.slug === "")) {
    let baseSlug = slugifyString(this.title) || "news";
    let slug = baseSlug;
    let counter = 0;

    while (
      await mongoose.models.News.findOne({ slug, _id: { $ne: this._id } })
    ) {
      counter++;
      slug = `${baseSlug}-${counter}`;
    }

    this.slug = slug;
  }

  next();
});

newsSchema.index({ status: 1, publishDate: -1 });
newsSchema.index({ isFeatured: 1 });

module.exports = mongoose.model("News", newsSchema);
