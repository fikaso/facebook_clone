import Header from "../components/Header";
import { useRouter } from "next/router";
import { useState } from "react";
import {
  ChevronRightIcon,
  ChevronLeftIcon,
  PauseIcon,
  PlayIcon,
} from "@heroicons/react/outline";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../firebase";
export default function StoryPage({ story }) {
  const router = useRouter();
  const [currentStory, setCurrentStory] = useState(story);
  const [storyPaused, setStoryPaused] = useState(false);
  const [storyAnimation, setStoryAnimation] = useState(true);

  const [realTimeStories, loading] = useCollection(
    db.collection("stories").orderBy("timestamp", "desc")
  );

  const changeStory = (direction, storyIndex) => {
    const newIndex = direction == "next" ? 1 : -1;
    setStoryAnimation(false);
    setStoryPaused(false);
    setCurrentStory(
      realTimeStories.docs[storyIndex + newIndex].data().storyImage
    );
    setTimeout(() => {
      setStoryAnimation(true);
    }, 50);
  };

  const handleSlide = (e, direction) => {
    e.preventDefault();
    realTimeStories?.docs.map((story, index) => {
      if (story.data().storyImage == currentStory) {
        if (direction == "next") {
          if (index < realTimeStories.docs.length - 1) {
            changeStory(direction, index);
          } else {
            router.push("/");
          }
        } else {
          if (index > 0) {
            changeStory(direction, index);
          } else {
            router.push("/");
          }
        }
      }
    });
  };

  return (
    <div className="bg-black bg-opacity-40">
      <Header />

      <div className="flex items-center justify-center">
        <ChevronLeftIcon
          onClick={(e) => handleSlide(e, "prev")}
          className="h-10 text-white cursor-pointer hover:scale-125"
        />
        <div className=" m-2 shadow-xl relative">
          <div className="absolute flex flex-col justify-center -left-0 -right-0 h-3 bg-black bg-opacity-20 text-white">
            <div
              onAnimationEnd={(e) => handleSlide(e, "next")}
              style={{
                animationPlayState: storyPaused ? "paused" : "running",
              }}
              className={`bg-white h-1 rounded-full ${
                storyAnimation ? "animate-progress-bar-animation" : ""
              } `}
            ></div>
          </div>

          <img
            src={currentStory}
            alt="Enlarged image"
            className="h-auto w-auto max-h-screen "
          />
          {storyPaused ? (
            <PlayIcon
              className="h-10 text-white absolute top-6 right-3 hover:scale-125"
              onClick={() => setStoryPaused(!storyPaused)}
            />
          ) : (
            <PauseIcon
              className="h-10 text-white absolute top-6 right-3 hover:scale-125"
              onClick={() => setStoryPaused(!storyPaused)}
            />
          )}
        </div>
        <ChevronRightIcon
          onClick={(e) => handleSlide(e, "next")}
          className="h-10 text-white cursor-pointer hover:scale-125"
        />
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  return {
    props: {
      story: context.query.story,
    },
  };
}
