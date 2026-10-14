import { CheckCheck, CircleAlert, PlugZap, X } from "lucide-react";

interface NotificationsProps {
  readonly open: boolean;
  readonly onClose: () => void;
}

const notices = [
  { title: "Charger maintenance scheduled", body: "Airport Express · Connector 03 is under maintenance.", time: "8 min ago", icon: CircleAlert, tone: "notice-orange" },
  { title: "Charging session completed", body: "Session CS-8417 delivered 46.1 kWh.", time: "24 min ago", icon: CheckCheck, tone: "notice-green" },
  { title: "New station connected", body: "Metro Square is reporting healthy telemetry.", time: "1 hr ago", icon: PlugZap, tone: "notice-blue" }
];

export default function Notifications({ open, onClose }: NotificationsProps) {
  if (!open) return null;
  return (
  <div
  className="drawer-backdrop"
  >
    <aside
      className="notification-drawer"
      aria-label="Notifications"
    >
      <div className="drawer-header"><div><h2>Notifications</h2><p>You are all caught up on critical alerts.</p></div><button className="icon-button" aria-label="Close notifications" onClick={onClose}><X size={18} /></button></div>
      {notices.map(({ title, body, time, icon: Icon, tone }) => <article className="notice-item" key={title}><span className={`notice-icon ${tone}`}><Icon size={18} /></span><div><strong>{title}</strong><p>{body}</p><small>{time}</small></div></article>)}
      <button className="drawer-action" onClick={onClose}>Done</button>
        </aside>
  </div>
);
}