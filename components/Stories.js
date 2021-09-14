import Story from "./Story";
const stories = [
  {
    src: "/after_christmas.jpg",
    profile: "/profile.jpg",
    name: "Filip Vranjes",
  },
  {
    src: "/s5.jpg",
    profile: "/after_cookie.jpg",
    name: "Filip Vranjes",
  },
  {
    src: "/s6.jpg",
    profile: "/after_lights.jpg",
    name: "Filip Vranjes",
  },
  {
    src: "/s7.jpg",
    profile: "/IMG_1430.jpg",
    name: "Filip Vranjes",
  },
];

function Stories() {
  return (
    <div className="flex justify-center space-x-3 mx-auto">
      {stories.map((story) => (
        <Story key={story.src} story={story} allStories={stories} />
      ))}
    </div>
  );
}

export default Stories;
