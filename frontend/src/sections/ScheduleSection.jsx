import { useEffect, useState } from "react";
import axios from "axios";
import "./ScheduleSection.css";

export default function ScheduleSection() {
  const [schedules, setSchedules] = useState([]);

  useEffect(() => {
    fetchSchedules();
  }, []);

  const fetchSchedules = async () => {
    try {
      const res = await axios.get("https://symposium-management.onrender.com/api/contacts/api/schedule");
      setSchedules(res.data);
    } catch (err) {
      console.error("Error fetching schedule:", err);
    }
  };

  const getStatus = (start, end) => {
    const now = new Date();
    if (now >= new Date(start) && now <= new Date(end)) return "live";
    if (now < new Date(start)) return "upcoming";
    return "completed";
  };

  return (
    <section className="schedule-section" id="schedule">

      {/* 📦 Content */}
      <div className="schedule-content">
        <h2 className="schedule-title">Event Schedule</h2>

        <div className="timeline">
          {schedules.map((item) => {
            const status = getStatus(item.startTime, item.endTime);

            return (
              <div
                key={item._id}
                className={`timeline-item ${status}`}
              >
                <div className="timeline-dot"></div>

                <div className="schedule-card">
                  <div className="time">
                    {new Date(item.startTime).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit"
                    })} -{" "}
                    {new Date(item.endTime).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit"
                    })}
                  </div>

                  <h3>{item.title}</h3>
                  <p>{item.speaker}</p>
                  <p>{item.venue}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </section>
  );
}
