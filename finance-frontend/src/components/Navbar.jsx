import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="bg-white shadow-md p-4 flex justify-between items-center mb-6 rounded-xl">
      <h1 className="text-xl font-bold text-indigo-600">
         Finance Tracker
      </h1>

      <div className="flex gap-4">
        <Link
          to="/dashboard"
          className="text-gray-700 hover:text-indigo-600 font-medium"
        >
          Dashboard
        </Link>

        <Link
          to="/records"
          className="text-gray-700 hover:text-indigo-600 font-medium"
        >
          Records
        </Link>

        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-1 rounded-lg hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
}