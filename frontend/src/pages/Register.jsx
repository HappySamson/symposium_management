import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Register = () => {
  const { eventId } = useParams();

  const [event, setEvent] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    college: "",
    email: "",
    phone: "",
  });

  /* FETCH EVENT */
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/events/${eventId}`)
      .then(res => setEvent(res.data))
      .catch(() => setError("Event not found"));
  }, [eventId]);

  /* INPUT HANDLER */
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  /* SUBMIT */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const res = await axios.post(
        "http://localhost:5000/api/registrations",
        {
          ...formData,
          eventId,
        }
      );

      if (res.data.success) {
        setSuccess(res.data.message);
        setFormData({
          name: "",
          college: "",
          email: "",
          phone: "",
        });
      }
    } catch (err) {
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };

  if (!event) return <p className="text-center mt-5">Loading...</p>;

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-lg border-0">
            <div className="card-header bg-primary text-white text-center">
              <h4 className="mb-0">Register for {event.name}</h4>
            </div>

            <div className="card-body p-4">
              {error && (
                <div className="alert alert-danger text-center">
                  {error}
                </div>
              )}

              {success && (
                <div className="alert alert-success text-center">
                  {success}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                {/* EVENT NAME */}
                <input
                  className="form-control mb-3"
                  value={event.name}
                  readOnly
                />

                <input
                  name="name"
                  className="form-control mb-3"
                  placeholder="Student Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />

                <input
                  name="college"
                  className="form-control mb-3"
                  placeholder="College Name"
                  value={formData.college}
                  onChange={handleChange}
                  required
                />

                <input
                  type="email"
                  name="email"
                  className="form-control mb-3"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />

                <input
                  name="phone"
                  className="form-control mb-4"
                  placeholder="Mobile Number"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />

                <button className="btn btn-success w-100 fw-bold">
                  Submit Registration
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
