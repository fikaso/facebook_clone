import Stories from "./Stories";
import InputBox from "./InputBox";
import Posts from "./Posts";

function Feed() {
  return (
    <div className="flex-grow h-screen pb-44 pt-6 mr-5 overflow-y-auto scrollbar-hide">
      <div className="mx-auto max-w-md md:max-w-lg lg:max-w-3xl">
        {/* Stories */}
        <Stories />
        {/* Input */}
        <InputBox />
        {/* Posts */}
        <Posts />
      </div>
    </div>
  );
}

export default Feed;
