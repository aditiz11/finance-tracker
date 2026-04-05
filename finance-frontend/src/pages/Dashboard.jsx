import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

export default function Dashboard() {
  const [summary, setSummary] = useState({
    income: 0,
    expense: 0,
    balance: 0,
  });

  const [chartData, setChartData] = useState([]);

  const fetchSummary = async () => {
    const res = await API.get("/records?page=0&size=100");
    const data = res.data.content;

    let income = 0;
    let expense = 0;

    data.forEach((r) => {
      if (r.type === "INCOME") income += r.amount;
      else expense += r.amount;
    });

    setSummary({
      income,
      expense,
      balance: income - expense,
    });

    // 👇 Pie chart data
    setChartData([
      { name: "Income", value: income },
      { name: "Expense", value: expense },
    ]);
  };

  useEffect(() => {
    fetchSummary();
  }, []);

  const COLORS = ["#22c55e", "#ef4444"];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <Navbar />

      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        📊 Dashboard
      </h1>

      {/* CARDS */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow-lg hover:scale-105 transition">
          <h2 className="text-gray-500 text-sm">Total Income</h2>
          <p className="text-2xl font-bold text-green-600 mt-2">
            ₹ {summary.income}
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-lg hover:scale-105 transition">
          <h2 className="text-gray-500 text-sm">Total Expense</h2>
          <p className="text-2xl font-bold text-red-500 mt-2">
            ₹ {summary.expense}
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-lg hover:scale-105 transition">
          <h2 className="text-gray-500 text-sm">Balance</h2>
          <p
            className={`text-2xl font-bold mt-2 ${
              summary.balance >= 0
                ? "text-green-600"
                : "text-red-500"
            }`}
          >
            ₹ {summary.balance}
          </p>
        </div>
      </div>

      {/* CHARTS SECTION */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">

        {/* PIE CHART */}
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">
            Income vs Expense
          </h2>

          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
                label
              >
                {chartData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* BAR CHART */}
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">
            Overview
          </h2>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* QUICK ACTIONS */}
      <div className="bg-white p-6 rounded-2xl shadow-lg">
        <h2 className="text-lg font-semibold mb-4 text-gray-700">
          Quick Actions
        </h2>

        <div className="flex gap-4">
          <a
            href="/records"
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition"
          >
            📂 View Records
          </a>

          <a
            href="/records"
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition"
          >
            ➕ Add Record
          </a>
        </div>
      </div>
    </div>
  );
}