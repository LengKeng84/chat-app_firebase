import { useContext } from "react";
import { Image } from "react-bootstrap";
import { MainContext } from "../context/MainProvider";

interface Props {
  data: Message;
}

const ConversationItem = ({ data }: Props) => {
  const { currentUser, focusChatRoom } = useContext(MainContext);

  return (
    <div
      className={`flex flex-col ${
        data.senderId === currentUser?.uid && "items-end"
      } gap-2`}
    >
      {/* Info User */}
      <div
        className={`w-[50%] flex items-center ${
          data.senderId === currentUser?.uid && "justify-end"
        } gap-2`}
      >
        {/* Image */}
        <div className="w-[35px] h-[35px]">
          <Image
            src={
              data.senderId === currentUser?.uid
                ? currentUser?.photoURL
                : focusChatRoom?.info
                ? focusChatRoom.info.photoURL
                : focusChatRoom?.member?.find(
                    (user) => user.uid === data.senderId
                  )?.photoURL
            }
            alt="Ảnh profile"
            roundedCircle
            className="w-full h-full"
          />
        </div>

        {/* Info */}
        <div className="ml-[8px]">
          <div
            className={`max-w-[200px] text-[15px] font-semibold truncate ${
              data.senderId === currentUser?.uid && "text-right"
            }`}
          >
            {data.senderId === currentUser?.uid
              ? currentUser?.displayName
              : focusChatRoom?.info
              ? focusChatRoom.info.displayName
              : focusChatRoom?.member?.find(
                  (user) => user.uid === data.senderId
                )?.displayName}
          </div>
          <div className="text-[13px]">7:40 AM</div>
        </div>
      </div>

      {/* Message */}
      <div className={`w-[70%] flex`}>
        <div
          className={`${
            data.senderId === currentUser?.uid && "ml-auto "
          } bg-lightPrimary1 dark:bg-darkPrimary1 p-3 rounded-md text-[15px] break-all`}
        >
          {data.content.type === "text" ? (
            <div className="">{data.content.text}</div>
          ) : (
            <img
              src={data.content.photoURL}
              alt="Ảnh"
              className="max-h-[400px] max-w-[400px]"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ConversationItem;
