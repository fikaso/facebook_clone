import Stories from "./Stories";
import InputBox from "./InputBox";
import Posts from "./Posts";

function Feed() {
  return (
    <div className="flex-grow h-screen pb-44 pt-6 mx-5">
      <div className="mx-auto max-w-md md:max-w-lg lg:max-w-3xl">
        {/* Stories */}
        <Stories />
        {/* Input */}
        <InputBox buttons={true} />
        {/* Posts */}
        <Posts />
      </div>
    </div>
  );
}

export default Feed;
