import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AdminLogin.css";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  /* Mouse Glow */
  useEffect(() => {
    const glow = document.querySelector(".admin-mouse-glow");

    const move = (e) => {
      if (!glow) return;
      glow.style.setProperty("--x", `${e.clientX}px`);
      glow.style.setProperty("--y", `${e.clientY}px`);
    };

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post(
        "https://symposium-management.onrender.com/api/contacts/api/admin/login",
        { email, password }
      );

      localStorage.setItem("adminLoggedIn", "true");
      localStorage.setItem("adminName", res.data.adminName);
      localStorage.setItem("admin", JSON.stringify(res.data));

      setTimeout(() => {
        navigate("/admin");
      }, 1000);
    } catch (err) {
      setError("Invalid email or password");
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-page">

      <div className="admin-mouse-glow"></div>
      <div className="admin-grid-bg"></div>

      <div className="admin-card">

        {/* Animated AI Logo */}
        {/* <div className="ai-logo">
          <div className="logo-ring"></div>
          <div className="logo-core">AI</div>
        </div> */}

        {/* Avatar Circle */}
        <div className="admin-avatar">
          👤
        </div>

        <h3 className="admin-title">Admin Panel</h3>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleLogin}>
          <input
            className="admin-input"
            type="email"
            placeholder="Admin Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <div className="password-wrapper">
            <input
              className="admin-input"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <span
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </span>
          </div>

          <button className="admin-btn" disabled={loading}>
            {loading ? <span className="loader"></span> : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
