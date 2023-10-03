import { useState, useEffect } from 'react';
import OpenStateTag from "./OpenStateTag";
const IconPack = require("../public/icons/Icons");
const Icons = new IconPack();

export default function ScheduleList(props: { schedule: any }) {
  const today = new Date().getDay();
  let state = "";
  let scheduleCombined: { [x: string]: any; }[] = [];

  const getCurrentTime = () => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    return `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
  };

  const isOpenNow = (openingHours: string) => {
    if (openingHours === 'Cerrado') {
      return false;
    }
    const currentTime = getCurrentTime();
    const [open, close] = openingHours.split(' a ');
    return currentTime >= open && currentTime <= close;
  };

  const overallStatus = () => {
    for (const daySchedule of scheduleCombined) {
      const openingHours = Object.values(daySchedule)[0];
      if (isOpenNow(openingHours)) {
        return 'Abierto';
      }
    }
    return 'Cerrado';
  };

  const schedulePropio = [
    { Lunes: ' ' },
    { Martes: ' ' },
    { Miercoles: ' ' },
    { Jueves: ' ' },
    { Viernes: ' ' },
    { Sabado: ' ' },
    { Domingo: ' ' }
  ];

  function combinarHorarios(arrFetch: any[], arrPropio: any[]) {
    const resultado: { [x: string]: any; }[] = [];
  

    arrPropio.forEach((diaPropio) => {
      const diaSemana = Object.keys(diaPropio)[0];
      const horarioFetch = arrFetch.find((day) => diaSemana in day);
      const horarioCombinado = horarioFetch ? horarioFetch[diaSemana] : "Cerrado";
      const diaCombinado = { [diaSemana]: horarioCombinado };
      resultado.push(diaCombinado);
    });
  
    return resultado;
  }
  if ( props.schedule != null) {
    const combine = combinarHorarios( props.schedule, schedulePropio)
    scheduleCombined = combine
  }
    return (
      <>
        {props.schedule != null ? (
          <div className="">
            
          <div className="flex justify-start gap-4 ml-5 mt-5">
              <div>
                  <Icons.ScheduleBig />
              </div>
              <div className="text-breta-dark-blue font-bold text-[18px]">
                  Horarios: 
              </div>
              <div>
                  <OpenStateTag state={overallStatus()} />
              </div>
          </div>
          <hr className="relative border-breta-light-gray top-6 sm:top-7 border-[1px] margin-2 mb-8 mr-[1rem] ml-[1rem]"/>
          <div className="">
          <div>
            <ul className="">
            {scheduleCombined.map((item: any, index: number) => {
                const day = Object.keys(item)[0]; 
                const time = item[day];
                return (
                    <li key={index} className={`grid grid-cols-2 text-breta-blue ${index === today - 1 ?  'font-bold' : null }`}>
                      <span className="ml-[4rem]">{day} </span>
                      <span>{time}</span>
                    </li>
              );
            })}
            </ul>
          </div>
          </div>
          <hr className="relative border-breta-light-gray top-6 sm:top-7 border-[1px] margin-2 mb-8 mr-[1rem] ml-[1rem]"/>
      </div>
          
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
    );
  }
  