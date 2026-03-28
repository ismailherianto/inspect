import { useEffect, useState } from "react";

export default function RequestPanel({ onSend, endpoint }: any) {
  const [params, setParams] = useState([{ key: "limit", value: "" }]);
  const [headers, setHeaders] = useState([{ key: "", value: "" }]);

  const handleChange = (
    type: string,
    index: number,
    field: string,
    value: string,
  ) => {
    const updater = type === "params" ? [...params] : [...headers];

    // @ts-ignore
    updater[index][field] = value;

    type === "params" ? setParams(updater) : setHeaders(updater);
  };

  const addRow = (type: string) => {
    const newRow = { key: "", value: "" };

    type === "params"
      ? setParams([...params, newRow])
      : setHeaders([...headers, newRow]);
  };

  const handleSend = () => {
    const formattedParams = Object.fromEntries(
      params.filter((p) => p.key).map((p) => [p.key, p.value]),
    );

    const formattedHeaders = Object.fromEntries(
      headers.filter((h) => h.key).map((h) => [h.key, h.value]),
    );

    onSend({ params: formattedParams, headers: formattedHeaders });
  };

  useEffect(() => {
    if (endpoint && endpoint.path === "/login") {
      setParams([
        { key: "username", value: "admin" },
        { key: "password", value: "admin" },
      ]);
    } else {
      setParams([{ key: "limit", value: "" }]);
    }
  }, [endpoint]);

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-lg p-4 mb-4 request-panel">
      {/* QUERY PARAMS */}
      <div className="mb-4">
        <h3 className="text-sm text-slate-400 mb-2">Customize Request</h3>
        <p className="text-xs text-slate-500 mb-2">
          Customize your request (optional). Example: limit how many projects to
          fetch.
        </p>
        {endpoint && endpoint.path === "/login" && (
          <p className=" login-hint text-xs text-slate-500 mb-2">
            Use admin/admin to login
          </p>
        )}
        {params.map((p, i) => (
          <div key={i} className="flex gap-2 mb-2">
            <input
              placeholder="e.g. limit"
              className="bg-slate-900 px-2 py-1 rounded w-1/2"
              value={p.key}
              onChange={(e) => handleChange("params", i, "key", e.target.value)}
            />
            <input
              placeholder="e.g. 10"
              className="bg-slate-900 px-2 py-1 rounded w-1/2"
              value={p.value}
              onChange={(e) =>
                handleChange("params", i, "value", e.target.value)
              }
            />
          </div>
        ))}

        <button
          onClick={() => addRow("params")}
          className="text-xs text-blue-400"
        >
          + Add Param
        </button>
      </div>

      {/* HEADERS */}
      <div className="mb-4">
        <h3 className="text-sm text-slate-400 mb-2">Headers</h3>

        {headers.map((h, i) => (
          <div key={i} className="flex gap-2 mb-2">
            <input
              placeholder="key"
              className="bg-slate-900 px-2 py-1 rounded w-1/2"
              value={h.key}
              onChange={(e) =>
                handleChange("headers", i, "key", e.target.value)
              }
            />
            <input
              placeholder="value"
              className="bg-slate-900 px-2 py-1 rounded w-1/2"
              value={h.value}
              onChange={(e) =>
                handleChange("headers", i, "value", e.target.value)
              }
            />
          </div>
        ))}

        <button
          onClick={() => addRow("headers")}
          className="text-xs text-blue-400"
        >
          + Add Header
        </button>
      </div>

      {/* BUTTON */}
      <button
        onClick={handleSend}
        className="send-request bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded text-sm"
      >
        Send Request
      </button>
    </div>
  );
}
