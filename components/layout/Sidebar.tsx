import React from "react";
import { BsHousesFill, BsBellFill } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import { RiSeedlingLine } from "react-icons/ri";
import { BiLogOut } from "react-icons/bi";
import { useRouter } from "next/router";
import SidebarIcons from "./SidebarIcons";
import PostButton from "./PostButton";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { signOut } from "next-auth/react";

const Sidebar = () => {
  const { data: currentUser } = useCurrentUser();
  const router = useRouter();
  const elements = [
    {
      label: "Home",
      to: "/",
      icon: BsHousesFill,
    },
    {
      label: "Notifications",
      to: "/notifications",
      icon: BsBellFill,
      auth: true,
    },
    {
      label: "Profile",
      to: "/users/123",
      icon: FaUser,
      auth: true,
    },
  ];
  return (
    <div className="col-span-1 h-full pr-4 md:pr-6">
      <div className="flex flex-col items-end">
        <div className="space-y-2 lg:w-[230px]">
          <div
            onClick={() => router.push("/")}
            className="rounded-full h-14 w-14 p-4 flex items-center justify-center
          hover:bg-blue-300 hover:bg-opacity-10 cursor-pointer transition duration-300"
          >
            <RiSeedlingLine size={32} color="white" />
          </div>
          {elements.map((element) => (
            <SidebarIcons
              to={element.to}
              label={element.label}
              icon={element.icon}
              auth={element.auth}
            />
          ))}
          {currentUser && (
            <SidebarIcons
              to="/"
              icon={BiLogOut}
              onClick={() => signOut()}
              label="Logout"
            />
          )}
          <PostButton />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
