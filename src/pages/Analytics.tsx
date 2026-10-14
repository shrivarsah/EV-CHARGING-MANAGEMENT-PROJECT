import { ArrowDownRight, ArrowUpRight, Bolt, Download, TrendingUp, Wallet } from "lucide-react";
import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import SectionHeader from "../components/SectionHeader";
import { energyByDay } from "../data";
import { formatCurrency } from "../utils";

const utilization = [
  { hour: "6 AM", rate: 18 }, { hour: "8 AM", rate: 32 }, { hour: "10 AM", rate: 56 },
  { hour: "12 PM", rate: 72 }, { hour: "2 PM", rate: 61 }, { hour: "4 PM", rate: 69 },
  { hour: "6 PM", rate: 88 }, { hour: "8 PM", rate: 79 }, { hour: "10 PM", rate: 41 }
];

export default function Analytics() {
  return <div className="page-content">
    <SectionHeader title="Analytics & reports" subtitle="Understand energy consumption, revenue, and charging network utilization." action={<button className="secondary-button" onClick={() => window.print()}><Download size={16} /> Export report</button>} />
    <div className="analytics-metrics"><div className="analytics-tile"><span className="analytics-tile-icon violet"><Bolt size={18} /></span><p>Total energy delivered</p><strong>17,230 <small>kWh</small></strong><span className="positive"><ArrowUpRight size={14} /> 12.8% from last week</span></div><div className="analytics-tile"><span className="analytics-tile-icon green"><Wallet size={18} /></span><p>Gross revenue</p><strong>{formatCurrency(168200)}</strong><span className="positive"><ArrowUpRight size={14} /> 9.4% from last week</span></div><div className="analytics-tile"><span className="analytics-tile-icon orange"><TrendingUp size={18} /></span><p>Average utilization</p><strong>64.8%</strong><span className="negative"><ArrowDownRight size={14} /> 2.1% from last week</span></div></div>
    <div className="analytics-chart-grid">
      <section className="panel chart-panel"><div className="panel-heading"><div><h3>Energy trend</h3><p>Daily delivery in kilowatt-hours</p></div><span className="chart-legend"><i className="legend-dot violet-dot" /> Energy</span></div><div className="large-chart"><ResponsiveContainer width="100%" height="100%"><LineChart data={energyByDay} margin={{ top: 10, right: 12, left: -14, bottom: 0 }}><CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" /><XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: "var(--muted)", fontSize: 12 }} /><YAxis axisLine={false} tickLine={false} tick={{ fill: "var(--muted)", fontSize: 11 }} /><Tooltip contentStyle={{ background: "var(--panel)", border: "1px solid var(--border)", borderRadius: 10 }} /><Line type="monotone" dataKey="energy" name="Energy (kWh)" stroke="#7467f0" strokeWidth={3} dot={{ r: 4, fill: "#7467f0" }} activeDot={{ r: 6 }} /></LineChart></ResponsiveContainer></div></section>
      <section className="panel chart-panel"><div className="panel-heading"><div><h3>Hourly utilization</h3><p>Typical weekday occupancy</p></div></div><div className="large-chart"><ResponsiveContainer width="100%" height="100%"><BarChart data={utilization} margin={{ top: 10, right: 4, left: -20, bottom: 0 }}><CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" /><XAxis dataKey="hour" axisLine={false} tickLine={false} tick={{ fill: "var(--muted)", fontSize: 10 }} /><YAxis domain={[0, 100]} axisLine={false} tickLine={false} tick={{ fill: "var(--muted)", fontSize: 11 }} /><Tooltip contentStyle={{ background: "var(--panel)", border: "1px solid var(--border)", borderRadius: 10 }} /><Bar dataKey="rate" name="Utilization (%)" fill="#27b99a" radius={[4, 4, 0, 0]} /></BarChart></ResponsiveContainer></div></section>
    </div>
    <section className="panel report-table"><div className="panel-heading"><div><h3>Weekly performance</h3><p>Energy and revenue by day</p></div></div><div className="table-scroll"><table><thead><tr><th>Day</th><th>Energy delivered</th><th>Revenue</th><th>Avg. energy price</th><th>Performance</th></tr></thead><tbody>{energyByDay.map((d) => <tr key={d.day}><td><strong>{d.day}</strong></td><td>{d.energy.toLocaleString()} kWh</td><td>{formatCurrency(d.revenue)}</td><td>{formatCurrency(d.revenue / d.energy)} / kWh</td><td><div className="performance-track"><span style={{ width: `${(d.energy / 3120) * 100}%` }} /></div></td></tr>)}</tbody></table></div></section>
    <div className="notice-banner"><TrendingUp size={18} /><div><strong>Analytics are based on sample data</strong><p>Connect a backend and validated meter readings before using reports for billing or operational decisions.</p></div></div>
  </div>;
}