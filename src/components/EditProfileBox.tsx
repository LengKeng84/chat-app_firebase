import { useContext, useState, useRef } from "react";
import { MainContext } from "../context/MainProvider";
import { Image } from "react-bootstrap";
import { MdRadioButtonChecked, MdRadioButtonUnchecked } from "react-icons/md";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { checkDisplayNameRegex, checkPhoneRegex } from "../utils/regex";
import Tippy from "@tippyjs/react";

interface Props {
  setShowEditBox: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditProfileBox = ({ setShowEditBox }: Props) => {
  const { currentUser, darkMode, successToastify, errorToastify } =
    useContext(MainContext);

  // Form Data

  const [displayName, setDisplayName] = useState<string>(
    currentUser?.displayName
      ? currentUser?.displayName
      : `Người dùng ${currentUser?.uid}`
  );
  const [phone, setPhone] = useState<string | undefined>(
    currentUser?.phone ? currentUser?.phone : undefined
  );
  const [sex, setSex] = useState<string | undefined>(
    currentUser?.sex ? currentUser?.sex : undefined
  );
  const [birthDay, setBirthDay] = useState<string | undefined>(
    currentUser?.birthDay ? currentUser?.birthDay : undefined
  );
  const [birthPlace, setBirthPlace] = useState<string | undefined>(
    currentUser?.birthPlace ? currentUser?.birthPlace : undefined
  );
  const [website, setWebsite] = useState<string | undefined>(
    currentUser?.website ? currentUser?.website : undefined
  );
  const [aboutMe, setAboutMe] = useState<string | undefined>(
    currentUser?.aboutMe ? currentUser?.aboutMe : undefined
  );

  const displayNameRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);

  // Tippy
  const [displayNameTippy, setDisplayNameTippy] = useState<boolean>(false);
  const [phoneTippy, setPhoneTippy] = useState<boolean>(false);

  const [btnDisable, setBtnDisable] = useState<boolean>(false);

  // useEffect(() => {}, [
  //   displayName,
  //   phone,
  //   sex,
  //   birthDay,
  //   birthPlace,
  //   website,
  //   aboutMe,
  // ]);

  const submit = async () => {
    // check data
    // Delete space
    const displayNameSubmit = displayName.replace(/\s+/g, " ").trim();
    const phoneSubmit = phone?.replace(/\s+/g, " ").trim();
    const birthPlaceSubmit = birthPlace?.replace(/\s+/g, " ").trim();
    const websiteSubmit = website?.replace(/\s+/g, " ").trim();
    const aboutMeSubmit = aboutMe?.replace(/\s+/g, " ").trim();
    // Check display type

    console.log(
      "displayName",
      displayName,
      "displayNameSubmit",
      displayNameSubmit
    );

    const checkDisplayName = checkDisplayNameRegex(displayNameSubmit);
    console.log(checkDisplayName);

    if (!checkDisplayName) {
      displayNameRef.current?.focus();
      setDisplayNameTippy(true);
      setTimeout(() => {
        setDisplayNameTippy(false);
      }, 4000);
      return;
    }

    if (phoneSubmit) {
      const checkPhone = checkPhoneRegex(phoneSubmit);
      console.log("checkPhone", checkPhone);

      if (!checkPhone) {
        phoneRef.current?.focus();
        setPhoneTippy(true);
        setTimeout(() => {
          setPhoneTippy(false);
        }, 4000);
        return;
      }
    }

    try {
      if (currentUser) {
        await updateDoc(doc(db, "users", currentUser?.uid), {
          displayName:
            displayNameSubmit === undefined
              ? `Người dùng ${currentUser?.uid}`
              : displayNameSubmit,
          phone: phoneSubmit === undefined ? null : phoneSubmit,
          photoURL:
            "https://thcs-thptlongphu.edu.vn/wp-content/uploads/2023/03/hinh-anh-dep-tren-mang2b252822529.jpg",
          sex: sex === undefined ? null : sex,
          birthDay: birthDay === undefined ? null : birthDay,
          birthPlace: birthPlaceSubmit === undefined ? null : birthPlaceSubmit,
          website: websiteSubmit === undefined ? null : websiteSubmit,
          aboutMe: aboutMeSubmit === undefined ? null : aboutMeSubmit,
        });
      }

      successToastify("Cập nhật thông tin thành công!");
      setShowEditBox(false);
    } catch (error) {
      errorToastify("Cập nhật thất bại! Đã xảy ra lỗi gì đó!");
      console.log(error);
    }
  };

  return (
    <div className="w-[450px] h-[600px] bg-[#fff] dark:bg-[#040C0E] rounded-md overflow-hidden">
      {/* Header */}
      <div className="h-[8%] text-center text-[20px] font-bold bg-lightPrimary1 dark:bg-darkPrimary1 py-2">
        Cập nhật thông tin
      </div>

      {/* Container */}
      <div className="h-[82%] px-3 py-3 overflow-auto">
        {/* Image */}
        <div className="">
          <div className="font-semibold mb-2">Ảnh đại diện</div>
          <div className="flex items-center gap-3">
            <Image
              src={
                currentUser?.photoURL
                  ? currentUser.photoURL
                  : require("../assets/images/userAvatar.jpg")
              }
              alt="Ảnh profile"
              roundedCircle
              className="w-[60px] h-[60px] border-[1px] border-lightLine dark:border-darkPrimary"
            />
            <button className="h-[40px] text-[14px] px-3 py-1 border-[1px] rounded-md border-lightPrimary dark:border-darkPrimary duration-200 hover:bg-lightHover dark:hover:bg-darkHover">
              Upload ảnh mới
            </button>
          </div>
        </div>
        {/* Display name */}
        <div className="mt-3">
          <label htmlFor="displayName" className="font-semibold mb-2">
            Tên hiển thị
          </label>
          <Tippy
            visible={displayNameTippy}
            placement="left"
            theme={darkMode ? "darkCustom" : "lightCustom"}
            content="Tên đăng nhập không được là số hoặc các kí tự đặc biệt như '. , ? \ /'"
            delay={[600, 0]}
          >
            <input
              id="displayName"
              type="text"
              ref={displayNameRef}
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="editProfileInput bg-transparent"
            />
          </Tippy>
        </div>

        {/* Phone*/}
        <div className="mt-3">
          <label htmlFor="phone" className="font-semibold mb-2">
            Số điện thoại
          </label>
          <Tippy
            visible={phoneTippy}
            placement="left"
            theme={darkMode ? "darkCustom" : "lightCustom"}
            content="Số điện thoại là các số từ 0-9"
            delay={[600, 0]}
          >
            <input
              id="phone"
              type="text"
              ref={phoneRef}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="editProfileInput bg-transparent"
            />
          </Tippy>
        </div>

        {/* Sex*/}
        <div className="mt-3">
          <div className="font-semibold mb-2">Giới tính</div>
          <div className="flex items-center gap-5">
            {/* Female */}
            <div
              onClick={() => setSex("nữ")}
              className="flex items-center gap-2 px-1 cursor-pointer"
            >
              <span className="text-[20px] text-lightPrimary dark:text-darkPrimary">
                {sex === "nữ" ? (
                  <MdRadioButtonChecked />
                ) : (
                  <MdRadioButtonUnchecked />
                )}
              </span>
              <span>Nữ</span>
            </div>

            {/* Male */}
            <div
              onClick={() => setSex("nam")}
              className="flex items-center gap-2 px-1 cursor-pointer"
            >
              <span className="text-[20px] text-lightPrimary dark:text-darkPrimary">
                {sex === "nam" ? (
                  <MdRadioButtonChecked />
                ) : (
                  <MdRadioButtonUnchecked />
                )}
              </span>
              <span>Nam</span>
            </div>
          </div>
        </div>

        {/* BirthDay */}
        <div className="mt-3">
          <label htmlFor="birthDay" className="font-semibold mb-2">
            Ngày sinh
          </label>
          <div>
            <input
              id="birthDay"
              type="date"
              value={birthDay}
              onChange={(e) => setBirthDay(e.target.value)}
              className="editProfileInput bg-transparent w-[50%] tracking-wide"
            />
          </div>
        </div>

        {/* Birth Place*/}
        <div className="mt-3">
          <label htmlFor="birthPlace" className="font-semibold mb-2">
            Nơi sinh
          </label>
          <input
            id="birthPlace"
            type="text"
            value={birthPlace}
            onChange={(e) => setBirthPlace(e.target.value)}
            className="editProfileInput bg-transparent"
          />
        </div>

        {/* Website*/}
        <div className="mt-3">
          <label htmlFor="website" className="font-semibold mb-2">
            Website
          </label>
          <input
            id="website"
            type="text"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            className="editProfileInput bg-transparent"
          />
        </div>

        {/* About me*/}
        <div className="mt-3">
          <label htmlFor="aboutMe" className="font-semibold mb-2">
            Về tôi
          </label>
          <input
            id="aboutMe"
            type="text"
            value={aboutMe}
            onChange={(e) => setAboutMe(e.target.value)}
            className="editProfileInput bg-transparent"
          />
        </div>
      </div>

      {/* Submit Button */}
      <div className="h-[10%] flex justify-end items-center gap-3 px-4">
        <button
          onClick={() => setShowEditBox(false)}
          className="border-[1px] border-lightPrimary dark:border-darkPrimary rounded-md text-lightPrimary dark:text-darkPrimary px-5 py-1 duration-200 hover:bg-lightHover dark:hover:bg-darkHover"
        >
          Huỷ
        </button>
        <button
          onClick={submit}
          className="bg-lightPrimary dark:bg-darkPrimary rounded-md text-whiteCus dark:text-blackCus px-5 py-1 duration-200 hover:opacity-80"
        >
          Cập nhật
        </button>
      </div>
    </div>
  );
};

export default EditProfileBox;
