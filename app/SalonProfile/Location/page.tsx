"use client";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { SalonData } from "@/components/SalonCustomization";
import { getAddress } from "@/services/Salons";
import TopSalonDetails from "@/components/TopSalonDetails";
import LocationMaps from "@/components/LocationMaps";

export interface SalonAddress {
    country: string
    street: string;
    city: string;
    interior_number: number;
    exterior_number: number;
    postal_code: string;
}

export default function Location() {
    const [salon, setSalon] = useState<SalonData>({} as SalonData);
    const [address, setAddress] = useState<SalonAddress>({} as SalonAddress);
    const [loading, setLoading] = useState<boolean>(true);
    const router = useSearchParams();
    const routing = useRouter();

    useEffect(() => {
        const id = router.get('id') as string;
        // const token = localStorage.getItem("token");
        // token ? setLoading(false) : routing.push("/");
        const fetchSalon = async()=>{
            const request = await getAddress(id);
            setSalon(request.data.salon);
            setAddress(request.data.salon.address);
        } 
        fetchSalon();
        id ? setLoading(false) : routing.push("/IndexUser");
        console.log(salon)
        
        
      }, []);
      console.log(address)

    return (
        <>
            <div>
                <TopSalonDetails 
                    salon_id={salon.salon_id}
                    title={salon.salon_name}
                />
            </div>
            <div>
                <LocationMaps 
                    address={address}
                />
            </div>
        </>
    )
}