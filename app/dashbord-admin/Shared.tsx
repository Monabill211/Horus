export function StatCard({
  label,
  value,
  badge,
  iconBg,
  iconColor,
  icon,
}: {
  label: string;
  value: string;
  badge: string;
  iconBg: string;
  iconColor: string;
  icon: React.ReactNode;
}) {
  return (
    <div
      className="bg-white rounded-xl flex items-center justify-between border border-[#1a1410]/6"
      style={{ padding: "20px" }}
    >
      <div>
        <span className="text-[11px] text-emerald-600 font-semibold">{badge}</span>
        <p className="font-['Cinzel',serif] text-[22px] font-bold" style={{ marginTop: "4px" }}>{value}</p>
        <p className="text-[12px] text-[#8a7e6f]">{label}</p>
      </div>
      <div
        className={`rounded-xl flex items-center justify-center ${iconBg} ${iconColor}`}
        style={{ width: "44px", height: "44px" }}
      >
        {icon}
      </div>
    </div>
  );
}

type IconButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  danger?: boolean;
};

export function IconButton({
  children,
  danger,
  className = "",
  ...props
}: IconButtonProps) {
  return (
    <button
      {...props}
      className={`flex items-center justify-center rounded-lg transition-colors ${
        danger
          ? "bg-rose-50 text-rose-600 hover:bg-rose-100"
          : "border border-[#1a1410]/12 hover:border-[#c9a84c] hover:text-[#c9a84c]"
      } ${className}`}
      style={{ width: "34px", height: "34px" }}
    >
      {children}
    </button>
  );
}
export function SettingsField({
  label,
  defaultValue,
  dir,
}: {
  label: string;
  defaultValue: string;
  dir?: "ltr" | "rtl";
}) {
  return (
    <div>
      <label className="block text-[11px] text-[#8a7e6f]" style={{ marginBottom: "6px" }}>{label}</label>
      <input
        type="text"
        defaultValue={defaultValue}
        dir={dir}
        className="input-field w-full border border-[#1a1410]/12 rounded-lg text-[13px] outline-none"
        style={{ padding: "10px 14px" }}
      />
      <style>{`.input-field:focus { border-color:#c9a84c; box-shadow: 0 0 0 3px rgba(201,168,76,0.15); }`}</style>
    </div>
  );
}