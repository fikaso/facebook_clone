import Link from "next/link";
import Image from "next/image";

function Story({ storyImage, hours }) {
  return (
    <Link
      href={{
        pathname: "/story-page",
        query: {
          story: storyImage,
        },
      }}
    >
      {storyImage && (
        <div className="relative h-14 w-14 md:h-20 md:w-20 lg:h-56 lg:w-32 cursor-pointer overflow-x-auto p-3 transition-duration-200 transform ease-in hover:scale-105 hover:animate-pulse">
          <Image
            unoptimized={true}
            className="absolute rounded-full z-50 top-10"
            src={storyImage}
            width={40}
            height={40}
            objectFit="cover"
          />
          <Image
            unoptimized={true}
            className="object-cover brightness-75 rounded-full lg:rounded-3xl"
            src={storyImage}
            layout="fill"
          />

          <p className="absolute top-2 right-2 text-white text-xl">
            {parseInt(hours)}h
          </p>
        </div>
      )}
    </Link>
  );
}

export default Story;
