export default function AdminHeader() {
  const admin = JSON.parse(localStorage.getItem("admin"));

  return (
    <div className="admin-header d-flex justify-content-between align-items-center">
      <h5 className="m-0">Admin Dashboard</h5>

      <div className="d-flex align-items-center gap-2">
        <i className="bi bi-person-circle fs-4"></i>
        <span>{admin?.name}</span>
        <button
          className="btn btn-sm btn-outline-danger"
          onClick={() => {
            localStorage.clear();
            window.location.href = "/admin-login";
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}
