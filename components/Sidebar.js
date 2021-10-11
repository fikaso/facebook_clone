import { useSession } from "next-auth/client";
import {
  UsersIcon,
  CalendarIcon,
  ClockIcon,
  DesktopComputerIcon,
} from "@heroicons/react/solid";
import {
  ChevronDownIcon,
  ShoppingBagIcon,
  UserGroupIcon,
} from "@heroicons/react/outline";
import SidebarRow from "./SidebarRow";
import { session } from "next-auth/client";
function Sidebar() {
  const [session, loading] = useSession();
  return (
    <div className="hidden sm:flex flex-col p-2 mt-5">
      <SidebarRow src={session.user.image} title={session.user.name} />
      <SidebarRow Icon={UsersIcon} title="Friends" />
      <SidebarRow Icon={UserGroupIcon} title="Groups" />
      <SidebarRow Icon={ShoppingBagIcon} title="MarketPlace" />
      <SidebarRow Icon={DesktopComputerIcon} title="Watch" />
      <SidebarRow Icon={CalendarIcon} title="Events" />
      <SidebarRow Icon={ClockIcon} title="Memories" />
      <SidebarRow Icon={ChevronDownIcon} title="See more" />
    </div>
  );
}

export default Sidebar;
