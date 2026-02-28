import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

export default function AdminBanners() {
  const [banners, setBanners] = useState([]);
  const [show, setShow] = useState(false);
  const [selectedBanner, setSelectedBanner] = useState(null);

  /* ======================
     FETCH BANNERS
  ====================== */
  const fetchBanners = async () => {
    try {
      const res = await axios.get(
        "https://symposium-management.onrender.com/api/banners"
      );
      setBanners(res.data);
    } catch (err) {
      Swal.fire("Error", "Failed to load banners", "error");
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  /* ======================
     DELETE BANNER
  ====================== */
  const deleteBanner = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This banner will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Delete"
    });

    if (!result.isConfirmed) return;

    try {
      await axios.delete(
        `https://symposium-management.onrender.com/api/admin/banners/${id}`
      );

      Swal.fire({
        icon: "success",
        title: "Deleted",
        timer: 1200,
        showConfirmButton: false
      });

      fetchBanners();
    } catch {
      Swal.fire("Error", "Delete failed", "error");
    }
  };

  /* ======================
     EDIT MODAL
  ====================== */
  const openEditModal = (banner) => {
    setSelectedBanner({ ...banner });
    setShow(true);
  };

  const handleUpdate = async () => {
    try {
      const formData = new FormData();
      formData.append("title", selectedBanner.title);
      formData.append("subtitle", selectedBanner.subtitle);
      formData.append("isActive", selectedBanner.isActive.toString());

      if (selectedBanner.newImage) {
        formData.append("image", selectedBanner.newImage);
      }

      const res = await axios.put(
        `https://symposium-management.onrender.com/api/admin/banners/${selectedBanner._id}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      Swal.fire({
        icon: "success",
        title: "Updated",
        text: res.data.message,
        timer: 1500,
        showConfirmButton: false
      });

      setShow(false);
      fetchBanners();
    } catch (err) {
      Swal.fire(
        "Error",
        err.response?.data?.message || "Update failed",
        "error"
      );
    }
  };

  return (
    <div className="container py-4">
      <h3 className="fw-bold mb-4">All Banners</h3>

      <div className="row g-4">
        {banners.map((banner) => (
          <div className="col-lg-4 col-md-6" key={banner._id}>
            <div className="card shadow-sm h-100">
              <img
                src={`https://symposium-management.onrender.com/${banner.image}`}
                className="card-img-top"
                style={{ height: "180px", objectFit: "cover" }}
              />

              <div className="card-body d-flex flex-column">
                <h5 className="fw-bold">{banner.title}</h5>
                <p className="text-muted small">{banner.subtitle}</p>

                <span
                  className={`badge mb-3 ${
                    banner.isActive ? "bg-success" : "bg-secondary"
                  }`}
                >
                  {banner.isActive ? "Active" : "Inactive"}
                </span>

                <div className="mt-auto d-flex gap-2">
                  <button
                    className="btn btn-primary btn-sm w-100"
                    onClick={() => openEditModal(banner)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm w-100"
                    onClick={() => deleteBanner(banner._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ======================
          EDIT MODAL
      ====================== */}
      {show && (
        <div
          className="modal fade show d-block"
          style={{ background: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Banner</h5>
                <button
                  className="btn-close"
                  onClick={() => setShow(false)}
                />
              </div>

              <div className="modal-body">
                <input
                  className="form-control mb-2"
                  value={selectedBanner.title}
                  onChange={(e) =>
                    setSelectedBanner({
                      ...selectedBanner,
                      title: e.target.value
                    })
                  }
                  placeholder="Title"
                />

                <input
                  className="form-control mb-2"
                  value={selectedBanner.subtitle}
                  onChange={(e) =>
                    setSelectedBanner({
                      ...selectedBanner,
                      subtitle: e.target.value
                    })
                  }
                  placeholder="Subtitle"
                />

                <input
                  type="file"
                  className="form-control mb-2"
                  onChange={(e) =>
                    setSelectedBanner({
                      ...selectedBanner,
                      newImage: e.target.files[0]
                    })
                  }
                />

                <div className="form-check form-switch">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={selectedBanner.isActive}
                    onChange={(e) =>
                      setSelectedBanner({
                        ...selectedBanner,
                        isActive: e.target.checked
                      })
                    }
                  />
                  <label className="form-check-label">
                    Active Banner
                  </label>
                </div>
              </div>

              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShow(false)}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-success"
                  onClick={handleUpdate}
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
