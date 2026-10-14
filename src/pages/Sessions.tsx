import { BatteryCharging, CheckCircle2, CirclePause, Download, Play, Search, Square } from "lucide-react";
import { useMemo, useState } from "react";
import SectionHeader from "../components/SectionHeader";
import StatusPill from "../components/StatusPill";
import type { Session, SessionStatus } from "../types";
import { formatCurrency } from "../utils";

interface SessionsProps {
  sessions: Session[];
  onUpdate: (id: string, status: SessionStatus) => void;
}

export default function Sessions({ sessions, onUpdate }: SessionsProps) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<"All" | SessionStatus>("All");
  const filtered = useMemo(() => sessions.filter((s) => [s.id, s.driver, s.station, s.vehicle].some((v) => v.toLowerCase().includes(query.toLowerCase())) && (filter === "All" || s.status === filter)), [sessions, query, filter]);
  const active = sessions.filter((s) => s.status === "Charging").length;
  const completed = sessions.filter((s) => s.status === "Completed").length;
  return <div className="page-content">
    <SectionHeader title="Charging sessions" subtitle="Track active charging, review session history, and manage connector activity." action={<button className="secondary-button" onClick={() => window.print()}><Download size={16} /> Export report</button>} />
    <div className="session-summary-row"><div className="summary-tile"><span>Active sessions</span><strong>{active}</strong><small><i className="legend-dot green-dot" /> Charging now</small></div><div className="summary-tile"><span>Energy this shift</span><strong>246.8 <small>kWh</small></strong><small>Across all active sessions</small></div><div className="summary-tile"><span>Completed today</span><strong>{completed + 18}</strong><small>Successful charging sessions</small></div><div className="summary-tile"><span>Revenue today</span><strong>{formatCurrency(42860)}</strong><small>Session billing total</small></div></div>
    <section className="panel station-directory"><div className="directory-toolbar"><div><h3>Session activity</h3><p>Session records for the selected period</p></div><div className="table-tools"><label className="search-field"><Search size={16} /><input aria-label="Search sessions" placeholder="Search driver or ID..." value={query} onChange={(e) => setQuery(e.target.value)} /></label><select className="native-select" aria-label="Filter sessions" value={filter} onChange={(e) => setFilter(e.target.value as "All" | SessionStatus)}><option>All</option><option>Charging</option><option>Paused</option><option>Completed</option></select></div></div>
      <div className="table-scroll"><table><thead><tr><th>Session</th><th>Driver / vehicle</th><th>Station</th><th>Energy</th><th>Duration</th><th>Cost</th><th>Status</th><th>Action</th></tr></thead><tbody>{filtered.map((s) => <tr key={s.id}><td><strong>{s.id}</strong><small className="table-subtext">{s.connector}</small></td><td><strong>{s.driver}</strong><small className="table-subtext">{s.vehicle}</small></td><td>{s.station}</td><td>{s.energy.toFixed(1)} kWh</td><td>{s.duration}</td><td><strong>{formatCurrency(s.cost)}</strong></td><td><StatusPill status={s.status} /></td><td><div className="session-actions">{s.status === "Charging" && <button className="row-action" title="Pause session" aria-label={`Pause ${s.id}`} onClick={() => onUpdate(s.id, "Paused")}><CirclePause size={17} /></button>}{s.status === "Paused" && <button className="row-action" title="Resume session" aria-label={`Resume ${s.id}`} onClick={() => onUpdate(s.id, "Charging")}><Play size={16} /> </button>}{s.status !== "Completed" && <button className="row-action danger-action" title="Stop session" aria-label={`Stop ${s.id}`} onClick={() => onUpdate(s.id, "Completed")}><Square size={15} /></button>}{s.status === "Completed" && <CheckCircle2 size={17} className="completed-icon" />}</div></td></tr>)}</tbody></table>{filtered.length === 0 && <div className="empty-state">No sessions match your search.</div>}</div>
    </section>
    <div className="notice-banner"><BatteryCharging size={19} /><div><strong>Demo environment</strong><p>Session controls update the interface only. A production deployment should connect these actions to a secured charger-management API.</p></div></div>
  </div>;
}