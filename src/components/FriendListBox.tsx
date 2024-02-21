import { useState, useContext } from "react";
import FriendItem from "./FriendItem";
import { MainContext } from "../context/MainProvider";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import UserProfile from "./UserProfile";

const FriendListBox = () => {
  const { friendList } = useContext(MainContext);

  const [showUserProfile, setShowUserProfile] = useState<boolean>(false);

  const [focusFriend, setFocusFriend] = useState<User | null>(null);

  return (
    <div className="h-full">
      <UserProfile
        userData={focusFriend}
        showProfileBox={showUserProfile}
        setshowProfileBox={setShowUserProfile}
        role={"friend"}
      />

      {/* Header */}
      <div className="h-[10%] px-5 flex items-center text-[25px] font-bold border-b-[1px] border-lightLine dark:border-darkLine">
        Danh sách bạn bè
      </div>

      {/* Number of Friends */}
      <div className="h-[5%] flex items-end px-4 text-[18px] font-semibold">
        Bạn bè ({friendList && friendList.length})
      </div>

      {/* Container */}
      <div className="h-[85%] p-4 flex content-start flex-wrap gap-x-4 gap-y-4 overflow-y-auto">
        {friendList.length > 0 ? (
          friendList.map((data, index) => (
            <div
              onClick={() => {
                setFocusFriend(data);
                setShowUserProfile(true);
              }}
              className="w-[30%] h-[70px]"
            >
              <FriendItem key={index} userData={data} />
            </div>
          ))
        ) : (
          <div className="w-full h-full flex justify-center items-center text-[20px] font-semibold">
            Chưa có bạn bè nào
          </div>
        )}
      </div>
    </div>
  );
};

export default FriendListBox;
