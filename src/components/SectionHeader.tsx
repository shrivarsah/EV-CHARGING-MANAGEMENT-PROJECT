interface SectionHeaderProps {
  title: string;
  subtitle: string;
  action?: React.ReactNode;
}

export default function SectionHeader({ title, subtitle, action }: SectionHeaderProps) {
  return (
    <div className="section-header">
      <div><h2>{title}</h2><p>{subtitle}</p></div>
      {action && <div className="section-action">{action}</div>}
    </div>
  );
}