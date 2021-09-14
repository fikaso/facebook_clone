import Header from "../components/Header";
import { useRouter } from "next/router";
import { useState } from "react";
import {
  ArrowCircleRightIcon,
  ArrowCircleLeftIcon,
} from "@heroicons/react/outline";
export default function StoryPage({ story, allStories }) {
  const router = useRouter();
  const storyJson = JSON.parse(story);
  const listOfStories = JSON.parse(allStories);
  const [currentStory, setCurrentStory] = useState(storyJson.src);

  const handleSlide = (e, direction) => {
    e.preventDefault();

    for (var key in listOfStories) {
      if (listOfStories[key].src == currentStory) {
        if (direction == "next") {
          if (parseInt(key) < listOfStories.length - 1) {
            setCurrentStory(listOfStories[parseInt(key) + 1].src);
            break;
          } else {
            router.push("/");
          }
        } else if (direction == "prev") {
          if (parseInt(key) > 0) {
            setCurrentStory(listOfStories[parseInt(key) - 1].src);
            break;
          } else {
            router.push("/");
          }
        }
      }
    }
  };

  return (
    <div className="bg-black bg-opacity-70">
      <Header />
      <div className="flex items-center justify-center">
        <ArrowCircleLeftIcon
          onClick={(e) => handleSlide(e, "prev")}
          className="h-10 text-gray-300"
        />
        <img
          src={currentStory}
          alt="Enlarged image"
          className="h-auto w-auto max-h-screen"
        />
        <ArrowCircleRightIcon
          onClick={(e) => handleSlide(e, "next")}
          className="h-10 text-gray-300"
        />
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  return {
    props: {
      story: context.query.story,
      allStories: context.query.allStories,
    },
  };
}
