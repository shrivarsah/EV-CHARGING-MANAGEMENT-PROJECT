import { useState } from "react";
import { X } from "lucide-react";
import type { Station } from "../types";

interface AddStationModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (station: Station) => void;
}

export default function AddStationModal({ open, onClose, onSave }: AddStationModalProps) {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [chargers, setChargers] = useState("8");
  const [power, setPower] = useState("150 kW");
  const [error, setError] = useState("");
  if (!open) return null;
  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (name.trim().length < 3 || location.trim().length < 3) { setError("Enter a station name and location with at least 3 characters."); return; }
    const count = Number(chargers);
    if (!Number.isInteger(count) || count < 1 || count > 100) { setError("Chargers must be a whole number between 1 and 100."); return; }
    onSave({ id: `ST-${Date.now().toString().slice(-4)}`, name: name.trim(), location: location.trim(), chargers: count, available: count, power, status: "Available", energyToday: 0 });
    setName(""); setLocation(""); setChargers("8"); setPower("150 kW"); setError(""); onClose();
  };
  return <div className="modal-backdrop" onClick={onClose}><section className="modal-card" role="dialog" aria-modal="true" aria-labelledby="add-station-title" onClick={(event) => event.stopPropagation()}><div className="modal-heading"><div><h2 id="add-station-title">Add charging station</h2><p>Enter the basic information for this location.</p></div><button className="icon-button" aria-label="Close modal" onClick={onClose}><X size={18} /></button></div><form onSubmit={submit} className="station-form"><label>Station name<input autoFocus value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Riverside Hub" /></label><label>Location<input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="City · Area" /></label><div className="form-two-col"><label>Number of chargers<input type="number" min="1" max="100" value={chargers} onChange={(e) => setChargers(e.target.value)} /></label><label>Power capacity<select value={power} onChange={(e) => setPower(e.target.value)}><option>60 kW</option><option>120 kW</option><option>150 kW</option><option>180 kW</option><option>240 kW</option><option>350 kW</option></select></label></div>{error && <p role="alert" className="form-error">{error}</p>}<div className="modal-actions"><button type="button" className="secondary-button" onClick={onClose}>Cancel</button><button type="submit" className="primary-button">Create station</button></div></form></section></div>;
}