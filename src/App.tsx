import { useEffect, useMemo, useState } from "react";
import { PlugZap } from "lucide-react";
import AddStationModal from "./components/AddStationModal";
import Notifications from "./components/Notifications";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import Analytics from "./pages/Analytics";
import Overview from "./pages/Overview";
import Reservations from "./pages/Reservations";
import Sessions from "./pages/Sessions";
import Stations from "./pages/Stations";
import { initialReservations, initialSessions, initialStations } from "./data";
import type { PageKey, Reservation, ReservationStatus, Session, SessionStatus, Station } from "./types";

export default function App() {
  const [page, setPage] = useState<PageKey>("Overview");
  const [stations, setStations] = useState<Station[]>(initialStations);
  const [sessions, setSessions] = useState<Session[]>(initialSessions);
  const [reservations, setReservations] = useState<Reservation[]>(initialReservations);
  const [dark, setDark] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [addStationOpen, setAddStationOpen] = useState(false);
  const [selectedStation, setSelectedStation] = useState<Station | null>(null);
  const unreadCount = 3;

  useEffect(() => {
    document.documentElement.dataset.theme = dark ? "dark" : "light";
  }, [dark]);

  useEffect(() => {
    const onQuickSearch = (event: Event) => {
      const query = (event as CustomEvent<string>).detail.toLowerCase();
      const target = initialStations.find((station) => station.name.toLowerCase().includes(query) || station.location.toLowerCase().includes(query));
      if (target) setPage("Stations");
    };
    window.addEventListener("quick-search", onQuickSearch);
    return () => window.removeEventListener("quick-search", onQuickSearch);
  }, []);

  const title = useMemo(() => ({
    Overview: "Operations overview", Stations: "Station management", Sessions: "Session management",
    Reservations: "Reservation management", Analytics: "Network analytics"
  }[page]), [page]);

  const updateSession = (id: string, status: SessionStatus) => setSessions((current) => current.map((session) => session.id === id ? { ...session, status } : session));
  const updateReservation = (id: string, status: ReservationStatus) => setReservations((current) => current.map((reservation) => reservation.id === id ? { ...reservation, status } : reservation));
  const addStation = (station: Station) => setStations((current) => [station, ...current]);
  const selectStation = (station: Station) => setSelectedStation(station);

  return <div className="app-shell">
    <Sidebar page={page} onNavigate={setPage} open={menuOpen} onClose={() => setMenuOpen(false)} />
    <main className="main-area">
      <Topbar onMenu={() => setMenuOpen(true)} dark={dark} onToggleTheme={() => setDark((value) => !value)} onNotifications={() => setNotificationsOpen(true)} notificationCount={unreadCount} />
      <div className="page-heading-strip"><div><span className="eyebrow">VOLTFlow / OPERATIONS</span><h1>{title}</h1></div><div className="updated-label"><span className="live-dot" /> All systems operational <span className="heading-divider" /> Updated just now</div></div>
      {page === "Overview" && <Overview stations={stations} onNavigate={setPage} onAddStation={() => setAddStationOpen(true)} />}
      {page === "Stations" && <Stations stations={stations} onAddStation={() => setAddStationOpen(true)} onSelect={selectStation} />}
      {page === "Sessions" && <Sessions sessions={sessions} onUpdate={updateSession} />}
      {page === "Reservations" && <Reservations reservations={reservations} onUpdate={updateReservation} />}
      {page === "Analytics" && <Analytics />}
      <footer className="app-footer"><span>© 2026 VoltFlow Operations</span><span><span className="footer-status" /> System status: Normal</span><span>Built for smarter charging <PlugZap size={13} /></span></footer>
    </main>
    <AddStationModal open={addStationOpen} onClose={() => setAddStationOpen(false)} onSave={addStation} />
    <Notifications open={notificationsOpen} onClose={() => setNotificationsOpen(false)} />
    {selectedStation && (
  <button
    type="button"
    className="modal-backdrop"
    onClick={() => setSelectedStation(null)}
    onKeyDown={(event) => {
      if (event.key === "Escape") {
        setSelectedStation(null);
      }
    }}
    aria-label="Close selected station"
  />
)}
  </div>;
}