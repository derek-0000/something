"use client";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { SalonData } from "@/components/SalonCustomization";
import TopSalonDetails from "@/components/TopSalonDetails"
import { getSalonById } from "@/services/Salons";
import ScheduleList from "@/components/ScheduleList";
import OpenStateTag from "@/components/OpenStateTag";
const IconPack = require("../../../public/icons/Icons");
const Icons = new IconPack();

export default function Schedule() {
    const [salon, setSalon] = useState<SalonData>({} as SalonData);
    const [loading, setLoading] = useState<boolean>(true);
    const router = useSearchParams();
    const routing = useRouter();

    useEffect(() => {
        const id = router.get('id') as string;
        // const token = localStorage.getItem("token");
        // token ? setLoading(false) : routing.push("/");
        const fetchSalon = async()=>{
            const request = await getSalonById(id);
            setSalon(request);
        } 
        fetchSalon();
        id ? setLoading(false) : routing.push("/IndexUser");
        console.log(salon)
      }, []);

    const abierto = "Abierto"

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
        <div className="">
                <div className="">
                    <TopSalonDetails 
                        salon_id={salon.salon_id}
                        title={salon.salon_name}
                    ></TopSalonDetails>
                </div>
                <div className="">
                        <ScheduleList schedule={salon.schedule}></ScheduleList>
                </div>
        </div>
      )}
        </>
    )
}