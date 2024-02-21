interface User {
  // accessToken: string;
  displayName: string;
  sex: srting | null;
  phone: string | null;
  email: string | null;
  birthDay: string | null;
  birthPlace: string | null;
  website: string | null;
  aboutMe: string | null;
  photoURL: string;
  uid: string;
  friends?: string[] | null;
  chatRooms?: string[] | null;
}

interface ChatRoom {
  id: string;
  type: string;
  info: {
    displayName: string;
    photoURL: string;
  } | null;
  member: User[];
}

interface Message {
  senderId: string;
  date: Date;
  content: {
    type: string;
    text?: string;
    photoURL?: string;
  };
}

interface Conversation {
  id: string;
  latestMessage: string;
  messages: Message[];
}

interface FocusChatRoom {
  id: string;
  type: string;
  info: {
    displayName: string;
    photoURL: string;
  } | null;
  selectUserId?: string;
  member?: User[];
}

interface FocusConversation {
  id: string;
  messages: Message[];
}
