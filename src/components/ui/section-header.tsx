interface SectionHeaderProps {
  title: string;
  action?: React.ReactNode;
}

export function SectionHeader({ title, action }: SectionHeaderProps) {
  return (
    <div className="mb-12 flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <div className="h-10 w-1 rounded-full bg-[#70cd35]"></div>
        <h3 className="text-2xl font-semibold text-white">{title}</h3>
      </div>
      {action}
    </div>
  );
}
