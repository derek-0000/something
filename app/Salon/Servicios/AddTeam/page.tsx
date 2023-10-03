"use client"
import Link from 'next/link';
import SalonHeader from '@/components/SalonHeader';
const IconPack = require("../../../../public/icons/Icons");
const Icons = new IconPack();

export default function AddTeam() {
    return(
        <>
            <div className="w-full h-[6%] bg-breta-light-gray border-b-2 border-breta-gray">
                <div className="float-right mr-5 mt-3">
                    <Link href={"/Salon/Servicios"}>
                        <Icons.QuitBig />
                    </Link>
                </div>
            </div>
        <div className=''>
            <div className='flex flex-col items-center justify-center'> 
                <div className='w-[30%] text-[20px] text-breta-blue font-bold mt-4 mb-2'>
                    Nuevo Equipo
                </div>
                <div className="w-[30%] shadow-lg shadow-breta-shadow rounded-lg ">
                    <div className='text-[14px] text-breta-blue font-bold mt-5 mb-2 ml-7'>
                        Nombre del equipo
                    </div>
                    <div className='flex items-center justify-center mb-4'>
                        <input
                          required
                          type="text"
                          name="service_name"
                          className="w-[90%] text-sm ring-1 ring-gray-300 rounded-md p-2 bg-breta-light-gray focus:outline-0 placeholder:text-sm tracking-wider placeholder:text-gray-500 "
                          placeholder="Nombre del equipo..."
                          ></input>
                    </div>
                    <div className='text-[14px] text-breta-blue font-bold mt-5 mb-2 ml-7'>
                        Cantidad 
                    </div>
                    <div className='flex items-center ml-7 mb-4'>
                        <input
                          required
                          type="text"
                          name="service_name"
                          className="w-[40%] text-sm ring-1 ring-gray-300 rounded-md p-2 bg-breta-light-gray focus:outline-0 placeholder:text-sm tracking-wider placeholder:text-gray-500 "
                          placeholder="Cantidad de unidades..."
                          ></input>
                    </div>
                    <div className='text-[14px] text-breta-blue font-bold mt-5 mb-2 ml-7'>
                        Descripción
                    </div>
                    <div className='flex items-center justify-center mb-4'>
                        <input
                          required
                          type="text"
                          name="service_name"
                          className="w-[90%] h-32 text-sm ring-1 ring-gray-300 rounded-md p-2 bg-breta-light-gray focus:outline-0 placeholder:text-sm tracking-wider placeholder:text-breta-dark-gray placeholder-top"
                          placeholder="Que tipo de equopo es..."
                          ></input>
                    </div>
                </div>
            </div>
            <div className='flex items-center justify-center mt-5'>
                <button className='w-[30%] h-12 bg-breta-blue rounded-lg text-[20px] text-white'>Crear Equipo</button>
            </div>
        </div>
        </>
    )
}