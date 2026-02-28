import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";
import AdminHeader from "../components/AdminHeader";
import "../admin/admin.css";

export default function AdminLayout() {
  return (
    <div className="d-flex">
      <AdminSidebar />

      <div className="admin-main">
        <AdminHeader />
        <div className="flex-grow-1 p-3">
          <Outlet /> {/* 🔴 REQUIRED */}
        </div>
      </div>
    </div>
  );
}
