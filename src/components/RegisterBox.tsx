import { useState, useEffect, useContext, useRef } from "react";
import { createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

import { Stack, Button, Image } from "react-bootstrap";
import {
  AiFillEye,
  AiFillEyeInvisible,
  AiOutlineLoading3Quarters,
} from "react-icons/ai";
import { MainContext } from "../context/MainProvider";
import NotifiModal from "./NotifiModal";
import { checkDisplayNameRegex } from "../utils/regex";
import Tippy from "@tippyjs/react";

const RegisterBox = () => {
  const { darkMode, successToastify, errorToastify, setCurrentUser } =
    useContext(MainContext);

  // Data Form
  const [displayName, setDisplayName] = useState<string>("");
  const [photo, setPhoto] = useState<Blob>();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  // Input Tippy
  const [displayNameTippy, setDisplayNameTippy] = useState<boolean>(false);
  const [passwordTippy, setPasswordTippy] = useState<boolean>(false);

  // displayName Ref
  const displayNameRef = useRef<HTMLInputElement>(null);

  // Show Password action
  const [showPW, setShowPW] = useState<boolean>(false);
  const [showConfirmPW, setShowConfirmPW] = useState<boolean>(false);

  // Loading action
  const [loading, setLoading] = useState<boolean>(false);
  const [notifiText, setNotifiText] = useState<string>("");

  // Show modals action
  const [showModal, setShowModal] = useState<boolean>(false);

  const onchangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target as HTMLInputElement & {
      files: FileList;
    };
    setPhoto(file.files[0]);
  };

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Check the inputs
    if (!displayName || !email || !password || !confirmPassword) {
      setShowModal(true);
      setNotifiText("Vui lòng điền đầy đủ thông tin đăng kí!");
      return;
    } else if (password !== confirmPassword) {
      setShowModal(true);
      setNotifiText("Xác nhận mật khẩu không đúng! ");
      return;
    }

    // Delete space
    const newString = displayName.replace(/\s+/g, " ").trim();
    console.log(" Delete space", newString);

    // Check display type
    const checkDisplayName = checkDisplayNameRegex(newString);
    console.log("checkDisplayName", checkDisplayName);

    if (!checkDisplayName) {
      errorToastify(
        "Tên người dùng không đúng định dạng, vui lòng thử lại tên khác!"
      );
      displayNameRef.current?.blur();
      displayNameRef.current?.focus();
      return;
    }

    // Register Action
    setLoading(true);

    // Register with Email
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const newUser = userCredential.user;

      // Create a root reference
      const storage = getStorage();

      // Create a reference to 'mountains.jpg'

      // 'file' comes from the Blob or File API

      if (photo === undefined) {
        return;
      }

      await uploadBytes(ref(storage, `${newUser.uid}.avatar`), photo)
        .then((img) => {
          console.log("img upload", img);
        })
        .catch((err) => console.log("Lỗi up ảnh", err));

      // get photoURL
      let avatarURL;
      try {
        avatarURL = await getDownloadURL(ref(storage, `${newUser.uid}.avatar`));
      } catch (error) {
        console.log("Lỗi lấy url ảnh", error);
      }

      // Create new user in Firestore
      const user: User = {
        uid: newUser.uid,
        displayName: newString,
        phone: null,
        email,
        photoURL: avatarURL || "",
        sex: null,
        birthDay: null,
        birthPlace: null,
        website: null,
        aboutMe: null,
        friends: [],
        chatRooms: [],
      };
      await setDoc(doc(db, "users", newUser.uid), user);
      setCurrentUser(user);
      setLoading(false);
      successToastify("Đăng kí thành công! Chào mừng bạn đến KChat!");
    } catch (error) {
      if (
        error === "FirebaseError: Firebase: Error (auth/email-already-in-use)"
      ) {
        errorToastify("Email đã có người sử dụng!");
      } else {
        errorToastify("Lỗi đăng kí: Đã xảy ra lỗi gì đó!");
      }
      console.log(error);

      setLoading(false);
      // ..
    }
  };

  return (
    <>
      <NotifiModal
        notifiText={notifiText}
        showModal={showModal}
        setShowModal={setShowModal}
      />
      <Stack gap={2}>
        {/* Title */}
        <h1 className="text-center text-2xl font-bold">Đăng Kí</h1>
        {/* Content */}
        <form onSubmit={submitHandler}>
          {/* Display name */}
          <div className="mt-1">
            <label htmlFor="displayName" className="font-semibold mb-2">
              Tên người dùng
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
                placeholder="Your name"
                value={displayName}
                ref={displayNameRef}
                required
                onChange={(e) => setDisplayName(e.target.value)}
                onFocus={() => {
                  setDisplayNameTippy(true);
                  setTimeout(() => {
                    setDisplayNameTippy(false);
                  }, 4000);
                }}
                onBlur={() => setDisplayNameTippy(false)}
                autoComplete="off"
                className="logInput"
              />
            </Tippy>
          </div>

          {/* Email */}
          <div className="mt-3">
            <label htmlFor="email" className="font-semibold mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="example@mail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="logInput"
            />
          </div>

          {/* Avatar */}
          <div className="mt-3">
            <label htmlFor="avatar" className="font-semibold mb-2">
              Ảnh đại diện
            </label>
            <div className="flex items-center gap-3">
              <Image
                src={
                  photo !== undefined
                    ? URL.createObjectURL(photo)
                    : require("../assets/images/avatar.png")
                }
                alt="Ảnh profile"
                roundedCircle
                className="w-[60px] h-[60px] border-[1px] border-lightLine dark:border-darkPrimary"
              />
              <input
                id="avatar"
                type="file"
                placeholder="Chọn 1 ảnh"
                onChange={onchangeFile}
                required
                className="w-[250px] rounded-md border-[1px] border-darkLine dark:border-lightLine "
              />
            </div>
          </div>

          {/* Password */}
          <div className="mt-3">
            <label htmlFor="password" className="font-semibold mb-2">
              Mật khẩu
            </label>
            <div className="relative">
              <Tippy
                visible={passwordTippy}
                placement="left"
                theme={darkMode ? "darkCustom" : "lightCustom"}
                content="Mật khẩu phải ít nhất là 6 kí tự"
                delay={[600, 0]}
              >
                <input
                  id="password"
                  type={`${showPW ? "text" : "password"}`}
                  value={password}
                  onFocus={() => setPasswordTippy(true)}
                  onBlur={() => setPasswordTippy(false)}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="logInput"
                />
              </Tippy>
              <span
                onClick={() => setShowPW(!showPW)}
                className="absolute top-[20%] right-2 text-[22px]"
              >
                {showPW ? <AiFillEye /> : <AiFillEyeInvisible />}
              </span>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="mt-3">
            <label htmlFor="confirmPassword" className="font-semibold mb-2">
              Xác nhận lại mật khẩu
            </label>
            <div className="relative">
              <input
                id="confirmPassword"
                type={`${showConfirmPW ? "text" : "password"}`}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="logInput"
              />
              <span
                onClick={() => setShowConfirmPW(!showConfirmPW)}
                className="absolute top-[20%] right-2 text-[22px]"
              >
                {showConfirmPW ? <AiFillEye /> : <AiFillEyeInvisible />}
              </span>
            </div>
          </div>

          {/* Btn */}
          <div className="flex justify-center mt-4">
            <Button
              type="submit"
              variant="danger"
              className="w-[150px] h-[40px]"
            >
              {loading ? (
                <div className=" flex justify-center items-center">
                  <AiOutlineLoading3Quarters className="text-[25px] animate-spin" />
                </div>
              ) : (
                <span className="text-[18px]">Đăng kí</span>
              )}
            </Button>
          </div>
        </form>
      </Stack>
    </>
  );
};

export default RegisterBox;
