import { ArrowUpRight, MoreHorizontal } from "lucide-react";
import type { Station } from "../types";
import { getStationAvailability } from "../utils";
import StatusPill from "./StatusPill";

interface StationTableProps {
  readonly stations: Station[];
  readonly onSelect?: (station: Station) => void;
}

export default function StationTable({ stations, onSelect }: StationTableProps) {
  return <div className="table-scroll"><table><thead><tr><th>Station</th><th>Status</th><th>Chargers</th><th>Power</th><th>Energy today</th><th>Availability</th><th /></tr></thead>
    <tbody>{stations.map((station) => {
      const percent = getStationAvailability(station);
      return <tr key={station.id}>
        <td><button className="station-name-button" onClick={() => onSelect?.(station)}><span className="station-symbol"><span /></span><span><strong>{station.name}</strong><small>{station.id} · {station.location}</small></span></button></td>
        <td><StatusPill status={station.status} /></td>
        <td><strong>{station.available}</strong><span className="muted"> / {station.chargers}</span></td>
        <td>{station.power}</td><td>{station.energyToday.toLocaleString()} <span className="muted">kWh</span></td>
        <td><div className="availability-cell"><div className="progress-track"><span style={{ width: `${percent}%` }} /></div><small>{percent}%</small></div></td>
        <td><button className="row-action" aria-label={`View ${station.name}`} onClick={() => onSelect?.(station)}><MoreHorizontal size={18} /><ArrowUpRight size={13} /></button></td>
      </tr>;
    })}</tbody></table>
    {stations.length === 0 && <div className="empty-state">No stations match your search.</div>}
  </div>;
}