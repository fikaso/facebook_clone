import Link from "next/link";
import Image from "next/image";
import { db } from "../firebase";
import { useEffect, useState } from "react";

function Story({ id, storyImage, hours }) {
  useEffect(() => {
    if (hours > 24) {
      db.collection("stories").doc(id).delete();
    }
  }, []);
  return (
    <Link
      href={{
        pathname: "/story-page",
        query: {
          story: storyImage,
        },
      }}
    >
      {storyImage && (
        <div className="relative h-56 w-32 cursor-pointer overflow-x-auto p-3 transition-duration-200 transform ease-in hover:scale-105 hover:animate-pulse">
          <Image
            unoptimized={true}
            className="absolute rounded-full z-50 top-10"
            src={storyImage}
            width={40}
            height={40}
            objectFit="cover"
          />
          <Image
            unoptimized={true}
            className="object-cover brightness-75 rounded-xl"
            src={storyImage}
            layout="fill"
          />

          <p className="absolute top-2 right-2 text-white text-xl">{hours}h</p>
        </div>
      )}
    </Link>
  );
}

export default Story;
