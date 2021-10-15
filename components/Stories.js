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
    <div className="flex space-x-3 mx-auto overflow-x-scroll scrollbar-hide">
      <UploadStory image={session.user.image} />
      <div className="flex justify-center space-x-3">
        {realTimeStories?.docs.map((story) => (
          <Story
            key={story.id}
            id={story.id}
            storyImage={story.data().storyImage}
            hours={calcElapsedTime(story.data().timestamp)}
            userImage={story.data().userImage}
          />
        ))}
      </div>
    </div>
  );
}
export const calcElapsedTime = (timestamp) => {
  if (timestamp) {
    let res = parseInt((Date.now() - timestamp.toMillis()) / 1000 / 60 / 60);
    return res;
  }
};

export default Stories;
