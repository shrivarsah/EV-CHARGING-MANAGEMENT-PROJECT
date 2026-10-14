import { getStatusTone } from "../utils";

interface StatusPillProps {
  status: string;
}

export default function StatusPill({ status }: StatusPillProps) {
  return <span className={`status-pill tone-${getStatusTone(status)}`}><span className="status-dot" />{status}</span>;
}