import React from "react";
import { Image } from "react-bootstrap";

interface Props {
  userData: User;
}

const FriendItem = ({ userData }: Props) => {
  return (
    <div className="group w-full h-full border-[1px] rounded-md px-3 hover:bg-lightHover dark:hover:bg-darkHover border-lightLine dark:border-darkLine flex items-center cursor-pointer">
      {/* Image */}
      <div className="w-[40px] h-[40px]">
        <Image
          src={userData.photoURL || require("../assets/images/userAvatar.jpg")}
          alt="Ảnh profile"
          roundedCircle
          className="w-full h-full"
        />
      </div>

      {/* User Name */}
      <div className="w-[200px] text-[15px] ml-[15px] font-semibold truncate">
        {userData.displayName}
      </div>
    </div>
  );
};

export default FriendItem;
