import { useEffect, useState } from "react";
import api from "../api/axios";

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  const fetchUsers = async () => {
    try {
      const res = await api.get("/users");
      setUsers(res.data);
    } catch (err) {
      setError("Gagal ambil data user");
    }
  };

  const updateRole = async (user, newRole) => {
    try {
      const res = await api.put(`/users/${user.id}`, {
        name: user.name,
        email: user.email,
        role: newRole,
      });

      setUsers(users.map(u =>
        u.id === user.id ? res.data : u
      ));
    } catch (err) {
      alert("Gagal update role");
    }
  };

  const deleteUser = async (user) => {
    if (!window.confirm("Hapus user?")) return;

    try {
      await api.delete(`/users/${user.id}`, {
        data: {
          name: user.name,
          email: user.email,
          role: user.role,
        },
      });

      setUsers((prev) => prev.filter((u) => u.id !== user.id));
    } catch (err) {
      alert("Gagal hapus user");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div
      style={{
        padding: 40,
        background: "linear-gradient(135deg,#020617,#020617)",
        minHeight: "100vh",
        color: "white",
        fontFamily: "Inter, system-ui, sans-serif",
      }}
    >
      <h2 style={{ marginBottom: 20 }}>Admin – User Management</h2>

      {error && (
        <p style={{ color: "#f87171", marginBottom: 15 }}>{error}</p>
      )}

      <table
        border="1"
        cellPadding="12"
        style={{
          width: "100%",
          borderCollapse: "collapse",
          background: "#020617",
        }}
      >
        <thead style={{ background: "#020617" }}>
          <tr>
            <th>Email</th>
            <th>Role</th>
            <th style={{ textAlign: "center" }}>Aksi</th>
          </tr>
        </thead>

        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.email}</td>
              <td>{u.role}</td>
              <td style={{ textAlign: "center" }}>
                <button
                  onClick={() => updateRole(u, "admin")}
                  disabled={u.role === "admin"}
                  style={{
                    padding: "6px 10px",
                    background: "#22c55e",
                    border: "none",
                    color: "black",
                    borderRadius: 4,
                    cursor: "pointer",
                    opacity: u.role === "admin" ? 0.5 : 1,
                  }}
                >
                  Admin
                </button>

                <button
                  onClick={() => updateRole(u, "user")}
                  disabled={u.role === "user"}
                  style={{
                    marginLeft: 6,
                    padding: "6px 10px",
                    background: "#eab308",
                    border: "none",
                    color: "black",
                    borderRadius: 4,
                    cursor: "pointer",
                    opacity: u.role === "user" ? 0.5 : 1,
                  }}
                >
                  User
                </button>

                <button
                  onClick={() => deleteUser(u)}
                  style={{
                    marginLeft: 6,
                    padding: "6px 10px",
                    background: "#ef4444",
                    border: "none",
                    color: "white",
                    borderRadius: 4,
                    cursor: "pointer",
                  }}
                >
                  Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <br />

      <button
        onClick={() => (window.location.href = "/dashboard")}
        style={{
          padding: "10px 16px",
          background: "#38bdf8",
          border: "none",
          color: "black",
          borderRadius: 6,
          cursor: "pointer",
        }}
      >
        ← Kembali ke Dashboard
      </button>
    </div>
  );
}

export default AdminUsers;
