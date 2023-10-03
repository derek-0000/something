"use client";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { SalonData } from "@/components/SalonCustomization";
import TopSalonDetails from "@/components/TopSalonDetails"
import ReviewsList from "@/components/ReviewList";
import AverageRating from "@/components/AverageRating";
import { getSalonById, getRatingById } from "@/services/Salons";
const IconPack = require("../../../public/icons/Icons");
const Icons = new IconPack();

export default function Reviews() {
    const [salon, setSalon] = useState<SalonData>({} as SalonData);
    const [loading, setLoading] = useState<boolean>(true);
    const router = useSearchParams();
    const routing = useRouter();

    const setGrade = (ratings:any) =>{
        if(ratings.length == 0){
          return 0
        }else{
          let totalSum = 0
          ratings.forEach((item:any)=>{
            totalSum = totalSum + item.score
          })
          return Math.round((totalSum / ratings.length)*10)/10
        }
      }
    

    useEffect(() => {
        const id = router.get('id') as string;
        // const token = localStorage.getItem("token");
        // token ? setLoading(false) : routing.push("/");
        const fetchSalon = async()=>{
            const request = await getRatingById(id);
            setSalon(request.data.salon);
        } 
        fetchSalon();
        id ? setLoading(false) : routing.push("/IndexUser");
        console.log(salon)
        
      }, []);

      console.log(salon)
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
              <div className="flex flex-start ml-5 mt-5 gap-5">
                <div>
                  <Icons.ReviewBig />
                </div>
                <div className="text-breta-dark-blue font-bold text-[18px]">
                  Reseñas:
                </div>
              </div>
              <div>
              <div className="">
                  <AverageRating 
                    score= {salon.ratings}
                  />
              </div>
              <div className="flex gap-4 items-center mt-3 mb-3">
                <div className="flex ml-12 cursor-pointer">
                  <Icons.StarRating />
                  <Icons.StarRating />
                  <Icons.StarRating />
                  <Icons.StarRating />
                  <Icons.StarRating />
                </div>
                <div className="text-[12px] text-breta-blue cursor-pointer">
                  <Link
                    href={`/SalonProfile/Reviews/NewReview/?id=${salon.salon_id}`}
                    className="" >
                    Deja un comentario
                  </Link>
                </div>
                <div>
                  <Icons.NotificationRating />
                </div>
              </div>
              </div>
              <ReviewsList 
                reviews={salon.ratings}
              />
            </div>
        </div>
      )}
        </>
    )
}

