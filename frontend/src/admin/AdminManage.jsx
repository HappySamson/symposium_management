// AdminManage.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

export default function AdminManage() {
  const [admins, setAdmins] = useState([]);
  const [formData, setFormData] = useState({
    id: null,
    name: "",
    email: "",
    password: "",
    role: "Editor",
    status: "Active",
  });
  const [isEditing, setIsEditing] = useState(false);
  const API_URL = "https://symposium-management.onrender.com/admins";

  // ===== Fetch admins on mount =====
  useEffect(() => {
    async function fetchAdmins() {
      try {
        const res = await axios.get(API_URL);
        setAdmins(res.data);
      } catch (err) {
        console.error("Error fetching admins:", err);
        Swal.fire("Error", "Failed to load admins", "error");
      }
    }
    fetchAdmins();
  }, []);

  // ===== Handle input change =====
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ===== Reset form =====
  const resetForm = () => {
    setFormData({
      id: null,
      name: "",
      email: "",
      password: "",
      role: "Editor",
      status: "Active",
    });
    setIsEditing(false);
  };

  // ===== Add or Update admin =====
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isEditing) {
        // If password is empty, don't send it to backend
        const updateData = { ...formData };
        if (!updateData.password) delete updateData.password;

        const res = await axios.put(`${API_URL}/${formData.id}`, updateData);
        setAdmins(admins.map(a => (a._id === formData.id ? res.data : a)));
        Swal.fire("Success", "Admin updated successfully", "success");
      } else {
        const res = await axios.post(API_URL, formData);
        setAdmins([...admins, res.data]);
        Swal.fire("Success", "Admin added successfully", "success");
      }
      resetForm();
    } catch (err) {
      console.error("Error submitting admin:", err);
      Swal.fire("Error", "Failed to submit admin", "error");
    }
  };

  // ===== Edit admin =====
  const handleEdit = (admin) => {
    setFormData({
      id: admin._id,
      name: admin.name,
      email: admin.email,
      password: "", // leave blank; optional to change
      role: admin.role,
      status: admin.status,
    });
    setIsEditing(true);
  };

  // ===== Delete admin =====
  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This admin will be deleted permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        setAdmins(admins.filter(a => a._id !== id));
        Swal.fire("Deleted!", "Admin has been deleted.", "success");
      } catch (err) {
        console.error("Error deleting admin:", err);
        Swal.fire("Error", "Failed to delete admin", "error");
      }
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Admin Management</h2>

      <div className="row">
        {/* ===== Form ===== */}
        <div className="col-lg-4">
          <div className="card shadow p-4">
            <h5>{isEditing ? "Edit Admin" : "Add New Admin"}</h5>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label>
                  Password {isEditing ? "(Leave blank to keep current)" : ""}
                </label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder={isEditing ? "Leave blank to keep current" : ""}
                  required={!isEditing}
                />
              </div>

              <div className="mb-3">
                <label>Role</label>
                <select
                  name="role"
                  className="form-select"
                  value={formData.role}
                  onChange={handleChange}
                >
                  <option>Super Admin</option>
                  <option>Event Manager</option>
                  <option>Editor</option>
                </select>
              </div>

              <div className="mb-3">
                <label>Status</label>
                <select
                  name="status"
                  className="form-select"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option>Active</option>
                  <option>Inactive</option>
                </select>
              </div>

              <button type="submit" className="btn btn-primary w-100">
                {isEditing ? "Update Admin" : "Add Admin"}
              </button>

              {isEditing && (
                <button
                  type="button"
                  className="btn btn-secondary w-100 mt-2"
                  onClick={resetForm}
                >
                  Cancel
                </button>
              )}
            </form>
          </div>
        </div>

        {/* ===== Table ===== */}
        <div className="col-lg-8">
          <div className="card shadow p-3">
            <h5 className="mb-3">Admin List</h5>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {admins.length > 0 ? (
                  admins.map((admin) => (
                    <tr key={admin._id}>
                      <td>{admin.name}</td>
                      <td>{admin.email}</td>
                      <td>{admin.role}</td>
                      <td>
                        <span
                          className={`badge ${
                            admin.status === "Active" ? "bg-success" : "bg-danger"
                          }`}
                        >
                          {admin.status}
                        </span>
                      </td>
                      <td>
                        <button
                          className="btn btn-sm btn-warning me-2"
                          onClick={() => handleEdit(admin)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => handleDelete(admin._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center">
                      No Admins Found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
