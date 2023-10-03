"use client";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import SalonCarousel from "@/components/SalonCarousel";
import AverageRatingSalon from "@/components/AverageRatingSalon";
import ServiceCard from "@/components/ServiceCard";
import { getSalonById } from "@/services/Salons";
import { SalonData } from "@/components/SalonCustomization";
const IconPack = require("../../public/icons/Icons");
const Icons = new IconPack();

interface SalonLocation {
  country: string;
  street: string;
  city: string;
  interior_number: number;
  exterior_number: number;
  postalCode: string;
}

export default function SalonProfile() {
  const [showFullText, setShowFullText] = useState(false);
  const [showServices, setShowServices] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [salon, setSalon] = useState<SalonData>({} as SalonData);
  const [salonLocation, setSalonLocation] = useState<SalonLocation>(
    {} as SalonLocation
  );
  const [services, setServices] = useState([]);
  const router = useSearchParams();
  const routing = useRouter();

  const discount = "50%" + " de DESCUENTO";
  const serviceDiscount = "En " + "tintes y ajustes de color";
  const serviceDuration = "15 mins";
  const serviceName = "Corte para hombre";
  const serviceDescription =
    "La parte superior va cortada toda por igual, al igual que las sienes.";

  useEffect(() => {
    const id = String(router.get("id"));
    // const token = localStorage.getItem("token");
    // token ? setLoading(false) : routing.push("/");
    const fetchSalon = async () => {
      const request = await getSalonById(id);
      console.log(request);
      setSalon(request);
      setSalonLocation(request.address);
      setServices(request.services);
    };
    fetchSalon();
    id ? setLoading(false) : routing.push("/IndexUser");
  }, []);

  const handleClick = () => {
    setShowFullText(!showFullText);
  };

  const handleServicesClick = () => {
    setShowServices(!showServices);
  };
  const handleBack = () => {
    routing.push(`/IndexUser`);
  };
  console.log(salon);

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
        <div className="w-full h-full">
          <div className="relative h-1/3 w-full">
            <div
              className="absolute left-5 top-6 cursor-pointer z-50"
              onClick={handleBack}
            >
              <Icons.Back />
            </div>
            <div className="absolute right-5 top-6 cursor-pointer z-50">
              <Icons.Share />
            </div>
            <div></div>
            <div className="relative w-full h-full">
              <SalonCarousel image_gallery={salon.image_gallery} />
            </div>
          </div>
          <div className="relative h-2/3 w-full">
            <div className="Relative w-full h-[20%]">
              <div className="absolute right-5 top-6 cursor-pointer">
                <Icons.Liked />
              </div>
              <div className="absolute shadow rounded-full overflow-hidden left-5 sm:left-[5rem] h-[7rem] sm:h-[14rem] w-[7rem] sm:w-[14rem] top-[-4rem] sm:top-[-7rem] z-50 ">
                <div className="flex items-center justify-center">
                  <img src={salon.main_picture} className="" />
                </div>
              </div>
              <div className="relative text-[20px] sm:text-[26px] text-breta-dark-blue font-bold text-center top-[4rem]">
                {salon.salon_name}
              </div>
            </div>
            <div className="w-full">
              <div className="absolute right-5 cursor-pointer z-50">
                <button onClick={handleClick}>
                  <Icons.DescriptionDown />
                </button>
              </div>
              <div className="flex ml-5 text-[14px] sm:text-[16px] text-breta-dark-blue font-bold ">
                Descripción:
              </div>
              <div className="flex ml-5 w-3/4 text-breta-blue block overflow-hidden">
                <p
                  className={`text-[12px] sm:text-[14px] ${
                    showFullText ? "h-auto" : "h-10"
                  }`}
                >
                  {salon.description}
                </p>
              </div>
            </div>

            <div className="mt-2 h-[10px]">
              <div className="absolute left-5">
                <Icons.Payment />
              </div>
              <div className="absolute left-12 text-[15px] sm:text-[17px] text-breta-blue block ">
                Pago anticipado
              </div>
              <hr className="relative border-breta-light-gray top-6 sm:top-7 border-[1px] margin-2 mb-8 mr-[1rem] ml-[1rem]" />
            </div>
            <div className="mt-7 h-[10px]">
              <div className="absolute left-5">
                <Icons.Confirmation />
              </div>
              <div className="absolute left-12 text-[15px] sm:text-[17px] text-breta-blue block ">
                Confirmacion instantanea
              </div>
              <hr className="relative border-breta-light-gray top-6 sm:top-7 border-[1px] margin-2 mb-8 mr-[1rem] ml-[1rem]" />
            </div>
            <div className="mt-7 h-[10px]">
              <div className="absolute left-5">
                <Icons.Schedule />
              </div>
              <div className="absolute left-12 text-[15px] sm:text-[17px] text-breta-blue block ">
                Schedule
              </div>
              <div className="absolute right-5 cursor-pointer">
                <Link
                  href={`/SalonProfile/Schedule/?id=${salon.salon_id}`}
                  className=""
                >
                  <Icons.NextPage />
                </Link>
              </div>
              <hr className="relative border-breta-light-gray top-6 sm:top-7 border-[1px] margin-2 mb-8 mr-[1rem] ml-[1rem]" />
            </div>
            <div className="mt-7 h-[10px]">
              <div className="absolute left-5">
                <Icons.Review />
              </div>
              <div className="absolute left-12 text-[15px] sm:text-[17px] text-breta-blue block ">
                <AverageRatingSalon score={salon.ratings} />
              </div>
              <div className="absolute right-5 cursor-pointer">
                <Link
                  href={`/SalonProfile/Reviews/?id=${salon.salon_id}`}
                  className=""
                >
                  <Icons.NextPage />
                </Link>
              </div>
              <hr className="relative border-breta-light-gray top-6 sm:top-7 border-[1px] margin-2 mb-8 mr-[1rem] ml-[1rem]" />
            </div>
            <div className="mt-7 h-[10px]">
              <div className="absolute left-5">
                <Icons.Location />
              </div>
              <div className="absolute left-12 text-[15px] sm:text-[17px] text-breta-blue block ">
                {salonLocation.street + " #" + salonLocation.exterior_number}
              </div>
              <div className="absolute right-5 cursor-pointer">
                <Link
                  href={`/SalonProfile/Location/?id=${salon.salon_id}`}
                  className=""
                >
                  <Icons.NextPage />
                </Link>
              </div>
              <hr className="relative border-breta-light-gray top-6 sm:top-7 border-[1px] margin-2 mb-8 mr-[1rem] ml-[1rem]" />
            </div>
            <div className="flex gap-3 ml-5 mt-7">
              <div className="">
                <Icons.Promotions />
              </div>
              <div className="text-breta-dark-blue font-bold">Promociones:</div>
            </div>
            <div className="mt-2 sm:mt-8">
              <div className="ml-[1rem]">
                <div className="w-[248px] h-[124px] shadow-lg shadow-breta-shadow/50 bg-breta-dark-blue gap-4 flex rounded-lg cursor-pointer">
                  <div className="overflow-hidden h-full w-[50%] rounded-tl-lg rounded-bl-lg">
                    <div className="relative h-full w-full bg-cover bg-cover bg-MobileCarouselImage0 md:bg-salonCarouselImage0">
                      <div className="absolute h-full w-full bg-gradient-to-l from-breta-dark-gray to-transparent z-49">
                        <div className="relative h-[30px] w-[30px] rounded-lg overflow-hidden left-2 top-2 z-50">
                          <img src={salon.main_picture} className="" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col justify-around w-[50%] bg-breta-dark-blue mr-1">
                    <div className="text-[12px] text-white font-bold ">
                      {discount}
                    </div>
                    <div className="text-[12px] text-white">
                      {serviceDiscount}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-4 mt-2">
              <div className="flex ml-5">
                <Icons.Haircut />
              </div>
              <div className="flex text-1xl sm:text-[18px] text-breta-dark-blue font-bold ">
                Servicios:
              </div>
              <div className="flex ml-auto mr-5 cursor-pointer z-50">
                <button onClick={handleServicesClick}>
                  <Icons.DescriptionDown />
                </button>
              </div>
            </div>
            <div className="">
              {showServices && (
                <div>
                  <ServiceCard services={services} />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
