import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import '@fortawesome/fontawesome-free/css/all.min.css';
import Footer from "./components/Footer";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import BannerSlider from "./sections/Banner";
import Home from "./pages/Home";
import Register from "./pages/Register";
import AdminLogin from "./pages/AdminLogin";
import AdminProtectedRoute from "./components/AdminProtectedRoute";

/* ADMIN */
import AdminLayout from "./layouts/AdminLayout";
import AdminDashboard from "./admin/AdminDashboard";
import AdminManage from "./admin/AdminManage"; 
import AdminBanners from "./admin/AdminBanners";
import AdminTeam  from "./admin/AdminTeam";
import AdminContacts from "./admin/AdminContact";
import AdminAddEvent from "./admin/AdminAddEvent";
import AdminAddBanner from "./admin/AdminAddBanner";
import AdminEvents from "./admin/AdminEvents";
import AdminRegistrations from "./admin/AdminRegistrations";
import AdminReports from "./admin/AdminReports";

/* USER LAYOUT */
const UserLayout = ({ children }) => (
  <>
    <Navbar />
    <div className="main-content">
      {children}
    </div>
    <Footer />
  </>
);

function App() {
  return (
    <Router>
      <Routes>

        {/* ---------- USER ROUTES ---------- */}
        <Route
          path="/"
          element={
            <UserLayout>
              <Home />
            </UserLayout>
          }
        />

        <Route
          path="/register/:eventId"
          element={
            <UserLayout>
              <Register />
            </UserLayout>
          }
        />

        {/* ---------- ADMIN LOGIN ---------- */}
        <Route path="/admin-login" element={<AdminLogin />} />

        {/* ---------- ADMIN PROTECTED ROUTES ---------- */}
        <Route
          path="/admin"
          element={
            <AdminProtectedRoute>
              <AdminLayout />
            </AdminProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="add-event" element={<AdminAddEvent />} />
          <Route path="/admin/banners" element={<AdminBanners />} />
          <Route path="/admin/banners/add" element={<AdminAddBanner />} />
          <Route path="/admin/manage" element={<AdminManage />} />
          <Route path="/admin/team" element={<AdminTeam />} />
          <Route path="/admin/contact" element={<AdminContacts />} />
          <Route path="events" element={<AdminEvents />} />
          <Route path="registrations" element={<AdminRegistrations />} />
          <Route path="reports" element={<AdminReports />} />
        </Route>

      </Routes>
    </Router>
  );
}

export default App;
