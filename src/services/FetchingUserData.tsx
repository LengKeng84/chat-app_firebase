import { useContext, useEffect } from "react";
import { MainContext } from "../context/MainProvider";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { auth, db } from "../firebase";
import filterDifferenceElements from "../utils/filterDifferenceElements";
import { error } from "console";

const FetchingUserData = () => {
  const {
    currentUser,
    setCurrentUser,
    chatRooms,
    setChatRooms,
    conversations,
    setConversations,
    friendList,
    setFriendList,
    focusChatRoom,
    setFocusChatRoom,
    errorToastify,
  } = useContext(MainContext);

  const navigate = useNavigate();

  // Get chat rooms
  const getChatRoomsHandler = (roomIdArray: string[]) => {
    try {
      // const chatRoomList: ChatRoom[] = [];
      const curChatRooms: ChatRoom[] = chatRooms;

      for (const roomId of roomIdArray) {
        onSnapshot(doc(db, "chat_rooms", roomId), async (docSnap) => {
          if (!docSnap.exists()) return;
          const resMemberIdList: string[] = docSnap.data().member || [];
          const memberList: User[] = [];

          // Lấy data của room này
          const curRooms: ChatRoom | undefined = chatRooms.find(
            (room) => room.id === docSnap.data().id
          );

          // Biến đổi thành mảng chứa các id của các member
          const curMemberIdList: string[] =
            curRooms?.member.map((item) => item.uid) || [];

          const memberIdList = filterDifferenceElements(
            resMemberIdList,
            curMemberIdList
          );

          // Get info user
          for (const memberId of memberIdList.differenceElement1) {
            const userRes = await getDoc(doc(db, "users", memberId));
            if (userRes.exists()) {
              const userInfo: User = {
                uid: userRes.data().uid,
                displayName: userRes.data().displayName,
                phone: userRes.data().phone,
                email: userRes.data().email,
                photoURL: userRes.data().photoURL,
                sex: userRes.data().sex,
                birthDay: userRes.data().birthDay,
                birthPlace: userRes.data().birthPlace,
                website: userRes.data().website,
                aboutMe: userRes.data().aboutMe,
              };
              memberList.push(userInfo);
            }
          }

          const chatRoomRes: ChatRoom = {
            id: docSnap.data().id,
            type: docSnap.data().type,
            info: docSnap.data().info,
            member: memberList,
          };

          curChatRooms.push(chatRoomRes);
          setChatRooms([...curChatRooms]);
        });
      }
    } catch (error) {
      errorToastify("Lỗi lấy phòng chat người dùng!");
    }
  };

  // Get friends
  const getFriendsHandler = async (friendIdList: string[]) => {
    const newListFriends: User[] = friendList;

    try {
      for (const uid of friendIdList) {
        const docSnap = await getDoc(doc(db, "users", uid));

        if (!docSnap.exists()) return;
        const user: User = {
          uid: docSnap.data().uid,
          displayName: docSnap.data().displayName,
          phone: docSnap.data().phone,
          email: docSnap.data().email,
          photoURL: docSnap.data().photoURL,
          sex: docSnap.data().sex,
          birthDay: docSnap.data().birthDay,
          birthPlace: docSnap.data().birthPlace,
          website: docSnap.data().website,
          aboutMe: docSnap.data().aboutMe,
        };
        newListFriends.push(user);
        setFriendList([...newListFriends]);
      }
    } catch (error) {
      errorToastify("Lỗi lấy danh sách bạn bè!");
    }
  };

  // Delete friends
  const deleteFriendsHandler = (friendIdList: string[]) => {
    if (friendIdList.length === 0) return;
    console.log("Bắt đầu xoá user");

    const userId: string = friendIdList[0];
    const findIndex = friendList.findIndex((user) => user.uid === userId);
    const newList: User[] = friendList;
    newList.splice(findIndex, 1);
    setFriendList([...newList]);
  };

  // Get conversations
  const getConversationsHandler = (conversationIdList: string[]) => {
    const curConversations: Conversation[] = conversations;

    for (const conversationId of conversationIdList) {
      onSnapshot(
        doc(db, "conversations", conversationId),
        (doc) => {
          if (doc.exists()) {
            const resConversation: Conversation = {
              id: doc.data().id,
              latestMessage: doc.data().latestMessage,
              messages: doc.data().messages,
            };

            const check = curConversations
              .map((data) => data.id)
              .includes(resConversation.id);

            if (check) {
              const findIndex = curConversations.findIndex(
                (conversation) => conversation.id === resConversation.id
              );

              const newList = curConversations;

              newList.splice(findIndex, 1, resConversation);

              setConversations([...newList]);
            } else {
              curConversations.push(resConversation);
              setConversations([...curConversations]);
            }
          }
        },
        (error) => {
          console.log("Lỗi lấy cuộc hội thoại: ", error);
          errorToastify(`Lỗi lấy cuộc hội thoại: ${conversationId}`);
        }
      );
    }
  };

  useEffect(() => {
    const fetchingUserData = () => {
      // Get user data
      onAuthStateChanged(auth, (user) => {
        if (!user) {
          navigate("/login", { replace: true });
        } else {
          onSnapshot(
            doc(db, "users", user.uid),
            (doc) => {
              if (doc.exists()) {
                const res = doc.data();
                const userInfo = {
                  displayName: res.displayName,
                  sex: res.sex,
                  phone: res.phone,
                  email: res.email,
                  birthDay: res.birthDay,
                  birthPlace: res.birthPlace,
                  website: res.website,
                  aboutMe: res.aboutMe,
                  photoURL: res.photoURL,
                  friends: res.friends,
                  chatRooms: res.chatRooms,
                  uid: res.uid,
                };
                setCurrentUser(userInfo);
              }
            },
            (error) => {
              errorToastify("Lỗi lấy dữ liệu người dùng");
              console.log(error);
            }
          );
        }
      });
    };

    return () => {
      fetchingUserData();
    };
  }, []);

  useEffect(() => {
    const fetchingChatRooms = () => {
      if (!currentUser?.chatRooms) return;
      // Handle get chat rooms
      const newChatRooms: string[] = currentUser.chatRooms;
      const curChatRooms: string[] = chatRooms.map((room) => room.id);
      const filterChatRooms = filterDifferenceElements(
        newChatRooms,
        curChatRooms
      );

      getChatRoomsHandler(filterChatRooms.differenceElement1);
    };
    fetchingChatRooms();
    // return () => {
    //   fetchingChatRooms();
    // };
  }, [currentUser?.chatRooms]);

  useEffect(() => {
    const fetchingConversations = () => {
      if (!currentUser?.chatRooms) return;
      // Handle get conversations
      const newConversations: string[] = currentUser.chatRooms;
      const curConversations: string[] = conversations.map(
        (conversation) => conversation.id
      );
      const filterConversations = filterDifferenceElements(
        newConversations,
        curConversations
      );

      getConversationsHandler(filterConversations.differenceElement1);
    };

    fetchingConversations();
  }, [currentUser?.chatRooms]);

  useEffect(() => {
    const fetchingFriends = () => {
      if (!currentUser?.friends) return;
      // Handle get friends
      const newFriends: string[] = currentUser.friends;
      const curFriends: string[] = friendList.map((user) => user.uid);
      const filterFriendList = filterDifferenceElements(newFriends, curFriends);
      getFriendsHandler(filterFriendList.differenceElement1);
      deleteFriendsHandler(filterFriendList.differenceElement2);
    };

    fetchingFriends();
  }, [currentUser?.friends]);

  useEffect(() => {
    if (currentUser) {
      navigate("/", { replace: true });
    } else return;
  }, [currentUser]);

  return null;
};

export default FetchingUserData;
