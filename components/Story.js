import Link from "next/link";
import Image from "next/image";
import { db } from "../firebase";
import { useEffect, useState } from "react";

function Story({ id, storyImage, elapsedTime, userImage }) {
  const [storyElapsedTime, setStoryElapsedTime] = useState(null);

  useEffect(() => {
    try {
      const { res, isDate } = elapsedTime;
      if (isDate) {
        db.collection("stories").doc(id).delete();
      } else {
        setStoryElapsedTime(res);
      }
    } catch (error) {
      console.log(error);
    }
  }, [elapsedTime]);

  return (
    <Link
      href={{
        pathname: "/story-page",
        query: {
          story: storyImage,
        },
      }}
    >
      <div>
        {storyImage && (
          <div className="relative h-56 w-32 cursor-pointer overflow-x-auto p-3 transition-duration-200 transform ease-in hover:scale-105 hover:animate-pulse">
            <Image
              unoptimized={true}
              className="absolute rounded-full z-50 top-10"
              src={userImage}
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

            {storyElapsedTime !== null && (
              <p className="absolute top-2 right-2 text-white text-xl">
                {storyElapsedTime}h
              </p>
            )}
          </div>
        )}
      </div>
    </Link>
  );
}

export default Story;
