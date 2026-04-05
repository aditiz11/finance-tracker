import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";
import Navbar from "../components/Navbar";

export default function EditRecord() {
  const { id } = useParams();
  const nav = useNavigate();

  const [form, setForm] = useState({
    amount: "",
    type: "INCOME",
    category: "",
    date: "",
  });

  useEffect(() => {
    const fetchRecord = async () => {
      const res = await API.get(`/records/${id}`);
      setForm(res.data);
    };
    fetchRecord();
  }, [id]);

  const updateRecord = async () => {
    await API.put(`/records/${id}`, form);
    alert("Updated successfully");
    nav("/records");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <Navbar />

      <div className="flex justify-center items-center mt-10">
        <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">

          <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
            ✏️ Edit Record
          </h2>

          <input
            value={form.amount}
            placeholder="Amount"
            className="w-full mb-4 p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
            onChange={(e) => setForm({ ...form, amount: e.target.value })}
          />

          <input
            value={form.category}
            placeholder="Category"
            className="w-full mb-4 p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          />

          <input
            type="date"
            value={form.date}
            className="w-full mb-4 p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
            onChange={(e) => setForm({ ...form, date: e.target.value })}
          />

          <select
            value={form.type}
            className="w-full mb-6 p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
            onChange={(e) => setForm({ ...form, type: e.target.value })}
          >
            <option>INCOME</option>
            <option>EXPENSE</option>
          </select>

          <button
            onClick={updateRecord}
            className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-lg font-semibold hover:scale-105 transition"
          >
            ✅ Update Record
          </button>

          <button
            onClick={() => nav("/records")}
            className="w-full mt-3 bg-gray-200 py-2 rounded-lg hover:bg-gray-300"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}