const IconPack = require("../public/icons/Icons");
const Icons = new IconPack();
import Link from "next/link";
export default function SalonHeader() {
  return (
    <nav className="absolute items-center px-4 md:px-24 py-4 w-full md:relative md:flex md:justify-between  md:bg-breta-blue z-50">
      <Link href={"/Salon"} className="hidden md:block">
        <Icons.MonochromaticLogo />
      </Link>
      <div className="hidden md:visible md:flex gap-8 items-center text-white font-light tracking-wide text-md">
        <Link
          href={"/Salon/Citas"}
          className="hover:bg-breta-gray rounded-md p-2"
        >
          <Icons.CalendarWhite />
        </Link>
        <div className="hidden md:visible md:flex gap-8 items-center text-white font-light tracking-wide text-md">
          <Link
            href={"/Salon/Citas"}
            className="hover:bg-breta-gray rounded-md p-2"
          >
            <Icons.Bell />
          </Link>
        </div>
        {/* <div>Profile Picture</div> */}
      </div>
    </nav>
  );
}
