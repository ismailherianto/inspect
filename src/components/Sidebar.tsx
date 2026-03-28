import EndpointItem from "./EndPointItem";


export default function Sidebar({ endpoints, selected, onSelect }: any) {
  return (
    <div className="sidebar w-52 border-r border-slate-700 p-3 bg-slate-950">
      <h2 className="text-lg mb-4 font-semibold text-slate-300">
        Portofolio Explorer
      </h2>

      {endpoints.map((ep: any, i: number) => (
        <EndpointItem
          key={i}
          ep={ep}
          isActive={selected?.path === ep.path}
          onClick={() => onSelect(ep)}
        />
      ))}
    </div>
  );
}