import { useState } from "react";
import api from "../api/axios";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      await api.post("/auth/register", {
        name,
        email,
        password,
      });

      setSuccess("Register berhasil, silakan login");
      setName("");
      setEmail("");
      setPassword("");

      setTimeout(() => {
        window.location.href = "/login";
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.error || "Register gagal");
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2>Register</h2>

        {error && <p style={styles.error}>{error}</p>}
        {success && <p style={styles.success}>{success}</p>}

        <form onSubmit={handleRegister}>
          <input
            style={styles.input}
            placeholder="Nama"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            style={styles.input}
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            style={styles.input}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button style={styles.primary} type="submit">Register</button>
        </form>

        <hr />

        <p>
          Sudah punya akun? <a href="/login">Login</a>
        </p>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#020617",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
  },
  card: {
    background: "#020617",
    border: "1px solid #1e293b",
    padding: 30,
    borderRadius: 10,
    width: 320,
  },
  input: {
    width: "100%",
    padding: 10,
    marginBottom: 10,
    borderRadius: 6,
  },
  primary: {
    width: "100%",
    padding: 10,
    background: "#2563eb",
    border: "none",
    color: "white",
    borderRadius: 6,
  },
  error: {
    color: "#f87171",
  },
  success: {
    color: "#4ade80",
  },
};

export default Register;
