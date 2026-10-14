import { Download, Plus, Search, SlidersHorizontal } from "lucide-react";
import { useMemo, useState } from "react";
import SectionHeader from "../components/SectionHeader";
import StationTable from "../components/StationTable";
import StatusPill from "../components/StatusPill";
import type { Station, StationStatus } from "../types";
import { filterStations } from "../utils";

interface StationsProps {
  stations: Station[];
  onAddStation: () => void;
  onSelect: (station: Station) => void;
}

export default function Stations({ stations, onAddStation, onSelect }: StationsProps) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<"All" | StationStatus>("All");
  const filtered = useMemo(() => filterStations(stations, query, status), [stations, query, status]);
  const exportCsv = () => {
    const rows = [["ID", "Name", "Location", "Status", "Available", "Total", "Power", "Energy today"], ...filtered.map((s) => [s.id, s.name, s.location, s.status, String(s.available), String(s.chargers), s.power, String(s.energyToday)])];
    const csv = rows.map((row) => row.map((value) => `"${value.replace(/"/g, '""')}"`).join(",")).join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8;" }));
    const link = document.createElement("a"); link.href = url; link.download = "voltflow-stations.csv"; link.click(); URL.revokeObjectURL(url);
  };
  return <div className="page-content">
    <SectionHeader title="Charging stations" subtitle="Manage charger locations, availability, and network health." action={<button className="primary-button" onClick={onAddStation}><Plus size={17} /> Add station</button>} />
    <div className="station-summary-grid">
      <div className="summary-tile"><span>Total stations</span><strong>{stations.length}</strong><small>Across all locations</small></div>
      <div className="summary-tile"><span>Available connectors</span><strong>{stations.reduce((sum, s) => sum + s.available, 0)}</strong><small>Ready to charge</small></div>
      <div className="summary-tile"><span>In maintenance</span><strong>{stations.filter((s) => s.status === "Maintenance").length}</strong><small>Scheduled service</small></div>
      <div className="summary-tile"><span>Network status</span><strong className="network-status-text"><span className="status-dot" /> Stable</strong><small>Last updated just now</small></div>
    </div>
    <section className="panel station-directory"><div className="directory-toolbar"><div><h3>Station directory</h3><p>{filtered.length} stations found</p></div><div className="table-tools"><label className="search-field"><Search size={16} /><input aria-label="Search stations" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search stations..." /></label><label className="filter-select"><SlidersHorizontal size={15} /><select aria-label="Filter by status" value={status} onChange={(event) => setStatus(event.target.value as "All" | StationStatus)}><option>All</option><option>Available</option><option>In use</option><option>Offline</option><option>Maintenance</option></select></label><button className="secondary-button" onClick={exportCsv}><Download size={15} /> Export</button></div></div><StationTable stations={filtered} onSelect={onSelect} /></section>
    <section className="station-cards">{stations.slice(0, 3).map((station) => <article className="panel station-card" key={station.id}><div className="station-card-top"><span className="station-symbol large"><span /></span><StatusPill status={station.status} /></div><h3>{station.name}</h3><p>{station.location}</p><div className="station-card-stats"><span>Power output</span><strong>{station.power}</strong><span>Connectors available</span><strong>{station.available} / {station.chargers}</strong></div><button className="secondary-button full-button" onClick={() => onSelect(station)}>Station details</button></article>)}</section>
  </div>;
}