require("dotenv").config();
const mongoose = require("mongoose");
const Service = require("../models/Service");
const ServiceCategory = require("../models/ServiceCategory");

const categories = [
  { name: "erp", displayName: "ERP Management" },
  { name: "amazon", displayName: "Amazon" },
  { name: "digital-marketing", displayName: "Digital Marketing" },
  { name: "design-development", displayName: "Design & Development" },
  { name: "shopify", displayName: "Shopify" },
  { name: "ebay", displayName: "eBay" },
  { name: "hosting", displayName: "Hosting & Servers" },
  { name: "ecommerce-dev", displayName: "E-Commerce Development" },
];

const obsoleteCategoryNames = ["ecommerce", "development", "design", "marketing"];

const services = [
  // ---- E-Commerce ---- b
  {
    title: "Amazon FBA Services",
    description:
      "Let Amazon handle fulfillment while you focus on growing your business. We manage storage, inventory, order fulfillment, and Prime eligibility so your products sell around the clock.",
    icon: "ShoppingCart",
    category: "amazon",
    path: "/services/amazon-fba",
    image: "/assets/eCommerce/5.avif",
    images: ["/assets/amazon/5.avif", "/assets/amazon/6.avif"],
    features: [
      "Storage & Inventory Management",
      "Order Fulfillment",
      "Customer Service & Returns",
      "Prime Eligibility",
      "Multi-Channel Fulfillment",
    ],
    process: [
      "Consultation | We analyze your business goals and current fulfillment setup",
      "Account Audit | Deep review of your Amazon seller account and inventory flow",
      "FBA Setup | Configure storage, shipping plans and Prime eligibility",
      "Optimization | Ongoing inventory and performance monitoring",
    ],
    stats: [
      "30% | Average Sales Increase",
      "99.9% | Inventory Accuracy",
      "98% | Customer Satisfaction",
      "50+ | Countries Reached",
    ],
    details:
      "Consumer Electronics Brand Scaling: optimized product listings and efficient inventory management led to a 30% increase in sales, 98% customer satisfaction, and 50% operational efficiency.",
  },
  {
    title: "Amazon Vendor Central",
    description:
      "Partner directly with Amazon to scale your brand — we guide you from strategy to execution for long-term growth as a first-party Amazon vendor.",
    icon: "Store",
    category: "amazon",
    path: "/services/amazon-vendor",
    image: "/assets/vendor/hero.avif",
    images: ["/assets/serviceImg/1.webp"],
    features: [
      "Bulk Selling",
      "Prime Eligibility",
      "A+ Content",
      "AMS Access",
      "Amazon-Managed Fulfillment",
    ],
    process: [
      "Consultation | We analyze your business goals",
      "Audit | Deep review of your Vendor account",
      "Strategy | Tailored marketing roadmap",
      "Execution | Campaign launch & optimization",
    ],
    stats: [
      "$606,793 | Record Monthly COGS (MOJO Outdoors)",
      "41.9% | COGS Increase Year-over-Year",
      "19.5% | Growth Rate Achieved",
    ],
    details:
      "Success Story — MOJO Outdoors: through our Vendor Central strategies, MOJO Outdoors achieved record-breaking growth, boosting year-over-year growth from 10% to 19.5%.",
  },
  {
    title: "Amazon Marketing Services (AMS)",
    description:
      "Comprehensive Amazon Marketing Services that empower brands to enhance visibility, optimize product listings, and drive conversions through Sponsored Products and Sponsored Brands campaigns.",
    icon: "TrendingUp",
    category: "amazon",
    path: "/services/amazon-marketing",
    features: [
      "Amazon Sponsored Products",
      "Amazon Sponsored Brands",
      "Audience Insights & Behavioral Targeting",
      "Account Audit & Strategy",
    ],
    process: [
      "Initial Consultation | Share your business objectives and challenges with our team",
      "Account Audit | We conduct a comprehensive review of your Amazon account",
      "Strategy Development | Based on the audit, we craft a tailored marketing strategy",
    ],
    stats: [
      "$606,793 | MOJO Outdoors Shipped COGS in December",
      "41.9% | Sales Increase",
      "30% | Tech Gadgets Inc. Sales Boost",
    ],
  },
  {
    title: "Amazon Affiliate Program",
    description:
      "Transform your digital presence into a profitable Amazon affiliate business with expert guidance on enrollment, niche selection, content strategy, and link optimization.",
    icon: "Tag",
    category: "amazon",
    path: "/services/amazon-affiliate",
    features: [
      "Program Enrollment Assistance",
      "Niche Selection & Research",
      "Content Strategy Development",
      "Affiliate Link Integration",
      "Performance Monitoring",
      "Compliance & Best Practices",
    ],
    process: [
      "Sign Up | Create your Amazon Associates account with our guidance and get approved",
      "Promote | Select relevant products and incorporate affiliate links into your content",
      "Earn | Get paid for qualifying purchases made through your affiliate links",
    ],
    stats: [
      "50% | Average Earnings Increase",
      "10M+ | Products Available",
      "24-48h | Commission Tracking",
      "$4.8B | Paid to Affiliates Industry-Wide",
    ],
  },
  {
    title: "eBay Store Solutions",
    description:
      "Transform your online store with powerful marketplace solutions that drive sales, enhance customer experience, and scale your business globally on eBay.",
    icon: "Tag",
    category: "ebay",
    path: "/services/e-bay",
    image: "/assets/eBay/1.webp",
    images: ["/assets/eBay/2.jpg", "/assets/eBay/3.jpg"],
    features: [
      "Store Setup & Optimization",
      "Fulfillment Solutions",
      "Payment Processing",
      "Seller Protection",
      "Sales Analytics",
      "Global Expansion",
    ],
    process: [
      "Account Setup | Seller registration and store configuration",
      "Product Listing | Optimized listing creation and inventory setup",
      "Launch & Promote | Store activation and marketing campaigns",
      "Scale & Grow | Performance analysis and expansion strategies",
    ],
    stats: [
      "312% | Revenue Growth (Commercial Tyre store)",
      "2.5x | Conversion Rate (Jute Boutique)",
      "98% | Positive Feedback (Handmade Crafts Shop)",
    ],
  },
  {
    title: "E-Commerce Development",
    description:
      "Strategic eCommerce development focused on user experience, conversion optimization, and revenue growth — from discovery and UX design to analytics, CRO, and A/B testing.",
    icon: "ShoppingBag",
    category: "ecommerce-dev",
    path: "/services/e-commerce",
    image: "/assets/eCommerce/4.jpg",
    images: ["/assets/eCommerce/6.jpg", "/assets/eCommerce/7.avif"],
    features: [
      "Discovery & Strategy",
      "UX/UI & Design",
      "Analytics & Tracking",
      "Conversion Rate Optimization",
      "A/B Testing",
      "Maintenance & Support",
    ],
    process: [
      "Strategic Roadmap | Co-created strategy centered around your objectives and growth milestones",
      "Design That Converts | Emotionally resonant product pages and user journeys",
      "Secure Payments | Smooth, reliable checkout across local and global gateways",
      "Mobile-First | Speed-optimized, touch-friendly layouts across all devices",
    ],
    stats: [
      "+217% | Revenue Growth (Best Electric Bike)",
      "+158% | Conversion Rate (Home Gym Equipment)",
      "+189% | Average Order Value (Commercial Tyre)",
    ],
  },
  {
    title: "Shopify Store Development",
    description:
      "We build high-performing Shopify stores that convert visitors into customers and drive sustainable growth — from store development and platform migration to custom apps and ongoing support.",
    icon: "Store",
    category: "shopify",
    path: "/services/shopify",
    features: [
      "Store Development",
      "Platform Migration",
      "App Development",
      "Marketing & SEO",
      "Maintenance & Support",
    ],
    process: [
      "Discovery | We dive deep into your business goals, target audience, and requirements",
      "Design | A stunning, user-friendly interface that reflects your brand",
      "Development | Clean code, optimized performance, seamless functionality",
      "Testing | Rigorous testing across all devices and browsers",
      "Launch | We handle the entire launch process",
      "Support | Ongoing maintenance to keep your store performing",
    ],
    stats: [
      "68% | Faster Load Times",
      "42% | Increase in Mobile Conversions",
      "$1.2M | Increased Annual Revenue (Fashion Retailer)",
    ],
  },

  // ---- Development ----
  {
    title: "Web Design & Development",
    description:
      "Beautiful, high-performance websites built with modern technologies that drive measurable business results through strategic design and clean engineering.",
    icon: "Code",
    category: "design-development",
    path: "/services/web-development",
    features: [
      "Custom Web Design",
      "Web Development (React/Next.js, Node.js)",
      "Mobile Optimization",
      "E-Commerce Solutions",
      "CMS Development",
      "Website Maintenance",
    ],
    process: [
      "Discovery | Understanding your goals and requirements",
      "Design | Creating wireframes and visual concepts",
      "Development | Building with clean code and modern tech",
      "Delivery | Testing, optimization and launch",
    ],
  },
  {
    title: "Mobile App Development",
    description:
      "Beautiful, high-performance mobile applications that drive engagement, increase revenue, and elevate your brand presence on iOS and Android.",
    icon: "Smartphone",
    category: "design-development",
    path: "/services/mobile-app",
    features: [
      "Native App Development (Swift & Kotlin)",
      "Cross-Platform Development (React Native, Flutter)",
      "UI/UX Design",
      "Backend Development",
      "App Analytics",
      "App Maintenance",
    ],
    process: [
      "Discovery | Understanding your business goals, audience, and technical requirements",
      "Design | Wireframes, prototypes, and pixel-perfect UI",
      "Development | Building with best practices and regular demos",
      "Testing | Rigorous QA across devices and scenarios",
      "Launch | App store submission and guideline compliance",
      "Growth | Post-launch analytics, updates, and optimization",
    ],
    stats: [
      "100+ | Apps Developed",
      "4.9 | Avg. Rating",
      "10M+ | Downloads",
      "24/7 | Support",
    ],
  },
  {
    title: "ERP Software Development & Integration",
    description:
      "AI-powered enterprise platforms that unify your operations with predictive analytics and intelligent automation — tailored ERP configurations for manufacturing, healthcare, retail, and construction.",
    icon: "Database",
    category: "erp",
    path: "/services/erp",
    features: [
      "AI-Powered Analytics",
      "Unified Data Platform",
      "Process Automation",
      "Global Deployment",
      "Blockchain Security",
      "Hybrid Cloud",
    ],
    process: [
      "Discovery & Planning (2-4 Weeks) | Requirements workshop, process mapping, solution design",
      "Core System Setup (4-6 Weeks) | Platform configuration, data migration, basic automation",
      "Module Implementation (6-8 Weeks) | Departmental rollouts, custom development, integration",
      "Testing & Training (3-4 Weeks) | User acceptance testing, training programs, documentation",
      "Go-Live & Support (Ongoing) | Phased rollout, hypercare support, continuous improvement",
    ],
    stats: [
      "47% | Faster Decision Making",
      "32% | Reduced Operational Costs",
      "28% | Increased Productivity",
      "63% | Improved Data Accuracy",
    ],
  },
  {
    title: "Hosting & Server Solutions",
    description:
      "Enterprise-grade server infrastructure with 99.99% uptime, global CDN, and military-grade security — spanning web hosting, cloud hosting, dedicated servers, VPS, managed hosting, and domain management.",
    icon: "Server",
    category: "hosting",
    path: "/services/server-hosting",
    features: [
      "Web Hosting",
      "Cloud Hosting",
      "Dedicated Servers",
      "VPS Hosting",
      "Managed Hosting",
      "Domain Management",
    ],
    stats: [
      "99.99% | Uptime SLA",
      "10Gbps | Network Uplink",
      "64 Cores | Max CPU Available",
      "NVMe | All-SSD Storage",
    ],
    details:
      "Web Hosting: reliable, secure, and scalable hosting tailored to your online presence.\n\nCloud Hosting: cutting-edge infrastructure designed for modern enterprises with flexible scaling.\n\nDedicated Servers: unmatched performance, security, and control for demanding workloads.\n\nVPS Hosting: a blend of performance, flexibility, and security for growing businesses.\n\nManaged Hosting: comprehensive, fully-managed server operations so your team can focus on the business.\n\nDomain Management: streamlined domain registration and DNS management so your online identity stays secure and accessible.",
  },

  // ---- Design ----
  {
    title: "UI/UX Design Services",
    description:
      "We craft intuitive, beautiful user experiences that drive engagement, conversion, and customer satisfaction through human-centered design.",
    icon: "Palette",
    category: "design-development",
    path: "/services/ui-ux-design",
    features: [
      "User Research",
      "UX Strategy",
      "UI Design",
      "Usability Testing",
      "Mobile App Design",
      "Design Optimization",
    ],
    process: [
      "Discover | Research & understand user needs and business goals",
      "Define | Synthesize findings and establish design direction",
      "Ideate | Brainstorm and explore creative solutions",
      "Prototype | Create interactive models of proposed solutions",
      "Test | Validate designs with real users and iterate",
    ],
  },

  // ---- Marketing ----
  {
    title: "Social Media Marketing",
    description:
      "We create thumb-stopping content and data-driven strategies that build communities and drive conversions across Instagram, Facebook, YouTube, and LinkedIn.",
    icon: "Share2",
    category: "digital-marketing",
    path: "/services/social-media",
    features: [
      "Platform-Specific Strategy",
      "Content Creation (Photos, Video, Stories, Live)",
      "Community Growth",
      "Paid Social Campaigns",
      "Analytics Reporting",
    ],
    stats: [
      "48,900 | Followers Grown (from 2,400)",
      "6.8% | Engagement Rate (from 1.2%)",
      "4,100/mo | Website Traffic (from 320/mo)",
    ],
  },
  {
    title: "Paid Media (SEM/PPC)",
    description:
      "Amplify your reach with targeted precision — strategic SEM/PPC roadmaps, Google Ads and Microsoft Advertising management, programmatic display, and transparent, ROI-focused reporting.",
    icon: "TrendingUp",
    category: "digital-marketing",
    path: "/services/seo",
    features: [
      "Strategic SEM/PPC Roadmap & Consultation",
      "Google Ads Campaign Management",
      "Microsoft Advertising Services",
      "Programmatic & Display Advertising",
      "A/B Testing Framework",
      "Audience Segmentation & Retargeting",
    ],
    process: [
      "Built-to-Perform Strategy | In-depth audits, documented roadmaps, budget pacing, and milestones",
      "Campaigns That Convert | Custom segments, smart bidding, and relevant creatives",
      "Smart Targeting | Blend first-party data with behavior insights",
      "Transparent Analytics | Visually rich reports with CTR, conversions, and efficiency tracking",
      "Continuous Testing | Ongoing A/B tests to refine ad formats, copy, and CTAs",
    ],
  },
  {
    title: "Content & PR",
    description:
      "Strategic storytelling and PR amplification that drive awareness, authority, and audience engagement — from content marketing to digital PR and content audits.",
    icon: "Tag",
    category: "digital-marketing",
    path: "/services/content-pr",
    features: [
      "Content Marketing",
      "Digital PR & Media Outreach",
      "Influencer Partnerships",
      "Content Auditing & Performance Analysis",
    ],
  },
  {
    title: "Branding & Identity",
    description:
      "We build brand strategies and designs that capture attention, build trust, and drive business growth — from discovery and positioning to visual identity and implementation.",
    icon: "Palette",
    category: "digital-marketing",
    path: "/services/branding",
    features: [
      "Brand Discovery & Research",
      "Brand Strategy & Positioning",
      "Visual Identity Design",
      "Brand Implementation",
      "Performance Evaluation",
    ],
    process: [
      "Discovery | Stakeholder interviews, audience analysis, market research",
      "Strategy | Brand positioning, messaging, and architecture",
      "Design | Logo, color palette, typography, and visual assets",
      "Implementation | Website, collateral, and social media branding",
      "Evaluation | Performance tracking and refinement",
    ],
    stats: [
      "+30% | Website Traffic (E-Commerce Rebrand)",
      "+25% | Sales Increase (E-Commerce Rebrand)",
    ],
  },
];

const run = async () => {
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

    for (const category of categories) {
      await ServiceCategory.findOneAndUpdate(
        { name: category.name },
        { $setOnInsert: category },
        { upsert: true, new: true },
      );
    }
    console.log(`✅ Ensured ${categories.length} service categories`);

    let created = 0;
    let updated = 0;

    for (const service of services) {
      const result = await Service.findOneAndUpdate(
        { path: service.path },
        { $set: service },
        { upsert: true, new: true, rawResult: true },
      );

      if (result.lastErrorObject?.updatedExisting) {
        updated += 1;
      } else {
        created += 1;
      }
    }

    console.log(`✅ Migrated services: ${created} created, ${updated} updated`);

    const { deletedCount } = await ServiceCategory.deleteMany({
      name: { $in: obsoleteCategoryNames },
    });
    console.log(`✅ Removed ${deletedCount} obsolete broad categories`);

    process.exit(0);
  } catch (error) {
    console.error("❌ Error migrating service content:", error.message);
    process.exit(1);
  }
};

run();
