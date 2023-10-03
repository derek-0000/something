"use client";
import { GoogleMap, LoadScript, MarkerF } from '@react-google-maps/api';
import { useState, useEffect } from "react";
import { SalonAddress } from '@/app/SalonProfile/Location/page';
import Geocode from 'react-geocode';
const IconPack = require("../public/icons/Icons");
const Icons = new IconPack();

interface coordinatesFlat {
  lat: number;
  lng: number;
}

export default function LocationMaps(props: { address: any }) {
  const [address, setAddress] = useState<SalonAddress>({} as SalonAddress);
  const [coordinates, setCoordinates] = useState<coordinatesFlat>({} as coordinatesFlat);
  const center = { lat: 28.6685647, lng: -106.1186066 };
  Geocode.setApiKey("AIzaSyAXvELig2Q9oesWPDRntJnmPxdaOVm_fPw");
  const addressaa = 'Partido de los pobres #252, 31134, Chihuahua';

  const openGoogleMaps = () => {
    const { lat, lng } = center;
    const url = `https://www.google.com/maps?q=${lat},${lng}`;
    window.open(url, '_blank');
  };

  const copyCoordinates = () => {
    const { lat, lng } = center;
    const coordinatesText = `${lat}, ${lng}`;
    navigator.clipboard.writeText(coordinatesText)
      .then(() => alert('¡Coordenadas copiadas al portapapeles!'))
      .catch((error) => console.error('Error al copiar las coordenadas:', error));
  };

  const copyAddress = () => {
    const addressText = `${address.street},  #${address.exterior_number}, C.P.${address.postal_code}, ${address.city}`;
    navigator.clipboard.writeText(addressText)
      .then(() => alert('Dirección copiada al portapapeles!'))
      .catch((error) => console.error('Error al copiar la dirección:', error));
  }

  useEffect(() => {
    Geocode.fromAddress(addressaa).then(
      (response:any) => {
        const { lat, lng } = response.results[0].geometry.location;
        setCoordinates({ lat, lng });
      },
      (error:any) => {
        console.error('Error al geocodificar la dirección:', error);
      }
    );
        setAddress(props.address);
  }, [props.address]);

    console.log(coordinates)
    return(
        <>
        {address != null ? (
          <>
          <div className='flex justify-start gap-3 mt-2 ml-5'>
            <div>
              <Icons.LocationBig />
            </div>
            <div className='text-[18px] text-breta-dark-blue font-bold'>
                Ubicación:
            </div>
          </div>
          <div className='flex h-1/2 mt-2'>
            <LoadScript googleMapsApiKey="AIzaSyAXvELig2Q9oesWPDRntJnmPxdaOVm_fPw">
              <GoogleMap
                mapContainerStyle={{ width: '100%', height: '500px' }}
                center={center}
                zoom={15}
                >
                <MarkerF position={center} />
              </GoogleMap>
            </LoadScript>
          </div>
          <div className='flex ml-5 mt-5'>
            <div className='w-[90%]'>
              <div className='text-[14px] text-breta-blue font-bold'>
                Dirección:
              </div>
              <div className='text-[16px] text-breta-dark-blue'>
                {address.street + ", #" + address.exterior_number +", C.P." + address.postal_code + ", " + address.city}
              </div>
            </div>
            <div className=' w-[10%] mt-4 cursor-pointer' onClick={copyAddress}>
                <Icons.Copy />
            </div>
          </div>
          <div className='flex gap-4 ml-5 mt-5'>
            <button className='border border-breta-dark-blue text-[14px] text-breta-dark-blue font-bold  py-1 px-3 rounded-full' onClick={openGoogleMaps}> Ir a Google Maps</button>
            <button className='border border-breta-dark-blue text-[14px] text-breta-dark-blue font-bold  py-1 px-3 rounded-full' onClick={copyCoordinates}> Copiar Coordenadas</button>
          </div>
          </>
          ) : (
            <>
              <div className="h-full flex justify-center items-center">
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
            </>
          )}
        </>
    )
}