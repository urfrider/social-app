import React from "react";
import { IconType } from "react-icons";

interface ISidebarIconsProps {
  label: string;
  icon: IconType;
  to: string;
  onClick?: () => void;
}

const SidebarIcons: React.FC<ISidebarIconsProps> = ({
  label,
  icon: Icon,
  to,
  onClick,
}) => {
  console.log(label);
  return (
    <div className="flex flex-row itmes-center">
      <div
        className="relative rounded-full h-14 w-14 flex justify-center items-center p-4 
        hover:bg-opacity-10 hover:bg-slate-300 cursor-pointer lg:hidden"
      >
        <Icon size={28} color="white" />
      </div>
      <div
        className="relative hidden lg:flex items-center gap-4 p-4 
        rounded-full hover:bg-slate-300 cursor-pointer hover:bg-opacity-10"
      >
        <Icon size={28} color="white" />
        <p className="hidden lg:block text-white text-xl">{label}</p>
      </div>
    </div>
  );
};

export default SidebarIcons;
