import { SearchIcon } from "@heroicons/react/outline";
import { DotsHorizontalIcon, VideoCameraIcon } from "@heroicons/react/solid";
import { useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../firebase";
import Chat from "./Chat";
import Contact from "./Contact";

function Widgets({ handleChatToggle }) {
  const [users] = useCollection(db.collection("users"));
  return (
    <div className="hidden lg:flex flex-col w-60 p-2 mt-5 h-screen">
      <div className="flex justify-between items-center test-gray-500 mb-5">
        <h2 className="text-xl">Contacts</h2>
        <div className="flex space-x-2">
          <VideoCameraIcon className="h-6" />
          <SearchIcon className="h-6" />
          <DotsHorizontalIcon className="h-6" />
        </div>
      </div>
      {users?.docs.map((contact) => (
        <Contact
          contactId={contact.id}
          src={contact.data().image}
          name={contact.data().username}
          toggleChat={handleChatToggle}
        />
      ))}
    </div>
  );
}

export default Widgets;
