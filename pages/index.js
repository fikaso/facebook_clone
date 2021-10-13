import { getSession } from "next-auth/client";
import Head from "next/head";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Login from "../components/Login";
import Feed from "../components/Feed";
import Widgets from "../components/Widgets";
import { db } from "../firebase";
import { useEffect, useState } from "react";
import Chat from "../components/Chat";

export default function Home({ session }) {
  const [chatWindows, setChatWindows] = useState([]);
  useEffect(() => {
    if (session) {
      if (session.user) {
        db.collection("users").doc(session.user.email).set(
          {
            username: session.user.name,
            email: session.user.email,
            image: session.user.image,
          },
          { merge: true }
        );
      }
    }
  }, [session]);
  if (!session) return <Login />;

  const handleChatToggle = (chatWindow) => {
    if (!chatWindows.includes(chatWindow)) {
      setChatWindows([...chatWindows, chatWindow]);
    } else {
      setChatWindows(chatWindows.filter((chatName) => chatName != chatWindow));
    }
  };

  return (
    <div className="bg-gray-100 max-w-full">
      <Head>
        <title>Facebook</title>
      </Head>

      {/* Header */}
      <Header />

      <main className="flex">
        {/* Sidebar */}
        <Sidebar />
        {/* Feed */}
        <Feed />
        {/* Widget */}
        <Widgets handleChatToggle={handleChatToggle} />
      </main>
      <div className="flex fixed bottom-0 right-0">
        {chatWindows?.map((chat) => (
          <Chat key={chat} chatId={chat} handleChatToggle={handleChatToggle} />
        ))}
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  // Get the user
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
}
