import { useState, useEffect, useContext, useRef } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { MdRadioButtonUnchecked } from "react-icons/md";
import CreateGroup_SearchItem from "./CreateGroup_SearchItem";
import { MainContext } from "../context/MainProvider";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";
import CreateGroup_AddUserItem from "./CreateGroup_AddUserItem";

import { FaCameraRetro } from "react-icons/fa";

interface Props {
  setShowCreateGroupBox: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateGroupBox = ({ setShowCreateGroupBox }: Props) => {
  const {
    currentUser,
    newGroupUsers,
    friendList,
    setNewGroupUsers,
    errorToastify,
  } = useContext(MainContext);

  const [searchInput, setSearchInput] = useState<string>("");
  const [searchResult, setSearchResult] = useState<User[]>([]);

  const [displayName, setDisplayName] = useState<string>("");
  const [groupPhoto, setGroupPhoto] = useState<Blob>();

  const displayNameRef = useRef<HTMLInputElement>(null);

  const onChangImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target as HTMLInputElement & {
      files: FileList;
    };
    setGroupPhoto(file.files[0]);
  };

  const onSubmit = () => {
    const regEx = /[\s]+/g;
    // Check input
    if (regEx.test(displayName)) {
      errorToastify("Vui lòng đặt tên nhóm");
      displayNameRef.current?.focus();
      return;
    }

    // Delete space
    const newString = displayName.replace(/\s+/g, " ").trim();
    console.log(" Delete space", newString);
  };

  const searchUserHandler = async () => {
    if (searchInput.length === 0) return;
    // Create a reference to the users collection
    const usersRef = collection(db, "users");

    // Create a query against the collection by Display name
    const displayNameQ = query(
      usersRef,
      where("displayName", "==", searchInput)
    );

    // Create a query against the collection by Phone
    const phoneQ = query(usersRef, where("phone", "==", searchInput));

    // Create a query against the collection by Email
    const emailQ = query(usersRef, where("email", "==", searchInput));

    try {
      const searchResultList: User[] = [];

      // Get user by display name
      const userDisplayNameSnapshot = await getDocs(displayNameQ);
      userDisplayNameSnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        const user: User = {
          uid: doc.data().uid,
          displayName: doc.data().displayName,
          phone: doc.data().phone,
          email: doc.data().email,
          photoURL: doc.data().photoURL,
          sex: doc.data().sex,
          birthDay: doc.data().birthDay,
          birthPlace: doc.data().birthPlace,
          website: doc.data().website,
          aboutMe: doc.data().aboutMe,
        };
        if (user.uid !== currentUser?.uid) {
          searchResultList.push(user);
        }
      });

      // Get user by phone
      const userPhoneSnapshot = await getDocs(phoneQ);
      userPhoneSnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        const user: User = {
          uid: doc.data().uid,
          displayName: doc.data().displayName,
          phone: doc.data().phone,
          email: doc.data().email,
          photoURL: doc.data().photoURL,
          sex: doc.data().sex,
          birthDay: doc.data().birthDay,
          birthPlace: doc.data().birthPlace,
          website: doc.data().website,
          aboutMe: doc.data().aboutMe,
        };
        if (user.uid !== currentUser?.uid) {
          searchResultList.push(user);
        }
      });

      // Get user by email
      const userEmailSnapshot = await getDocs(emailQ);
      userEmailSnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        const user: User = {
          uid: doc.data().uid,
          displayName: doc.data().displayName,
          phone: doc.data().phone,
          email: doc.data().email,
          photoURL: doc.data().photoURL,
          sex: doc.data().sex,
          birthDay: doc.data().birthDay,
          birthPlace: doc.data().birthPlace,
          website: doc.data().website,
          aboutMe: doc.data().aboutMe,
        };
        if (user.uid !== currentUser?.uid) {
          searchResultList.push(user);
        }
      });

      setSearchResult(searchResultList);
    } catch (error) {
      console.log(error);

      errorToastify("Lỗi tìm kiếm người dùng!");
    }
  };

  useEffect(() => {
    searchUserHandler();
  }, [searchInput]);

  useEffect(() => {
    if (searchInput.length === 0) {
      setSearchResult([]);
    }
  }, [searchInput]);

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center">
      <div
        onClick={() => {
          setShowCreateGroupBox(false);
          setNewGroupUsers([]);
          setSearchResult([]);
        }}
        className="absolute top-0 left-0 w-full h-full bg-[#333] opacity-70"
      />
      <div className="w-[550px] h-[700px] bg-[#fff] dark:bg-[#040C0E] rounded-md z-40 overflow-hidden">
        {/* Header */}
        <div className="h-[8%] px-4 font-semibold text-[18px] flex items-center bg-lightPrimary1 dark:bg-darkPrimary1">
          Tạo nhóm chat mới
        </div>

        {/* Content */}
        <div className="h-[84%] px-4 py-3">
          {/* Display name and display photo */}
          <div className="flex items-center justify-between gap-2">
            <label
              htmlFor="displayPhoto"
              className="w-[50px] h-[50px] rounded-full border-[1px] border-lightPrimary dark:border-darkPrimary overflow-hidden cursor-pointer"
            >
              {groupPhoto !== undefined ? (
                <img
                  src={URL.createObjectURL(groupPhoto)}
                  alt="Ảnh"
                  className="w-full h-full"
                />
              ) : (
                <span className="w-full h-full flex justify-center items-center">
                  <FaCameraRetro className="text-lightPrimary dark:text-darkPrimary" />
                </span>
              )}
              <input
                id="displayPhoto"
                type="file"
                onChange={onChangImg}
                className="hidden"
              />
            </label>
            <input
              type="text"
              ref={displayNameRef}
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="w-[440px] h-[38px] border-b-[1px] border-lightPrimary dark:border-darkPrimary px-[15px] py-[6px] text-[15px] bg-transparent"
              placeholder="Đặt tên nhóm..."
            />
          </div>

          {/* Searcher */}
          <div className="mt-3">
            <div>Thêm người dùng vào nhóm</div>
            <div className="relative">
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="editProfileInput text-[15px] bg-transparent mt-2"
                placeholder="Nhập tên người dùng, số điện thoại hoặc email để tìm kiếm"
              />
              {searchInput.length > 0 && (
                <span
                  onClick={() => setSearchInput("")}
                  className="absolute right-2 top-[18px] cursor-pointer"
                >
                  <AiOutlineClose />
                </span>
              )}
            </div>
          </div>

          {/* User List Box */}
          <div className="h-[420px] mt-3 flex border-b-[1px] border-t-[1px] border-b-lightLine dark:border-darkLine overflow-hidden">
            {/* Search Result List */}
            <div className="h-full w-[60%] overflow-y-auto">
              <div className="py-2 font-semibold text-[18px]">
                {searchResult.length > 0 ? "Kết quả" : "Bạn bè"}
              </div>

              {searchResult.length > 0
                ? searchResult.map((userData) => (
                    <CreateGroup_SearchItem
                      key={userData.uid}
                      data={userData}
                    />
                  ))
                : friendList.map((userData) => (
                    <CreateGroup_SearchItem
                      key={userData.uid}
                      data={userData}
                    />
                  ))}
            </div>

            {/* Add User List */}
            <div className="h-full w-[40%] border-l-[1px] border-b-lightLine dark:border-darkLine overflow-y-auto">
              <div className="p-2 flex items-center gap-2">
                <span>Thành viên</span>
                <span className="bg-lightPrimary dark:bg-darkPrimary px-2 rounded-lg text-whiteCus dark:text-blackCus ">
                  {newGroupUsers.length}
                </span>
              </div>
              {newGroupUsers.map((userData) => (
                <CreateGroup_AddUserItem key={userData.uid} data={userData} />
              ))}
            </div>
          </div>
        </div>

        {/* Button */}
        <div className="h-[8%] flex justify-end items-center gap-2 px-3">
          <button className="px-4 py-2 rounded-md border-[1px] border-lightPrimary dark:border-darkPrimary hover:bg-lightFocus dark:hover:bg-darkFocus duration-200">
            Huỷ
          </button>
          <button
            onClick={onSubmit}
            className="px-4 py-2 rounded-md bg-lightPrimary dark:bg-darkPrimary text-whiteCus dark:text-blackCus hover:opacity-70 duration-200"
          >
            Tạo
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateGroupBox;
