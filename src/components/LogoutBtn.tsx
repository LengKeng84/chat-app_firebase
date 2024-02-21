import { useContext } from "react";
import { signOut } from "firebase/auth";
import { AiOutlineLogout } from "react-icons/ai";
import { auth } from "../firebase";
import { MainContext } from "../context/MainProvider";

const LogoutBtn = () => {
  const {
    currentUser,
    setCurrentUser,
    setChatRooms,
    setConversations,
    setFriendList,
    setFocusChatRoom,
    setFocusConversation,
    setBoxState,
    errorToastify,
  } = useContext(MainContext);

  const logout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        setCurrentUser(null);
        setChatRooms([]);
        setConversations([]);
        setFriendList([]);
        setFocusChatRoom(null);
        setFocusConversation(null);
        console.log("Đã đăng xuất!", currentUser);
      })
      .catch((error) => {
        // An error happened.
        errorToastify("Đăng xuất xuất bại!");
      });
  };
  return (
    <button
      onClick={logout}
      className="btnNavBar border-[1px] border-[#000] dark:border-[#fff] hover:bg-lightPrimary dark:hover:bg-darkPrimary"
    >
      <AiOutlineLogout />
    </button>
  );
};

export default LogoutBtn;
