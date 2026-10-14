import { ArrowRight, ArrowUpRight, BatteryCharging, Bolt, CircleGauge, MapPin, Plus, Wallet } from "lucide-react";
import MetricCard from "../components/MetricCard";
import ChartPanel from "../components/ChartPanel";
import SectionHeader from "../components/SectionHeader";
import StationTable from "../components/StationTable";
import StatusPill from "../components/StatusPill";
import { initialSessions } from "../data";
import type { PageKey, Station } from "../types";
import { formatCurrency } from "../utils";

interface OverviewProps {
  readonly stations: Station[];
  readonly onNavigate: (page: PageKey) => void;
  readonly onAddStation: () => void;
}

export default function Overview({ stations, onNavigate, onAddStation }: OverviewProps) {
  const online = stations.filter((station) => station.status !== "Offline").length;
  const activeSessions = initialSessions.filter((session) => session.status === "Charging").length;
  return <div className="page-content">
    <SectionHeader title="Good morning, Admin 👋" subtitle="Here is what is happening across your charging network today." action={<button className="primary-button" onClick={onAddStation}><Plus size={17} /> Add station</button>} />
    <div className="metric-grid">
      <MetricCard label="Total stations" value={String(stations.length).padStart(2, "0")} change="+2 this month" detail={`${online} stations reporting`} icon={MapPin} tone="violet" />
      <MetricCard label="Active sessions" value={String(activeSessions + 1).padStart(2, "0")} change="+8.2%" detail="Compared to yesterday" icon={BatteryCharging} tone="cyan" />
      <MetricCard label="Energy delivered" value="17.2 MWh" change="+12.8%" detail="Across 7 days" icon={Bolt} tone="green" />
      <MetricCard label="Revenue today" value={formatCurrency(42860)} change="+6.4%" detail="vs. previous day" icon={Wallet} tone="orange" />
    </div>
    <div className="overview-grid"><ChartPanel />
      <section className="panel network-panel"><div className="panel-heading"><div><h3>Network health</h3><p>Live infrastructure status</p></div><span className="live-indicator"><span /> Live</span></div>
        <div className="health-score"><div className="health-ring"><span>94<small>%</small></span></div><div><strong>Excellent</strong><p>Network is operating normally.</p></div></div>
        <div className="health-line"><span><i className="legend-dot green-dot" />Operational</span><strong>{stations.filter((s) => s.status === "Available" || s.status === "In use").length}</strong></div>
        <div className="health-line"><span><i className="legend-dot amber-dot" />Maintenance</span><strong>{stations.filter((s) => s.status === "Maintenance").length}</strong></div>
        <div className="health-line"><span><i className="legend-dot red-dot" />Offline</span><strong>{stations.filter((s) => s.status === "Offline").length}</strong></div>
        <button className="text-button" onClick={() => onNavigate("Stations")}>View network health <ArrowRight size={15} /></button>
      </section>
    </div>
    <section className="panel recent-panel"><div className="panel-heading"><div><h3>Charging stations</h3><p>Monitor availability and performance across locations</p></div><button className="text-button" onClick={() => onNavigate("Stations")}>View all stations <ArrowRight size={15} /></button></div><StationTable stations={stations.slice(0, 5)} /></section>
    <div className="bottom-grid">
      <section className="panel sessions-preview"><div className="panel-heading"><div><h3>Recent sessions</h3><p>Latest activity from your network</p></div><button className="icon-link" aria-label="View all sessions" onClick={() => onNavigate("Sessions")}><ArrowUpRight size={18} /></button></div>
        {initialSessions.slice(0, 4).map((session) => <div className="mini-session" key={session.id}><span className="vehicle-avatar"><CircleGauge size={17} /></span><div className="mini-session-copy"><strong>{session.driver}</strong><small>{session.station} · {session.energy} kWh</small></div><div className="mini-session-status"><StatusPill status={session.status} /><strong>{formatCurrency(session.cost)}</strong></div></div>)}
      </section>
      <section className="panel insight-panel"><span className="insight-icon"><Bolt size={20} /></span><div className="eyebrow">NETWORK INSIGHT</div><h3>Peak charging window ahead</h3><p>Usage patterns show demand typically rises between 5 PM and 8 PM. Consider ensuring high-traffic stations have enough available connectors.</p><button className="text-button" onClick={() => onNavigate("Analytics")}>Explore analytics <ArrowRight size={15} /></button></section>
    </div>
  </div>;
}