'use client';
type Props = { children: React.ReactNode; color: "orange" | "red" | "purple"; onClick?: () => void };

const ActionButton = ({ children, color, onClick }: Props) => {
  const colors = {
    orange: "bg-[#FF7438] hover:bg-orange-500",
    red: "bg-[#E94A4C] hover:bg-red-500",
    purple: "bg-[#5B63E5] hover:bg-indigo-600",
  };

  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg text-white font-medium ${colors[color]} `}
    >
      {children}
    </button>
  );
};

export default ActionButton;
