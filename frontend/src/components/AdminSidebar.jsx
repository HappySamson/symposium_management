import { NavLink } from "react-router-dom";
import { useState } from "react";

export default function AdminSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);

  const toggleMenu = (menu) => {
    if (collapsed) return;
    setOpenMenu(openMenu === menu ? null : menu);
  };

  return (
    <>
      {/* Mobile Toggle */}
      <button className="mobile-toggle" onClick={() => setMobileOpen(true)}>
        <i className="bi bi-list"></i>
      </button>

      {mobileOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <div
        className={`admin-sidebar ${
          collapsed ? "collapsed" : ""
        } ${mobileOpen ? "mobile-open" : ""}`}
      >
        {/* Header */}
        <div className="sidebar-header">
          {!collapsed && <h5 className="m-0 text-white">Admin Panel</h5>}

          <div className="d-flex gap-2">
            {/* Desktop collapse */}
            <button
              className="toggle-btn d-none d-md-inline"
              onClick={() => setCollapsed(!collapsed)}
            >
              <i
                className={`bi ${
                  collapsed ? "bi-list" : "bi-chevron-left"
                }`}
              />
            </button>

            {/* Mobile close */}
            <button
              className="toggle-btn d-md-none"
              onClick={() => setMobileOpen(false)}
            >
              <i className="bi bi-x-lg" />
            </button>
          </div>
        </div>

        {/* Dashboard */}
        <NavLink
          to="/admin"
          end
          className="menu"
          onClick={() => setMobileOpen(false)}
        >
          <i className="bi bi-speedometer2" />
          <span>Dashboard</span>
        </NavLink>

        {/* EVENTS */}
        <div className={`dropdown ${openMenu === "events" ? "open" : ""}`}>
          <div className="menu-title" onClick={() => toggleMenu("events")}>
            <i className="bi bi-calendar-event" />
            <span>Events</span>
            {!collapsed && <i className="bi bi-chevron-down" />}
          </div>

          <div className="submenu">
            <NavLink
              to="/admin/add-event"
              className="submenu-item"
              onClick={() => setMobileOpen(false)}
            >
              Add Event
            </NavLink>
            <NavLink
              to="/admin/events"
              className="submenu-item"
              onClick={() => setMobileOpen(false)}
            >
              All Events
            </NavLink>
          </div>
        </div>

        {/* Registrations */}
        <NavLink
          to="/admin/registrations"
          className="menu"
          onClick={() => setMobileOpen(false)}
        >
          <i className="bi bi-journal-check" />
          <span>Registrations</span>
        </NavLink>

        {/* HOME BANNERS */}
        <div className={`dropdown ${openMenu === "banners" ? "open" : ""}`}>
          <div className="menu-title" onClick={() => toggleMenu("banners")}>
            <i className="bi bi-images" />
            <span>Home Banners</span>
            {!collapsed && <i className="bi bi-chevron-down" />}
          </div>

          <div className="submenu">
            <NavLink
              to="/admin/banners/add"
              className="submenu-item"
              onClick={() => setMobileOpen(false)}
            >
              Add Banner
            </NavLink>
            <NavLink
              to="/admin/banners"
              className="submenu-item"
              onClick={() => setMobileOpen(false)}
            >
              All Banners
            </NavLink>
          </div>
        </div>

        {/* Coordinators */}
        <NavLink
  to="/admin/team"
  className="menu"
  onClick={() => setMobileOpen(false)}
>
  <i className="bi bi-people-fill" />
  <span>Core Team</span>
</NavLink>

        {/* Contacts */}
        <NavLink
          to="/admin/Contact"
          className="menu"
          onClick={() => setMobileOpen(false)}
        >
          <i className="bi bi-envelope-at" />
          <span>Contacts</span>
        </NavLink>


        <NavLink
  to="/admin/manage"
  className="menu"
  onClick={() => setMobileOpen(false)}
>
  <i className="bi bi-people"></i>
  <span>Admin Management</span>
</NavLink>
      </div>
    </>
  );
}
