"use client";
import Link from 'next/link';
import { useState, useEffect } from 'react';
const IconPack = require("../public/icons/Icons");
const Icons = new IconPack();

export default function Workers( props: {
  employees: any,
  roles: any
}) {
    const [isChecked, setIsChecked] = useState(false);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
      if(props.roles != null && props.employees !=null) {
          setLoading(false)
      }
    }, []);

  const handleToggle = () => {
    setIsChecked(!isChecked);
  };

  
    return(
    <>
          <div className="w-full h-[10%] bg-breta-light-gray border-b-2 border-breta-gray">
          <div className='flex items-center justify-end'>
            <label htmlFor="toggle" className="flex items-center cursor-pointer mt-7 mr-32">
              <span className={`mr-[-9rem]  font-bold z-50 ${isChecked ? 'text-white' : 'text-breta-blue'}`}>Colaboradores</span>
                <div className="relative">
                  <input
                    type="checkbox"
                    id="toggle"
                    className="sr-only"
                    checked={isChecked}
                    onChange={handleToggle}
                  />
                  <div className="w-[20rem] h-8 bg-white rounded-full shadow-inner"></div>
                  <div className={`toggle-dot absolute w-[10rem] h-8 mt-[-2rem] bg-breta-blue rounded-full shadow left-0.5 transition-transform ${isChecked ? 'translate-x-0' : 'translate-x-40'}`}></div>
                </div>
              <span className={`ml-[-6rem] font-bold z-50 ${isChecked ? 'text-breta-blue' : 'text-white'}`}>Roles</span>
            </label>
          </div>
        </div>
        <div className="mt-5">
          {isChecked == true ? (
            <div>
              <div className='flex'>
                <div className="text-[26px] text-breta-blue font-bold ml-10">
                    Colaboradores
                </div>
                <div className="ml-auto mr-32">
                    <Link href={"/Salon/Equipo/AddWorker"}>
                        <button className="flex w-[230px] gap-4 rounded-lg bg-breta-blue text-white font-bold py-2 px-4">
                            <Icons.New />
                            Nuevo Colaborador
                        </button>
                    </Link>
                </div>
              </div>
              <div className='flex flex-col items-center justify-center mt-6'>
                <div className='flex w-[90%] mb-2'>
                  <div className='w-[12.5%] text-breta-dark-gray text-[10px]'>
                      Nombre del colaborador
                  </div>
                  <div className='w-[12.5%] text-breta-dark-gray text-[10px] text-right ml-[-3rem]'>
                      Rol 
                  </div>
                  <div className='w-[12.5%] text-breta-dark-gray text-[10px] text-right ml-10'>
                      Celular
                  </div>
                  <div className='w-[12.5%] text-breta-dark-gray text-[10px] text-right'>
                      Email
                  </div>
                  <div className='w-[12.5%] text-breta-dark-gray text-[10px] text-right ml-2'>
                      Comisión
                  </div>
                  <div className='w-[12.5%] text-breta-dark-gray text-[10px] text-right ml-3'>
                      Ciclo de pago
                  </div>
                  <div className='w-[12.5%] text-breta-dark-gray text-[10px] text-right ml-[-1.5rem]'>
                      Status
                  </div>
                  <div className='ml-[4.5rem]'>
                      <Icons.Print />
                  </div>
                </div>
                {props.employees.map((item: any, index: number) => {
                  return (
                  <div key={item.employee_name} className='w-full ml-36'>
                    <div className='flex w-[90%] mb-2 mt-2 key={index}'>
                      <div className='relative rounded-full overflow-hidden w-14 h-14 '> 
                        <img src={item.profile_picture}/>
                      </div>
                      <div className='w-[12.5%] text-breta-dark-blue text-[14px] ml-2 mt-4'>
                        {item.employee_name}
                      </div>
                      <div className='w-[12.5%] text-breta-blue text-[14px] text-center '>
                        <div className='w-[70%] bg-breta-gray rounded-full px-2 font-bold mt-4'>
                          {item.role.role_name}
                        </div>
                      </div>
                      <div className='w-[12.5%] text-breta-dark-blue text-[14px] text-center mt-4'>
                        {item.cellphone}
                      </div>
                      <div className='w-[12.5%] text-breta-dark-blue text-[14px] text-center mt-4'>
                        {item.email}
                      </div>
                      <div className='w-[12.5%] text-breta-dark-blue text-[14px] text-center mt-4'>
                        {item.commission}
                      </div>
                      <div className='w-[12.5%] text-breta-blue text-[14px] text-center'>
                        <div className='w-[70%] bg-breta-gray rounded-full px-2 font-bold ml-7 mt-4'>
                          {item.paymentCycle}
                        </div>
                      </div>
                      <div className='w-[12.5%] text-breta-dark-blue text-[14px] text-center mt-4'>
                        Status
                      </div>
                      <div className='cursor-pointer mt-4'>
                        <Icons.Options />
                      </div>
                    </div>
                    <div>
                      <hr className='w-[85%] border-breta-light-gray top-6 sm:top-7 border-[1px] margin-2' />
                    </div>
                  </div>
                  )
                })}
              </div>
            </div>
            
          ): (
            <div>
              <div className='flex'>
                <div className="text-[26px] text-breta-blue font-bold ml-10">
                    Roles
                </div>
                <div className="ml-auto mr-32">
                    <Link href={"/Salon/Equipo/AddRole"}>
                        <button className="flex w-[200px] ml-5 gap-4 rounded-lg bg-breta-blue text-white font-bold py-2 px-4">
                            <div className='ml-5'>
                                <Icons.New />
                            </div>
                            <div>
                                Nuevo Rol
                            </div>
                        </button>
                    </Link>
                </div>
              </div>
              <div className='flex flex-col items-center justify-center mt-6'>
                <div className='flex w-[40%] mb-2'>
                  <div className='w-1/3 text-breta-dark-gray text-[10px] text-center'>
                      Rol
                  </div>
                  <div className='w-1/3 text-breta-dark-gray text-[10px] text-center'>
                      Cantidad de empleados con este rol
                  </div>
                  <div className='w-1/3 ml-10'>
                      <Icons.Print />
                  </div>
                </div>
                {props.roles.map((item: any, index: number) => {
                  return (
                    <div className='flex w-[40%]' key={index}>
                      <div className='w-1/3 text-breta-dark-blue text-[14px] text-center'>
                        {item.role_name}
                      </div>
                      <div className='w-1/3 text-breta-dark-blue text-[14px] text-center'>
                        2
                      </div>
                      <div className='relative w-1/3 left-8 cursor-pointer'>
                        <Icons.Options />
                      </div>
                      <hr className="relative border-breta-light-gray top-6 sm:top-7 border-[1px] margin-2 mb-8 mr-[1rem] ml-[1rem]"/>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>
    </>
    )
  };