import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../firebase";
import Story from "./Story";
import UploadStory from "./UploadStory";

function Stories() {
  const [realTimeStories] = useCollection(
    db.collection("stories").orderBy("timestamp", "desc")
  );

  return (
    <div className="flex space-x-3 mx-auto">
      <UploadStory image="/after_christmas.jpg" />
      <div className="flex justify-center space-x-3">
        {realTimeStories?.docs.map((story) => (
          <Story key={story.id} storyImage={story.data().storyImage} />
        ))}
      </div>
    </div>
  );
}

export default Stories;
