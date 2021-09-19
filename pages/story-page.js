import Header from "../components/Header";
import { useRouter } from "next/router";
import { useState } from "react";
import {
  ArrowCircleRightIcon,
  ArrowCircleLeftIcon,
} from "@heroicons/react/outline";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../firebase";
export default function StoryPage({ story }) {
  const router = useRouter();
  const [currentStory, setCurrentStory] = useState(story);

  const [realTimeStories] = useCollection(
    db.collection("stories").orderBy("timestamp", "desc")
  );

  const handleSlide = (e, direction) => {
    e.preventDefault();
    console.log("cur: ", currentStory);

    realTimeStories?.docs.map((story, index) => {
      if (story.data().storyImage == currentStory) {
        if (direction == "next") {
          if (index < realTimeStories.docs.length - 1) {
            setCurrentStory(realTimeStories.docs[index + 1].data().storyImage);
          } else {
            router.push("/");
          }
        } else if (direction == "prev") {
          if (index > 0) {
            setCurrentStory(realTimeStories.docs[index - 1].data().storyImage);
          } else {
            router.push("/");
          }
        }
      }
    });
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
    },
  };
}
