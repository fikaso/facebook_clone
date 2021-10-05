import { ThumbUpIcon } from "@heroicons/react/solid";
import { useSession } from "next-auth/client";
function Message({ msg }) {
  const { message, timestamp, sentFrom, sentTo } = msg.data();
  const [session] = useSession();
  return (
    <div
      className={`flex ${
        sentFrom.email === session.user.email ? "justify-end" : ""
      }`}
    >
      {message === "LikeButton" ? (
        <ThumbUpIcon className="h-7 text-blue-500 " />
      ) : (
        <p
          className={`m-0.5 p-1 rounded-md ${
            sentFrom.email === session.user.email
              ? "bg-blue-500 text-white"
              : "bg-gray-300 text-gray-900"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
}

export default Message;
