import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware to support JSON parsing
  app.use(express.json());

  // API health status proxy
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // API Route for Inquiry email dispatcher
  app.post("/api/send-email", async (req, res) => {
    try {
      const { name, phone, city, address, monthlyBill, systemSize, estCost, subsidy, netCost, emi, id, time } = req.body;

      if (!name || !phone || !city) {
        res.status(400).json({ error: "Missing required fields (name, phone, city)" });
        return;
      }

      console.log(`Received inquiry to process for forwarding: ${name} [${id || "INQUIRY"}]`);

      // Retrieve dynamic SMTP options from Env variables, defaulting to both emails
      const adminEmail = process.env.ADMIN_EMAIL || "tornadoff125@gmail.com, ayushv3322@gmail.com";
      const smtpUser = process.env.SMTP_USER || "tornadoff125@gmail.com";
      const smtpPass = process.env.SMTP_PASS || "gsns shue mmtp frrz";

      // Check if SMTP is configured. If not, bypass email trigger gracefully and inform parent client.
      if (!smtpUser || !smtpPass) {
        console.warn("SMTP_USER and/or SMTP_PASS are not configured yet in environmental parameters.");
        res.json({
          status: "saved_locally_only", 
          message: "Details received on backend perfectly! To receive automatic emails, make sure to add SMTP_USER & SMTP_PASS to Env Parameters.",
          lead: { name, phone, city, systemSize }
        });
        return;
      }

      // Configure the email transporter using standard secure connection options for GMail
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });

      // Verify connection configuration
      try {
        await transporter.verify();
        console.log("SMTP login verification successful!");
      } catch (verifyError) {
        console.error("SMTP verification failed on startup:", verifyError);
      }

      const mailOptions = {
        from: `"Save Energy Solar" <${smtpUser}>`,
        to: adminEmail,
        subject: `☀️ New Solar Inquiry From ${name} [${id || "INQUIRY"}]`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 25px; border: 1px solid #e2e8f0; border-radius: 16px; background-color: #fafafa; border-top: 5px solid #059669;">
            <div style="text-align: center; margin-bottom: 25px;">
              <h2 style="color: #047857; margin: 0; font-size: 24px; font-weight: bold; letter-spacing: -0.5px;">Save Energy</h2>
              <p style="color: #64748b; font-size: 13px; margin: 4px 0 0 0;">Automatic Lead Dispatch System</p>
            </div>
            
            <div style="background-color: #ffffff; padding: 20px; border-radius: 12px; border: 1px solid #f1f5f9; margin-bottom: 20px;">
              <h3 style="color: #0f172a; font-size: 16px; margin-top: 0; margin-bottom: 15px; border-bottom: 1px solid #f1f5f9; padding-bottom: 8px;">Customer Contact Details</h3>
              <table style="width: 100%; font-size: 14px; color: #334155; border-collapse: collapse;">
                <tr>
                  <td style="padding: 6px 0; font-weight: bold; width: 130px; color: #64748b;">Customer Name:</td>
                  <td style="padding: 6px 0; font-weight: 500; color: #0f172a;">${name}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; font-weight: bold; color: #64748b;">Mobile Number:</td>
                  <td style="padding: 6px 0; font-weight: bold; color: #059669;">
                    <a href="https://wa.me/91${phone.replace(/[^0-9]/g, "")}" style="color: #059669; text-decoration: none;">
                      +91 ${phone} (Click to WhatsApp)
                    </a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; font-weight: bold; color: #64748b;">City / Town:</td>
                  <td style="padding: 6px 0; font-weight: 500; color: #0f172a;">${city}</td>
                </tr>
                ${address ? `
                <tr>
                  <td style="padding: 6px 0; font-weight: bold; color: #64748b;">Complete Address:</td>
                  <td style="padding: 6px 0; font-weight: 500; color: #0f172a; line-height: 1.4;">${address}</td>
                </tr>
                ` : ""}
                <tr>
                  <td style="padding: 6px 0; font-weight: bold; color: #64748b;">Submitted At:</td>
                  <td style="padding: 6px 0; font-size: 12px; color: #64748b;">${time || new Date().toLocaleString("en-IN")}</td>
                </tr>
              </table>
            </div>

            <div style="background-color: #f0fdf4; padding: 20px; border-radius: 12px; border: 1px solid #dcfce7; margin-bottom: 20px;">
              <h3 style="color: #065f46; font-size: 16px; margin-top: 0; margin-bottom: 15px; border-bottom: 1px solid #bbf7d0; padding-bottom: 8px;">Calculated Installation Plan</h3>
              <table style="width: 100%; font-size: 14px; color: #065f46; border-collapse: collapse;">
                <tr>
                  <td style="padding: 6px 0; font-weight: bold; width: 170px;">Proposal ID:</td>
                  <td style="padding: 6px 0; font-weight: bold;">${id || "N/A"}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; font-weight: bold;">Monthly Electricity Bill:</td>
                  <td style="padding: 6px 0;">₹${(monthlyBill || 0).toLocaleString("en-IN")}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; font-weight: bold;">Recommended Solar Size:</td>
                  <td style="padding: 6px 0; font-weight: bold; font-size: 15px;">${systemSize || 3} kW System</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; font-weight: bold;">Capital Investment:</td>
                  <td style="padding: 6px 0;">₹${(estCost || 0).toLocaleString("en-IN")}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; font-weight: bold; color: #166534;">Eligible Gov Subsidy:</td>
                  <td style="padding: 6px 0; font-weight: bold; color: #15803d;">- ₹${(subsidy || 0).toLocaleString("en-IN")}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; font-weight: bold; color: #166534;">Net Project Cost:</td>
                  <td style="padding: 6px 0; font-weight: bold; color: #15803d;">₹${(netCost || 0).toLocaleString("en-IN")}</td>
                </tr>
                <tr style="border-top: 1px dashed #bbf7d0;">
                  <td style="padding: 12px 0 0 0; font-weight: bold; font-size: 15px; color: #047857;">Estimated EMI:</td>
                  <td style="padding: 12px 0 0 0; font-weight: 800; font-size: 18px; color: #047857;">₹${(emi || 0).toLocaleString("en-IN")} / month</td>
                </tr>
              </table>
            </div>

            <div style="text-align: center; font-size: 11px; color: #94a3b8; margin-top: 15px; border-top: 1px solid #f1f5f9; padding-top: 15px;">
              ☀️ <strong>Save Energy</strong> Solar Rooftop Solutions.<br />
              This is a digital system inquiry forwarded to your Gmail account.
            </div>
          </div>
        `,
      };

      await transporter.sendMail(mailOptions);
      res.json({
        status: "success",
        message: "Details transmitted successfully! Check your Gmail account."
      });
    } catch (err: any) {
      console.error("Mail Dispatch Failure Details:", err);
      res.status(500).json({
        error: "Internal server error triggering email dispatch.",
        details: err.message || err
      });
    }
  });

  // Vite development vs production service routers
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

startServer();
