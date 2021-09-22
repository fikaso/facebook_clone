import { useSession } from "next-auth/client";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../firebase";
import Story from "./Story";
import UploadStory from "./UploadStory";

function Stories() {
  const [session, loading] = useSession();
  const [realTimeStories] = useCollection(
    db.collection("stories").orderBy("timestamp", "desc")
  );

  return (
    <div className="flex space-x-3 mx-auto">
      <UploadStory image={session.user.image} />
      <div className="flex justify-center space-x-3">
        {realTimeStories?.docs.map((story) => (
          <Story key={story.id} storyImage={story.data().storyImage} />
        ))}
      </div>
    </div>
  );
}

export default Stories;
