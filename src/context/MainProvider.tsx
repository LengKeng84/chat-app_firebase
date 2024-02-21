import { createContext, useState } from "react";
import { toast } from "react-toastify";

interface Props {
  children: React.ReactNode;
}

interface ContextValueType {
  // User
  currentUser: User | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>;

  // Chat Rooms
  chatRooms: ChatRoom[];
  setChatRooms: React.Dispatch<React.SetStateAction<ChatRoom[]>>;

  // Dark mode
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;

  // Box State
  boxState: string;
  setBoxState: React.Dispatch<React.SetStateAction<string>>;

  // Toastify
  successToastify: (content: string) => void;
  errorToastify: (content: string) => void;

  // Conversation
  conversations: Conversation[];
  setConversations: React.Dispatch<React.SetStateAction<Conversation[]>>;

  // Friend List
  friendList: User[];
  setFriendList: React.Dispatch<React.SetStateAction<User[]>>;

  // Add User To New Group
  newGroupUsers: User[];
  setNewGroupUsers: React.Dispatch<React.SetStateAction<User[]>>;

  // Focus Chat Room
  focusChatRoom: FocusChatRoom | null;
  setFocusChatRoom: React.Dispatch<React.SetStateAction<FocusChatRoom | null>>;

  // Focus conversation
  focusConversation: FocusConversation | null;
  setFocusConversation: React.Dispatch<
    React.SetStateAction<FocusConversation | null>
  >;
}

interface ContextValueType {}
export const MainContext = createContext({} as ContextValueType);

const MainProvider = ({ children }: Props) => {
  // User đang đăng nhập
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // Focus chat rooms
  const [focusChatRoom, setFocusChatRoom] = useState<FocusChatRoom | null>(
    null
  );

  // Focus conversation
  const [focusConversation, setFocusConversation] =
    useState<FocusConversation | null>(null);

  // Dark mode action
  const [darkMode, setDarkMode] = useState<boolean>(true);

  // Box State
  const [boxState, setBoxState] = useState<string>("conversationsBox");

  // Chat Rooms List
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);

  // Conversations
  const [conversations, setConversations] = useState<Conversation[]>([]);

  // Friend List
  const [friendList, setFriendList] = useState<User[]>([]);

  // Add User To New Group
  const [newGroupUsers, setNewGroupUsers] = useState<User[]>([]);

  // Toastify
  const successToastify = (content: string) => {
    toast.success(content, {
      position: "top-center",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: darkMode ? "dark" : "light",
    });
  };

  const errorToastify = (content: string) => {
    toast.error(content, {
      position: "top-center",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: darkMode ? "dark" : "light",
    });
  };

  return (
    <MainContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        darkMode,
        setDarkMode,
        boxState,
        setBoxState,
        chatRooms,
        setChatRooms,
        conversations,
        setConversations,
        friendList,
        setFriendList,
        newGroupUsers,
        setNewGroupUsers,
        focusChatRoom,
        setFocusChatRoom,
        focusConversation,
        setFocusConversation,
        successToastify,
        errorToastify,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};

export default MainProvider;
