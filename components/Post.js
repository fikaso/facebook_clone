import { db } from "../firebase";
import {
  ChatAltIcon,
  ShareIcon,
  DotsHorizontalIcon,
} from "@heroicons/react/outline";
import Image from "next/image";
import { ThumbUpIcon } from "@heroicons/react/solid";
import { Menu } from "@headlessui/react";
import { useSession } from "next-auth/client";
import { useEffect, useState } from "react";
import InputBox from "./InputBox";
import Comment from "./Comment";
import { calcElapsedTime } from "./Stories";
function Post({
  postId,
  username,
  email,
  image,
  message,
  postImage,
  timestamp,
  deleteFunction,
}) {
  const [session] = useSession();
  const [likes, setLikes] = useState(false);
  const [comments, setComments] = useState(false);
  const [displayComments, setdisplayComments] = useState(false);

  useEffect(() => {
    if (postId) {
      db.collection("posts")
        .doc(postId)
        .collection("comments")
        .onSnapshot((snapshot) => {
          setComments(snapshot.docs.map((doc) => doc));
        });

      db.collection("posts")
        .doc(postId)
        .collection("likes")
        .onSnapshot((snapshot) => {
          setLikes(
            snapshot.docs.map((doc) => {
              doc.data().username;
            })
          );
        });
    }
  }, [postId]);

  const handleLike = (e) => {
    e.preventDefault();

    db.collection("posts")
      .doc(postId)
      .collection("likes")
      .where("username", "==", session.user.name)
      .get()
      .then((querySnapshot) => {
        if (!querySnapshot.empty) {
          querySnapshot.forEach((doc) => {
            if (doc.exists) {
              db.collection("posts")
                .doc(postId)
                .collection("likes")
                .doc(doc.id)
                .delete();
            }
          });
        } else {
          db.collection("posts")
            .doc(postId)
            .collection("likes")
            .add({ username: session.user.name });
        }
      });
  };

  return (
    <div className="flex flex-col w-full">
      <div className="pt-5 mt-5 bg-white rounded-t-2xl shadow-sm">
        <div className="flex flex-col mx-5 ">
          <div className="flex items-center justify-between">
            <div className="flex space-x-2 items-center mb-2">
              <Image
                src={image}
                alt="posted by image"
                height={40}
                width={40}
                objectFit="cover"
                className="rounded-full"
              />
              <div>
                <p className="text-black">{username}</p>
                <p className="text-sm text-gray-500 hover:underline">
                  {calcElapsedTime(timestamp)}h
                </p>
              </div>
            </div>
            <Menu as="div" className="flex flex-col ">
              <Menu.Button>
                <DotsHorizontalIcon className="h-8 ml-auto text-gray-400 hover:bg-gray-100 rounded-l cursor-pointer" />
              </Menu.Button>
              <Menu.Items className="flex flex-col justify-end text-right rounded-2xl bg-red-100">
                <Menu.Item>
                  {({ active }) => (
                    <p
                      onClick={(e) => deleteFunction(e, postId)}
                      className={`inline-block ${
                        active
                          ? "bg-gray-400 rounded-xl text-white cursor-pointer p-2"
                          : "bg-white text-black p-2"
                      }`}
                    >
                      Move to trash
                    </p>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <p
                      className={`inline-block ${
                        active
                          ? "bg-gray-400 rounded-xl text-white cursor-pointer p-2"
                          : "bg-white text-black p-2"
                      }`}
                    >
                      Share post link
                    </p>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Menu>
          </div>

          <p>{message}</p>
        </div>
        {postImage && (
          <div className="h-56 md:h-96 bg-white flex my-3 justify-center ">
            <img src={postImage} layout="fill" className="object-contain" />
          </div>
        )}
        {likes.length ? (
          <div className="flex justify-between items-center mx-5 mb-2">
            <div className="flex items-center">
              <ThumbUpIcon
                className={`h-5 mr-2 p-1  bg-blue-500 rounded-full text-white `}
              />
              <p className="text-gray-500">{likes.length}</p>
            </div>
            {comments.length > 0 && (
              <p
                onClick={(e) => setdisplayComments(!displayComments)}
                className="hover:underline text-gray-500 cursor-pointer"
              >
                {comments.length} comments
              </p>
            )}
          </div>
        ) : (
          comments.length > 0 && (
            <p
              onClick={(e) => setdisplayComments(!displayComments)}
              className="flex justify-end hover:underline text-gray-500 cursor-pointer mx-5 mb-2"
            >
              {comments.length} comments
            </p>
          )
        )}
      </div>
      {/* Footer of image */}
      <div
        className={`flex justify-between items-center bg-white text-gray-400 border-t ${
          displayComments ? "" : "rounded-b-xl shadow-sm"
        }`}
      >
        <div onClick={(e) => handleLike(e)} className="inputIcon rounded-none">
          <ThumbUpIcon
            className={`h-4 ${likes.length > 0 ? "text-blue-500" : ""}`}
          />
          <p className="text-xs sm:text-base">Like</p>
        </div>
        <div
          onClick={(e) => setdisplayComments(!displayComments)}
          className="inputIcon rounded-none"
        >
          <ChatAltIcon className="h-4" />
          <p className="text-xs sm:text-base">Comment</p>
        </div>
        <div className="inputIcon rounded-none">
          <ShareIcon className="h-4" />
          <p className="text-xs sm:text-base">Share</p>
        </div>
      </div>
      {displayComments && (
        <div>
          <InputBox postToComment={postId} placeholder="Write a comment..." />
          {comments?.map((comment) => (
            <Comment
              key={comment.id}
              postId={postId}
              commentId={comment.id}
              username={comment.data().username}
              comment={comment.data().comment}
              userImage={comment.data().userImage}
              timestamp={comment.data().timestamp}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Post;
