"use client";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
const IconPack = require("../../public/icons/Icons");
const Icons = new IconPack();

export default function ConfirmEmail() {
  const router = useSearchParams();
  const token = router.get('token');
  const URL: string = "http://localhost:3000/graphql";
  const headers = {
    "content-type": "application/json",
  };
  
  useEffect(() => {
    const confirm = async ()=> {
      if(token)
      {
        const graphqlQuerry: string = `mutation{
          confirmEmail(confirmEmailInput: {
            token: "${token}"
          }){
            is_Verified
          }
        }`;
        const options = {
          method: "POST",
          headers: headers,
          body: JSON.stringify({ query: graphqlQuerry }),
        };
  
        const response = await fetch(URL, options);
        const data = await response.json();
      }
    }

    confirm();
  }, []); 

  return (
    <>
      <nav className="absolute items-center px-4 md:px-24 py-4 w-full md:relative md:flex md:justify-between  md:bg-breta-blue z-50">
          <div className="hidden md:block">
           <Icons.MonochromaticLogo/>
          </div>
      </nav>
      <div className="flex flex-col justify-center items-center h-3/4">
      <div className="flex flex-col justify-around gap-2 h-1.5/3 w-1/3 p-4  shadow-breta-blue/40 border-2 border-gray-300">
        <div className="mb-2 text-breta-blue font-light select-none">
          <p className="font-bold "> Gracias por confirmar tu correo</p>
          Tu correo fue confirmado correctamente. Ahora tienes acceso completo a todas las caracteristicas que ofrecemos. Puedes cerrar esta pestaña.
        </div>
      </div>
      </div>
      
    </>
  );
}