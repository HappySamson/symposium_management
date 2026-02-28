import { useEffect, useState } from "react";
import axios from "axios";

const AdminTeam = () => {
  const [team, setTeam] = useState([]);
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    role: "",
    category: "",
    department: "",
    image: null
  });

  const fetchTeam = async () => {
    const res = await axios.get("http://localhost:5000/api/team");
    setTeam(res.data);
  };

  useEffect(() => {
    fetchTeam();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("role", form.role);
    formData.append("category", form.category);
    formData.append("department", form.department);

    if (form.image) {
      formData.append("image", form.image);
    }

    if (editId) {
      await axios.put(
        `http://localhost:5000/api/team/${editId}`,
        formData
      );
      setEditId(null);
    } else {
      await axios.post(
        "http://localhost:5000/api/team",
        formData
      );
    }

    setForm({
      name: "",
      role: "",
      category: "",
      department: "",
      image: null
    });

    fetchTeam();
  };

  const handleEdit = (member) => {
    setEditId(member._id);
    setForm({
      name: member.name,
      role: member.role,
      category: member.category,
      department: member.department,
      image: null
    });
  };

  const handleDelete = async (id) => {
    await axios.delete(
      `http://localhost:5000/api/team/${id}`
    );
    fetchTeam();
  };

  return (
    <div className="container py-5">
      <h2>Admin - Manage Core Team</h2>

      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          placeholder="Name"
          className="form-control mb-2"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
          required
        />

        <input
          type="text"
          placeholder="Role"
          className="form-control mb-2"
          value={form.role}
          onChange={(e) =>
            setForm({ ...form, role: e.target.value })
          }
          required
        />

        <input
          type="text"
          placeholder="Category"
          className="form-control mb-2"
          value={form.category}
          onChange={(e) =>
            setForm({ ...form, category: e.target.value })
          }
          required
        />

        <input
          type="text"
          placeholder="Department"
          className="form-control mb-2"
          value={form.department}
          onChange={(e) =>
            setForm({ ...form, department: e.target.value })
          }
          required
        />

        <input
          type="file"
          accept="image/*"
          className="form-control mb-2"
          onChange={(e) =>
            setForm({ ...form, image: e.target.files[0] })
          }
        />

        <button type="submit" className="btn btn-primary">
          {editId ? "Update Member" : "Add Member"}
        </button>
      </form>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Name</th>
            <th>Role</th>
            <th>Category</th>
            <th>Department</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {team.map((member) => (
            <tr key={member._id}>
              <td>{member.name}</td>
              <td>{member.role}</td>
              <td>{member.category}</td>
              <td>{member.department}</td>
              <td>
                <img
                  src={member.imageUrl}
                  width="60"
                  alt=""
                />
              </td>
              <td>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => handleEdit(member)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() =>
                    handleDelete(member._id)
                  }
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminTeam;