import { useState, useContext } from "react";
import ConversationItem from "./ConversationItem";
import { MainContext } from "../context/MainProvider";

const ConversationsBox = () => {
  const { chatRooms, focusChatRoom, setFocusChatRoom, conversations } =
    useContext(MainContext);

  return (
    <div className="w-full h-full py-[20px] flex flex-col justify-between">
      {/* Container */}
      <div className="h-[550px] overflow-auto">
        {chatRooms.length > 0 &&
          chatRooms.map((data, index) => (
            <div
              onClick={() => {
                setFocusChatRoom({
                  id: data.id,
                  type: data.type,
                  info: data.info,
                  member: data.member,
                });
              }}
            >
              <ConversationItem
                key={index}
                isFocus={data.id === focusChatRoom?.id ? true : false}
                data={data}
                conversationData={conversations.find(
                  (conversation) => conversation.id === data.id
                )}
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default ConversationsBox;
