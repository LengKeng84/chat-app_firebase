import { useState, useContext, useRef, useEffect } from "react";
import { Image } from "react-bootstrap";
import { BsCardImage, BsEmojiSmile, BsSend } from "react-icons/bs";
import { BiSolidPhoneCall } from "react-icons/bi";
import { AiFillCamera, AiFillProfile } from "react-icons/ai";
import MessageItem from "./MessageItem";
import "tippy.js/dist/tippy.css";
import "tippy.js/themes/light.css";
import { MainContext } from "../context/MainProvider";
import Picker from "@emoji-mart/react";
import emojiData from "@emoji-mart/data";
import OutsideClickHandler from "react-outside-click-handler";
import {
  arrayUnion,
  doc,
  getDoc,
  onSnapshot,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { MdGroupAdd } from "react-icons/md";
import Tippy from "@tippyjs/react";
import CreateGroupBox from "./CreateGroupBox";

interface Props {
  setShowFocusUserProfile: React.Dispatch<React.SetStateAction<boolean>>;
}

const ChatBox = ({ setShowFocusUserProfile }: Props) => {
  const {
    darkMode,
    focusChatRoom,
    currentUser,
    conversations,
    focusConversation,
    setFocusConversation,
    errorToastify,
  } = useContext(MainContext);

  const [textInput, setTextInput] = useState<string>("");

  const [showEmojiBox, setShowEmojiBox] = useState<boolean>(false);
  const [showCreateGroupBox, setShowCreateGroupBox] = useState<boolean>(false);

  const autoViewLastestMes = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const onchangeFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (!focusChatRoom || !currentUser) return;

      const file = e.target as HTMLInputElement & {
        files: FileList;
      };

      // Tạo id cho file ảnh
      const imgId = new Date();

      // Create a root reference
      const storage = getStorage();

      await uploadBytes(ref(storage, `${imgId}.img`), file.files[0]);

      // Lấy img URL
      const imgURL = await getDownloadURL(ref(storage, `${imgId}.img`));

      // Update cuộc hội thoại

      const check = currentUser?.chatRooms?.includes(focusChatRoom.id);
      const curDate: Date = new Date();

      if (!check) {
        const chatRoomData = {
          id: focusChatRoom.id,
          type: focusChatRoom.type,
          info: null,
          member: [currentUser.uid, focusChatRoom.selectUserId],
        };
        // set chat room
        await setDoc(doc(db, "chat_rooms", focusChatRoom.id), chatRoomData);

        // set convertion
        await setDoc(doc(db, "conversations", focusChatRoom.id), {
          id: focusChatRoom.id,
          latestMessage: "Đã gửi 1 ảnh",
          messages: [
            {
              senderId: currentUser.uid,
              content: {
                type: "img",
                photoURL: imgURL,
              },
              date: curDate,
            },
          ],
        });

        // Update chat room for current user
        await updateDoc(doc(db, "users", currentUser?.uid), {
          chatRooms: arrayUnion(focusChatRoom.id),
        });

        // Update chat room for select user
        if (!focusChatRoom.selectUserId) return;
        await updateDoc(doc(db, "users", focusChatRoom?.selectUserId), {
          chatRooms: arrayUnion(focusChatRoom.id),
        });
      } else {
        await updateDoc(doc(db, "conversations", focusChatRoom?.id), {
          latestMessage: "Đã gủi 1 ảnh",
          messages: arrayUnion({
            senderId: currentUser?.uid,
            content: {
              type: "img",
              photoURL: imgURL,
            },
            date: curDate,
          }),
        });
      }
    } catch (error) {
      errorToastify("Không upload được ảnh! Đã xảy ra lỗi gì đó!");
    }
  };

  useEffect(() => {
    autoViewLastestMes.current?.scrollIntoView();
  }, [focusConversation]);

  // Cập nhật lại focusConversation theo focusChatRoom
  useEffect(() => {
    if (!focusChatRoom) return;
    const findConversation = conversations.find(
      (conversation) => conversation.id === focusChatRoom?.id
    );
    if (!findConversation) {
      setFocusConversation({ id: focusChatRoom?.id, messages: [] });
    } else {
      setFocusConversation(findConversation);
    }
  }, [focusChatRoom]);

  // Cập nhật tin nhắn của hội thoại đang chat
  useEffect(() => {
    if (!focusConversation) return;
    const findConversation = conversations.find(
      (conversation) => conversation.id === focusConversation?.id
    );

    if (!findConversation) return;

    setFocusConversation(findConversation);
  }, [conversations]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (!focusChatRoom || !currentUser) return;
      const check = currentUser?.chatRooms?.includes(focusChatRoom.id);
      const curDate: Date = new Date();

      if (!check) {
        const chatRoomData = {
          id: focusChatRoom.id,
          type: focusChatRoom.type,
          info: null,
          member: [currentUser.uid, focusChatRoom.selectUserId],
        };
        // set chat room
        await setDoc(doc(db, "chat_rooms", focusChatRoom.id), chatRoomData);

        // set convertion
        await setDoc(doc(db, "conversations", focusChatRoom.id), {
          id: focusChatRoom.id,
          latestMessage: textInput,
          messages: [
            {
              senderId: currentUser.uid,
              content: {
                type: "text",
                text: textInput,
              },
              date: curDate,
            },
          ],
        });

        // Update chat room for current user
        await updateDoc(doc(db, "users", currentUser?.uid), {
          chatRooms: arrayUnion(focusChatRoom.id),
        });

        // Update chat room for select user
        if (!focusChatRoom.selectUserId) return;
        await updateDoc(doc(db, "users", focusChatRoom?.selectUserId), {
          chatRooms: arrayUnion(focusChatRoom.id),
        });
      } else {
        if (!focusChatRoom) return;

        await updateDoc(doc(db, "conversations", focusChatRoom?.id), {
          latestMessage: textInput,
          messages: arrayUnion({
            senderId: currentUser?.uid,
            content: {
              type: "text",
              text: textInput,
            },
            date: curDate,
          }),
        });
      }

      setTextInput("");
      setShowEmojiBox(false);
    } catch (error) {
      errorToastify("Không thể gửi tin nhắn! Đã xảy ra lỗi gì đó!");
      console.log(error);
    }
  };

  return (
    <div className="w-full h-full flex flex-col">
      {showCreateGroupBox && (
        <CreateGroupBox setShowCreateGroupBox={setShowCreateGroupBox} />
      )}
      {/* Header */}
      <div className="w-full h-[10%] border-b-[1px] border-lightLine dark:border-darkLine flex items-center px-[30px]">
        {/* Image */}
        <div className="w-[40px] h-[40px] ">
          <Image
            src={
              focusChatRoom?.info
                ? focusChatRoom?.info.photoURL
                : focusChatRoom?.member?.find(
                    (user) => user.uid !== currentUser?.uid
                  )?.photoURL || ""
            }
            alt="Ảnh profile"
            roundedCircle
            className="w-full h-full"
          />
        </div>

        {/* Info */}
        <div className="ml-[20px]">
          <div className="w-[300px] font-bold truncate">
            {focusChatRoom?.info
              ? focusChatRoom?.info.displayName
              : focusChatRoom?.member?.find(
                  (user) => user.uid !== currentUser?.uid
                )?.displayName}
          </div>
          <div className="flex items-center gap-2">
            <span className="w-[10px] h-[10px] bg-[#51de51] rounded-full"></span>
            <span className="text-[13px]">Đang hoạt động</span>
          </div>
        </div>

        {/* Actions */}
        <div className="ml-auto flex justify-center items-center gap-2">
          <Tippy
            placement="bottom"
            theme={darkMode ? "darkCustom" : "lightCustom"}
            content="Thêm vào nhóm chat"
            delay={[600, 0]}
          >
            <button
              onClick={() => setShowCreateGroupBox(true)}
              className="btnChatBoxHeader"
            >
              <MdGroupAdd />
            </button>
          </Tippy>

          <button
            onClick={() => setShowFocusUserProfile((prev) => !prev)}
            className={`btnChatBoxHeader`}
          >
            <AiFillProfile />
          </button>
        </div>
      </div>

      {/* Messages Shower */}
      <div className="w-full h-[80%] px-4 py-4 flex flex-col gap-5 overflow-auto">
        {focusConversation?.messages.map((data, index) => (
          <MessageItem key={index} data={data} />
        ))}
        <div ref={autoViewLastestMes} />
      </div>

      {/* ChatInput */}
      <div className="mt-[auto] w-full h-[10%] px-[20px] border-t-[1px] border-lightLine dark:border-darkLine  flex justify-center items-center gap-3">
        <form
          onSubmit={onSubmit}
          className="w-full flex justify-between items-center gap-3"
        >
          <input
            ref={inputRef}
            type="text"
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            placeholder="Nhập tin nhắn..."
            className="w-full h-[40px] border-[1px] rounded-md border-lightPrimary dark:border-darkPrimary bg-transparent px-[15px]"
          />

          {/* Emoji Box */}
          <div className="relative">
            {showEmojiBox && (
              <div
                className={`absolute bottom-full right-0 -translate-y-2 shadow-emojiBox dark:shadow-[#3b3b3b] rounded-lg`}
              >
                <OutsideClickHandler
                  onOutsideClick={() => {
                    setShowEmojiBox(false);
                  }}
                >
                  <Picker
                    data={emojiData}
                    onEmojiSelect={(e: any) => {
                      setTextInput((prev) => prev + e.native);
                      inputRef.current?.focus();
                    }}
                    theme={darkMode ? "dark" : "light"}
                    locale="vi"
                  />
                </OutsideClickHandler>
              </div>
            )}
            <span
              onClick={() => setShowEmojiBox(true)}
              className={`btnChatInput ${
                showEmojiBox
                  ? "bg-lightPrimary dark:bg-darkPrimary text-whiteCus dark:text-blackCus"
                  : "hover:bg-lightFocus dark:hover:bg-darkFocus"
              }`}
            >
              <BsEmojiSmile />
            </span>
          </div>

          <label
            htmlFor="photo"
            className="btnChatInput hover:bg-lightFocus dark:hover:bg-darkFocus"
          >
            <BsCardImage />
            <input
              id="photo"
              type="file"
              onChange={onchangeFile}
              className="hidden"
            />
          </label>

          <button className="btnChatInput w-[70px] border-none bg-lightPrimary dark:bg-darkPrimary text-whiteCus dark:text-blackCus hover:opacity-70">
            <BsSend />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatBox;
