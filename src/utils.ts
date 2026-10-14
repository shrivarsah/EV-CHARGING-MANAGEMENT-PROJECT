import type { Station, StationStatus } from "./types";

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(amount);
}

export function getStationAvailability(station: Station): number {
  if (station.chargers <= 0) return 0;
  return Math.round((station.available / station.chargers) * 100);
}

export function filterStations(
  stations: Station[],
  query: string,
  status: "All" | StationStatus
): Station[] {
  const normalized = query.trim().toLowerCase();
  return stations.filter((station) => {
    const matchesQuery = [station.id, station.name, station.location]
      .some((value) => value.toLowerCase().includes(normalized));
    const matchesStatus = status === "All" || station.status === status;
    return matchesQuery && matchesStatus;
  });
}

export function getStatusTone(status: string): "green" | "amber" | "red" | "blue" | "gray" {
  if (["Available", "Charging", "Confirmed", "Completed"].includes(status)) return "green";
  if (["In use", "Pending", "Paused"].includes(status)) return "amber";
  if (["Offline", "Maintenance", "Cancelled"].includes(status)) return "red";
  if (status === "Reserved") return "blue";
  return "gray";
}