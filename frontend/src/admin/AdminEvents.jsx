import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import EditEventModal from "./EditEventModal";

export default function AdminEvents() {
  const [events, setEvents] = useState([]);
  const [editEvent, setEditEvent] = useState(null);

  const fetchEvents = async () => {
    const res = await axios.get("https://symposium-management.onrender.com/api/events");
    setEvents(res.data);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const deleteEvent = async (id) => {
    const confirm = await Swal.fire({
      title: "Delete Event?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc3545",
      confirmButtonText: "Delete"
    });

    if (confirm.isConfirmed) {
      await axios.delete(`http://localhost:5000/api/events/${id}`);
      Swal.fire("Deleted!", "Event removed successfully.", "success");
      fetchEvents();
    }
  };

  return (
    <div className="container-fluid">
      <h3 className="fw-bold mb-3">All Events</h3>

      <div className="table-responsive">
        <table className="table table-bordered align-middle">
          <thead className="table-dark">
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Category</th>
              <th>Venue</th>
              <th>Coordinators</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {events.map((event) => (
              <tr key={event._id}>
                <td>
                  <img
                    src={event.imageUrl}
                    alt={event.name}
                    width="80"
                    className="rounded"
                  />
                </td>

                <td className="fw-semibold">{event.name}</td>

                <td>
                  <span
                    className={`badge ${
                      event.category === "Technical"
                        ? "bg-primary"
                        : "bg-success"
                    }`}
                  >
                    {event.category}
                  </span>
                </td>

                <td>{event.venue}</td>

                <td>
                  <small>
                    <b>Faculty:</b> {event.facultyCoordinator?.name}<br />
                    <b>Student:</b> {event.studentCoordinator?.name}
                  </small>
                </td>

                <td>
                  <button
                    className="btn btn-sm btn-warning me-2"
                    onClick={() => setEditEvent(event)}
                  >
                    <i className="bi bi-pencil"></i>
                  </button>

                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => deleteEvent(event._id)}
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                </td>
              </tr>
            ))}

            {events.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center text-muted">
                  No events found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {editEvent && (
        <EditEventModal
          event={editEvent}
          onClose={() => setEditEvent(null)}
          refresh={fetchEvents}
        />
      )}
    </div>
  );
}
