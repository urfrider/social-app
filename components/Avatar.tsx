import React from "react";
import { useUser } from "@/hooks/useUser";
import { useRouter } from "next/router";
import Image from "next/image";

interface IAvatarProps {
  userId: string;
  isLarge?: boolean;
  hasBorder?: boolean;
}

const Avatar: React.FC<IAvatarProps> = ({ userId, isLarge, hasBorder }) => {
  const router = useRouter();
  const { data: user } = useUser(userId);

  const onClick = (event: any) => {
    // override parent element on click
    event.stopPropagation();

    const url = `/users/${userId}`;
    router.push(url);
  };
  return (
    <div
      className={`${hasBorder ? "border-4 border-black" : ""}
      ${
        isLarge ? "h-32 w-32" : "h-12 w-12"
      } rounded-full hover:opacity-90 transition cursor-pointer relative`}
    >
      <Image
        fill
        style={{ objectFit: "cover", borderRadius: "100%" }}
        alt="Avatar"
        onClick={onClick}
        src={user?.profileImage || "/images/placeholder.png"}
      />
    </div>
  );
};

export default Avatar;
