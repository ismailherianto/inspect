import { motion } from "framer-motion";

export default function EndpointItem({ ep, isActive, onClick }: any) {
  // Set method color based on HTTP method
  const methodColor =
    ep.method === "GET"
      ? "text-green-400"
      : ep.method === "POST"
        ? "text-blue-400"
        : "text-gray-400";

  return (
    <motion.div
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      className={`cursor-pointer mb-2 p-2 rounded flex items-center justify-between transition
        ${isActive ? "bg-slate-800" : "hover:bg-slate-800"}
      `}
    >
      <div>
        <span className={`${methodColor} mr-2 font-semibold`}>{ep.method}</span>
        <span className="text-slate-300">{ep.path}</span>
      </div>
    </motion.div>
  );
}
