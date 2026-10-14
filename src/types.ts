export type StationStatus = "Available" | "In use" | "Offline" | "Maintenance";
export type SessionStatus = "Charging" | "Completed" | "Paused";
export type ReservationStatus = "Confirmed" | "Pending" | "Cancelled";

export interface Station {
  id: string;
  name: string;
  location: string;
  chargers: number;
  available: number;
  power: string;
  status: StationStatus;
  energyToday: number;
}

export interface Session {
  id: string;
  driver: string;
  vehicle: string;
  station: string;
  connector: string;
  energy: number;
  duration: string;
  cost: number;
  status: SessionStatus;
}

export interface Reservation {
  id: string;
  driver: string;
  station: string;
  date: string;
  time: string;
  connector: string;
  status: ReservationStatus;
}

export type PageKey = "Overview" | "Stations" | "Sessions" | "Reservations" | "Analytics";