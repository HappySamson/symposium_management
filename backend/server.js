const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const connectDB = require("./config/db");

/* ROUTE IMPORTS */
const eventRoutes = require("./routes/eventRoutes");
const registrationRoutes = require("./routes/registrationRoutes");
const adminAuthRoutes = require("./routes/adminAuthRoutes");
const adminDashboardRoutes = require("./routes/adminDashboardRoutes");
const contactRoutes = require("./routes/contactRoutes");
const bannerRoutes = require("./routes/bannerRoutes");
const teamRoutes = require("./routes/teamRoutes");
const scheduleRoutes = require("./routes/scheduleRoutes");
const adminRoutes = require("./routes/adminRoutes"); // CRUD for AdminManage.jsx

const app = express();

/* MIDDLEWARE */
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

/* DATABASE CONNECTION */
connectDB();

/* API ROUTES */
app.use("/api/schedule", scheduleRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/registrations", registrationRoutes);
app.use("/api/team", teamRoutes);
app.use("/api/contacts", contactRoutes);
app.use("/api/banners", bannerRoutes);

/* ADMIN ROUTES */
app.use("/api/admin", adminAuthRoutes);
app.use("/admins", adminRoutes); // CRUD for AdminManage.jsx
app.use("/api/admin/auth", adminAuthRoutes); // login/logout routes
app.use("/api/admin/dashboard", adminDashboardRoutes); // admin dashboard
app.use("/api/admin/events", require("./routes/adminEvents")); // admin-specific events

/* ROOT TEST */
app.get("/", (req, res) => {
  res.send("Symposium Backend Running");
});

/* SERVER START */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
