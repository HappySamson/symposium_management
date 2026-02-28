import { useEffect, useState } from "react";
import axios from "axios";
import "./Team.css";

const Team = () => {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);   // ✅ FIX ADDED
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/team")
      .then(res => {
        setTeam(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError("Failed to load team data");
        setLoading(false);
      });
  }, []);

  return (
    <section className="team-section" id="team">
      <h2 className="text-center team-title">
        Symposium Core Team
      </h2>

      {loading && (
        <div className="text-center team-loading">
          Loading Team...
        </div>
      )}

      {error && (
        <div className="text-center text-danger">
          {error}
        </div>
      )}

      {!loading && !error && (
        <div className="row g-4">
          {team.map(member => (
            <div key={member._id} className="col-md-3 col-sm-6">
              <div className="team-card h-100 text-center">

                <div className="team-img-wrapper">
                  <img
                    src={member.imageUrl}
                    alt={member.name}
                    className="team-img"
                  />
                </div>

                <div className="team-card-body">
                  <h5 className="team-name">{member.name}</h5>
                  <span className="team-role">
                    {member.role}
                  </span>
                  <p className="team-info">
                    {member.category} – {member.department}
                  </p>
                </div>

              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Team;