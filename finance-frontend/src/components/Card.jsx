export default function Card({ title, value }) {
  return (
    <div className="p-6 rounded-2xl shadow bg-white">
      <h2 className="text-gray-500">{title}</h2>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}