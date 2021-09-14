import Image from "next/image";
import { ChatAltIcon, ShareIcon, ThumbUpIcon } from "@heroicons/react/outline";
function Post({ name, email, image, message, postImage, timestamp }) {
  return (
    <div className="flex flex-col w-full">
      <div className="pt-5 mt-5 bg-white rounded-t-2xl shadow-sm">
        <div className="flex flex-col mx-5">
          <div className="flex space-x-2 items-center mb-2">
            <img src={image} alt="profile_image" />
            <div>
              <p>{name}</p>
              <p>{new Date(timestamp?.toDate()).toLocaleString()}</p>
            </div>
          </div>

          <p>{message}</p>
        </div>
        {postImage && (
          <div className="h-56 md:h-96 bg-white flex my-3 justify-center ">
            <img
              src={postImage}
              objectFit="cover"
              layout="fill"
              className="object-contain"
            />
          </div>
        )}

        {/* Footer of image */}
      </div>
      <div className="flex justify-between items-center bg-white shadow-md rounded-b-2xl text-gray-400 border-t">
        <div className="inputIcon rounded-none">
          <ThumbUpIcon className="h-4" />
          <p className="test-xs sm:text-base">Like</p>
        </div>
        <div className="inputIcon rounded-none">
          <ChatAltIcon className="h-4" />
          <p className="test-xs sm:text-base">Comment</p>
        </div>
        <div className="inputIcon rounded-none">
          <ShareIcon className="h-4" />
          <p className="test-xs sm:text-base">Share</p>
        </div>
      </div>
    </div>
  );
}

export default Post;
