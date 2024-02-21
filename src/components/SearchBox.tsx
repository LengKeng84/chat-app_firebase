import { useState, useContext, useEffect } from "react";
import SearchItem from "./SearchItem";

import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";
import { MainContext } from "../context/MainProvider";
import {
  AiOutlineClose,
  AiOutlineFileSearch,
  AiOutlineLoading3Quarters,
} from "react-icons/ai";
import { BsSearch } from "react-icons/bs";

const AddFriendBox = () => {
  const { currentUser, errorToastify } = useContext(MainContext);

  const [searchInput, setSearchInput] = useState<string>("");
  const [userResult, setUserResult] = useState<User[]>([]);

  const [showResultBox, setShowResultBox] = useState<boolean>(false);
  const [showCloseBtn, setShowCloseBtn] = useState<boolean>(false);
  // const [showNoResult, setShowNoResult] = useState<boolean>(false);

  // Search User
  const searchUserHandler = async () => {
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

      setUserResult(searchResultList);
    } catch (error) {
      console.log(error);

      errorToastify("Lỗi tìm kiếm người dùng!");
    }
  };

  useEffect(() => {
    searchUserHandler();
  }, [searchInput]);

  return (
    <div className="relative w-full h-full flex justify-center items-center">
      <div className="relative w-full h-[35px] px-3 flex items-center gap-1">
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Tìm kiếm"
          className="w-full h-full border-[1px] rounded-md border-lightLine dark:border-darkLine bg-transparent pl-[15px] pr-10 focus:border-[2px] focus:border-lightPrimary dark:focus:border-darkPrimary"
          onFocus={() => {
            setShowResultBox(true);
            setShowCloseBtn(true);
          }}
        />

        <button
          onClick={() => {
            setShowResultBox(false);
            setShowCloseBtn(false);
            setSearchInput("");
            setUserResult([]);
          }}
          className={`${
            !showCloseBtn && "hidden"
          } h-[35px] px-2 rounded-md flex justify-center items-center text-[15px] font-semibold hover:bg-lightFocus dark:hover:bg-darkFocus`}
        >
          Đóng
        </button>
      </div>

      {/* Result Box */}
      <div
        className={`absolute top-full left-0 w-full h-[82vh] bg-[#fff] dark:bg-[#040C0E] overflow-auto ${
          !showResultBox && "hidden"
        }`}
      >
        {userResult.length > 0 &&
          userResult.map((data, index) => (
            <div>
              <SearchItem setShowResultBox={setShowResultBox} userData={data} />
            </div>
          ))}

        {searchInput.length === 0 && (
          <div className="px-3 mt-4">
            <div className="flex justify-center">
              <BsSearch className="text-[70px]" />
            </div>
            <div className="text-center text-[18px] mt-3">
              Tìm kiếm bạn bè bằng tên, số điện thoại hoặc email
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddFriendBox;
