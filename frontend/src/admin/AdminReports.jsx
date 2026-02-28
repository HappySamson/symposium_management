import { useEffect, useState } from "react";
import API from "../services/api";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer
} from "recharts";

export default function AdminReports() {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    API.get("/registrations").then(res => {
      const counts = {};
      res.data.forEach(r => {
        counts[r.eventTitle] = (counts[r.eventTitle] || 0) + 1;
      });

      setChartData(
        Object.keys(counts).map(key => ({
          event: key,
          count: counts[key]
        }))
      );
    });
  }, []);

  return (
    <div className="container-fluid">
      <h3>Registrations Report</h3>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <XAxis dataKey="event" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#0d6efd" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
