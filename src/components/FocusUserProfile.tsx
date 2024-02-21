import React from "react";
import { Image } from "react-bootstrap";
import { AiOutlineClose, AiOutlineMail, AiOutlinePhone } from "react-icons/ai";
import { LiaBirthdayCakeSolid } from "react-icons/lia";
import { IoEarthOutline } from "react-icons/io5";

interface Props {
  setShowFocusUserProfile: React.Dispatch<React.SetStateAction<boolean>>;
}

const FocusUserProfile = ({ setShowFocusUserProfile }: Props) => {
  return (
    <div className="w-full h-full">
      {/* Header */}
      <div className="h-[10%] px-4 border-b-[1px] border-lightLine dark:border-darkLine flex justify-between items-center">
        <div className="text-[22px] font-bold">Hồ sơ</div>
        <button
          onClick={() => setShowFocusUserProfile(false)}
          className="w-10 h-8 flex justify-center items-center rounded-md border-[2px] border-lightLine dark:border-darkLine duration-100 hover:border-lightPrimary dark:hover:border-darkPrimary hover:text-lightPrimary dark:hover:text-darkPrimary"
        >
          <AiOutlineClose />
        </button>
      </div>

      {/* Content */}
      <div className="h-[90%] px-4 py-3 overflow-auto">
        {/* Image */}
        <div className="flex justify-center items-center">
          <Image
            src="https://demoda.vn/wp-content/uploads/2022/08/hinh-anh-avatar-nu-de-thuong.jpg"
            alt="Ảnh profile"
            roundedCircle
            className="w-28 h-28"
          />
        </div>

        {/* Name */}
        <div className="mt-3 text-center text-[20px] font-semibold">
          Trần Hoài Huy
        </div>

        {/* Story */}
        <div className="mt-4 ">
          Lorem ipsum is a pseudo-Latin text used in web design, typography,
          layout, and printing in place of English to emphasise design elements
          over content. It's also called placeholder (or filler) text. It's a
          convenient tool for mock-ups. Lorem ipsum is a pseudo-Latin text used
          in web design, typography, layout, and printing in place of English to
          emphasise design elements over content. It's also called placeholder
          (or filler) text. It's a convenient tool for mock-ups.
        </div>

        {/* Info */}
        <div className="mt-4">
          {/* Phone */}
          <div className="mt-4 flex flex-col">
            <div className="flex items-center">
              <div className="text-[22px]">
                <AiOutlinePhone />
              </div>
              <div className="ml-2 font-medium">Số điện thoại</div>
            </div>
            <div className="ml-1 mt-1 break-all">0966 268 701</div>
          </div>
          {/* Email */}
          <div className="mt-4 flex flex-col">
            <div className="flex items-center">
              <div className="text-[22px]">
                <AiOutlineMail />
              </div>
              <div className="ml-2 font-medium">Email</div>
            </div>
            <div className="ml-1 mt-1 break-all">huyplsa32@gmail.com</div>
          </div>
          {/* BirthDay */}
          <div className="mt-4 flex flex-col">
            <div className="flex items-center">
              <div className="text-[22px]">
                <LiaBirthdayCakeSolid />
              </div>
              <div className="ml-2 font-medium">Ngày sinh</div>
            </div>
            <div className="ml-1 mt-1 break-all">12/2/3224</div>
          </div>

          {/* Website */}
          <div className="mt-4 flex flex-col">
            <div className="flex items-center">
              <div className="text-[22px]">
                <IoEarthOutline />
              </div>
              <div className="ml-2 font-medium">Website</div>
            </div>
            <div className="ml-1 mt-1 break-all">
              https://chat.zalo.me/?g=cmfzvc346
            </div>
          </div>
          {/* Social media accounts */}
        </div>
      </div>
    </div>
  );
};

export default FocusUserProfile;
