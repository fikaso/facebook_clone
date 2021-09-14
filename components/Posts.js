import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../firebase";
import Post from "./Post";

function Posts() {
  const [realTimePosts] = useCollection(
    db.collection("posts").orderBy("timestamp", "desc")
  );
  return (
    <div className="flex flex-col items-center ">
      {realTimePosts?.docs.map((post) => (
        <Post
          key={post.id}
          name={post.data().name}
          email={post.data().email}
          image={post.data().image}
          message={post.data().message}
          postImage={post.data().postImage}
          timestamp={post.data().timestamp}
        />
      ))}
    </div>
  );
}

export default Posts;
