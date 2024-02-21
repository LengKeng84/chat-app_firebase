import { useContext } from "react";
import { Image } from "react-bootstrap";
import { MdRadioButtonChecked, MdRadioButtonUnchecked } from "react-icons/md";
import { MainContext } from "../context/MainProvider";

interface Props {
  data: User;
}

const CreateGroup_SearchItem = ({ data }: Props) => {
  const { newGroupUsers, setNewGroupUsers } = useContext(MainContext);

  // Add User Handler
  const addAndRemoveUserHandler = () => {
    const check = newGroupUsers.includes(data);
    if (!check) {
      setNewGroupUsers([...newGroupUsers, data]);
    } else {
      const newList: User[] = newGroupUsers;
      const findIndex = newGroupUsers.findIndex(
        (user) => user.uid === data.uid
      );
      newList.splice(findIndex, 1);
      setNewGroupUsers([...newList]);
    }
  };

  return (
    <div
      onClick={addAndRemoveUserHandler}
      className="flex items-center px-2 py-2 hover:bg-lightHover dark:hover:bg-darkHover duration-100 cursor-pointer"
    >
      <span className="text-[18px]">
        {newGroupUsers.includes(data) ? (
          <MdRadioButtonChecked />
        ) : (
          <MdRadioButtonUnchecked />
        )}
      </span>
      <Image
        src={data.photoURL}
        alt="avatar"
        roundedCircle
        className="w-[40px] h-[40px] ml-2"
      />
      <div className="ml-2 w-[200px] truncate">{data.displayName}</div>
    </div>
  );
};

export default CreateGroup_SearchItem;
