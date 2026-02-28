import { useEffect, useState } from "react";
import axios from "axios";
import EventRegisterModal from "./EventRegisterModal";
import "./Event.css";

export default function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    axios
      .get("https://symposium-management.onrender.com/api/events")
      .then(res => {
        setEvents(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to load events", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <section className="container py-5 text-center">
        <h5>Loading events...</h5>
      </section>
    );
  }

  return (
    <section className="container py-5" id="events">
      <h2 className="text-center fw-bold mb-5">Our Events</h2>

      <div className="row g-4">
        {events.length === 0 ? (
          <p className="text-center">No events available</p>
        ) : (
          events.map(event => (
            <div className="col-lg-4 col-md-6" key={event._id}>
              <div className="card h-100 shadow border-0">

                {/* IMAGE */}
                <img
                  src={event.imageUrl}
                  alt={event.name}
                  className="card-img-top"
                  style={{ height: "200px", objectFit: "cover" }}
                />

                <div className="card-body d-flex flex-column">

                  {/* TITLE */}
                  <h5 className="fw-bold">{event.name}</h5>

                  {/* CATEGORY */}
                  <span className="badge bg-primary mb-2 w-fit">
                    {event.category}
                  </span>

                  {/* DESCRIPTION */}
                  <p className="desc">
                    {event.description}
                  </p>

                  {/* VENUE */}
                  <p className="mb-2">
                    <b>Venue:</b> {event.venue}
                  </p>

                  {/* RULES */}
                  {event.rules?.length > 0 && (
                    <div className="mb-3">
                      <h6 className="fw-bold mb-1">Rules</h6>
                      <ol className="small ps-3 mb-0">
                        {event.rules.map((rule, index) => (
                          <li key={index}>{rule}</li>
                        ))}
                      </ol>
                    </div>
                  )}

                  {/* COORDINATORS */}
                  <div className="table-responsive mb-3">
                    <table className="table table-sm table-bordered">
                      <thead className="table-light">
                        <tr>
                          <th>Role</th>
                          <th>Name</th>
                          <th>Department</th>
                          <th>Phone</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Faculty</td>
                          <td>{event.facultyCoordinator?.name}</td>
                          <td>{event.facultyCoordinator?.department}</td>
                          <td>{event.facultyCoordinator?.phone}</td>
                        </tr>
                        <tr>
                          <td>Student</td>
                          <td>{event.studentCoordinator?.name}</td>
                          <td>{event.studentCoordinator?.department}</td>
                          <td>{event.studentCoordinator?.phone}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* REGISTER BUTTON */}
                  <button
                    className="btn btn-primary mt-auto"
                    onClick={() => setSelectedEvent(event)}
                  >
                    Register
                  </button>

                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* REGISTER MODAL */}
      {selectedEvent && (
        <EventRegisterModal
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
        />
      )}
    </section>
  );
}
