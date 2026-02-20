interface InfoItemProps {
  icon: string;
  label: string;
  value: string;
}

/** 아이콘 + 라벨 + 값 정보 표시 */
export default function InfoItem({ icon, label, value }: InfoItemProps) {
  return (
    <div className="flex items-start gap-3">
      <span className="text-xl">{icon}</span>
      <div>
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{label}</p>
        <p className="text-sm text-slate-900 dark:text-white">{value}</p>
      </div>
    </div>
  );
}
