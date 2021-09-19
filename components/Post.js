import {
  ChatAltIcon,
  ShareIcon,
  ThumbUpIcon,
  DotsHorizontalIcon,
} from "@heroicons/react/outline";
import { Menu } from "@headlessui/react";
function Post({
  id,
  name,
  email,
  image,
  message,
  postImage,
  timestamp,
  deleteFunction,
}) {
  return (
    <div className="flex flex-col w-full">
      <div className="pt-5 mt-5 bg-white rounded-t-2xl shadow-sm">
        <div className="flex flex-col mx-5 ">
          <div className="flex items-center justify-between">
            <div className="flex space-x-2 items-center mb-2">
              <img src={image} alt="profile_image" />
              <div>
                <p>{name}</p>
                <p>{new Date(timestamp?.toDate()).toLocaleString()}</p>
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
                      onClick={(e) => deleteFunction(e, id)}
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
