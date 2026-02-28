import { useState } from "react";
import API from "../services/api";
import Swal from "sweetalert2";

export default function AdminAddBanner() {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isActive, setIsActive] = useState(true);

  const submitBanner = async e => {
    e.preventDefault();

    if (!image) {
      return Swal.fire("Error", "Banner image required", "error");
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("subtitle", subtitle);
    formData.append("image", image);
    formData.append("isActive", isActive);

    try {
      await API.post("/banners", formData);
      Swal.fire("Success", "Banner added successfully", "success");

      setTitle("");
      setSubtitle("");
      setImage(null);
      setPreview(null);
      setIsActive(true);
    } catch {
      Swal.fire("Error", "Failed to add banner", "error");
    }
  };

  return (
    <div className="container p-4">
      <h3 className="fw-bold mb-4">Add Home Page Banner</h3>

      <form
        className="card shadow-sm p-4"
        onSubmit={submitBanner}
        encType="multipart/form-data"
      >
        {/* TITLE */}
        <div className="mb-3">
          <label className="form-label">Banner Title</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
          />
        </div>

        {/* SUBTITLE */}
        <div className="mb-3">
          <label className="form-label">Banner Subtitle</label>
          <input
            type="text"
            className="form-control"
            value={subtitle}
            onChange={e => setSubtitle(e.target.value)}
          />
        </div>

        {/* IMAGE */}
        <div className="mb-3">
          <label className="form-label">Banner Image</label>
          <input
            type="file"
            className="form-control"
            accept="image/*"
            onChange={e => {
              setImage(e.target.files[0]);
              setPreview(URL.createObjectURL(e.target.files[0]));
            }}
            required
          />
        </div>

        {/* PREVIEW */}
        {preview && (
          <div className="mb-3">
            <label className="form-label">Preview</label>
            <img
              src={preview}
              alt="preview"
              className="img-fluid rounded shadow"
              style={{ maxHeight: 200 }}
            />
          </div>
        )}

        {/* STATUS */}
        <div className="form-check form-switch mb-4">
          <input
            className="form-check-input"
            type="checkbox"
            checked={isActive}
            onChange={() => setIsActive(!isActive)}
          />
          <label className="form-check-label">
            Active (show on homepage)
          </label>
        </div>

        {/* SUBMIT */}
        <button className="btn btn-primary">
          <i className="bi bi-image"></i> Add Banner
        </button>
      </form>
    </div>
  );
}
