"use client";
import { useRef, useEffect, useState } from "react";
import SalonSearchBar from "@/components/SalonSearchBar";
import SalonList from "@/components/SalonList";
import { getSalons } from "@/services/Salons";
const IconPack = require("../../public/icons/Icons");
const Icons = new IconPack();
import { useRouter } from "next/navigation";

export default function User() {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);
  const [salons, setSalons] = useState<any>([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    token ? setLoading(false) : router.push("/");
    fetchSalons()
  }, []);

  const fetchSalons = async()=>{
    const salons = await getSalons()
    setSalons(salons)
  } 

  console.log(salons)
  return (
    <>
      {loading == true ? (
        <div className="h-[100vh] flex justify-center items-center">
          <svg
            className="animate-spin -ml-1 mr-3 h-5 w-5 text-breta-blue"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            ></circle>
            <path
              className="opacity-75"
              fill="black"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </div>
      ) : (
        <div className="py-2 px-4">
          <div className="mb-2">
          <SalonSearchBar></SalonSearchBar>
          </div>
          <div className="mb-2 flex gap-4">
            <Icons.Store/>
            <div className="text-breta-dark-blue font-bold">
              Salones
            </div>
          </div>
          <SalonList salonList={salons} />
        </div>
      )}
    </>
  );
}
