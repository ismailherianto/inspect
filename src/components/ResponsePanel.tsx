import ReactJson from "react-json-view";
import { motion, AnimatePresence } from "framer-motion";

export default function ResponsePanel({ response, loading }: any) {
  return (
    <div className="mt-4 response-panel flex-1">
      {/* LOADING */}
      {loading && (
        <div className="text-yellow-400 text-sm space-y-1">
          <p className="animate-pulse">⏳ Sending request...</p>
          <p className="animate-pulse">📡 Fetching data...</p>
        </div>
      )}

      {/* RESPONSE */}
      <AnimatePresence>
        {response && !loading && (
          <motion.div
            key="response"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
            className="bg-slate-800 rounded-lg border border-slate-700 overflow-hidden"
          >
            {/* HEADER */}
            <div className="flex justify-between items-center px-4 py-2 border-b border-slate-700 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-green-400 font-semibold">
                  {response.status} OK
                </span>
                <span className="text-slate-400">
                  • {response.time}
                </span>
              </div>
            </div>

            {/* BODY */}
            <div className="p-4 text-sm overflow-auto">
              <ReactJson
                src={response}
                theme="monokai"
                collapsed={false}
                enableClipboard={true}
                displayDataTypes={false}
                displayObjectSize={false}
                name={false}
                style={{ backgroundColor: "transparent" }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}