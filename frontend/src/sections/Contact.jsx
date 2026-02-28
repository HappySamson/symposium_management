import { useState } from "react";
import axios from "axios";
import "./contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("");

    try {
      await axios.post("http://localhost:5000/api/contacts", formData);

      setStatus("success");
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: ""
      });

    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  return (
    <section className="contact-section" id="contact">
      <div className="contact-content">

        <h2 className="contact-title">Contact Us</h2>

        <div className="contact-card">

          {status === "success" && (
            <div className="alert contact-success text-center">
              Message sent successfully
            </div>
          )}

          {status === "error" && (
            <div className="alert contact-error text-center">
              Failed to send message
            </div>
          )}

          <form onSubmit={handleSubmit}>

            <div className="mb-3">
              <label>Name</label>
              <input
                className="form-control contact-input"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label>Email</label>
              <input
                type="email"
                className="form-control contact-input"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label>Phone Number</label>
              <input
                type="text"
                className="form-control contact-input"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label>Message</label>
              <textarea
                className="form-control contact-input"
                rows="4"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
              />
            </div>

            <button className="contact-btn">
              Send Message
            </button>

          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;