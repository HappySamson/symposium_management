import BannerSlider from "../sections/Banner";
import About from "../sections/About";
import Events from "../sections/Events";
import ScheduleSection from "../sections/ScheduleSection";
import Team from "../sections/Team";
import Contact from "../sections/Contact";

export default function Home() {
  return (
    <>
      <section id="home" className="section">
        <BannerSlider />
      </section>

      <section id="about" className="section">
        <About />
      </section>

      <section id="events" className="section">
        <Events />
      </section>

      <section id="schedule" className="section">
        <ScheduleSection />
      </section>

      <section id="team" className="section">
        <Team />
      </section>

      <section id="contact" className="section">
        <Contact />
      </section>
    </>
  );
}