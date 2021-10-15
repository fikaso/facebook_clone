import Image from "next/image";
import { useSession } from "next-auth/client";

function Contact({ contactId, src, name, toggleChat }) {
  const [session] = useSession();
  if (session.user.name == name) {
    return null;
  } else {
    return (
      <div
        onClick={(e) => toggleChat(contactId)}
        className="flex space-x-3 mb-2 items-center relative hover:bg-gray-200 cursor-pointer p-2 rounded-xl"
      >
        <Image
          className="rounded-full"
          src={src}
          objectFit="cover"
          width={50}
          height={50}
          layout="fixed"
        />
        <p>{name}</p>
        <div className="absolute bottom-2 left-7 bg-green-400 rounded-full w-3 h-3 animate-bounce"></div>
      </div>
    );
  }
}

export default Contact;
