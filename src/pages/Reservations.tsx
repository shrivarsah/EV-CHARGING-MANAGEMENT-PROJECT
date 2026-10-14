import { CalendarClock, Check, Clock3, Search, X } from "lucide-react";
import { useMemo, useState } from "react";
import SectionHeader from "../components/SectionHeader";
import StatusPill from "../components/StatusPill";
import type { Reservation, ReservationStatus } from "../types";

interface ReservationsProps {
  readonly reservations: Reservation[];
  readonly onUpdate: (
    id: string,
    status: ReservationStatus
  ) => void;
}

export default function Reservations({ reservations, onUpdate }: ReservationsProps) {
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => reservations.filter((r) => [r.id, r.driver, r.station].some((v) => v.toLowerCase().includes(query.toLowerCase()))), [reservations, query]);
  return <div className="page-content">
    <SectionHeader title="Reservations" subtitle="Review upcoming bookings and keep charger availability predictable." action={<button className="secondary-button" onClick={() => window.print()}><CalendarClock size={16} /> Booking report</button>} />
    <div className="reservation-banner"><div className="reservation-banner-icon"><CalendarClock size={22} /></div><div><strong>Your charging schedule at a glance</strong><p>Keep track of today's bookings and resolve pending requests before drivers arrive.</p></div><div className="reservation-banner-stat"><strong>{reservations.filter((r) => r.status === "Confirmed").length}</strong><span>Confirmed bookings</span></div></div>
    <section className="panel station-directory"><div className="directory-toolbar"><div><h3>Upcoming bookings</h3><p>{filtered.length} reservations in your schedule</p></div><label className="search-field"><Search size={16} /><input aria-label="Search reservations" placeholder="Search bookings..." value={query} onChange={(e) => setQuery(e.target.value)} /></label></div>
      <div className="table-scroll"><table><thead><tr><th>Booking ID</th><th>Driver</th><th>Station</th><th>Date</th><th>Time</th><th>Connector</th><th>Status</th><th>Manage</th></tr></thead><tbody>{filtered.map((r) => <tr key={r.id}><td><strong>{r.id}</strong></td><td>{r.driver}</td><td>{r.station}</td><td>{r.date}</td><td><span className="time-cell"><Clock3 size={14} />{r.time}</span></td><td>{r.connector}</td><td><StatusPill status={r.status} /></td><td>{r.status === "Pending" ? <div className="session-actions"><button className="approve-button" aria-label={`Confirm ${r.id}`} onClick={() => onUpdate(r.id, "Confirmed")}><Check size={15} /></button><button className="reject-button" aria-label={`Cancel ${r.id}`} onClick={() => onUpdate(r.id, "Cancelled")}><X size={15} /></button></div> : <span className="muted">—</span>}</td></tr>)}</tbody></table>{filtered.length === 0 && <div className="empty-state">No reservations found.</div>}</div>
    </section>
  </div>;
}