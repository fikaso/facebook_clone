import { ThumbUpIcon } from "@heroicons/react/solid";
import { MinusIcon } from "@heroicons/react/solid";
import { XIcon } from "@heroicons/react/outline";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { useSession } from "next-auth/client";
import firebase from "firebase/compat/app";
import Message from "./Message";

function Chat({ chatId, handleChatToggle }) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const [session] = useSession();
  const [user, setUser] = useState();
  const [chatUser, setChatUser] = useState();

  useEffect(() => {
    db.collection("users")
      .where("email", "==", session.user.email)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          setUser(doc);
        });
      });

    db.collection("users")
      .doc(chatId)
      .get()
      .then((docSnapshot) => {
        setChatUser(docSnapshot);
      });
  }, []);

  useEffect(() => {
    if (user) {
      db.collection("chats")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) => {
          setMessages(
            snapshot.docs.filter(
              (doc) =>
                (doc.data().sentFrom.email === user.id &&
                  doc.data().sentTo.email === chatUser.id) ||
                (doc.data().sentFrom.email === chatUser.id &&
                  doc.data().sentTo.email === user.id)
            )
          );
        });
    }
  }, [chatUser]);

  const sendMessage = (event, like) => {
    event.preventDefault();

    if (like) {
      db.collection("chats").add({
        sentFrom: user.data(),
        sentTo: chatUser.data(),
        message: "LikeButton",
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
    } else {
      db.collection("chats").add({
        sentFrom: user.data(),
        sentTo: chatUser.data(),
        message: input,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
    }

    setInput("");
  };

  return (
    <div className="bg-white ml-1 w-64">
      <div className="flex justify-between shadow-md p-2">
        <div>
          <img src="" alt="" />
          <p>{chatUser?.data().username}</p>
        </div>
        <div className="flex items-center">
          <MinusIcon
            onClick={(e) => handleChatToggle(chatId)}
            className="h-5 text-blue-500 cursor-pointer"
          />
          <XIcon
            onClick={(e) => handleChatToggle(chatId)}
            className="h-5 text-blue-500 ml-2 cursor-pointer"
          />
        </div>
      </div>
      <div className="flex flex-col justify-end p-2 h-64 max-h-64 overflow-y-scroll scrollbar-hide">
        {messages?.map((message) => (
          <Message msg={message} />
        ))}
      </div>
      <div className="flex justify-between m-2">
        <form className="flex justify-between items-center">
          <input
            className="rounded-xl bg-gray-100 focus:outline-none p-1 text-md"
            type="text"
            placeholder="Aa"
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />
          <button onClick={sendMessage} hidden type="submit">
            Submit
          </button>
        </form>
        <ThumbUpIcon
          onClick={(e) => sendMessage(e, true)}
          className="h-7 text-blue-500 "
        />
      </div>
    </div>
  );
}

export default Chat;
