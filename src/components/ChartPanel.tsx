import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { energyByDay } from "../data";

export default function ChartPanel() {
  return (
    <section className="panel chart-panel">
      <div className="panel-heading"><div><h3>Energy delivered</h3><p>Charging network · this week</p></div><button className="select-button">This week⌄</button></div>
      <div className="chart-summary"><strong>17,230 <small>kWh</small></strong><span className="positive">↗ 12.8%</span><span className="muted">vs. last week</span></div>
      <div className="chart-wrap" role="img" aria-label="Bar chart showing energy delivered for each day of the week">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={energyByDay} margin={{ top: 10, right: 8, left: -18, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
            <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: "var(--muted)", fontSize: 12 }} dy={8} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: "var(--muted)", fontSize: 11 }} />
            <Tooltip cursor={{ fill: "var(--hover)" }} contentStyle={{ background: "var(--panel)", border: "1px solid var(--border)", borderRadius: 10, color: "var(--text)" }} />
            <Bar dataKey="energy" name="Energy (kWh)" fill="#7467f0" radius={[5, 5, 0, 0]} maxBarSize={32} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}