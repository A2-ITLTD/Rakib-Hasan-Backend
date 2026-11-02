require("dotenv").config();
const mongoose = require("mongoose");
const User = require("../models/User");
const Banner = require("../models/Banner");

const seedDatabase = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI;

    if (!mongoUri) {
      throw new Error("MONGODB_URI is not set in environment variables");
    }

    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ Connected to MongoDB");

    // Check if admin already exists
    const adminExists = await User.findOne({ email: "naimaa2it@gmail.com" });

    if (!adminExists) {
      // Create default admin
      const defaultAdmin = new User({
        name: "Main Admin",
        email: "naimaa2it@gmail.com",
        password: "123456", // Change this in production
        role: "admin",
        isActive: true,
      });

      await defaultAdmin.save();

      console.log("✅ Default admin created successfully");
      console.log("\n📧 Email: naimaa2it@gmail.com");
      console.log("🔑 Password: 123456");
      console.log("\n⚠️  Please change the password after first login!\n");
    } else {
      console.log("✅ Default admin already exists");
    }

    // Seed default homepage banner slides if none exist
    const bannerCount = await Banner.countDocuments();
    if (bannerCount === 0) {
      const banners = [
        {
          image: "/assets/banner/0.avif",
          title: "Seamless Commerce, Built to Scale",
          subtitle: "Amazon, eBay, Shopify & affiliate business solutions for global growth.",
          buttonText: "Get Started",
          buttonLink: "/contact",
          order: 0,
        },
        {
          image: "/assets/banner/1.avif",
          title: "Relinquish Your Digital Potential",
          subtitle: "We transform ambitious ideas into cutting-edge digital products.",
          buttonText: "Get Started",
          buttonLink: "/contact",
          order: 1,
        },
        {
          image: "/assets/banner/2.avif",
          title: "Next Generation Tech Solutions",
          subtitle: "Scalable, secure and innovative systems engineered for the enterprise.",
          buttonText: "View Our Work",
          buttonLink: "/portfolio",
          order: 2,
        },
        {
          image: "/assets/banner/3.avif",
          title: "AI-Powered Innovation",
          subtitle: "Harnessing artificial intelligence to accelerate your business.",
          buttonText: "Get Started",
          buttonLink: "/contact",
          order: 3,
        },
        {
          image: "/assets/banner/4.jpeg",
          title: "Cloud-Native Architecture",
          subtitle: "Future-proof your infrastructure with our engineering expertise.",
          buttonText: "View Our Work",
          buttonLink: "/portfolio",
          order: 4,
        },
      ];

      await Banner.insertMany(banners);
      console.log(`✅ Seeded ${banners.length} banner slides`);
    } else {
      console.log(`✅ ${bannerCount} banner slides already exist`);
    }

    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding database:", error.message);
    process.exit(1);
  }
};

seedDatabase();
