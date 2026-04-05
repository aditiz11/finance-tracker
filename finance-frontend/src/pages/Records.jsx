import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import Navbar from "../components/Navbar";

export default function Records() {
  const [records, setRecords] = useState([]);
  const [form, setForm] = useState({
    amount: "",
    type: "INCOME",
    category: "",
    date: "",
  });

  const navigate = useNavigate();

  const fetchRecords = async () => {
    const res = await API.get("/records?page=0&size=10");
    setRecords(res.data.content);
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  const addRecord = async () => {
    if (!form.amount || !form.category || !form.date) {
      alert("Please fill all fields");
      return;
    }

    await API.post("/records", form);

    setForm({
      amount: "",
      type: "INCOME",
      category: "",
      date: "",
    });

    fetchRecords();
  };

  const deleteRecord = async (id) => {
    if (!window.confirm("Delete this record?")) return;
    await API.delete(`/records/${id}`);
    fetchRecords();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <Navbar />

      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        💰 Financial Records
      </h1>

      {/* ADD RECORD */}
      <div className="bg-white p-6 rounded-2xl shadow-lg mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">
          Add New Record
        </h2>

        <div className="grid md:grid-cols-4 gap-4">
          <input
            placeholder="Amount"
            value={form.amount}
            className="p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
            onChange={(e) => setForm({ ...form, amount: e.target.value })}
          />

          <input
            placeholder="Category"
            value={form.category}
            className="p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          />

          <input
            type="date"
            value={form.date}
            className="p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
            onChange={(e) => setForm({ ...form, date: e.target.value })}
          />

          <select
            value={form.type}
            className="p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
            onChange={(e) => setForm({ ...form, type: e.target.value })}
          >
            <option>INCOME</option>
            <option>EXPENSE</option>
          </select>
        </div>

        <button
          onClick={addRecord}
          className="mt-4 w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-3 rounded-lg font-semibold hover:scale-105 transition"
        >
          ➕ Add Record
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100 text-gray-600 text-sm uppercase">
              <th className="p-4">Amount</th>
              <th className="p-4">Type</th>
              <th className="p-4">Category</th>
              <th className="p-4">Date</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {records.map((r) => (
              <tr key={r.id} className="border-t hover:bg-gray-50 transition">
                <td className="p-4 font-semibold">₹ {r.amount}</td>

                <td
                  className={`p-4 font-bold ${
                    r.type === "INCOME"
                      ? "text-green-600"
                      : "text-red-500"
                  }`}
                >
                  {r.type}
                </td>

                <td className="p-4">{r.category}</td>
                <td className="p-4">{r.date}</td>


                <td className="p-4 flex justify-center gap-2">
                  <button
                    onClick={() => navigate(`/edit/${r.id}`)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  >
                    ✏️ Edit
                  </button>

                  <button
                    onClick={() => deleteRecord(r.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    🗑️ Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {records.length === 0 && (
          <p className="text-center p-6 text-gray-400">
            No records found 🚫
          </p>
        )}
      </div>
    </div>
  );
}