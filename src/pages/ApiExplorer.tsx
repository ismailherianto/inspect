import { useState } from "react";
import { useApi } from "../hooks/useApi";
import Sidebar from "../components/Sidebar";
import ResponsePanel from "../components/ResponsePanel";
import { endpoints } from "../data/endpoint";
import RequestPanel from "../components/RequestPanel";
import { Joyride } from "react-joyride";
import { steps } from "../services/guide";

export default function ApiExplorer() {
  const { callApi } = useApi();

  const [selected, setSelected] = useState<any>(null);
  const [response, setResponse] = useState<any>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSend = async (ep: any, config: any) => {
    setLoading(true);
    setResponse(null);

    console.log("Config to send:", config);
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
    }

    await new Promise((res) => setTimeout(res, 300));

    const res = await callApi(ep.action, config);

    if (ep.action === "login" && res.status === 200) {
      setToken(res.data.token);
    }

    setResponse(res);
    setLoading(false);
  };

  const handleSelect = (ep: any) => {
    setSelected(ep);
    setResponse(null);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-slate-900 text-white">
      <Joyride
        steps={steps}
        run={true}
        continuous={true}
        options={{
          primaryColor: "#ff9800",
          scrollDuration: 500,
          showProgress: true,
        }}
      />
      {/* SIDEBAR */}
      <div className="w-52 border-r border-slate-700">
        <Sidebar
          endpoints={endpoints}
          selected={selected}
          onSelect={handleSelect}
        />
      </div>

      {/* MAIN AREA */}
      <div className="flex flex-1">
        {/* REQUEST PANEL */}
        <div className="w-1/2 border-r border-slate-700 p-6 overflow-auto">
          {selected && (
            <>
              <h1 className="text-lg mb-4">
                {selected.method} {selected.path}
              </h1>

              <RequestPanel
                endpoint={selected}
                onSend={(config: any) => handleSend(selected, config)}
              />
            </>
          )}
          {!selected && (
            <div className="flex flex-col items-center justify-center h-full text-slate-400">
              <svg className="w-16 h-16 mb-4" />
              <p>Select an endpoint from the sidebar to see detail.</p>
            </div>
          )}
        </div>

        {/* RESPONSE PANEL */}
        <div className="w-1/2 p-6 overflow-auto">
          <ResponsePanel response={response} loading={loading} />
        </div>
      </div>
    </div>
  );
}
