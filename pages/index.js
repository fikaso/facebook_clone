import { getSession, signOut } from "next-auth/client";
import Head from "next/head";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Login from "../components/Login";
import Feed from "../components/Feed";
import Widgets from "../components/Widgets";
import { db, auth, facebookProvider } from "../firebase";
import { useEffect, useState } from "react";
import Chat from "../components/Chat";

export default function Home({ session }) {
  const [chatWindows, setChatWindows] = useState([]);
  const [user, setUser] = useState(null);

  // useEffect(() => {
  //   if (session.user) {
  //     db.collection("users").doc(session.user.email).set(
  //       {
  //         username: session.user.name,
  //         email: session.user.email,
  //         image: session.user.image,
  //       },
  //       { merge: true }
  //     );
  //   }
  // }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        console.log(authUser);
        setUser(authUser);
      } else {
        setUser(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [user]);

  const handleChatToggle = (chatWindow) => {
    if (!chatWindows.includes(chatWindow)) {
      setChatWindows([...chatWindows, chatWindow]);
    } else {
      setChatWindows(chatWindows.filter((chatName) => chatName != chatWindow));
    }
  };

  const handleLogin = (event) => {
    event.preventDefault();
    auth
      .signInWithPopup(facebookProvider)
      .then((authUser) => {
        console.log(authUser);
        return authUser.user.updateProfile({
          displayName: username,
        });
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const handleLogout = (event) => {
    event.preventDefault();
    console.log("logout :");
    signOut(auth).catch((error) => {
      alert(error.message);
    });
  };

  return (
    <div className="bg-gray-100">
      <Head>
        <title>Facebook</title>
      </Head>

      <div className="flex w-min">
        {user ? (
          <h2 onClick={(e) => handleLogout(e)}>Logout</h2>
        ) : (
          <h2
            onClick={(e) => handleLogin(e)}
            className="w-auto m-20 cursor-pointer bg-blue-500 text-white p-20"
          >
            {" "}
            Login
          </h2>
        )}
      </div>

      {/* Header */}
      {/* <Header /> */}

      <main className="flex">
        {/* Sidebar */}
        {/* <Sidebar /> */}
        {/* Feed */}
        {/* <Feed /> */}
        {/* Widget */}
        {/* <Widgets handleChatToggle={handleChatToggle} /> */}
      </main>
      {/* <div className="flex fixed bottom-0 right-0">
        {chatWindows?.map((chat) => (
          <Chat chatId={chat} handleChatToggle={handleChatToggle} />
        ))}
      </div> */}
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
