import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

export default function AdminContacts() {
  const [contacts, setContacts] = useState([]); // must stay array
  const [search, setSearch] = useState("");
  const [loadingId, setLoadingId] = useState(null);

  // =========================
  // Fetch Contacts
  // =========================
  const fetchContacts = async () => {
    try {
      const res = await axios.get("https://symposium-management.onrender.com/api/contacts");

      // ✅ FIX IS HERE
      setContacts(res.data.contacts);

    } catch (error) {
      Swal.fire("Error", "Failed to load contacts", "error");
    }
  };

  useEffect(() => {
    fetchContacts();

    const interval = setInterval(() => {
      fetchContacts();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  // =========================
  // Delete Contact
  // =========================
  const deleteContact = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This contact will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        await axios.delete(`https://symposium-management.onrender.com/api/contacts/${id}`);

        // update UI without reload
        setContacts((prev) => prev.filter((c) => c._id !== id));

        Swal.fire("Deleted!", "Contact deleted successfully.", "success");

      } catch (error) {
        Swal.fire("Error", "Failed to delete contact", "error");
      }
    }
  };

  // =========================
  // Resolve Contact
  // =========================
  const resolveContact = async (id) => {
    try {
      setLoadingId(id);

      const res = await axios.put(
        `https://symposium-management.onrender.com/api/contacts/${id}`
      );

      if (res.data.success) {
        setContacts((prev) =>
          prev.map((c) =>
            c._id === id ? { ...c, status: "Resolved" } : c
          )
        );

        Swal.fire({
          icon: "success",
          title: "Resolved!",
          text: "Contact marked as resolved and mail has sent.",
          timer: 2000,
          showConfirmButton: false,
        });
      }

    } catch (error) {
      Swal.fire("Error", "Failed to resolve contact", "error");
    } finally {
      setLoadingId(null);
    }
  };

  // =========================
  // Search Filter
  // =========================
  const filteredContacts = contacts.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mt-4">

      <h2 className="text-center mb-4 fw-bold text-primary">
        Contact Management
      </h2>

      <div className="mb-3">
        <input
          type="text"
          className="form-control shadow-sm"
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <table className="table table-bordered table-hover shadow">
        <thead className="bg-dark text-white">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Message</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {filteredContacts.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center">
                No contacts found
              </td>
            </tr>
          ) : (
            filteredContacts.map((c) => (
              <tr key={c._id}>
                <td>{c.name}</td>
                <td>{c.email}</td>
                <td>{c.phone}</td>
                <td>{c.message}</td>
                <td>
                  <span
                    className={
                      c.status === "Resolved"
                        ? "badge bg-success"
                        : "badge bg-warning text-dark"
                    }
                  >
                    {c.status}
                  </span>
                </td>
                <td>
                  <button
                    className="btn btn-success btn-sm me-2"
                    onClick={() => resolveContact(c._id)}
                    disabled={
                      c.status === "Resolved" ||
                      loadingId === c._id
                    }
                  >
                    {loadingId === c._id ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm me-1"
                          role="status"
                        ></span>
                        Resolving...
                      </>
                    ) : (
                      "Resolve"
                    )}
                  </button>

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteContact(c._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
