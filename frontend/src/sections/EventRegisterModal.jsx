import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import gpayQR from "../assets/qrcode.jpeg";

export default function EventRegisterModal({ event, onClose }) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const [student, setStudent] = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
    college: ""
  });

  const [paymentScreenshot, setPaymentScreenshot] = useState(null);

  useEffect(() => {
    document.body.classList.add("modal-open");
    return () => document.body.classList.remove("modal-open");
  }, []);

  if (!event) return null;

  /* INPUT CHANGE */
  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  /* STEP 1 VALIDATION */
  const handleNext = () => {
    const { name, email, phone, department, college } = student;

    if (!name || !email || !phone || !department || !college) {
      Swal.fire("Warning", "Please fill all details", "warning");
      return;
    }
    setStep(2);
  };

  /* FINAL SUBMIT */
  const handleSubmitRegistration = async () => {
    if (!paymentScreenshot) {
      Swal.fire("Warning", "Please upload payment screenshot", "warning");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("eventId", event._id);
      formData.append("eventName", event.name);

      // ✅ MATCH BACKEND FIELD NAMES
      formData.append("name", student.name);
      formData.append("email", student.email);
      formData.append("phone", student.phone);
      formData.append("department", student.department);
      formData.append("college", student.college);

      formData.append("paymentStatus", "Completed");
      formData.append("paymentMode", "GPay");
      formData.append("paymentScreenshot", paymentScreenshot);

      await axios.post(
        "https://symposium-management.onrender.com/api/contacts/api/registrations",
        formData
      );

      Swal.fire({
        icon: "success",
        title: "Registration Successful",
        text: "Your registration has been completed! and you will get the Email ",
        confirmButtonColor: "#198754"
      });

      onClose();
    } catch (err) {
      console.error(err.response?.data || err.message);
      Swal.fire("Error", "Registration failed. Try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="modal-backdrop fade show"></div>

      <div className="modal fade show d-block" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content border-0 shadow-lg rounded-4">

            {/* HEADER */}
            <div className="modal-header bg-primary text-white">
              <h5 className="modal-title">
                Event Registration – {event.name}
              </h5>
              <button
                type="button"
                className="btn-close btn-close-white"
                onClick={onClose}
              />
            </div>

            {/* BODY */}
            <div className="modal-body p-4">

              {/* STEP 1 – DETAILS */}
              {step === 1 && (
                <>
                  <div className="mb-3">
                    <label className="fw-bold">Event</label>
                    <input className="form-control" value={event.name} readOnly />
                  </div>

                  <input className="form-control mb-2" placeholder="Student Name" name="name" onChange={handleChange} />
                  <input className="form-control mb-2" placeholder="Email" name="email" onChange={handleChange} />
                  <input className="form-control mb-2" placeholder="Phone Number" name="phone" onChange={handleChange} />
                  <input className="form-control mb-2" placeholder="Department" name="department" onChange={handleChange} />
                  <input className="form-control mb-3" placeholder="College Name" name="college" onChange={handleChange} />

                  <button className="btn btn-primary w-100" onClick={handleNext}>
                    Proceed to Payment
                  </button>
                </>
              )}

              {/* STEP 2 – QR */}
              {step === 2 && (
                <div className="text-center">
                  <h5 className="fw-bold mb-3">Scan & Pay</h5>

                  <img
                    src={gpayQR}
                    alt="GPay QR"
                    className="img-fluid border rounded p-2 mb-3"
                    style={{ maxWidth: "260px" }}
                  />

                  <p className="fw-bold text-success fs-5">Amount: ₹200</p>

                  <button
                    className="btn btn-success w-100 mt-3"
                    onClick={() => setStep(3)}
                  >
                    Next
                  </button>
                </div>
              )}

              {/* STEP 3 – SCREENSHOT */}
              {step === 3 && (
                <>
                  <h5 className="fw-bold mb-3 text-center">
                    Upload Payment Screenshot
                  </h5>

                  <input
                    type="file"
                    className="form-control mb-3"
                    accept="image/*"
                    onChange={(e) => setPaymentScreenshot(e.target.files[0])}
                  />

                  <button
                    className="btn btn-primary w-100"
                    onClick={handleSubmitRegistration}
                    disabled={loading}
                  >
                    {loading ? "Registering..." : "Submit Registration"}
                  </button>
                </>
              )}

            </div>
          </div>
        </div>
      </div>
    </>
  );
}
