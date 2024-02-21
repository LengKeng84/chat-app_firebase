import React, { useContext } from "react";
import { Image } from "react-bootstrap";
import { MainContext } from "../context/MainProvider";

interface Props {
  isFocus: boolean;
  data: ChatRoom;
  conversationData: Conversation | undefined;
}

const ConversationItem = ({ isFocus, data, conversationData }: Props) => {
  const { currentUser } = useContext(MainContext);

  return (
    <div
      className={`w-full h-[70px] border-b-[1px] px-[25px] ${
        isFocus
          ? "bg-lightFocus dark:bg-darkFocus"
          : "hover:bg-lightHover dark:hover:bg-darkHover"
      } border-lightLine dark:border-darkLine flex justify-start items-center duration-100 cursor-pointer`}
    >
      {/* Image */}
      <div className="w-[40px] h-[40px]">
        <Image
          src={
            data.info
              ? data.info?.photoURL
              : data.member.find((user) => user.uid !== currentUser?.uid)
                  ?.photoURL
          }
          alt="Ảnh profile"
          roundedCircle
          className="w-full h-full"
        />
      </div>

      {/*Main Info */}
      <div className="ml-[15px] h-[40px]">
        {/* User Name */}
        <div className="w-[200px] text-[15px] font-semibold truncate">
          {data.info
            ? data.info.displayName
            : data.member.find((user) => user.uid !== currentUser?.uid)
                ?.displayName}
        </div>

        {/* Message */}
        <div className="w-[200px] text-[14px] text-[#7c7c7c] truncate">
          {conversationData?.latestMessage}
        </div>
      </div>

      {/* Sub Info */}
      <div className="w-[30px] ml-auto ">
        <div className="w-full text-[10px] font-semibold">5 giờ trước</div>
      </div>
    </div>
  );
};

export default ConversationItem;
