import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

export default function EditEventModal({ event, onClose, refresh }) {
  const [form, setForm] = useState({ ...event });

  const handleChange = (e, section = null) => {
    const { name, value } = e.target;

    if (section) {
      setForm({
        ...form,
        [section]: {
          ...form[section],
          [name]: value
        }
      });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleRuleChange = (index, value) => {
    const rules = [...form.rules];
    rules[index] = value;
    setForm({ ...form, rules });
  };

  const addRule = () => {
    setForm({ ...form, rules: [...form.rules, ""] });
  };

  const updateEvent = async () => {
    try {
      await axios.put(
        `http://localhost:5000/api/events/${form._id}`,
        form
      );

      Swal.fire("Updated!", "Event updated successfully", "success");
      refresh();
      onClose();
    } catch (error) {
      Swal.fire("Error", "Failed to update event", "error");
    }
  };

  return (
    <div className="modal fade show d-block" style={{ background: "rgba(0,0,0,0.5)" }}>
      <div className="modal-dialog modal-lg modal-dialog-scrollable">
        <div className="modal-content">

          <div className="modal-header bg-warning">
            <h5 className="modal-title">Edit Event</h5>
            <button className="btn-close" onClick={onClose}></button>
          </div>

          <div className="modal-body">

            <input
              className="form-control mb-2"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Event Name"
            />

            <select
              className="form-select mb-2"
              name="category"
              value={form.category}
              onChange={handleChange}
            >
              <option>Technical</option>
              <option>Non-Technical</option>
            </select>

            <input
              className="form-control mb-2"
              name="venue"
              value={form.venue}
              onChange={handleChange}
              placeholder="Venue"
            />

            <textarea
              className="form-control mb-2"
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Description"
            />

            <input
              className="form-control mb-2"
              name="imageUrl"
              value={form.imageUrl}
              onChange={handleChange}
              placeholder="Image URL"
            />

            {/* RULES */}
            <label className="fw-bold mt-2">Rules</label>
            {form.rules?.map((rule, i) => (
              <input
                key={i}
                className="form-control mb-1"
                value={rule}
                onChange={e => handleRuleChange(i, e.target.value)}
              />
            ))}
            <button
              className="btn btn-sm btn-secondary mt-1"
              onClick={addRule}
            >
              + Add Rule
            </button>

            <hr />

            {/* FACULTY COORDINATOR */}
            <h6>Faculty Coordinator</h6>
            {["name", "designation", "department", "phone", "email"].map(field => (
              <input
                key={field}
                className="form-control mb-2"
                name={field}
                value={form.facultyCoordinator?.[field] || ""}
                onChange={e => handleChange(e, "facultyCoordinator")}
                placeholder={field}
              />
            ))}

            <hr />

            {/* STUDENT COORDINATOR */}
            <h6>Student Coordinator</h6>
            {["name", "designation", "department", "phone", "email"].map(field => (
              <input
                key={field}
                className="form-control mb-2"
                name={field}
                value={form.studentCoordinator?.[field] || ""}
                onChange={e => handleChange(e, "studentCoordinator")}
                placeholder={field}
              />
            ))}

          </div>

          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button className="btn btn-warning" onClick={updateEvent}>
              Update Event
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
