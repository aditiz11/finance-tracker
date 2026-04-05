import { useState } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [data, setData] = useState({
    username: "",
    password: "",
    role: "ROLE_VIEWER", // safer default
  });

  const nav = useNavigate();

  const handleRegister = async () => {
    try {
      await API.post("/auth/register", data);
      alert("Registered successfully");
      nav("/login");
    } catch (err) {
      alert("Registration failed");
      console.error(err);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-r from-pink-500 to-orange-400">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-80">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

        <input
          placeholder="Username"
          className="w-full mb-3 p-2 border rounded"
          onChange={(e) => setData({ ...data, username: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-3 p-2 border rounded"
          onChange={(e) => setData({ ...data, password: e.target.value })}
        />

        <select
          className="w-full mb-4 p-2 border rounded"
          onChange={(e) => setData({ ...data, role: e.target.value })}
        >
          <option value="ROLE_ADMIN">ADMIN</option>
          <option value="ROLE_ANALYST">ANALYST</option>
          <option value="ROLE_VIEWER">VIEWER</option>
        </select>

        <button
          onClick={handleRegister}
          className="w-full bg-pink-600 text-white p-2 rounded hover:bg-pink-700"
        >
          Register
        </button>

        {/* 🔥 Redirect Link */}
        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-pink-600 font-semibold hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}