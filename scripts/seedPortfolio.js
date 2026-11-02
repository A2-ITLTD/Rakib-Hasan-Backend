require("dotenv").config();
const mongoose = require("mongoose");
const cloudinary = require("cloudinary").v2;
const https = require("https");
const http = require("http");
const fs = require("fs");
const path = require("path");
const Portfolio = require("../models/Portfolio");

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Projects data (copied from frontend projects.js)
const projects = [
  {
    id: 1,
    title: "Horizon International",
    description:
      "A full-featured e-commerce platform with advanced analytics and inventory management.",
    category: ["Web Development", "eCommerce Development"],
    image: "/assets/design_development/view.jpeg",
    technologies: [
      "Next.js",
      "react.js",
      "Node.js",
      "MongoDB",
      "Expressjs",
      "AWS",
    ],
    duration: "1 months",
    teamSize: "1 developers",
    role: "Full-Stack Developer & Team Lead",
    challenge:
      "The client needed a scalable e-commerce solution that could handle high traffic volumes while providing real-time inventory updates and seamless payment processing.",
    solution:
      "Built a microservices architecture using React for the frontend and Node.js for the backend. Implemented real-time inventory tracking with WebSocket connections and integrated Stripe for secure payment processing.",
    results:
      "Successfully launched the platform with 99.9% uptime, handling over 10,000 concurrent users and processing $2M+ in transactions within the first quarter.",
    features: [
      "Real-time inventory management",
      "Advanced product search and filtering",
      "Multi-payment gateway integration",
      "Admin dashboard with analytics",
      "Mobile-responsive design",
      "SEO optimization",
    ],
    metrics: [
      { value: "10K+", label: "Concurrent Users" },
      { value: "$2M+", label: "Revenue Generated" },
      { value: "99.9%", label: "Uptime" },
      { value: "4.8/5", label: "User Rating" },
    ],
  },
  {
    id: 2,
    title: "Horizon International Website",
    description:
      "A complete corporate website for Horizon International featuring service showcases, dynamic content, contact automation, and an interactive map.",
    category: ["Digital Marketing", "Web Development"],
    image: "/assets/design_development/a2it.jpeg",
    technologies: ["Next.js", "React.js", "Node.js", "Leaflet", "Nodemailer"],
    duration: "15 Days",
    teamSize: "2 developers",
    role: "Full Stack Developer",
    challenge:
      "The client needed a professional and dynamic digital presence showcasing their IT services, portfolio, and team, along with smooth contact automation.",
    solution:
      "Developed a high-performance corporate website using Next.js and React. Implemented Leaflet for interactive location mapping and integrated Nodemailer for automated contact form messaging.",
    results:
      "Successfully delivered a responsive, SEO-optimized website that significantly increased user engagement and improved lead generation for the company.",
    features: [
      "Responsive corporate website design",
      "Interactive map integration using Leaflet",
      "Automated email handling with Nodemailer",
      "Service showcase pages",
      "Team and portfolio sections",
      "SEO optimization for better ranking",
    ],
    metrics: [
      { value: "5s", label: "Load Time" },
      { value: "98%", label: "SEO Score" },
      { value: "40%", label: "Lead Increase" },
      { value: "99.9%", label: "Uptime" },
    ],
    link: "https://horizoninternational.com",
  },
  {
    id: 3,
    title: "Import Export Business",
    description:
      "An enterprise-level analytics dashboard delivering real-time insights, interactive visualizations, and data-driven decision support.",
    category: ["eCommerce Development", "Web Development", "Import Export"],
    image: "/assets/design_development/asian.jpeg",
    technologies: [
      "Next.js",
      "React.js",
      "Node.js",
      "Nodemailer",
      "D3.js",
      "Python",
    ],
    duration: "10 days",
    teamSize: "1 developers",
    role: "Full Stack Developer",
    challenge:
      "Develop a comprehensive analytics platform capable of processing large datasets and presenting complex business metrics through an intuitive, interactive interface.",
    solution:
      "Built a frontend with React.js and D3.js for interactive visualizations, backed by a Python data processing pipeline. Implemented real-time data streaming and dynamic charting to allow deep-dive analysis.",
    results:
      "Delivered a robust analytics platform that reduced reporting time by 75% and enabled faster, data-driven decision making across the organization.",
    features: [
      "Real-time data streaming",
      "Interactive data visualizations",
      "Custom report generation",
      "Multi-tenant architecture",
      "Role-based access control",
      "Export capabilities (PDF, Excel, CSV)",
    ],
    metrics: [
      { value: "75%", label: "Faster Reporting" },
      { value: "50M+", label: "Data Points Processed" },
      { value: "12", label: "Different Chart Types" },
      { value: "500+", label: "Daily Active Users" },
    ],
  },
  {
    id: 5,
    title: "Best Gear Buy",
    description:
      "A web-based AI application for eCommerce platforms that automatically detects objects and scenes in product images, improving catalog management and enhancing user experience.",
    category: ["Web Development", "eCommerce Development"],
    image: "/assets/design_development/drone.jpeg",
    technologies: ["Next.js", "React.js", "Node.js", "Nodemailer"],
    duration: "12 Days",
    teamSize: "1 developer",
    role: "Full Stack Developer",
    challenge:
      "Build a web-based AI system for eCommerce that maintains context across user interactions, delivers accurate image analysis, and provides a seamless shopping experience.",
    solution:
      "Developed a responsive React-based interface integrated with OpenAI for image recognition and conversation management. Implemented Redis for maintaining session context and WebSocket for real-time user interaction.",
    results:
      "Successfully deployed the AI system on eCommerce platforms, achieving 92% user satisfaction and processing over 1,000 image analyses and conversations daily.",
    features: [
      "Context-aware conversations tailored for online shoppers",
      "Multi-language support for global eCommerce users",
      "Image upload and automated product analysis",
      "Voice input/output for hands-free shopping",
      "Maintain conversation history for personalized recommendations",
      "Custom AI model training for specialized product categories",
    ],
    metrics: [
      { value: "92%", label: "User Satisfaction" },
      { value: "1K+", label: "Daily Conversations & Analyses" },
      { value: "15", label: "Languages Supported" },
      { value: "3.2s", label: "Average Response Time" },
    ],
  },
  {
    id: 6,
    title: "Corporate Website",
    description:
      "A comprehensive design system and component library for enterprise applications.",
    category: ["Web Development", "eCommerce Development", "UI/UX Design"],
    image: "/assets/design_development/trading.png",
    technologies: ["Next.js", "React.js", "Node.js", "Nodemailer"],
    duration: "13 Days",
    teamSize: "1 developers",
    role: "Full stack Developer",
    challenge:
      "Create a unified design system that could be used across multiple products while maintaining consistency and accessibility standards.",
    solution:
      "Developed a comprehensive design system with Figma components, React component library, and detailed documentation. Implemented automated testing and accessibility checks.",
    results:
      "Reduced design-to-development time by 60% and improved consistency across all company products.",
    features: [
      "Comprehensive component library",
      "Accessibility compliance (WCAG 2.1)",
      "Dark/light theme support",
      "Responsive design tokens",
      "Interactive documentation",
      "Automated testing suite",
    ],
    metrics: [
      { value: "60%", label: "Faster Development" },
      { value: "100+", label: "Reusable Components" },
      { value: "5", label: "Product Teams Using" },
      { value: "98%", label: "Accessibility Score" },
    ],
  },
  {
    id: 7,
    title: "Tyre Supplier",
    description:
      "A high-performance trading platform providing real-time market data, advanced charting tools, and portfolio management for web and mobile users.",
    category: ["Web Development", "Mobile App"],
    image: "/assets/design_development/c-tire.png",
    technologies: ["React.js", "Next.js", "Chart.js", "Node.js"],
    duration: "10 Days",
    teamSize: "1 Developer",
    role: "Full Stack Developer",
    challenge:
      "Create a trading platform that handles live financial data with minimal latency while offering sophisticated charting and portfolio analysis tools.",
    solution:
      "Developed a Next.js app with WebSocket integration for real-time updates, custom charting components, and optimized rendering to manage thousands of data points efficiently.",
    results:
      "Launched a platform processing $10M+ in daily trading volume, maintaining sub-100ms latency, and supporting 2K+ active traders with 99.95% uptime.",
    features: [
      "Real-time market data streaming",
      "Advanced charting tools",
      "Portfolio management",
      "Risk assessment algorithms",
      "Multi-currency support",
      "Automated trading bots",
    ],
    metrics: [
      { value: "$10M+", label: "Daily Trading Volume" },
      { value: "<100ms", label: "Data Latency" },
      { value: "2K+", label: "Active Traders" },
      { value: "99.95%", label: "System Uptime" },
    ],
  },
  {
    id: 8,
    title: "Smart Gadget",
    description:
      "Custom eCommerce development tailored to your business needs with integrated payments, inventory, and SEO tools.",
    category: ["Web Development", "eCommerce Development", "Affiliate"],
    image: "/assets/design_development/smart.png",
    technologies: ["React.js", "Next.js", "Chart.js", "Node.js"],
    duration: "5 months",
    teamSize: "4 developers",
    role: "eCommerce Specialist",
    challenge:
      "Create a flexible and scalable online store for a growing retailer with international shipping support.",
    solution:
      "Built custom storefronts using Shopify and WooCommerce, integrated multiple payment options, and added marketing/SEO tools.",
    results:
      "Increased customer base by 120% and improved checkout conversion rate by 30%.",
    features: [
      "Custom storefront design",
      "Multi-language and currency support",
      "Integrated payment gateways",
      "SEO and marketing tools",
      "Shipping and logistics integrations",
      "User-friendly admin dashboard",
    ],
    metrics: [
      { value: "120%", label: "Customer Growth" },
      { value: "30%", label: "Conversion Rate Increase" },
      { value: "20K+", label: "Monthly Visitors" },
      { value: "50+", label: "Product Categories" },
    ],
  },
  {
    id: 9,
    title: "Best Baby Gear",
    description:
      "Custom eCommerce development tailored to your business needs with integrated payments, inventory, and SEO tools.",
    category: ["Web Development", "eCommerce Development", "Affiliate"],
    image: "/assets/design_development/babygear.jpeg",
    technologies: ["React.js", "Next.js", "Chart.js", "Node.js"],
    duration: "5 months",
    teamSize: "4 developers",
    role: "Full Stack Developer",
    challenge:
      "Create a flexible and scalable online store for a growing retailer with international shipping support.",
    solution:
      "Built custom storefronts using Shopify and WooCommerce, integrated multiple payment options, and added marketing/SEO tools.",
    results:
      "Increased customer base by 120% and improved checkout conversion rate by 30%.",
    features: [
      "Custom storefront design",
      "Multi-language and currency support",
      "Integrated payment gateways",
      "SEO and marketing tools",
      "Shipping and logistics integrations",
      "User-friendly admin dashboard",
    ],
    metrics: [
      { value: "120%", label: "Customer Growth" },
      { value: "30%", label: "Conversion Rate Increase" },
      { value: "20K+", label: "Monthly Visitors" },
      { value: "50+", label: "Product Categories" },
    ],
  },
  {
    id: 10,
    title: "Best Product Buy",
    description:
      "Custom WordPress eCommerce development designed to boost your online store performance, integrate payments, and manage inventory seamlessly.",
    category: ["Wordpress", "Affiliate"],
    image: "/assets/design_development/bestProduct.jpeg",
    technologies: ["Wordpress CMS"],
    duration: "5 months",
    teamSize: "4 developers",
    role: "Full Stack Developer",
    challenge:
      "Develop a fully functional, SEO-optimized WordPress store with multi-language support, smooth checkout, and affiliate integration.",
    solution:
      "Built custom WordPress themes and plugins, integrated WooCommerce for online sales, added payment gateways, affiliate tracking, and optimized SEO for high traffic.",
    results:
      "Increased online sales by 120%, improved checkout efficiency by 30%, and expanded affiliate program reach significantly.",
    features: [
      "Custom WordPress theme design",
      "WooCommerce integration",
      "Multi-language and currency support",
      "Affiliate marketing integration",
      "SEO and marketing tools",
      "User-friendly admin dashboard",
      "Advanced product categorization",
      "Responsive design for mobile and desktop",
    ],
    metrics: [
      { value: "120%", label: "Sales Growth" },
      { value: "30%", label: "Checkout Efficiency Increase" },
      { value: "25K+", label: "Monthly Visitors" },
      { value: "50+", label: "Product Categories" },
    ],
  },
  {
    id: 11,
    title: "KitchenPro Supply",
    description:
      "Custom WordPress eCommerce development designed to boost your online store performance, integrate payments, and manage inventory seamlessly.",
    category: ["Wordpress", "Affiliate"],
    image: "/assets/design_development/Gym.jpeg",
    technologies: ["Wordpress CMS"],
    duration: "5 months",
    teamSize: "4 developers",
    role: "Full Stack Developer",
    challenge:
      "Develop a fully functional, SEO-optimized WordPress store with multi-language support, smooth checkout, and affiliate integration.",
    solution:
      "Built custom WordPress themes and plugins, integrated WooCommerce for online sales, added payment gateways, affiliate tracking, and optimized SEO for high traffic.",
    results:
      "Increased online sales by 120%, improved checkout efficiency by 30%, and expanded affiliate program reach significantly.",
    features: [
      "Custom WordPress theme design",
      "WooCommerce integration",
      "Multi-language and currency support",
      "Affiliate marketing integration",
      "SEO and marketing tools",
      "User-friendly admin dashboard",
      "Advanced product categorization",
      "Responsive design for mobile and desktop",
    ],
    metrics: [
      { value: "120%", label: "Sales Growth" },
      { value: "30%", label: "Checkout Efficiency Increase" },
      { value: "25K+", label: "Monthly Visitors" },
      { value: "50+", label: "Product Categories" },
    ],
  },
  {
    id: 12,
    title: "Best Fitness Shop",
    description:
      "Custom WordPress eCommerce development designed to boost your online store performance, integrate payments, and manage inventory seamlessly.",
    category: ["Wordpress", "Affiliate"],
    image: "/assets/design_development/kitchen.jpeg",
    technologies: ["Wordpress CMS"],
    duration: "5 months",
    teamSize: "4 developers",
    role: "Full Stack Developer",
    challenge:
      "Develop a fully functional, SEO-optimized WordPress store with multi-language support, smooth checkout, and affiliate integration.",
    solution:
      "Built custom WordPress themes and plugins, integrated WooCommerce for online sales, added payment gateways, affiliate tracking, and optimized SEO for high traffic.",
    results:
      "Increased online sales by 120%, improved checkout efficiency by 30%, and expanded affiliate program reach significantly.",
    features: [
      "Custom WordPress theme design",
      "WooCommerce integration",
      "Multi-language and currency support",
      "Affiliate marketing integration",
      "SEO and marketing tools",
      "User-friendly admin dashboard",
      "Advanced product categorization",
      "Responsive design for mobile and desktop",
    ],
    metrics: [
      { value: "120%", label: "Sales Growth" },
      { value: "30%", label: "Checkout Efficiency Increase" },
      { value: "25K+", label: "Monthly Visitors" },
      { value: "50+", label: "Product Categories" },
    ],
  },
  {
    id: 13,
    title: "Jute Craftify",
    description:
      "Custom WordPress eCommerce development designed to boost your online store performance, integrate payments, and manage inventory seamlessly.",
    category: ["Wordpress", "Import Export"],
    image: "/assets/design_development/jute.jpeg",
    technologies: ["Wordpress CMS"],
    duration: "5 months",
    teamSize: "4 developers",
    role: "Full Stack Developer",
    challenge:
      "Develop a fully functional, SEO-optimized WordPress store with multi-language support, smooth checkout, and affiliate integration.",
    solution:
      "Built custom WordPress themes and plugins, integrated WooCommerce for online sales, added payment gateways, affiliate tracking, and optimized SEO for high traffic.",
    results:
      "Increased online sales by 120%, improved checkout efficiency by 30%, and expanded affiliate program reach significantly.",
    features: [
      "Custom WordPress theme design",
      "WooCommerce integration",
      "Multi-language and currency support",
      "Affiliate marketing integration",
      "SEO and marketing tools",
      "User-friendly admin dashboard",
      "Advanced product categorization",
      "Responsive design for mobile and desktop",
    ],
    metrics: [
      { value: "120%", label: "Sales Growth" },
      { value: "30%", label: "Checkout Efficiency Increase" },
      { value: "25K+", label: "Monthly Visitors" },
      { value: "50+", label: "Product Categories" },
    ],
  },
  {
    id: 14,
    title: "Cargo Logistics Company",
    description:
      "A modern cargo logistics web platform built to manage shipments, track deliveries, and visualize logistics data through real-time dashboards.",
    category: ["Web Development"],
    image: "/assets/design_development/cargo.jpeg",
    technologies: ["React.js", "Next.js", "Chart.js", "Node.js"],
    duration: "5 months",
    teamSize: "4 developers",
    role: "Full Stack Developer",
    challenge:
      "Build a scalable logistics management system that allows cargo companies to monitor shipments, analyze delivery performance, and handle customer inquiries efficiently.",
    solution:
      "Developed a React and Next.js based logistics platform with shipment tracking, analytics dashboards using Chart.js, secure backend APIs with Node.js, and SEO-friendly pages for service visibility.",
    results:
      "Improved shipment tracking efficiency by 70%, increased customer inquiries by 90%, and provided real-time logistics insights through interactive dashboards.",
    features: [
      "Shipment tracking system",
      "Logistics analytics dashboard",
      "Interactive charts and reports",
      "Service and route management",
      "Customer inquiry management",
      "SEO-optimized service pages",
      "Responsive design for all devices",
      "Secure and scalable backend APIs",
    ],
    metrics: [
      { value: "70%", label: "Tracking Efficiency Boost" },
      { value: "90%", label: "Inquiry Growth" },
      { value: "20K+", label: "Monthly Platform Visits" },
      { value: "99.9%", label: "System Uptime" },
    ],
  },
];

// Download image from URL to buffer
const downloadImageBuffer = (url) => {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith("https") ? https : http;
    const request = protocol.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(
          new Error(`Failed to download image. Status: ${response.statusCode}`),
        );
        return;
      }

      const chunks = [];
      response.on("data", (chunk) => chunks.push(chunk));
      response.on("end", () => {
        resolve(Buffer.concat(chunks));
      });
    });

    request.on("error", (err) => {
      reject(new Error(`Failed to download image: ${err.message}`));
    });
  });
};

// Read image from local file system (fallback)
const readLocalImageBuffer = (relativePath) => {
  try {
    const frontendPublicPath = path.join(
      __dirname,
      "../../a2it-frontend/public",
    );
    const fullPath = path.join(frontendPublicPath, relativePath);

    if (!fs.existsSync(fullPath)) {
      throw new Error(`File not found: ${fullPath}`);
    }

    return fs.readFileSync(fullPath);
  } catch (err) {
    throw new Error(`Failed to read local image: ${err.message}`);
  }
};

// Upload buffer to Cloudinary
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
        } else {
          resolve(result.secure_url);
        }
      },
    );

    uploadStream.end(buffer);
  });
};

// Main seed function
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

    // Clear existing portfolio data
    const existingCount = await Portfolio.countDocuments();
    if (existingCount > 0) {
      const response = await new Promise((resolve) => {
        // Auto-accept for automation - delete existing data
        resolve(true);
      });

      if (response) {
        await Portfolio.deleteMany({});
        console.log("🗑️  Cleared existing portfolio data");
      }
    }

    let successCount = 0;
    let failedCount = 0;
    const failedProjects = [];

    console.log(`\n📦 Starting to seed ${projects.length} projects...\n`);

    for (let i = 0; i < projects.length; i++) {
      const project = projects[i];
      const progressText = `[${i + 1}/${projects.length}]`;

      try {
        console.log(`${progressText} Processing: ${project.title}`);

        // Construct full image URL if it's a relative path
        let imageUrl = project.image;
        let cloudinaryUrl = imageUrl;

        if (imageUrl.startsWith("/")) {
          try {
            const fileName = imageUrl.split("/").pop().split(".")[0];
            console.log(`  📥 Reading image locally: ${imageUrl}`);

            let buffer;
            try {
              // Try to read from local file system first
              buffer = readLocalImageBuffer(imageUrl);
              console.log(`  ✅ Read from local filesystem`);
            } catch (localErr) {
              // Fallback to downloading from FRONTEND_URL
              console.log(
                `  ⚠️  Local file not found, trying to download from FRONTEND_URL...`,
              );
              const fullImageUrl = `${process.env.FRONTEND_URL || "http://localhost:3000"}${imageUrl}`;
              buffer = await downloadImageBuffer(fullImageUrl);
              console.log(`  ✅ Downloaded from: ${fullImageUrl}`);
            }

            console.log(`  ⬆️  Uploading to Cloudinary...`);
            cloudinaryUrl = await uploadBufferToCloudinary(buffer, fileName);
            console.log(`  ✅ Uploaded to: ${cloudinaryUrl}`);
          } catch (downloadErr) {
            console.log(
              `  ⚠️  Could not upload image, using original: ${downloadErr.message}`,
            );
          }
        }

        // Prepare portfolio document
        const portfolioData = {
          title: project.title,
          description: project.description,
          category: Array.isArray(project.category)
            ? project.category
            : [project.category],
          image: cloudinaryUrl,
          images: [cloudinaryUrl], // Add main image to images array
          link: project.link || project.liveUrl || "",
          client: "",
          duration: project.duration || "",
          teamSize: project.teamSize || "",
          role: project.role || "",
          challenge: project.challenge || "",
          solution: project.solution || "",
          technologies: project.technologies || [],
          features: project.features || [],
          result: project.results || "",
          metrics: project.metrics || [],
          featured: i < 3, // Mark first 3 as featured
          isActive: true,
        };

        // Save to database
        const savedProject = await Portfolio.create(portfolioData);
        console.log(`  ✅ Saved to database with ID: ${savedProject._id}`);

        successCount++;
      } catch (err) {
        console.error(`  ❌ Error: ${err.message}`);
        failedCount++;
        failedProjects.push({
          title: project.title,
          error: err.message,
        });
      }

      // Add a small delay to avoid rate limiting
      await new Promise((resolve) => setTimeout(resolve, 500));
    }

    console.log("\n" + "=".repeat(50));
    console.log("📊 SEEDING COMPLETED");
    console.log("=".repeat(50));
    console.log(`✅ Successfully seeded: ${successCount} projects`);
    console.log(`❌ Failed: ${failedCount} projects`);

    if (failedProjects.length > 0) {
      console.log("\nFailed projects:");
      failedProjects.forEach((p) => {
        console.log(`  - ${p.title}: ${p.error}`);
      });
    }

    console.log(
      `\n📂 All projects are organized in Cloudinary under: a2it/portfolio`,
    );
    console.log("✅ Seed complete!\n");

    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding error:", error.message);
    process.exit(1);
  }
};

// Run the seed
seedPortfolio();
