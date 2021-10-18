import Stories from "./Stories";
import InputBox from "./InputBox";
import Posts from "./Posts";

function Feed() {
  return (
    <div className="flex flex-1 pb-44 pt-6 items-center justify-center overflow-hidden">
      <div className="w-full sm:w-5/6 lg:w-9/12 xl:w-7/12 2xl:w-1/2">
        <Stories />
        <InputBox buttons={true} />
        <Posts />
      </div>
    </div>
  );
}

export default Feed;
