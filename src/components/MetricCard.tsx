import type { LucideIcon } from "lucide-react";

interface MetricCardProps {
  readonly label: string;
  readonly value: string;
  readonly change: string;
  readonly detail: string;
  readonly icon: LucideIcon;
  readonly tone: "violet" | "cyan" | "green" | "orange";
}

export default function MetricCard({ label, value, change, detail, icon: Icon, tone }: MetricCardProps) {
  return (
    <article className="metric-card">
      <div className="metric-top">
        <span className={`metric-icon ${tone}`}><Icon size={19} /></span>
        <span className="metric-change">{change}</span>
      </div>
      <p className="metric-label">{label}</p>
      <div className="metric-value">{value}</div>
      <p className="metric-detail">{detail}</p>
    </article>
  );
}