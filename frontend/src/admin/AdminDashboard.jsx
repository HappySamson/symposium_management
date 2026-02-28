import { useEffect, useState } from "react";
import axios from "axios";
import {
  FaCalendarAlt,
  FaUsers,
  FaCheckCircle,
  FaTimesCircle,
  FaAddressBook,
  FaUserTie,
  FaClipboardList,
  FaImages
} from "react-icons/fa";
import { Bar, Doughnut } from "react-chartjs-2";
import "chart.js/auto";

export default function AdminDashboard() {
  const [stats, setStats] = useState({});
  const [recent, setRecent] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://symposium-management.onrender.com/api/admin/dashboard")
      .then((res) => {
        setStats(res.data.stats || {});
        setRecent(res.data.recentRegistrations || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Dashboard API error:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <h5>Loading dashboard...</h5>;

  /* SAFE EVENT CHART DATA */
  const eventLabels = Array.isArray(stats?.eventChart?.labels)
    ? stats.eventChart.labels
    : [];

  const eventValues = Array.isArray(stats?.eventChart?.values)
    ? stats.eventChart.values.map((v) => Number(v))
    : [];

  return (
    <>
      {/* ================= STAT CARDS ================= */}
      <div className="row g-4 mb-4">

        <DashboardCard title="Total Events" value={stats.totalEvents || 0} color="primary" icon={<FaCalendarAlt />} />
        <DashboardCard title="Total Registrations" value={stats.totalRegistrations || 0} color="success" icon={<FaClipboardList />} />
        <DashboardCard title="Technical Events" value={stats.technicalEvents || 0} color="warning" icon={<FaCheckCircle />} />
        <DashboardCard title="Non-Technical Events" value={stats.nonTechnicalEvents || 0} color="info" icon={<FaTimesCircle />} />
        <DashboardCard title="Contacts" value={stats.contacts || 0} color="danger" icon={<FaAddressBook />} />
        <DashboardCard title="Total Admins" value={stats.totalAdmins || 0} color="secondary" icon={<FaUserTie />} />
        <DashboardCard title="Core-Team" value={stats.teams || 0} color="dark" icon={<FaUsers />} />
        <DashboardCard title="Banners" value={stats.banner || 0} color="primary" icon={<FaImages />} />

      </div>

      {/* ================= CHARTS ================= */}
      <div className="row mb-4">

        {/* BAR CHART */}
        <div className="col-md-8">
          <div className="card shadow-sm">
            <div className="card-header fw-bold">
              Registrations per Event
            </div>
            <div className="card-body">
              {eventLabels.length > 0 ? (
                <Bar
  data={{
    labels: eventLabels,
    datasets: [
      {
        label: "Registrations",
        data: eventValues,
        backgroundColor: eventLabels.map((_, index) =>
          `hsl(${(index * 360) / eventLabels.length}, 70%, 55%)`
        ),
        borderRadius: 8
      }
    ]
  }}
  options={{
    responsive: true,
    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          precision: 0
        }
      }
    }
  }}
/>
              ) : (
                <p className="text-muted text-center">
                  No event registration data available
                </p>
              )}
            </div>
          </div>
        </div>

        {/* DOUGHNUT CHART */}
        <div className="col-md-4">
          <div className="card shadow-sm">
            <div className="card-header fw-bold">
              Event Category Split
            </div>
            <div className="card-body">
              {(stats.technicalEvents || stats.nonTechnicalEvents) ? (
                <Doughnut
                  data={{
                    labels: ["Technical", "Non-Technical"],
                    datasets: [
                      {
                        data: [
                          Number(stats.technicalEvents || 0),
                          Number(stats.nonTechnicalEvents || 0)
                        ],
                        backgroundColor: ["#22c55e", "#06b6d4"]
                      }
                    ]
                  }}
                />
              ) : (
                <p className="text-muted text-center">
                  No category data available
                </p>
              )}
            </div>
          </div>
        </div>

      </div>

      {/* ================= RECENT REGISTRATIONS ================= */}
      <div className="card shadow-sm">
        <div className="card-header fw-bold">
          Recent Registrations
        </div>
        <div className="card-body p-0">
          <table className="table table-hover mb-0">
            <thead className="table-dark">
              <tr>
                <th>Student</th>
                <th>Email</th>
                <th>Event</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
  {recent.length > 0 ? (
    recent.map((r, index) => (
      <tr key={r._id || index}>
        <td>{r.name}</td>
        <td>{r.email}</td>
        <td>{r.eventName}</td>
        <td>{new Date(r.createdAt).toLocaleDateString()}</td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="4" className="text-center text-muted">
        No registrations yet
      </td>
    </tr>
  )}
</tbody>
          </table>
        </div>
      </div>
    </>
  );
}

/* ================= CARD COMPONENT ================= */
function DashboardCard({ title, value, color, icon }) {
  return (
    <div className="col-md-3">
      <div className={`card text-white bg-${color} shadow`}>
        <div className="card-body d-flex justify-content-between align-items-center">
          <div>
            <h6 className="mb-1">{title}</h6>
            <h3 className="mb-0">{value}</h3>
          </div>
          <div style={{ fontSize: "2.5rem", opacity: 0.7 }}>
            {icon}
          </div>
        </div>
      </div>
    </div>
  );
}
