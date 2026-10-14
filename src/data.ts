import type { Reservation, Session, Station } from "./types";

export const initialStations: Station[] = [
  { id: "ST-1001", name: "Marina Central", location: "Chennai · Marina", chargers: 12, available: 8, power: "150 kW", status: "Available", energyToday: 428 },
  { id: "ST-1002", name: "Tech Park Hub", location: "Chennai · OMR", chargers: 16, available: 3, power: "240 kW", status: "In use", energyToday: 682 },
  { id: "ST-1003", name: "Airport Express", location: "Chennai · Airport", chargers: 10, available: 0, power: "180 kW", status: "Maintenance", energyToday: 214 },
  { id: "ST-1004", name: "City Centre", location: "Coimbatore · RS Puram", chargers: 8, available: 5, power: "120 kW", status: "Available", energyToday: 305 },
  { id: "ST-1005", name: "Greenway Plaza", location: "Bengaluru · Whitefield", chargers: 14, available: 2, power: "180 kW", status: "In use", energyToday: 591 },
  { id: "ST-1006", name: "Lakeview Point", location: "Bengaluru · Hebbal", chargers: 6, available: 0, power: "60 kW", status: "Offline", energyToday: 0 },
  { id: "ST-1007", name: "Metro Square", location: "Hyderabad · Hitech City", chargers: 10, available: 7, power: "150 kW", status: "Available", energyToday: 376 },
  { id: "ST-1008", name: "Highway Oasis", location: "NH 48 · Hosur", chargers: 8, available: 4, power: "120 kW", status: "Available", energyToday: 462 }
];

export const initialSessions: Session[] = [
  { id: "CS-8421", driver: "Aarav Sharma", vehicle: "Tata Nexon EV", station: "Tech Park Hub", connector: "CCS-2", energy: 28.4, duration: "00:42", cost: 312, status: "Charging" },
  { id: "CS-8420", driver: "Diya Krishnan", vehicle: "MG ZS EV", station: "Greenway Plaza", connector: "CCS-2", energy: 34.8, duration: "00:51", cost: 383, status: "Charging" },
  { id: "CS-8419", driver: "Kabir Mehta", vehicle: "Hyundai Kona", station: "Marina Central", connector: "Type 2", energy: 19.2, duration: "00:31", cost: 211, status: "Paused" },
  { id: "CS-8418", driver: "Ananya Rao", vehicle: "BYD Atto 3", station: "Metro Square", connector: "CCS-2", energy: 41.6, duration: "01:04", cost: 458, status: "Charging" },
  { id: "CS-8417", driver: "Rohan Iyer", vehicle: "Mahindra XUV400", station: "City Centre", connector: "CCS-2", energy: 46.1, duration: "01:12", cost: 507, status: "Completed" },
  { id: "CS-8416", driver: "Meera Nair", vehicle: "Kia EV6", station: "Highway Oasis", connector: "CCS-2", energy: 22.7, duration: "00:36", cost: 250, status: "Completed" }
];

export const initialReservations: Reservation[] = [
  { id: "RS-301", driver: "Nisha Patel", station: "Marina Central", date: "Today", time: "10:30 AM", connector: "CCS-2", status: "Confirmed" },
  { id: "RS-302", driver: "Arjun Menon", station: "Tech Park Hub", date: "Today", time: "11:15 AM", connector: "Type 2", status: "Pending" },
  { id: "RS-303", driver: "Sana Thomas", station: "Greenway Plaza", date: "Today", time: "12:00 PM", connector: "CCS-2", status: "Confirmed" },
  { id: "RS-304", driver: "Vikram Das", station: "Airport Express", date: "Today", time: "01:30 PM", connector: "CCS-2", status: "Pending" },
  { id: "RS-305", driver: "Ishita Sen", station: "Metro Square", date: "Tomorrow", time: "09:00 AM", connector: "Type 2", status: "Confirmed" }
];

export const energyByDay = [
  { day: "Mon", energy: 1840, revenue: 16800 },
  { day: "Tue", energy: 2210, revenue: 20200 },
  { day: "Wed", energy: 1980, revenue: 18300 },
  { day: "Thu", energy: 2540, revenue: 23100 },
  { day: "Fri", energy: 2860, revenue: 26700 },
  { day: "Sat", energy: 3120, revenue: 29100 },
  { day: "Sun", energy: 2680, revenue: 24900 }
];