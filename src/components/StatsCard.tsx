'use client';
type Color = "blue" | "orange" | "green" | "purple" | "red";
type Props = { title: string; value: string | number; color?: Color };

const colors: Record<Color, string> = {
  purple: "border-[#D1DEEF] bg-[#FFFFFF] text-[#5B63E5]",
  orange: "border-[#FF7438] bg-[#FFF4F1] text-[#FF7438]",
  green: "border-[#D1DEEF] bg-[#FFFFFF] text-[#00B37A]",
  blue: "border-[#D1DEEF] bg-[#FFFFFF] text-[#3BA7FF]",
  red: "border-[#D1DEEF] bg-[#FFFFFF] text-[#E94A4C]",

};

const StatsCard = ({ title, value, color = "blue" }: Props) => {
  return (
    <div className={`p-5 rounded-xl border-2 ${colors[color]}`}>
      <div className="text-sm text-gray-600 mb-1">{title}</div>
      <div className="text-2xl font-bold">{value}</div>
    </div>
  );
};

export default StatsCard;
