import { Activity, BatteryCharging, CalendarClock, ChartNoAxesCombined, LayoutDashboard, MapPin, PlugZap, Settings, ShieldCheck, X } from "lucide-react";
import type { PageKey } from "../types";

interface SidebarProps {
  page: PageKey;
  onNavigate: (page: PageKey) => void;
  open: boolean;
  onClose: () => void;
}

const navItems = [
  { label: "Overview", icon: LayoutDashboard },
  { label: "Stations", icon: MapPin },
  { label: "Sessions", icon: BatteryCharging },
  { label: "Reservations", icon: CalendarClock },
  { label: "Analytics", icon: ChartNoAxesCombined }
] as const;

export default function Sidebar({ page, onNavigate, open, onClose }: SidebarProps) {
  return (
    <>
      {open && <button className="mobile-scrim" aria-label="Close navigation" onClick={onClose} />}
      <aside className={`sidebar ${open ? "sidebar-open" : ""}`}>
        <div className="brand-row">
          <div className="brand-mark"><PlugZap size={22} /></div>
          <div><strong>voltflow</strong><span>CHARGE NETWORK</span></div>
          <button className="icon-button sidebar-close" aria-label="Close menu" onClick={onClose}><X size={18} /></button>
        </div>
        <div className="workspace-label">WORKSPACE</div>
        <nav className="main-nav" aria-label="Main navigation">
          {navItems.map(({ label, icon: Icon }) => (
            <button key={label} className={`nav-item ${page === label ? "active" : ""}`} onClick={() => { onNavigate(label); onClose(); }}>
              <Icon size={18} /><span>{label}</span>{label === "Sessions" && <span className="nav-count">4</span>}
            </button>
          ))}
        </nav>
        <div className="workspace-label lower-label">MANAGEMENT</div>
        <button className="nav-item" onClick={() => onNavigate("Stations")}><Activity size={18} /><span>Network health</span></button>
        <button className="nav-item" onClick={() => onNavigate("Analytics")}><ShieldCheck size={18} /><span>Reports & quality</span></button>
        <div className="sidebar-bottom">
          <div className="support-card"><div className="support-icon"><Settings size={17} /></div><strong>Need a hand?</strong><p>Visit the operator guide to learn more.</p><button onClick={() => window.alert("Operator guide: monitor stations, manage sessions, and review analytics.")}>Open operator guide <span>↗</span></button></div>
          <div className="profile-row"><div className="avatar">SA</div><div className="profile-copy"><strong>Station Admin</strong><span>Network operator</span></div><span className="profile-menu">•••</span></div>
        </div>
      </aside>
    </>
  );
}