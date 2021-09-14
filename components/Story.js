import Link from "next/link";
import Image from "next/image";

function Story({ story, allStories }) {
  return (
    <Link
      href={{
        pathname: "/story-page",
        query: {
          story: JSON.stringify(story),
          allStories: JSON.stringify(allStories),
        },
      }}
    >
      <div className="relative h-14 w-14 md:h-20 md:w-20 lg:h-56 lg:w-32 cursor-pointer overflow-x-auto p-3 transition-duration-200 transform ease-in hover:scale-105 hover:animate-pulse">
        <Image
          className="absolute rounded-full z-50 top-10"
          src={story.src}
          width={40}
          height={40}
          objectFit="cover"
        />
        <Image
          className="object-cover brightness-75 rounded-full lg:rounded-3xl"
          src={story.src}
          layout="fill"
        />
      </div>
    </Link>
  );
}

export default Story;
