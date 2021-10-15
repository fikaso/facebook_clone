import {
  PlusCircleIcon,
  UploadIcon,
  XCircleIcon,
} from "@heroicons/react/solid";
import { useSession } from "next-auth/client";
import Image from "next/image";
import { useRef, useState } from "react";
import { db, storage } from "../firebase";
import firebase from "firebase/compat/app";
function UploadStory({ image }) {
  const [session] = useSession();
  const filePickerRef = useRef(null);
  const [imageToPost, setImageToPost] = useState(null);

  const handleUpload = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      setImageToPost(readerEvent.target.result);
    };
  };

  const sendStory = () => {
    db.collection("stories")
      .add({
        name: session.user.name,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        userImage: session.user.image,
      })
      .then((doc) => {
        if (imageToPost) {
          const uploadTask = storage
            .ref(`stories/${doc.id}`)
            .putString(imageToPost, "data_url");

          removeImage();

          uploadTask.on(
            "state_change",
            null,
            (e) => {
              console.error(e);
            },
            () => {
              storage
                .ref(`stories/${doc.id}`)
                .getDownloadURL()
                .then((url) => {
                  db.collection("stories").doc(doc.id).set(
                    {
                      storyImage: url,
                    },
                    { merge: true }
                  );
                });
            }
          );
        }
      });
  };

  const removeImage = (e) => {
    setImageToPost(null);
  };

  return (
    <div className="">
      <div
        onClick={() => filePickerRef.current.click()}
        className="relative h-56 w-32 cursor-pointer  p-3 transition-duration-200 transform ease-in hover:scale-105 hover:animate-pulse col-span-4"
      >
        <Image
          className="object-cover brightness-75 rounded-xl lg:rounded-3xl"
          src={image}
          layout="fill"
        />
        <PlusCircleIcon className="absolute h-5 sm:h-7 md:h-10 text-white bg-blue-500 rounded-full " />
        <p className="invisible lg:visible text-white bg-gray-500 bg-opacity-50 rounded-2xl p-2 absolute bottom-1">
          Upload Story
        </p>
      </div>
      <input ref={filePickerRef} onChange={handleUpload} type="file" hidden />
      {imageToPost && (
        <div className="absolute mt-2 mb-10 bg-gray-300 p-4 rounded-xl flex flex-col">
          <img src={imageToPost} alt="Image" onClick={removeImage} />

          <div className="flex space-x-3">
            <button
              onClick={sendStory}
              className="mt-4 bg-white text-blue-500 rounded-lg p-2 flex justify-center items-center space-x-3 "
            >
              <UploadIcon className="h-10" />
              Upload Story
            </button>
            <button
              onClick={removeImage}
              className="mt-4 bg-white text-red-500 rounded-lg p-2 flex justify-center items-center space-x-3"
            >
              <XCircleIcon className="h-10 " />
              Cancle Upload
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default UploadStory;
