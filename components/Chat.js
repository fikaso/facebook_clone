import { ThumbUpIcon } from "@heroicons/react/solid";
import { MinusIcon } from "@heroicons/react/solid";
import { XIcon } from "@heroicons/react/outline";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { session } from "next-auth/client";
import { useSession } from "next-auth/client";

function Chat({ chatId }) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const [session] = useSession();
  const [user, setUser] = useState();

  useEffect(() => {
    db.collection("users").onSnapshot((snapshot) => {
      setUser(
        snapshot.docs.filter((doc) => doc.data().email == session.user.email)
      );
    });
  }, []);

  useEffect(() => {
    if (user) {
      db.collection("users")
        .doc(user[0].id)
        .collection("messages")
        .doc(chatId)
        .collection("messages")
        .onSnapshot((snapshot) => {
          setMessages(snapshot.docs.map((doc) => doc.data()));
        });
    }
  }, [user]);

  const sendMessage = (event) => {
    event.preventDefault();
    db.collection("users")
      .doc(user[0].id)
      .collection("messages")
      .doc(chatId)
      .collection("messages")
      .add({
        username: user[0].data().username,
        message: input,
      });
    setInput("");
  };

  return (
    <div className="bg-white ml-1 w-64">
      <div className="flex justify-between shadow-md p-2">
        <div>
          <img src="" alt="" />
          <p>{chatId}</p>
        </div>
        <div className="flex items-center">
          <MinusIcon className="h-5 text-blue-500" />
          <XIcon className="h-5 text-blue-500 ml-2" />
        </div>
      </div>
      <div className="p-2 h-64">
        {messages?.map((message) => (
          <div>
            {/* <p>{message.username}</p> */}
            <p>{message.message}</p>
          </div>
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
        <ThumbUpIcon className="h-7 text-blue-500 " />
      </div>
    </div>
  );
}

export default Chat;
