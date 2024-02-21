import { useContext } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Login from "./pages/Login";
import UserAuth from "./components/UserAuth";
import PersonalChat from "./pages/PersonalChat";
import { MainContext } from "./context/MainProvider";
import ToggleDarkMode from "./services/ToggleDarkMode";
import FetchingUserData from "./services/FetchingUserData";

function App() {
  const {
    currentUser,
    chatRooms,
    setChatRooms,
    setCurrentUser,
    setFriendList,
    errorToastify,
    conversations,
  } = useContext(MainContext);

  return (
    <div className="h-screen bg-[#fff] dark:bg-[#040C0E] text-blackCus dark:text-whiteCus">
      <FetchingUserData />
      <ToggleDarkMode />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<UserAuth />}>
          <Route path="/" element={<PersonalChat />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
