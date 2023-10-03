"use client";
import Link from "next/link";
import { useState } from "react";
const IconPack = require("../public/icons/Icons");
const Icons = new IconPack();
export default function SalonSidebarNavigation() {
  const [colapsedSidebar, setColapsedSidebar] = useState<boolean>(true);
  const toggleSidebar = () => {
    return colapsedSidebar == true
      ? setColapsedSidebar(false)
      : setColapsedSidebar(true);
  };
  return (
    <>
      {colapsedSidebar == true ? (
        <div className="relative w-1/6 border-r-2 border-breta-gray">
          <aside className="absolute left-0 bottom-0 h-full w-full flex flex-col bg-breta-light-gray px-4">
            <div className="flex flex-col justify-between gap-4 h-full font-semibold tracking-wide text-breta-blue">
              <div>
                <div
                  onClick={toggleSidebar}
                  className="w-full p-2 my-6 flex justify-center items-center rounded-md cursor-pointer hover:bg-breta-gray"
                >
                  <div>Menu</div>
                  <div className=" absolute right-6 -rotate-90">
                    <Icons.Arrow />
                  </div>
                </div>
                <div className="flex flex-col gap-10">
                  <div>
                    <hr className="bg-breta-gray text-breta-gray h-[2px] mb-6" />
                    <Link href={"/Salon/Citas"}>
                      <div className="relative w-full pl-24 p-2 mb-5 rounded-md hover:bg-breta-gray cursor-pointer">
                        <div className="">Citas</div>
                        <div className="absolute left-8 top-2">
                          <Icons.Calendar />
                        </div>
                      </div>
                    </Link>
                    <hr className="bg-breta-gray text-breta-gray h-[2px]" />
                  </div>
                  <div className="flex flex-col gap-8">
                    <Link
                      href={"/Salon/Servicios"}
                      className="relative w-full flex items-center px-8 gap-12 py-2 rounded-md cursor-pointer hover:bg-breta-gray"
                    >
                      <div className="">
                        <Icons.SalonChairIconSmall />
                      </div>
                      <div className="">Servicios</div>
                    </Link>
                    <Link
                      href={"/Salon/Clientes"}
                      className="relative w-full flex items-center px-8 gap-12 py-2 rounded-md cursor-pointer hover:bg-breta-gray"
                    >
                      <div className="">
                        <Icons.UserIcon />
                      </div>
                      <div className="">Clientes</div>
                    </Link>
                    <Link
                      href={"/Salon/Equipo"}
                      className="relative w-full flex items-center px-8 gap-12 py-2 rounded-md cursor-pointer hover:bg-breta-gray"
                    >
                      <div className="">
                        <Icons.Team />
                      </div>
                      <div className="">Equipo</div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      ) : (
        <div className="relative w-[4rem] border-r-2 border-breta-gray">
          <aside className="absolute left-0 top-0 h-full w-full bg-breta-light-gray flex flex-col font-semibold tracking-wide text-breta-blue">
            <div className="flex flex-col items-center ">
              <div
                onClick={toggleSidebar}
                className="my-4 w-1/2 p-2 mb-5 rounded-md hover:bg-breta-gray cursor-pointer"
              >
                <Icons.Arrow />
              </div>
              <div className="flex flex-col gap-10">
                <Link href={"/Salon/Citas"}>
                  <hr className="bg-breta-gray text-breta-gray h-[2px] mb-6" />
                  <div className="w-full p-2 mb-5 rounded-md hover:bg-breta-gray cursor-pointer">
                    <Icons.Calendar />
                  </div>
                  <hr className="bg-breta-gray text-breta-gray h-[2px]" />
                </Link>
                <div className="flex flex-col gap-10">
                  <Link
                    href={"/Salon/Servicios"}
                    className="w-full p-2 rounded-md cursor-pointer hover:bg-breta-gray"
                  >
                    <Icons.SalonChairIconSmall />
                  </Link>
                  <Link
                    href={"/Salon/Promociones"}
                    className="w-full p-2 rounded-md cursor-pointer hover:bg-breta-gray"
                  >
                    <Icons.Sale />
                  </Link>
                  <Link
                    href={"/Salon/Clientes"}
                    className="w-full p-2 rounded-md cursor-pointer hover:bg-breta-gray"
                  >
                    <Icons.UserIcon />
                  </Link>
                  <Link
                    href={"/Salon/Equipo"}
                    className="w-full p-2 rounded-md cursor-pointer hover:bg-breta-gray"
                  >
                    <Icons.Team />
                  </Link>
                </div>

              </div>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}
