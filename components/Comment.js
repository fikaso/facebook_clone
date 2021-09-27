import { useEffect, useState } from "react";
import { db } from "../firebase";
import { calcElapsedTime } from "./Stories";
import { useSession } from "next-auth/client";
import { ThumbUpIcon } from "@heroicons/react/solid";
function Comment({
  postId,
  commentId,
  username,
  comment,
  userImage,
  timestamp,
}) {
  const [session] = useSession();
  const [likes, setLikes] = useState(false);

  useEffect(() => {
    if (commentId) {
      db.collection("posts")
        .doc(postId)
        .collection("comments")
        .doc(commentId)
        .collection("likes")
        .onSnapshot((snapshot) => {
          setLikes(snapshot.docs.map((doc) => doc));
        });
    }
  }, [commentId]);

  const handleLike = (e) => {
    e.preventDefault();
    let found = false;

    for (var i = 0; i < likes.length; i++) {
      if (likes[i].data().username === session.user.name) {
        found = true;
        break;
      }
    }
    if (!found) {
      db.collection("posts")
        .doc(postId)
        .collection("comments")
        .doc(commentId)
        .collection("likes")
        .add({ username: session.user.name });
    } else {
      db.collection("posts")
        .doc(postId)
        .collection("comments")
        .doc(commentId)
        .collection("likes")
        .doc(likes[i].id)
        .delete();
    }
  };

  console.log("Likes: ", likes.length);
  return (
    <div className="flex space-x-2 p-2 bg-white text-sm">
      <img src={userImage} alt="userImage" className="rounded-full h-10 " />
      <div className="flex flex-col flex-1 relative">
        <div className="bg-gray-100 rounded-xl p-3">
          <p>{username}</p>
          <p className="text-gray-700">{comment}</p>
          {likes.length > 0 && (
            <div className="absolute bottom-6 right-3 flex items-center text-md text-gray-500">
              <ThumbUpIcon className="h-5 text-blue-500" />
              <p>{likes.length}</p>
            </div>
          )}
        </div>
        <div className="flex space-x-2 text-sm">
          <p
            onClick={handleLike}
            className={`hover:underline cursor-pointer ${
              likes.length ? "text-blue-500" : ""
            }`}
          >
            Like
          </p>
          <p className="hover:underline cursor-pointer">Reply</p>
          <p>{timestamp ? calcElapsedTime(timestamp) : ""}h</p>
        </div>
      </div>
    </div>
  );
}

export default Comment;
