import { useEffect, useState } from "react";
import api from "../api/axios";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);

  // ambil data user dari JWT
  const loadUser = () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const payload = JSON.parse(atob(token.split(".")[1]));
    setUser(payload);
  };

  // ambil task
  const fetchTasks = async () => {
    try {
      const res = await api.get("/tasks");
      setTasks(res.data);
    } catch (err) {
      setError("Gagal ambil data");
    }
  };

  // tambah task
  const handleAddTask = async (e) => {
    e.preventDefault();
    try {
      await api.post("/tasks", { title, description });
      setTitle("");
      setDescription("");
      fetchTasks();
    } catch (err) {
      alert("Gagal tambah task");
    }
  };

  // hapus task
  const handleDelete = async (id) => {
    if (!window.confirm("Hapus task ini?")) return;
    await api.delete(`/tasks/${id}`);
    fetchTasks();
  };

  // update status task
  const handleStatus = async (id, status) => {
    await api.patch(`/tasks/${id}/status`, { status });
    fetchTasks();
  };

  // logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  useEffect(() => {
    loadUser();
    fetchTasks();
  }, []);

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <h2>Dashboard</h2>

        <div>
          <button style={styles.logout} onClick={handleLogout}>Logout</button>

          {user?.role === "admin" && (
            <button
              style={styles.admin}
              onClick={() => (window.location.href = "/admin/users")}
            >
              Admin Panel
            </button>
          )}
        </div>
      </div>

      <div style={styles.card}>
        <h3>Tambah Task</h3>

        <form onSubmit={handleAddTask}>
          <input
            style={styles.input}
            placeholder="Judul"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <textarea
            style={styles.textarea}
            placeholder="Deskripsi"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <button style={styles.primary} type="submit">Tambah</button>
        </form>
      </div>

      <div style={styles.card}>
        <h3>List Task</h3>

        {error && <p style={styles.error}>{error}</p>}

        <ul style={{ listStyle: "none", padding: 0 }}>
          {tasks.map((task) => (
            <li key={task.id} style={styles.task}>
              <b>{task.title}</b> — {task.status}
              <p>{task.description}</p>

              <button onClick={() => handleStatus(task.id, "done")}>Selesai</button>
              <button
                style={{ marginLeft: 10 }}
                onClick={() => handleStatus(task.id, "pending")}
              >
                Pending
              </button>

              <br /><br />

              <button onClick={() => handleDelete(task.id)}>Hapus</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#020617",
    color: "white",
    padding: 30,
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  card: {
    background: "#020617",
    border: "1px solid #1e293b",
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  input: {
    width: "100%",
    padding: 10,
    marginBottom: 10,
    borderRadius: 6,
  },
  textarea: {
    width: "100%",
    padding: 10,
    marginBottom: 10,
    borderRadius: 6,
  },
  primary: {
    background: "#2563eb",
    color: "white",
    border: "none",
    padding: 10,
    borderRadius: 6,
  },
  logout: {
    background: "#dc2626",
    color: "white",
    border: "none",
    padding: 10,
    borderRadius: 6,
    marginRight: 10,
  },
  admin: {
    background: "#16a34a",
    color: "white",
    border: "none",
    padding: 10,
    borderRadius: 6,
  },
  task: {
    borderBottom: "1px solid #1e293b",
    paddingBottom: 10,
    marginBottom: 10,
  },
  error: {
    color: "#f87171",
  },
};

export default Dashboard;
