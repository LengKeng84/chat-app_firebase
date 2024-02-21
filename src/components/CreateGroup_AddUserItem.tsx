import React, { useContext } from "react";
import { Image } from "react-bootstrap";
import { MainContext } from "../context/MainProvider";
import { AiFillCloseCircle } from "react-icons/ai";

interface Props {
  data: User;
}

const CreateGroup_AddUserItem = ({ data }: Props) => {
  const { newGroupUsers, setNewGroupUsers } = useContext(MainContext);

  const removeUserHandler = () => {
    const newList: User[] = newGroupUsers;
    const findIndex = newGroupUsers.findIndex((user) => user.uid === data.uid);
    if (findIndex === -1) return;
    newList.splice(findIndex, 1);
    setNewGroupUsers([...newList]);
  };

  return (
    <div className="flex items-center px-2 py-2 hover:bg-lightHover dark:hover:bg-darkHover duration-100">
      <Image
        src={data.photoURL}
        alt="avatar"
        roundedCircle
        className="w-[25px] h-[25px]"
      />
      <div className="ml-2 w-[110px] truncate">{data.displayName}</div>
      <button
        onClick={removeUserHandler}
        className="ml-auto w-[25px] h-[25px] flex justify-center items-center"
      >
        <AiFillCloseCircle />
      </button>
    </div>
  );
};

export default CreateGroup_AddUserItem;
