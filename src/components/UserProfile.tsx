import { useContext, useState } from "react";
import { Image } from "react-bootstrap";
import EditProfileBox from "./EditProfileBox";
import { MainContext } from "../context/MainProvider";
import { arrayRemove, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

interface Props {
  showProfileBox: boolean;
  setshowProfileBox: React.Dispatch<React.SetStateAction<boolean>>;
  userData: User | null;
  role: string;
}

const UserProfile = ({
  userData,
  role,
  showProfileBox,
  setshowProfileBox,
}: Props) => {
  const { currentUser, successToastify, errorToastify } =
    useContext(MainContext);
  const [showEditBox, setShowEditBox] = useState<boolean>(false);

  const unfriendHandler = async (uid: string | undefined) => {
    if (!currentUser || !userData) return;

    try {
      // Cập nhật danh sách bạn bè cho currentUser
      await updateDoc(doc(db, "users", currentUser?.uid), {
        friends: arrayRemove(uid),
      });

      // Cập nhật danh sách bạn bè cho selectUser
      await updateDoc(doc(db, "users", userData?.uid), {
        friends: arrayRemove(currentUser.uid),
      });

      successToastify("Huỷ kết bạn thành công!");
    } catch (error) {
      errorToastify("Không thể huỷ kết bạn! Đã xảy ra lỗi gì đó! :((");
      console.log(error);
    }
  };

  return (
    <div
      className={`fixed top-0 left-0 w-full h-full flex justify-center items-center z-10 ${
        showProfileBox ? "visible" : "invisible"
      }`}
    >
      <div
        onClick={() => {
          setshowProfileBox(false);
          setShowEditBox(false);
        }}
        className="absolute top-0 left-0 w-full h-full bg-[#333] opacity-90"
      />

      {/* Profile Box */}
      <div
        className={`w-[450px] h-[600px] bg-[#fff] dark:bg-[#040C0E] rounded-md z-40 overflow-hidden duration-300 ${
          !showProfileBox && "opacity-0"
        }`}
      >
        {/* Header */}
        <div className="w-full h-[8%] text-[20px] font-bold bg-lightPrimary1 dark:bg-darkPrimary1 text-center py-2">
          Hồ sơ người dùng
        </div>

        {/* Content */}
        <div className="w-full h-[82%] flex flex-col items-center overflow-y-scroll">
          {/* Image */}
          <div className="w-[90px] h-[90px] mt-3">
            <Image
              src={
                userData?.photoURL
                  ? userData.photoURL
                  : require("../assets/images/userAvatar.jpg")
              }
              alt="Ảnh profile"
              roundedCircle
              className="w-full h-full border-[1px] border-lightLine dark:border-darkPrimary"
            />
          </div>

          {/* Display Name */}
          <div className="mt-2 text-[18px] font-semibold">
            {userData?.displayName ? (
              userData?.displayName
            ) : (
              <span className="italic text-[#e64949]">
                * Chưa đặt tên hiển thị
              </span>
            )}
          </div>

          {/* Info */}
          <div className="px-3">
            {/* Sex */}
            <div className="mt-2 text-[14px] font-medium flex items-center">
              <span className="w-[100px]">Giới tính:</span>
              <span className="capitalize">
                {userData?.sex ? userData.sex : "_ _ _"}
              </span>
            </div>

            {/* Phone */}
            <div className="mt-2 text-[14px] font-medium flex items-center">
              <span className="w-[100px]">Điện thoại:</span>
              <span className="">
                {userData?.phone ? userData.phone : "_ _ _"}
              </span>
            </div>

            {/* Email */}
            <div className="mt-2 text-[14px] font-medium flex items-center">
              <span className="w-[100px]">Email:</span>
              <span className="">
                {userData?.email ? userData.email : "_ _ _"}
              </span>
            </div>

            {/* BirthDay */}
            <div className="mt-2 text-[14px] font-medium flex items-center">
              <span className="w-[100px]">Ngày sinh:</span>
              <span className="">
                {userData?.birthDay ? userData.birthDay : "_ _ _"}
              </span>
            </div>

            {/* BirthPlace */}
            <div className="mt-2 text-[14px] font-medium flex items-start ">
              <span className="w-[100px]">Nơi sinh:</span>
              <div className="break-words w-[300px]">
                {userData?.birthPlace ? userData.birthPlace : "_ _ _"}
              </div>
            </div>

            {/* Website */}
            <div className="mt-2 text-[14px] font-medium flex items-start">
              <span className="w-[100px]">Website:</span>
              <div className="w-[300px] break-words">
                {userData?.website ? userData.website : "_ _ _"}
              </div>
            </div>

            {/* About */}
            <div className="mt-4 text-[14px] ">
              <span className="w-[120px] font-medium">Về tôi:</span>
              <div className="mt-1">
                {userData?.aboutMe ? userData.aboutMe : "_ _ _"}
              </div>
            </div>
          </div>
        </div>
        {/* Edit Button */}
        <div className="h-[10%] flex justify-center items-center gap-4">
          {role === "currentUser" && (
            <button
              onClick={() => setShowEditBox(true)}
              className="border-[1px] border-lightPrimary dark:border-darkPrimary rounded-md text-lightPrimary dark:text-darkPrimary px-5 py-1 hover:bg-lightHover dark:hover:bg-darkHover"
            >
              Cập nhật thông tin
            </button>
          )}
          {role === "friend" && (
            <>
              <button className="border-[1px] border-lightPrimary dark:border-darkPrimary rounded-md text-lightPrimary dark:text-darkPrimary px-5 py-1 hover:bg-lightHover dark:hover:bg-darkHover">
                Nhắn tin
              </button>
              <button
                onClick={() => unfriendHandler(userData?.uid)}
                className="border-[1px] border-lightPrimary dark:border-darkPrimary rounded-md text-lightPrimary dark:text-darkPrimary px-5 py-1 hover:bg-lightHover dark:hover:bg-darkHover"
              >
                Huỷ kết bạn
              </button>
            </>
          )}
        </div>
      </div>

      {/* Edit Box */}
      {role === "currentUser" && (
        <div
          className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 duration-200 ${
            showEditBox ? "visible" : "invisible opacity-0"
          }`}
        >
          <EditProfileBox setShowEditBox={setShowEditBox} />
        </div>
      )}
    </div>
  );
};

export default UserProfile;
