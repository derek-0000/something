"use client";
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from "next/navigation";
import SalonHeader from '@/components/SalonHeader';
const IconPack = require("../../../../public/icons/Icons");
const Icons = new IconPack();

export default function AddRole() {
    const [errors, setErrors] = useState<string[]>([]);
    const [role_name, setRoleName] = useState<string>("");
    const router = useRouter();

    const headers = {
        "content-type": "application/json",
    };

    const createRole = async (
        role_name: string
    ) => {
        if (role_name == "") {
            setErrors([]);
            return setErrors((errors) => [
                ...errors,
                "Por favor, complete la información"
            ]);
        }
        const URL: string =  "https://breta-back-end.onrender.com/graphql";
        const graphqlQuerry: string = `mutation{
            createRole(
                salon_id: 1
                createRoleInput: {
                    role_name: "${role_name}"
            }){
              role_id
            }
          }`;
          const options = {
            method: "POST",
            headers: headers,
            body: JSON.stringify({ query: graphqlQuerry }),
          };
          try {
            const response = await fetch(URL, options);     
            const data = await response.json();
            const result = data.data;
            if(result != null){
                router.push("/Salon/Equipo");
            } 
          } catch (error) {
            console.log(error)
          }
    }

    return(
        <>
            <div className="w-full h-[6%] bg-breta-light-gray border-b-2 border-breta-gray">
                <div className="float-right mr-5 mt-3">
                    <Link href={"/Salon/Equipo"}>
                        <Icons.QuitBig />
                    </Link>
                </div>
            </div>
            <div>
                <div className='flex flex-col items-center justify-center'> 
                    <div className='w-[30%] text-[20px] text-breta-blue font-bold mt-4 mb-2 ml-9'>
                        Nuevo Rol
                    </div>
                    <div className="w-[30%] shadow-lg shadow-breta-shadow rounded-lg ">
                        <div className='text-[14px] text-breta-blue font-bold mt-5 mb-2 ml-7'>
                            Nombre del Nuevo Rol
                        </div>
                        <div className='flex items-center justify-center mb-4'>
                            <input
                                required
                                onChange={(e) => {setRoleName(e.target.value)}}
                                type="text"
                                name="role_name"
                                className="w-[90%] text-sm ring-1 ring-gray-300 rounded-md p-2 bg-breta-light-gray focus:outline-0 placeholder:text-sm tracking-wider placeholder:text-gray-500 "
                                placeholder="Nombre del equipo..."
                                value={role_name}
                            ></input>
                        </div>
                    </div>
                </div>
                <div className='flex items-center justify-center mt-5'>
                    <button className='w-[30%] h-12 bg-breta-blue rounded-lg text-[20px] text-white'
                            onClick={(e) => createRole(role_name)}
                    >Registrar nuevo Rol
                    </button>
                </div>
            </div>
        </>
    )
}
