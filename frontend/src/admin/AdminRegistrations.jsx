import { useEffect, useState } from "react";
import API from "../services/api";
import Swal from "sweetalert2";

const IMAGE_BASE_URL = "https://symposium-management.onrender.com/";

export default function AdminRegistrations() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [previewImage, setPreviewImage] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState("");

  /* =========================
     FETCH REGISTRATIONS
  ========================= */
  const fetchRegistrations = async () => {
    try {
      const res = await API.get("/registrations");
      setData(res.data);
    } catch {
      Swal.fire("Error", "Failed to load registrations", "error");
    }
  };

  useEffect(() => {
    fetchRegistrations();
  }, []);

  /* =========================
     APPROVE / REJECT
  ========================= */
  const updateStatus = async (id, status) => {
    try {
      await API.put(`/registrations/${id}`, { status });
      Swal.fire("Success", `Registration ${status}`, "success");
      fetchRegistrations();
    } catch {
      Swal.fire("Error", "Status update failed", "error");
    }
  };

  /* =========================
     DELETE REGISTRATION
  ========================= */
  const deleteRegistration = async id => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This registration will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, delete it"
    });

    if (!confirm.isConfirmed) return;

    try {
      await API.delete(`/registrations/${id}`);
      Swal.fire("Deleted", "Registration removed successfully", "success");
      fetchRegistrations();
    } catch {
      Swal.fire("Error", "Delete failed", "error");
    }
  };

  /* =========================
     SEARCH FILTER
  ========================= */
  const filteredData = data.filter(r =>
    r.name?.toLowerCase().includes(search.toLowerCase()) ||
    r.email?.toLowerCase().includes(search.toLowerCase()) ||
    r.eventName?.toLowerCase().includes(search.toLowerCase())
  );

  /* =========================
     UNIQUE EVENTS
  ========================= */
  const eventList = [...new Set(data.map(r => r.eventName))];

  return (
    <div className="container-fluid p-4">
      <h3 className="fw-bold mb-3">Event Registrations</h3>

      {/* SEARCH */}
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Search by name, email or event..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      {/* REPORT GENERATION */}
      <div className="row g-2 mb-4 align-items-center">
        <div className="col-md-4">
          <select
            className="form-select"
            value={selectedEvent}
            onChange={e => setSelectedEvent(e.target.value)}
          >
            <option value="">Select Event</option>
            {eventList.map(event => (
              <option key={event} value={event}>
                {event}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-8">
          <button
            className="btn btn-outline-primary me-2"
            disabled={!selectedEvent}
            onClick={() =>
              window.open(
                `https://symposium-management.onrender.com/api/reports/csv/${selectedEvent}`,
                "_blank"
              )
            }
          >
            CSV
          </button>

          <button
            className="btn btn-outline-success me-2"
            disabled={!selectedEvent}
            onClick={() =>
              window.open(
                `https://symposium-management.onrender.com/api/reports/excel/${selectedEvent}`,
                "_blank"
              )
            }
          >
            Excel
          </button>

          <button
            className="btn btn-outline-danger"
            disabled={!selectedEvent}
            onClick={() =>
              window.open(
                `https://symposium-management.onrender.com/api/reports/pdf/${selectedEvent}`,
                "_blank"
              )
            }
          >
            PDF
          </button>
        </div>
      </div>

      {/* TABLE */}
      <div className="table-responsive">
        <table className="table table-bordered table-striped align-middle">
          <thead className="table-primary text-center">
            <tr>
              <th>Event</th>
              <th>Name</th>
              <th>College</th>
              <th>Email</th>
              <th>Payment Proof</th>
              <th>Status</th>
              <th style={{ width: "220px" }}>Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredData.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center">
                  No registrations found
                </td>
              </tr>
            ) : (
              filteredData.map(r => (
                <tr key={r._id}>
                  <td>{r.eventName}</td>
                  <td>{r.name}</td>
                  <td>{r.college}</td>
                  <td>{r.email}</td>

                  {/* PAYMENT SCREENSHOT */}
                  <td className="text-center">
                    {r.paymentScreenshot ? (
                      <img
                        src={`${IMAGE_BASE_URL}${r.paymentScreenshot}`}
                        alt="Payment"
                        className="img-thumbnail"
                        style={{ width: 60, cursor: "pointer" }}
                        onClick={() =>
                          setPreviewImage(
                            `${IMAGE_BASE_URL}${r.paymentScreenshot}`
                          )
                        }
                      />
                    ) : (
                      <span className="text-muted">N/A</span>
                    )}
                  </td>

                  {/* STATUS */}
                  <td className="text-center">
                    <span
                      className={`badge ${
                        r.status === "Approved"
                          ? "bg-success"
                          : r.status === "Rejected"
                          ? "bg-danger"
                          : "bg-warning"
                      }`}
                    >
                      {r.status || "Pending"}
                    </span>
                  </td>

                  {/* ACTION */}
                  <td className="text-center">
  {/* APPROVE */}
  <button
    className="btn btn-success btn-sm me-1"
    title="Approve"
    onClick={() => updateStatus(r._id, "Approved")}
    disabled={r.status === "Approved"}
  >
    <i className="bi bi-check-circle"></i>
  </button>

  {/* REJECT */}
  <button
    className="btn btn-danger btn-sm me-1"
    title="Reject"
    onClick={() => updateStatus(r._id, "Rejected")}
    disabled={r.status === "Rejected"}
  >
    <i className="bi bi-x-circle"></i>
  </button>

  {/* DELETE */}
  <button
    className="btn btn-outline-danger btn-sm"
    title="Delete"
    onClick={() => deleteRegistration(r._id)}
  >
    <i className="bi bi-trash"></i>
  </button>
</td>

                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* IMAGE PREVIEW MODAL */}
      {previewImage && (
        <>
          <div className="modal fade show d-block" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Payment Screenshot</h5>
                  <button
                    className="btn-close"
                    onClick={() => setPreviewImage(null)}
                  />
                </div>
                <div className="modal-body text-center">
                  <img
                    src={previewImage}
                    alt="Preview"
                    className="img-fluid rounded"
                  />
                </div>
              </div>
            </div>
          </div>

          <div
            className="modal-backdrop fade show"
            onClick={() => setPreviewImage(null)}
          />
        </>
      )}
    </div>
  );
}
