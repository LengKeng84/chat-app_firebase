import { useContext } from "react";
import { Image } from "react-bootstrap";
import { AiOutlineFile, AiOutlineSetting } from "react-icons/ai";
import { BsChatDots } from "react-icons/bs";
import { SlNotebook } from "react-icons/sl";
import LogoutBtn from "./LogoutBtn";
import { MainContext } from "../context/MainProvider";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import "tippy.js/themes/light.css";

interface Props {
  setshowProfileBox: React.Dispatch<React.SetStateAction<boolean>>;
}

const NavBar = ({ setshowProfileBox }: Props) => {
  const { currentUser, darkMode, setDarkMode, boxState, setBoxState } =
    useContext(MainContext);
  const navBarBtns = [
    {
      element: (
        <button
          onClick={() => setshowProfileBox(true)}
          className="w-[40px] h-[40px] mb-[8px]"
        >
          <Image
            src={
              currentUser?.photoURL
                ? currentUser.photoURL
                : require("../assets/images/userAvatar.jpg")
            }
            alt="Ảnh profile"
            roundedCircle
            className="w-full h-full hover:border-[2px] hover:border-lightPrimary hover:dark:border-darkPrimary duration-200 hover:scale-125"
          />
        </button>
      ),
      note: "Hồ sơ người dùng",
    },
    {
      element: (
        <button
          onClick={() => setBoxState("conversationsBox")}
          className={`btnNavBar ${
            boxState === "conversationsBox" &&
            "bg-lightPrimary dark:bg-darkPrimary text-whiteCus dark:text-blackCus"
          }`}
        >
          <BsChatDots />
        </button>
      ),
      note: "Trò chuyện",
    },
    {
      element: (
        <button
          onClick={() => setBoxState("directory")}
          className={`btnNavBar ${
            boxState === "directory" &&
            "bg-lightPrimary dark:bg-darkPrimary text-whiteCus dark:text-blackCus"
          }`}
        >
          <SlNotebook />
        </button>
      ),
      note: "Danh bạ",
    },
    // {
    //   element: (
    //     <button className="btnNavBar">
    //       <AiOutlineFile />
    //     </button>
    //   ),
    //   note: "File",
    // },
    {
      element: (
        <button className="btnNavBar">
          <AiOutlineSetting />
        </button>
      ),
      note: "Cài đặt",
    },
    {
      element: (
        <div
          onClick={() => setDarkMode(!darkMode)}
          className="btnNavBar hover:text-[#ffff79] dark:hover:text-[#ffff79]"
        >
          {darkMode ? <MdOutlineDarkMode /> : <MdOutlineLightMode />}
        </div>
      ),
      note: "Đổi chế độ xem",
    },
  ];

  return (
    <div className="w-full h-full bg-lightPrimary1 dark:bg-darkPrimary1 flex flex-col items-center">
      {/* Brand */}
      <div className="">
        <Image src={require("../assets/images/brandLogo.png")} />
      </div>

      {/* Nav Button */}
      <div className="flex justify-center items-center flex-col gap-2 mt-[30px]">
        {navBarBtns.map((data, index) => (
          <Tippy
            key={index}
            placement="right"
            theme={darkMode ? "darkCustom" : "lightCustom"}
            content={data.note}
            delay={[600, 0]}
          >
            {data.element}
          </Tippy>
        ))}
      </div>

      {/* Logout Button */}
      <Tippy
        placement="right"
        theme={darkMode ? "darkCustom" : "lightCustom"}
        content="Đăng xuất"
        delay={[600, 0]}
      >
        <div className="mt-auto mb-[20px] flex justify-center">
          <LogoutBtn />
        </div>
      </Tippy>
    </div>
  );
};

export default NavBar;

{
  /* <OverlayTrigger
placement="right"
delay={{ show: 250, hide: 200 }}
overlay={<Tooltip id="tooltip-right">Cài đặt</Tooltip>}
>
<button className="w-[50px] h-[50px] rounded-xl flex justify-center items-center text-[22px] duration-200 hover:bg-[rgba(225,225,225,0.3)] hover:text-[25px] hover:text-[#ff3131]">
  <AiOutlineSetting />
</button>
</OverlayTrigger> */
}
