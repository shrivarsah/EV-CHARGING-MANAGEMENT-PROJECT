import { useState } from "react";
import { X } from "lucide-react";
import type { Station } from "../types";

interface AddStationModalProps {
  readonly open: boolean;
  readonly onClose: () => void;
  readonly onSave: (station: Station) => void;
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
  return (
    

<div className="modal-backdrop">

      <dialog
  open
  className="modal-card"
  aria-labelledby="add-station-title"
>
        <div className="modal-header">
          <h2 id="add-station-title">Add Charging Station</h2>
          <button type="button" onClick={onClose} aria-label="Close">
            <X size={20} />
          </button>
        </div>

        {error && <p className="error-message">{error}</p>}

        <form onSubmit={submit}>
          <label htmlFor="station-name">Station Name</label>
          <input
            id="station-name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />

          <label htmlFor="station-location">Location</label>
          <input
            id="station-location"
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            required
          />

          <label htmlFor="station-chargers">Number of Chargers</label>
          <input
            id="station-chargers"
            type="number"
            min="1"
            max="100"
            value={chargers}
            onChange={(event) => setChargers(event.target.value)}
            required
          />

          <label htmlFor="station-power">Charging Power</label>
          <input
            id="station-power"
            value={power}
            onChange={(event) => setPower(event.target.value)}
            required
          />

          <div className="modal-actions">
            <button type="button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit">
  Create Station
</button>
          </div>
        </form>
      </dialog>
    </div>
  );
}
