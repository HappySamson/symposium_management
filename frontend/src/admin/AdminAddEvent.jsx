import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

export default function AdminAddEvent() {
  const [form, setForm] = useState({
    name: "",
    category: "",
    venue: "",
    description: "",
    rules: [""],
    imageUrl: "",
    facultyCoordinator: {
      name: "",
      designation: "",
      department: "",
      phone: "",
      email: ""
    },
    studentCoordinator: {
      name: "",
      designation: "",
      department: "",
      phone: "",
      email: ""
    }
  });

  const handleChange = (e, section = null) => {
    const { name, value } = e.target;

    if (section) {
      setForm({
        ...form,
        [section]: { ...form[section], [name]: value }
      });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleRuleChange = (i, value) => {
    const rules = [...form.rules];
    rules[i] = value;
    setForm({ ...form, rules });
  };

  const addRule = () => {
    setForm({ ...form, rules: [...form.rules, ""] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/api/events", form);

      Swal.fire({
        icon: "success",
        title: "Event Added Successfully",
        text: "New symposium event has been created.",
        confirmButtonColor: "#0d6efd"
      });

      setForm({
        name: "",
        category: "",
        venue: "",
        description: "",
        rules: [""],
        imageUrl: "",
        facultyCoordinator: {
          name: "",
          designation: "",
          department: "",
          phone: "",
          email: ""
        },
        studentCoordinator: {
          name: "",
          designation: "",
          department: "",
          phone: "",
          email: ""
        }
      });

    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed to Add Event",
        text: "Please try again later."
      });
    }
  };

  return (
    <div className="container py-4">
      <h3 className="mb-4 fw-bold">Add Symposium Event</h3>

      <form onSubmit={handleSubmit} className="row g-3">

        <input
          className="form-control"
          placeholder="Event Name"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <select
          className="form-select"
          name="category"
          value={form.category}
          onChange={handleChange}
          required
        >
          <option value="">Select Category</option>
          <option>Technical</option>
          <option>Non-Technical</option>
        </select>

        {/* VENUE INPUT */}
        <input
          className="form-control"
          placeholder="Venue (e.g., Seminar Hall A)"
          name="venue"
          value={form.venue}
          onChange={handleChange}
          required
        />

        <textarea
          className="form-control"
          placeholder="Event Description"
          name="description"
          rows="3"
          value={form.description}
          onChange={handleChange}
          required
        />

        <input
          className="form-control"
          placeholder="Image URL"
          name="imageUrl"
          value={form.imageUrl}
          onChange={handleChange}
        />

        {/* RULES */}
        <div>
          <label className="fw-bold">Rules</label>
          {form.rules.map((rule, i) => (
            <input
              key={i}
              className="form-control mb-2"
              value={rule}
              onChange={e => handleRuleChange(i, e.target.value)}
              required
            />
          ))}
          <button
            type="button"
            className="btn btn-sm btn-outline-secondary"
            onClick={addRule}
          >
            + Add Rule
          </button>
        </div>

        {/* FACULTY COORDINATOR */}
        <h5 className="mt-4">Faculty Coordinator</h5>
        {["name", "designation", "department", "phone", "email"].map(field => (
          <input
            key={field}
            className="form-control"
            placeholder={field}
            name={field}
            value={form.facultyCoordinator[field]}
            onChange={e => handleChange(e, "facultyCoordinator")}
            required
          />
        ))}

        {/* STUDENT COORDINATOR */}
        <h5 className="mt-4">Student Coordinator</h5>
        {["name", "designation", "department", "phone", "email"].map(field => (
          <input
            key={field}
            className="form-control"
            placeholder={field}
            name={field}
            value={form.studentCoordinator[field]}
            onChange={e => handleChange(e, "studentCoordinator")}
            required
          />
        ))}

        <button className="btn btn-primary mt-3">
          Add Event
        </button>
      </form>
    </div>
  );
}
