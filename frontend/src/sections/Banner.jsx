import { useEffect, useState } from "react";
import API from "../services/api";
import { Link } from "react-router-dom";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./Banner.css";

export default function HeroBanner() {
  const [banners, setBanners] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  /* FETCH ACTIVE BANNERS */
  useEffect(() => {
    API.get("/api/banners/active")
      .then(res => setBanners(res.data))
      .catch(err => console.error(err));
  }, []);

  /* SYNC TEXT WITH CAROUSEL */
  useEffect(() => {
    const carousel = document.getElementById("heroCarousel");
    if (!carousel) return;

    const handleSlide = (e) => {
      setActiveIndex(e.to);
    };

    carousel.addEventListener("slid.bs.carousel", handleSlide);

    return () => {
      carousel.removeEventListener("slid.bs.carousel", handleSlide);
    };
  }, [banners]);

  if (banners.length === 0) return null;

  const activeBanner = banners[activeIndex];

  return (
    <section className="hero-section" id="home">

      {/* 💻 TECH BACKGROUND LAYER */}
      <div className="tech-background"></div>

      <div className="container hero-content">
        <div className="row align-items-center h-100">

          {/* LEFT TEXT */}
          <div className="col-md-6 hero-text fade-text">
            <span className="badge new-badge-text">NEW</span>
            <h1>{activeBanner.title}</h1>
            <p>{activeBanner.subtitle}</p>

            <Link to="/events" className="btn btn-danger btn-lg mt-3">
              Register Now
            </Link>
          </div>

          {/* RIGHT IMAGE */}
          <div className="col-md-6 d-flex justify-content-center">
            <div className="hero-image-wrapper">

              <div
                id="heroCarousel"
                className="carousel slide"
                data-bs-ride="carousel"
                data-bs-interval="3500"
              >
                <div className="carousel-inner">
                  {banners.map((banner, index) => (
                    <div
                      key={banner._id}
                      className={`carousel-item ${
                        index === 0 ? "active" : ""
                      }`}
                    >
                      <img
                        src={`https://symposium-management.onrender.com/${banner.image}`}
                        className="hero-banner-img"
                        alt={banner.title}
                      />
                    </div>
                  ))}
                </div>

                <button
                  className="carousel-control-prev"
                  type="button"
                  data-bs-target="#heroCarousel"
                  data-bs-slide="prev"
                >
                  <span className="carousel-control-prev-icon" />
                </button>

                <button
                  className="carousel-control-next"
                  type="button"
                  data-bs-target="#heroCarousel"
                  data-bs-slide="next"
                >
                  <span className="carousel-control-next-icon" />
                </button>
              </div>

              {/* GIF OVERLAY */}
              <img
                src="/new.gif"
                alt="New"
                className="new-gif-badge"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
