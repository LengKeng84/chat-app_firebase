import { useContext } from "react";
import { Outlet } from "react-router-dom";

import { MainContext } from "../context/MainProvider";
import Loading from "../pages/Loading";

const UserAuth = () => {
  const { currentUser, chatRooms, friendList } = useContext(MainContext);

  return currentUser ? <Outlet /> : <Loading />;
};

export default UserAuth;
