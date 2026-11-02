const mongoose = require("mongoose");

const DEFAULT_PRIVACY_CONTENT = `
<h2>Introduction</h2>
<p>We take your privacy seriously. This Privacy Policy describes how we collect, use, and share your personal information when you visit our website or use our services.</p>
<p>By accessing our website, you agree to the terms outlined in this policy. If you do not agree with these terms, please refrain from using our website.</p>
<h2>Information We Collect</h2>
<p>We may collect the following types of information:</p>
<ul>
<li>Personal identification information (Name, email address, phone number, etc.)</li>
<li>Browser and device information (IP address, device type, browser type)</li>
<li>Usage data (pages visited, time spent on site, click patterns)</li>
<li>Cookies and similar tracking technologies</li>
<li>Information you provide when contacting us or submitting forms</li>
</ul>
<h2>How We Use Your Information</h2>
<p>We use the information we collect for various purposes:</p>
<ul>
<li>To provide and maintain our services</li>
<li>To notify you about changes to our services</li>
<li>To allow you to participate in interactive features of our website</li>
<li>To provide customer support</li>
<li>To gather analysis or valuable information to improve our website</li>
<li>To monitor the usage of our website</li>
<li>To detect, prevent and address technical issues</li>
</ul>
<h2>Cookies and Tracking</h2>
<p>We use cookies and similar tracking technologies to track activity on our website and hold certain information. Cookies are files with a small amount of data which may include an anonymous unique identifier.</p>
<p>You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our website.</p>
<h2>Data Sharing and Disclosure</h2>
<p>We may share your personal information in the following situations:</p>
<ul>
<li>With service providers to monitor and analyze the use of our website</li>
<li>For business transfers in the event of a merger or acquisition</li>
<li>With affiliates in which case we will require those affiliates to honor this policy</li>
<li>With business partners to offer you certain products, services or promotions</li>
<li>With your consent for any other purpose</li>
</ul>
<h2>Data Security</h2>
<p>The security of your data is important to us. We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.</p>
<p>However, remember that no method of transmission over the Internet or electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your personal information, we cannot guarantee its absolute security.</p>
<h2>Your Data Protection Rights</h2>
<p>Depending on your location, you may have the following data protection rights:</p>
<ul>
<li>The right to access, update or delete the information we have on you</li>
<li>The right of rectification if that information is inaccurate or incomplete</li>
<li>The right to object to our processing of your personal information</li>
<li>The right to request that we restrict the processing of your personal information</li>
<li>The right to data portability</li>
<li>The right to withdraw consent where we relied on your consent to process your information</li>
</ul>
<h2>Changes to This Privacy Policy</h2>
<p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.</p>
<p>You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.</p>
<h2>Contact Us</h2>
<p>If you have any questions about this Privacy Policy, please visit our <a href="/contact">Contact Us</a> page.</p>
`.trim();

const DEFAULT_TERMS_CONTENT = `
<h2>Agreement to Terms</h2>
<p>By accessing or using our website, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.</p>
<p>If you do not agree with any part of these terms, you must not use our website or services.</p>
<h2>Intellectual Property Rights</h2>
<p>All content on this website, including but not limited to text, graphics, logos, images, and software, is our property or that of our content suppliers and is protected by international copyright laws.</p>
<p>You may not reproduce, distribute, modify, or create derivative works of any content without our express written permission.</p>
<h2>User Responsibilities</h2>
<p>As a user of our website, you agree to:</p>
<ul>
<li>Provide accurate and complete information when required</li>
<li>Maintain the confidentiality of your account credentials</li>
<li>Not use the website for any illegal or unauthorized purpose</li>
<li>Not engage in any activity that disrupts or interferes with our services</li>
<li>Comply with all applicable laws and regulations</li>
</ul>
<h2>Prohibited Activities</h2>
<p>You may not use our website to:</p>
<ul>
<li>Violate any applicable laws or regulations</li>
<li>Harass, abuse, or harm another person</li>
<li>Submit false or misleading information</li>
<li>Upload or transmit viruses or any other malicious code</li>
<li>Spam, phish, or engage in other unethical practices</li>
<li>Attempt to gain unauthorized access to our systems</li>
</ul>
<h2>Termination</h2>
<p>We may terminate or suspend your access to our website immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.</p>
<p>Upon termination, your right to use the website will immediately cease.</p>
<h2>Limitation of Liability</h2>
<p>In no event shall we, nor our directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.</p>
<h2>Governing Law</h2>
<p>These Terms shall be governed and construed in accordance with the laws of Bangladesh, without regard to its conflict of law provisions.</p>
<p>Any disputes relating to these Terms will be subject to the exclusive jurisdiction of the courts of Bangladesh.</p>
<h2>Changes to Terms</h2>
<p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time.</p>
<p>By continuing to access or use our website after any revisions become effective, you agree to be bound by the revised terms.</p>
<h2>Have Questions?</h2>
<p>If you have any questions about these Terms, please visit our <a href="/contact">Contact Us</a> page.</p>
`.trim();

const legalPageSchema = new mongoose.Schema(
  {
    privacyPolicy: {
      title: { type: String, trim: true, default: "Privacy Policy" },
      content: { type: String, default: DEFAULT_PRIVACY_CONTENT },
    },
    termsOfService: {
      title: { type: String, trim: true, default: "Terms of Service" },
      content: { type: String, default: DEFAULT_TERMS_CONTENT },
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("LegalPage", legalPageSchema);
