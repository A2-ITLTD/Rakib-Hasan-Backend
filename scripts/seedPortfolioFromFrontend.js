require("dotenv").config();
const mongoose = require("mongoose");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const path = require("path");
const Portfolio = require("../models/Portfolio");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const projectDataPath = path.join(
  __dirname,
  "../../a2it-frontend/components/data/projects.js"
);

const loadProjectsFromFrontend = () => {
  const source = fs.readFileSync(projectDataPath, "utf8");
  const transformedSource = source.replace(
    /export\s+const\s+projects\s*=\s*/,
    "module.exports = "
  );

  const module = { exports: {} };
  const projectFactory = new Function("module", "exports", `${transformedSource}\nreturn module.exports;`);
  const projects = projectFactory(module, module.exports);

  if (!Array.isArray(projects)) {
    throw new Error("Frontend projects data did not export an array");
  }

  return projects;
};

const downloadImageBuffer = (url) => {
  const protocol = url.startsWith("https") ? require("https") : require("http");

  return new Promise((resolve, reject) => {
    protocol
      .get(url, (response) => {
        if (response.statusCode !== 200) {
          reject(new Error(`Failed to download image. Status: ${response.statusCode}`));
          return;
        }

        const chunks = [];
        response.on("data", (chunk) => chunks.push(chunk));
        response.on("end", () => resolve(Buffer.concat(chunks)));
      })
      .on("error", (error) => reject(error));
  });
};

const readLocalImageBuffer = (relativePath) => {
  const frontendPublicPath = path.join(__dirname, "../../a2it-frontend/public");
  const fullPath = path.join(frontendPublicPath, relativePath);

  if (!fs.existsSync(fullPath)) {
    throw new Error(`File not found: ${fullPath}`);
  }

  return fs.readFileSync(fullPath);
};

const uploadBufferToCloudinary = (buffer, publicId) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "a2it/portfolio",
        public_id: publicId,
        overwrite: true,
        resource_type: "auto",
        quality: "auto",
        fetch_format: "auto",
      },
      (error, result) => {
        if (error) {
          reject(error);
          return;
        }

        resolve(result.secure_url);
      }
    );

    uploadStream.end(buffer);
  });
};

const normalizeMetrics = (metrics) => {
  if (!Array.isArray(metrics)) return [];
  return metrics
    .map((metric) => {
      if (!metric || !metric.value || !metric.label) return null;
      return {
        value: String(metric.value),
        label: String(metric.label),
      };
    })
    .filter(Boolean);
};

const normalizeProject = (project, featured) => ({
  title: project.title,
  description: project.description,
  category: Array.isArray(project.category) ? project.category : [project.category],
  image: project.image,
  images: [],
  link: project.liveUrl || project.link || project.githubUrl || "",
  client: project.client || "",
  duration: project.duration || "",
  teamSize: project.teamSize || "",
  role: project.role || "",
  challenge: project.challenge || "",
  solution: project.solution || "",
  technologies: Array.isArray(project.technologies) ? project.technologies : [],
  features: Array.isArray(project.features) ? project.features : [],
  result: project.results || project.result || "",
  metrics: normalizeMetrics(project.metrics),
  featured,
  isActive: true,
});

const seedPortfolio = async () => {
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

    const projects = loadProjectsFromFrontend();
    console.log(`📦 Loaded ${projects.length} projects from frontend data`);

    await Portfolio.deleteMany({});
    console.log("🗑️  Cleared existing portfolio data");

    let successCount = 0;
    let failedCount = 0;
    const failedProjects = [];

    for (let index = 0; index < projects.length; index += 1) {
      const project = projects[index];
      const progress = `[${index + 1}/${projects.length}]`;

      try {
        console.log(`${progress} Processing: ${project.title}`);

        let imageUrl = project.image;
        let cloudinaryUrl = imageUrl;

        if (imageUrl && imageUrl.startsWith("/")) {
          try {
            const fileName = imageUrl.split("/").pop().split(".")[0];
            let buffer;

            try {
              buffer = readLocalImageBuffer(imageUrl);
              console.log("  ✅ Read image from local filesystem");
            } catch (localErr) {
              const fullImageUrl = `${process.env.FRONTEND_URL || "http://localhost:3000"}${imageUrl}`;
              buffer = await downloadImageBuffer(fullImageUrl);
              console.log(`  ✅ Downloaded image from ${fullImageUrl}`);
            }

            console.log("  ⬆️  Uploading to Cloudinary...");
            cloudinaryUrl = await uploadBufferToCloudinary(buffer, fileName);
            console.log(`  ✅ Uploaded to Cloudinary: ${cloudinaryUrl}`);
          } catch (imageError) {
            console.log(`  ⚠️  Image upload failed, storing original path: ${imageError.message}`);
          }
        }

        const savedProject = await Portfolio.create({
          ...normalizeProject(project, index < 3),
          image: cloudinaryUrl,
          images: [cloudinaryUrl],
        });

        console.log(`  ✅ Saved to database with ID: ${savedProject._id}`);
        successCount += 1;
      } catch (error) {
        failedCount += 1;
        failedProjects.push({ title: project.title, error: error.message });
        console.error(`  ❌ Failed: ${error.message}`);
      }

      await new Promise((resolve) => setTimeout(resolve, 250));
    }

    console.log("\n==================================================");
    console.log("📊 SEEDING COMPLETED");
    console.log("==================================================");
    console.log(`✅ Successfully seeded: ${successCount} projects`);
    console.log(`❌ Failed: ${failedCount} projects`);

    if (failedProjects.length > 0) {
      console.log("\nFailed projects:");
      failedProjects.forEach((project) => {
        console.log(`- ${project.title}: ${project.error}`);
      });
    }

    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding error:", error.message);
    process.exit(1);
  }
};

seedPortfolio();
