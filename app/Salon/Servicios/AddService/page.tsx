"use client";
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from "next/navigation";
import SalonHeader from "@/components/SalonHeader"
const IconPack = require("../../../../public/icons/Icons");
const Icons = new IconPack();

export default function AddService() {
    const [allEmployees, setallEmployees] = useState(false);
    const [allShops, setAllShops] = useState(false);
    const [calculatePrice, setCalculatePrice] = useState(false);
    const [cancelationPenalty, setCancelationPenalty] = useState(false);
    const [isBorderEmployeeVisible, setIsBorderEmployeeVisible] = useState(false);
    const [isBorderShopVisible, setIsBorderShopVisible] = useState(false);
    const [errors, setErrors] = useState<string[]>([]);
    const [service_name, setServiceName] = useState<string>("");
    const [gender, setGender] = useState<string>("");
    const [category, setCategory] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [timeBefore, setTimeBefore] = useState<string>("");
    const [timeDoing, setTimeDoing] = useState<string>("");
    const [timeAfter, setTimeAfter] = useState<string>("");
    const [price, setPrice] = useState<string>("");
    const [cancelationPolitics, setCancelationPolitics] = useState<string>("");
    const [cancelationTime, setCancelationTime] = useState<string>("");
    const [cancelationTimeNumber, setCancelationTimeNumber] = useState<string>("");
    const router = useRouter();

    const headers = {
        "content-type": "application/json",
    };

    const handleAllEmployees = () => {
        setallEmployees(!allEmployees);
    };
    const handleAllShops = () => {
        setAllShops(!allShops);
    };
    const handleCalculatePrice = () => {
        setCalculatePrice(!calculatePrice);
    };
    const handleCancelationPenalty = () => {
        setCancelationPenalty(!cancelationPenalty);
    };

    const handleImageEmployeeClick = () => {
        setIsBorderEmployeeVisible(!isBorderEmployeeVisible);
    };

    const handleImageShopClick = () => {
        setIsBorderShopVisible(!isBorderShopVisible);
    };

    const handleCategoryChange = (e: any) => {
        const newValue = e.target.value;
        setCategory(newValue);
    };

    const handleGenderChange = (e: any ) => {
        const newValue = e.target.value;
        setGender(newValue);
    };

    const handlePreparationTimeChange = (e: any ) => {
        const newValue = e.target.value;
        setTimeBefore(newValue);
    };

    const handleDurationTimeChange = (e: any ) => {
        const newValue = e.target.value;
        setTimeDoing(newValue);
    };

    const handleCleaningTimeChange = (e: any ) => {
        const newValue = e.target.value;
        setTimeAfter(newValue);
    };

    const handleCancelationTimeChange = (e: any) => {
        const newValue = e.target.value;
        setCancelationTime(newValue);
    };

    const createService = async (
        service_name: string,
        category: string,
        gender: string,
        description: string,
        timeBefore: string,
        timeDoing: string,
        timeAfter: string,
        price: string,
        cancelationPolitics: string,
        cancelationTimeNumber: string,
        cancelationTime: string
    ) => {
        if (
            service_name == "" ||
            description == "" 
        ) {
            setErrors([]);
            return setErrors((errors) => [
                ...errors,
                "Por favor, complete toda la información"
            ]);
        } 
        const URL: string = "https://breta-back-end.onrender.com/graphql";
        const graphqlQuerry: string = `mutation{
            createService(
                salon_id: 1
                createServiceInput: {
                    service_name: "${service_name}"
                    category: "${category}"
                    gender: "${gender}"
                    description: "${description}"
                    timespan: {Before: ${timeBefore}, Doing: ${timeDoing}, After: ${timeAfter}}
                    price: ${price}
                    cancellation: {Description:"${cancelationPolitics}", Time: "${cancelationTimeNumber} ${cancelationTime}" }
            }){
              service_id
            }
          }`;
          const options = {
            method: "POST",
            headers: headers,
            body: JSON.stringify({ query: graphqlQuerry }),
          };
          console.log(graphqlQuerry)
          try {
              const response = await fetch(URL, options);        
              const data = await response.json();
              console.log(data)
              const result = data.data;
            if(result != null){
                router.push("/Salon/Servicios");
            } 
          } catch (error) {
            console.log(error)
          }
    }

    return(
    <>
        <div className="w-full h-[3%] bg-breta-light-gray border-b-2 border-breta-gray">
            <div className="float-right mr-5 mt-3">
                <Link href={"/Salon/Servicios"}>
                    <Icons.QuitBig />
                </Link>
            </div>
        </div>
        <div className=''>
            <div className='flex flex-col items-center justify-center'>
                <div className='w-[30%] ml-8 mt-5'>
                    <div className='text-[20px] text-breta-blue font-bold'>
                        Información general
                    </div>
                    <div className='text-[14px] text-breta-dark-gray'>
                        Descripción y principales características del servicio.
                    </div>
                </div> 
                <div className="relative w-[30%] h-auto shadow-lg shadow-breta-shadow rounded-lg ">
                    <div className='text-[14px] text-breta-blue font-bold mt-5 mb-2 ml-7'>
                        Nombre del Servicio
                    </div>
                    <div className='flex items-center justify-center mb-4'>
                        <input
                          required
                          onChange={(e) =>{ setServiceName(e.target.value)}}
                          type="text"
                          name="service_name"
                          className="w-[90%] text-sm ring-1 ring-gray-300 rounded-md p-2 bg-breta-light-gray focus:outline-0 placeholder:text-sm tracking-wider placeholder:text-gray-500 "
                          placeholder="Nombre comercial..."
                          value={service_name}
                          ></input>
                    </div>
                    <div className='text-[14px] text-breta-blue font-bold mt-5 mb-2 ml-7'>
                        Categoría
                    </div>
                    <div className='flex items-center justify-center mb-4'>
                        <select className='w-[90%] text-sm ring-1 ring-gray-300 rounded-md p-2 bg-breta-light-gray focus:outline-0 placeholder:text-sm tracking-wider text-breta-dark-gray'
                                value={category}
                                onChange={handleCategoryChange}
                        >
                            <option className='text-breta-dark-gray'>Selecciona una categoria...</option>
                            <option className='text-breta-dark-gray' value="Cabello y peinado">Cabello y peinado</option>
                            <option className='text-breta-dark-gray' value="Uñas">Uñas</option>
                            <option className='text-breta-dark-gray' value="Cejas y pestañas">Cejas y pestañas</option>
                            <option className='text-breta-dark-gray' value="Barberia">Barberia</option>
                            <option className='text-breta-dark-gray' value="Depilación">Depilación</option>
                            <option className='text-breta-dark-gray' value="Tratamientos faciales y cuidado de piel">Tratamientos faciales y cuidado de piel</option>
                            <option className='text-breta-dark-gray' value="Cuerpo">Cuerpo</option>
                            <option className='text-breta-dark-gray' value="Maquillaje">Maquillaje</option>
                            <option className='text-breta-dark-gray' value="Spa">Spa</option>
                            <option className='text-breta-dark-gray' value="Otro">Otro</option>
                        </select>
                    </div>
                    <div className='text-[14px] text-breta-blue font-bold mt-5 mb-2 ml-7'>
                        Género
                    </div>
                    <div className='flex items-center justify-center mb-4'>
                        <select className='w-[90%] text-sm ring-1 ring-gray-300 rounded-md p-2 bg-breta-light-gray focus:outline-0 placeholder:text-sm tracking-wider text-breta-dark-gray'
                                value={gender}
                                onChange={handleGenderChange}
                                placeholder='Selecciona un genero'
                        >
                            <option className='text-breta-dark-gray'>Selecciona si tu servicio es para hombres o mujeres</option>
                            <option className='text-breta-dark-gray' value="Male">Hombre</option>
                            <option className='text-breta-dark-gray' value="Female">Mujer</option>
                        </select>
                        
                    </div>
                    <div className='text-[14px] text-breta-blue font-bold mt-5 mb-2 ml-7'>
                        Descripción
                    </div>
                    <div className='flex items-center justify-center mb-4'>
                        <input
                          onChange={(e) =>setDescription(e.target.value)}
                          required
                          type="text"
                          name="description"
                          className="w-[90%] h-32 text-sm ring-1 ring-gray-300 rounded-md p-2 bg-breta-light-gray focus:outline-0 placeholder:text-sm tracking-wider placeholder:text-breta-dark-gray placeholder-top"
                          placeholder="Redacta una pequeña descripción de tu servicio..."
                          value={description}
                          ></input>
                    </div>
                </div>
            </div>
        </div>
        <div>
            <div className='flex flex-col items-center justify-center'> 
                <div className='w-[30%] ml-8 mt-5'>
                    <div className='text-[20px] text-breta-blue font-bold'>
                        Duración
                    </div>
                    <div className='text-[14px] text-breta-dark-gray'>
                        Define el tiempo de duración de tu servicio.
                    </div>
                </div>
                <div className="w-[30%] h-auto shadow-lg shadow-breta-shadow rounded-lg ">
                    <div className='grid grid-cols-3 ml-4 mt-5'>
                        <div className='flex text-[14px] text-breta-blue font-bold'>
                            Preparación
                        </div>
                        <div className='flex text-[14px] text-breta-blue font-bold'>
                            Duración
                        </div>
                        <div className='flex text-[14px] text-breta-blue font-bold'>
                            Limpieza
                        </div>
                    </div>
                    <div className='grid grid-cols-3 ml-4'>
                        <div>
                            <select className='w-[90%] text-sm ring-1 ring-gray-300 rounded-md p-2 bg-breta-light-gray focus:outline-0 placeholder:text-sm tracking-wider text-breta-dark-gray'
                                value={timeBefore}
                                onChange={handlePreparationTimeChange}
                            >
                                <option className='text-breta-dark-gray' value="5">5 min</option>
                                <option className='text-breta-dark-gray' value="10">10 min</option>
                                <option className='text-breta-dark-gray' value="15">15 min</option>
                                <option className='text-breta-dark-gray' value="20">20 min</option>
                            </select>
                        </div>
                        <div>
                            <select className='w-[90%] text-sm ring-1 ring-gray-300 rounded-md p-2 bg-breta-light-gray focus:outline-0 placeholder:text-sm tracking-wider text-breta-dark-gray'
                                    value={timeDoing}
                                    onChange={handleDurationTimeChange}
                            >
                                <option className='text-breta-dark-gray' value="10">10 min</option>
                                <option className='text-breta-dark-gray' value="20">20 min</option>
                                <option className='text-breta-dark-gray' value="30">30 min</option>
                                <option className='text-breta-dark-gray' value="40">40 min</option>
                            </select>
                        </div>
                        <div>
                            <select className='w-[90%] text-sm ring-1 ring-gray-300 rounded-md p-2 bg-breta-light-gray focus:outline-0 placeholder:text-sm tracking-wider text-breta-dark-gray'
                                    value={timeAfter}
                                    onChange={handleCleaningTimeChange}
                            >
                                <option className='text-breta-dark-gray' value="5">5 min</option>
                                <option className='text-breta-dark-gray' value="10">10 min</option>
                                <option className='text-breta-dark-gray' value="15">15 min</option>
                                <option className='text-breta-dark-gray' value="20">20 min</option>
                            </select>
                        </div>
                    </div>
                    <div className='grid grid-cols-3 ml-4 mb-4'>
                        <div className='flex text-[14px] text-breta-blue font-bold'>
                            Antes de que llegue el cliente.
                        </div>
                        <div className='flex text-[14px] text-breta-blue font-bold'>
                            Mientras esta el cliente.
                        </div>
                        <div className='flex text-[14px] text-breta-blue font-bold text-right mr-4'>
                            Despues de que se fue el cliente.
                        </div>
                    </div>
                </div> 
            </div>   
        </div>
        <div className='flex flex-col items-center justify-center'>
            <div className='w-[30%] ml-8 mt-5'>
                <div className='text-[20px] text-breta-blue font-bold'>
                    Empleados
                </div>
                <div className='w-[90%] text-[14px] text-breta-dark-gray'>
                    Selecciona que miembros de tu equipo de trabajo pueden realizar este servicio.
                </div>
            </div>
            <div className="w-[30%] h-auto shadow-lg shadow-breta-shadow rounded-lg ">
                <div className='mb-5 mt-10 ml-5'>
                    <label htmlFor="allEmployees" className="flex items-center cursor-pointer">
                        <div className="relative">
                            <input
                                type="checkbox"
                                id="allEmployees"
                                className="sr-only"
                                checked={allEmployees}
                                onChange={handleAllEmployees}
                            />
                            <div className="w-10 h-4 bg-breta-gray rounded-full shadow-inner ml-1"></div>
                            <div className={`toggle-dot absolute w-6 h-6 bg-breta-dark-gray mt-[-1.2rem] rounded-full shadow left-0.5 transition-transform ${allEmployees ? 'translate-x-5' : 'translate-x-0'}`}></div>
                        </div>
                        <span className='text-[14px] text-breta-blue font-bold ml-4'> Seleccionar a todos los elementos</span>
                    </label>
                </div>
                <div className='ml-5 mb-5'>
                    <div className={`relative rounded-full w-14 h-14 ${isBorderEmployeeVisible ? 'border-4 border-selected' : 'border-4 border-transparent'}`}  onClick={handleImageEmployeeClick}>
                        <img    src="https://res.cloudinary.com/djwbr4c3k/image/upload/v1690534573/ontcbe9gw5hibyncm50x.jpg" 
                                alt="" 
                                className="w-12 h-12 rounded-full overflow-hidden"/>
                    </div>
                </div>
            </div>
        </div>
        <div className='flex flex-col items-center justify-center'>
            <div className='w-[30%] ml-8 mt-5'>
                <div className='text-[20px] text-breta-blue font-bold'>
                    Ubicación
                </div>
                <div className='w-[90%] text-[14px] text-breta-dark-gray'>
                    Selecciona cual de tus sucursales ofrece este servicio.
                </div>
            </div>
            <div className="w-[30%] h-auto shadow-lg shadow-breta-shadow rounded-lg ">
                <div className='mb-5 mt-10 ml-5'>
                    <label htmlFor="allShops" className="flex items-center cursor-pointer">
                        <div className="relative">
                            <input
                                type="checkbox"
                                id="allShops"
                                className="sr-only"
                                checked={allShops}
                                onChange={handleAllShops}
                            />
                            <div className="w-10 h-4 bg-breta-gray rounded-full shadow-inner ml-1"></div>
                            <div className={`toggle-dot absolute w-6 h-6 bg-breta-dark-gray mt-[-1.2rem] rounded-full shadow left-0.5 transition-transform ${allShops ? 'translate-x-5' : 'translate-x-0'}`}></div>
                        </div>
                        <span className='text-[14px] text-breta-blue font-bold ml-4'> Seleccionar a todas las sucursales</span>
                    </label>
                </div>
                <div className='ml-5 mb-5'>
                    <div className={`relative rounded-lg w-14 h-14 ${isBorderShopVisible ? 'border-4 border-selected' : 'border-4 border-transparent'}`}  onClick={handleImageShopClick}>
                        <img    src="https://res.cloudinary.com/djwbr4c3k/image/upload/v1690534573/ontcbe9gw5hibyncm50x.jpg" 
                                alt="" 
                                className="w-12 h-12 rounded-lg overflow-hidden"/>
                    </div>
                </div>
            </div>
        </div>
        <div className='flex flex-col items-center justify-center'>
            <div className='w-[30%] ml-8 mt-5'>
                <div className='text-[20px] text-breta-blue font-bold'>
                    Precio
                </div>
                <div className='w-[90%] text-[14px] text-breta-dark-gray'>
                    Selecciona el tipo y el precio de este servicio.
                </div>
            </div>
            <div className="w-[30%] h-auto shadow-lg shadow-breta-shadow rounded-lg ">
                <div className='mb-5 mt-10 ml-5'>
                    <label htmlFor="price" className="flex items-center cursor-pointer">
                        <div className="relative">
                            <input
                                type="checkbox"
                                id="price"
                                className="sr-only"
                                checked={calculatePrice}
                                onChange={handleCalculatePrice}
                            />
                            <div className="w-10 h-4 bg-breta-gray rounded-full shadow-inner ml-1"></div>
                            <div className={`toggle-dot absolute w-6 h-6 bg-breta-dark-gray mt-[-1.2rem] rounded-full shadow left-0.5 transition-transform ${calculatePrice ? 'translate-x-5' : 'translate-x-0'}`}></div>
                        </div>
                        <span className='text-[14px] text-breta-blue font-bold ml-4'> Cálculo de costo </span>
                    </label>
                </div>
                <div className='grid grid-cols-2 ml-4 mt-5'>
                    <div className='flex text-[14px] text-breta-blue font-bold'>
                        Tipo de precio
                    </div>
                    <div className='flex text-[14px] text-breta-blue font-bold ml-[-2rem]'>
                        Precio
                    </div>
                </div>
                <div className='grid grid-cols-2 ml-4 mt-5 mb-7'>
                    <div className=''>
                        <select className='w-[50%] text-sm ring-1 ring-gray-300 rounded-md p-2 bg-white focus:outline-0 placeholder:text-sm tracking-wider text-breta-dark-gray'>
                                <option className='text-breta-dark-gray' value="hombre">Fijo</option>
                                <option className='text-breta-dark-gray' value="mujer">Otro </option>
                                <option className='text-breta-dark-gray' value="mujer">Otro 2</option>
                                <option className='text-breta-dark-gray' value="mujer">Otro 3</option>
                        </select>
                    </div>
                    <div className='ml-[-2rem]'>
                        <input
                          required
                          onChange={(e) =>{ setPrice(e.target.value)}}
                          type="text"
                          name="price"
                          className="w-[90%] text-sm ring-1 ring-gray-300 rounded-md p-2 bg-breta-light-gray focus:outline-0 placeholder:text-sm tracking-wider placeholder:text-gray-500 "
                          placeholder="$"
                          value={price}
                        ></input>
                    </div>
                </div>
            </div>
        </div>
        <div className='flex flex-col items-center justify-center'>
            <div className='w-[30%] ml-8 mt-5'>
                <div className='text-[20px] text-breta-blue font-bold'>
                    Políticas de Cancelación
                </div>
            </div>
            <div className="w-[30%] h-auto shadow-lg shadow-breta-shadow rounded-lg ">
                <div className='mb-5 mt-10 ml-5'>
                    <label htmlFor="cancelationPenalty" className="flex items-center cursor-pointer">
                        <div className="relative">
                            <input
                                type="checkbox"
                                id="cancelationPenalty"
                                className="sr-only"
                                checked={cancelationPenalty}
                                onChange={handleCancelationPenalty}
                            />
                            <div className="w-10 h-4 bg-breta-gray rounded-full shadow-inner ml-1"></div>
                            <div className={`toggle-dot absolute w-6 h-6 bg-breta-dark-gray mt-[-1.2rem] rounded-full shadow left-0.5 transition-transform ${cancelationPenalty ? 'translate-x-5' : 'translate-x-0'}`}></div>
                        </div>
                        <span className='text-[14px] text-breta-blue font-bold ml-4'> Penalización por cancelacion</span>
                    </label>
                </div>
                <div className='flex items-center justify-center mb-1'>
                        <input
                          required
                          onChange={(e) =>{ setCancelationPolitics(e.target.value)}}
                          type="text"
                          name="service_name"
                          className="w-[90%] h-32 text-sm ring-1 ring-gray-300 rounded-md p-2 bg-breta-light-gray focus:outline-0 placeholder:text-sm tracking-wider placeholder:text-breta-dark-gray placeholder-top"
                          placeholder="Politicas de cancelación..."
                          value={cancelationPolitics}
                          ></input>
                </div>
                <div className='flex text-[12px] text-breta-blue font-bold ml-7 mb-2'>
                    Define las políticas que aplicarán en caso de que un cliente cancele una cita.
                </div>
                <div className='flex text-[14px] text-breta-blue font-bold ml-7'>
                            Cancelación sin Costo
                </div>
                <div className='flex gap- mb-5 mt-2'>
                    <div className='ml-7'>
                        <input
                          required
                          onChange={(e) =>{ setCancelationTimeNumber(e.target.value)}}
                          type="number"
                          name="service_name"
                          className="w-[45%] h-10 text-sm ring-1 ring-gray-300 rounded-md p-2 bg-breta-light-gray focus:outline-0 placeholder:text-sm tracking-wider placeholder:text-breta-dark-gray placeholder-top"
                          placeholder="Numero..."
                          value={cancelationTimeNumber}
                        ></input>
                    </div>
                    <div className='ml-[-2rem]'>
                        <select className='w-[100%] text-sm ring-1 ring-gray-300 rounded-md p-2 bg-white focus:outline-0 placeholder:text-sm tracking-wider text-breta-dark-gray'
                                value={cancelationTime}
                                onChange={handleCancelationTimeChange}
                        >
                            <option className='text-breta-dark-gray' value="Horas">Horas</option>
                            <option className='text-breta-dark-gray' value="Dias">Dias</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className='flex w-[30%] items-center justify-center mt-8 mb-5'>
                <button 
                    type="button"
                    onClick={(e) => createService(
                        service_name,
                        category,
                        gender,
                        description,
                        timeBefore,
                        timeDoing,
                        timeAfter,
                        price,
                        cancelationPolitics,
                        cancelationTimeNumber,
                        cancelationTime
                    )}
                    className='h-12 w-[100%] bg-breta-blue rounded-lg text-[20px] text-white'>
                    Crear Servicio
                </button>
            </div>
        </div>
    </>
    )
}
