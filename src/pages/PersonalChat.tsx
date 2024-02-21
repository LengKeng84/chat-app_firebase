import { useContext, useState } from "react";
import { MainContext } from "../context/MainProvider";
import { Col, Container, Row } from "react-bootstrap";
import NavBar from "../components/NavBar";
import ConversationsBox from "../components/ConversationsBox";
import ChatBox from "../components/ChatBox";
import FocusUserProfile from "../components/FocusUserProfile";
import UserProfile from "../components/UserProfile";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SearchBox from "../components/SearchBox";
import FriendListBox from "../components/FriendListBox";
import ChatRoomItem from "../components/ConversationItem";
import WelcomeBox from "../components/WelcomeBox";

const PersonalChat = () => {
  const { currentUser, focusChatRoom, boxState } = useContext(MainContext);

  const [showFocusUserProfile, setShowFocusUserProfile] =
    useState<boolean>(false);
  const [showProfileBox, setshowProfileBox] = useState<boolean>(false);

  return (
    <div className="h-full flex justify-center ">
      {/* Toastify */}
      <ToastContainer />
      {/* User Profile Bõx */}
      <UserProfile
        showProfileBox={showProfileBox}
        setshowProfileBox={setshowProfileBox}
        userData={currentUser}
        role={"currentUser"}
      />
      {/* Main Content */}

      {/* Navbar */}
      <div className="w-[5%] h-full ">
        <NavBar setshowProfileBox={setshowProfileBox} />
      </div>

      {/* MenuBar */}
      <div className="w-[25%] h-full">
        {/* Header */}
        <div className="h-[10%] px-6 flex items-center text-[25px] font-bold border-b-[1px] border-lightLine dark:border-darkLine">
          {boxState === "conversationsBox" && "Trò chuyện"}
          {boxState === "directory" && "Danh bạ"}
        </div>
        {/* Search bar */}
        <div className="h-[8%]">
          <SearchBox />
        </div>

        <div className="h-[82%]">
          {boxState === "conversationsBox" && <ConversationsBox />}
        </div>
      </div>

      {/* Main Box */}
      <div className="w-[70%] h-[full] flex">
        {boxState === "conversationsBox" && (
          <>
            {focusChatRoom ? (
              <>
                <div
                  className={`${
                    showFocusUserProfile ? "w-[65%]" : "w-full"
                  } h-full border-x-[1px] border-lightLine dark:border-darkLine`}
                >
                  <ChatBox setShowFocusUserProfile={setShowFocusUserProfile} />
                </div>
                <div
                  className={`${
                    showFocusUserProfile ? "w-[35%]" : "w-[0%] hidden"
                  }`}
                >
                  <FocusUserProfile
                    setShowFocusUserProfile={setShowFocusUserProfile}
                  />
                </div>
              </>
            ) : (
              <div className="w-full h-full border-l-[1px] border-lightLine dark:border-darkLine">
                <WelcomeBox />
              </div>
            )}
          </>
        )}
        {boxState === "directory" && (
          <div className="w-full h-full border-l-[1px] border-lightLine dark:border-darkLine">
            <FriendListBox />
          </div>
        )}
      </div>
    </div>
  );
};

export default PersonalChat;
