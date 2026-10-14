import { Bell, ChevronDown, Menu, Moon, Search, Sun } from "lucide-react";

interface TopbarProps {
  readonly onMenu: () => void;
  readonly dark: boolean;
  readonly onToggleTheme: () => void;
  readonly onNotifications: () => void;
  readonly notificationCount: number;
}

export default function Topbar({ onMenu, dark, onToggleTheme, onNotifications, notificationCount }: TopbarProps) {
  return (
    <header className="topbar">
      <button className="icon-button mobile-menu" aria-label="Open menu" onClick={onMenu}><Menu size={20} /></button>
      <div className="breadcrumb"><span>Workspace</span><span className="crumb-slash">/</span><strong>Operations</strong></div>
      <div className="topbar-actions">
        <label className="global-search"><Search size={16} /><input aria-label="Quick search" placeholder="Quick search..." onKeyDown={(event) => { if (event.key === "Enter") window.dispatchEvent(new CustomEvent("quick-search", { detail: (event.target as HTMLInputElement).value })); }} /><kbd>⌘ K</kbd></label>
        <button className="icon-button" aria-label="Toggle theme" onClick={onToggleTheme}>{dark ? <Sun size={18} /> : <Moon size={18} />}</button>
        <button className="icon-button notification-button" aria-label="Open notifications" onClick={onNotifications}><Bell size={18} />{notificationCount > 0 && <span className="notification-dot" />}</button>
        <button className="org-switch"><span className="org-logo">V</span><span>VoltFlow Ops</span><ChevronDown size={15} /></button>
      </div>
    </header>
  );
}