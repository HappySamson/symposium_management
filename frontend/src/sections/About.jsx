import "./about.css";

const About = () => {
  return (
    <section id="about" className="about-section">
      <div className="container">
        <div className="row align-items-center">

          {/* LEFT – CONTENT */}
          <div className="col-md-7">
            <div className="about-content">

              <h2 className="about-title">
                About the Symposium & College
              </h2>

              <p className="about-text">
                TECH SYMPOSIUM 2026 is a national-level technical fest organized by the
                Department of Computer Science at XYZ Engineering College. The symposium
                serves as a platform for students across institutions to showcase their
                technical skills, creativity, and innovation.
              </p>

              <p className="about-text">
                Our college is committed to academic excellence, industry-oriented learning,
                and holistic student development. With state-of-the-art infrastructure,
                experienced faculty, and a strong research culture, XYZ Engineering College
                nurtures future engineers and technology leaders.
              </p>

              <p className="about-text">
                The symposium features a blend of technical and non-technical events including
                paper presentations, coding contests, hackathons, quizzes, workshops, and
                cultural activities. Participants gain exposure, networking opportunities,
                and hands-on experience aligned with current industry trends.
              </p>

              <ul className="about-list">
                <li>✔ National-level participation</li>
                <li>✔ Industry-oriented events</li>
                <li>✔ Experienced faculty coordinators</li>
                <li>✔ Certificates & exciting prizes</li>
              </ul>

            </div>
          </div>

          {/* RIGHT – IMAGE */}
          <div className="col-md-5 text-center mt-4 mt-md-0">
            <img
              src="https://lh5.googleusercontent.com/proxy/RH3bCcxdlKMcn_tFvcR7FBNXVdLd0_R1uyEL1qQQZgV0TfzYhSEVqjEO0ESfa6rJ2qauqdTqWH6njg"
              alt="College"
              className="img-fluid about-img"
            />
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;