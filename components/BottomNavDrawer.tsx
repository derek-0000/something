"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
const IconPack = require("../public/icons/Icons");
const Icons = new IconPack();

export default function BottomNavDrawer() {
  const pathname = usePathname()
  console.log(pathname)
  return (
    <>
      <div className="flex justify-around p-4 fixed bottom-0 left-0 z-50 w-full h-16 bg-breta-light-gray">

        {pathname == "/IndexUser" ? (<>
        <Link
          href={"/IndexUser"}
          className="flex flex-1 justify-center items-center text-center"
        >
          <Icons.ActiveHome />
        </Link>
        </>) : <>
        <Link
          href={"/IndexUser"}
          className="flex flex-1 justify-center items-center text-center"
        >
          <Icons.Home />
        </Link>
        </>}

        {pathname.includes("/calendar") ? <>
        <Link
          href={"/IndexUser"}
          className="flex flex-1 justify-center items-center text-center"
        >
          <Icons.ActiveCalendar/>
        </Link>
        </> : <>
        <Link
          href={"/IndexUser/calendar"}
          className="flex flex-1 justify-center items-center text-center"
        >
          <Icons.Calendar/>
        </Link>
        </>}

        {pathname.includes("/saved") ? <>
        <Link
          href={"/IndexUser/saved"}
          className="flex flex-1 justify-center items-center text-center"
        >
          <Icons.ActiveSaved />
        </Link>
        </> : <>
        <Link
          href={"/IndexUser/saved"}
          className="flex flex-1 justify-center items-center text-center"
        >
          <Icons.Heart />
        </Link>
        </>}

        {pathname.includes("/profile") ? <>
        <Link
          href={"/IndexUser/profile"}
          className="flex flex-1 justify-center items-center text-center"
        >
          <Icons.ActiveProfile />
        </Link>
        </> : <>
        <Link
          href={"/IndexUser/profile"}
          className="flex flex-1 justify-center items-center text-center"
        >
          <Icons.User />
        </Link>
        </>}

      </div>
    </>
  );
}
