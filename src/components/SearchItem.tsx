import { useContext } from "react";
import { Image } from "react-bootstrap";
import { HiOutlineChatBubbleBottomCenterText } from "react-icons/hi2";
import { BiUserX } from "react-icons/bi";
import Tippy from "@tippyjs/react";
import { MainContext } from "../context/MainProvider";
import { AiOutlineUserAdd } from "react-icons/ai";
import { arrayUnion, doc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { FiUserCheck } from "react-icons/fi";

interface Props {
  setShowResultBox: React.Dispatch<React.SetStateAction<boolean>>;
  userData: User;
}

const SearchItem = ({ setShowResultBox, userData }: Props) => {
  const {
    darkMode,
    currentUser,
    conversations,
    setFocusConversation,
    successToastify,
    errorToastify,
    setFocusChatRoom,
    setBoxState,
  } = useContext(MainContext);

  const addFriendHandler = async (userUid: string) => {
    if (!currentUser?.uid) {
      return;
    }

    try {
      // Cập nhật danh sách bạn bè cho currentUser
      await updateDoc(doc(db, "users", currentUser?.uid), {
        friends: arrayUnion(userData.uid),
      });

      // Cập nhật danh sách bạn bè cho selectUser
      await updateDoc(doc(db, "users", userData?.uid), {
        friends: arrayUnion(currentUser.uid),
      });
      successToastify("Thêm bạn thành công!");
    } catch (error) {
      errorToastify("Đã xảy ra lỗi gì đó! Không thể kết bạn!");
    }
  };

  const chatAction = async () => {
    if (!currentUser) return;
    const roomId =
      currentUser.uid > userData.uid
        ? currentUser.uid + userData.uid
        : userData.uid + currentUser.uid;

    setFocusChatRoom({
      id: roomId,
      type: "1vs1",
      info: {
        displayName: userData.displayName,
        photoURL: userData.photoURL,
      },
      selectUserId: userData.uid,
    });

    setShowResultBox(false);
    setBoxState("conversationsBox");
  };

  return (
    <div
      className={`group w-full h-[70px] border-b-[1px] pl-[25px] pr-[10px] hover:bg-lightHover dark:hover:bg-darkHover border-lightLine dark:border-darkLine flex items-center cursor-pointer`}
    >
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

      {/* Action */}
      <div className="ml-auto flex gap-1">
        <Tippy
          content="Nhắn tin"
          placement="top"
          theme={darkMode ? "darkCustom" : "lightCustom"}
          delay={[600, 0]}
        >
          <button
            onClick={chatAction}
            className="text-[20px] p-[6px] rounded-md hidden duration-200 hover:scale-125 group-hover:block"
          >
            <HiOutlineChatBubbleBottomCenterText />
          </button>
        </Tippy>

        {currentUser?.friends?.includes(userData.uid) ? (
          <Tippy
            content="Đã kết bạn"
            placement="top"
            theme={darkMode ? "darkCustom" : "lightCustom"}
            delay={[600, 0]}
          >
            <button className="text-[20px] p-[6px] rounded-md hidden duration-200 hover:scale-125 group-hover:block">
              <FiUserCheck />
            </button>
          </Tippy>
        ) : (
          <Tippy
            content="Kết bạn"
            placement="top"
            theme={darkMode ? "darkCustom" : "lightCustom"}
            delay={[600, 0]}
          >
            <button
              onClick={() => addFriendHandler("")}
              className="text-[20px] p-[6px] rounded-md hidden duration-200 hover:scale-125 group-hover:block"
            >
              <AiOutlineUserAdd />
            </button>
          </Tippy>
        )}
      </div>
    </div>
  );
};

export default SearchItem;
