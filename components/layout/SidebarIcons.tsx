import { useCurrentUser } from "@/hooks/useCurrentUser";
import useLoginModal from "@/hooks/useLoginModal";
import { useRouter } from "next/router";
import React from "react";
import { IconType } from "react-icons";

interface ISidebarIconsProps {
  label: string;
  icon: IconType;
  to: string;
  onClick?: () => void;
  auth?: boolean;
}

const SidebarIcons: React.FC<ISidebarIconsProps> = ({
  label,
  icon: Icon,
  to,
  onClick,
  auth,
}) => {
  const loginModal = useLoginModal();
  const { data: currentUser } = useCurrentUser();
  const router = useRouter();
  const handleClick = () => {
    if (onClick) return onClick();

    if (auth && !currentUser) {
      loginModal.onOpen();
    } else if (to) {
      router.push(to);
    }
  };
  return (
    <div onClick={handleClick} className="flex flex-row itmes-center">
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
