"use client";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Calendar, momentLocalizer, View, Views } from "react-big-calendar";
import moment from "moment";
const localizer = momentLocalizer(moment);
import { CalendarEventCard } from "@/components/CalendarEventCard";
import { useState, useMemo, useEffect } from "react";
import { getDayApointments } from "@/services/Apointments";
import { getEmployees } from "@/services/Salons";
import CalendarResource from "@/components/CalendarResource";
// import CalendarResource from "@/components/CalendarResource";

export default function Citas() {
  const appointments = [
    {
      status: "accepted", //
      service: "Corte de Cabello",
      appointment_id: 1,
      client: "Ramona Diaz",
      start: {
        fullHour: "2023-08-26T00:18:10.000Z",
      },
      end: {
        fullHour: "2023-08-26T02:18:10.000Z",
      },
      salon: {
        salon_id: "1",
      },
      is_active: false,
      resourceId: 0,
      pay: 200,
    },
  ];
  const date1 = new Date();
  date1.setHours(15, 0, 0, 0);
  const date2 = new Date();
  date2.setHours(17, 0, 0, 0);
  const date3 = new Date();
  date3.setHours(11, 0, 0, 0);
  const date4 = new Date();
  date4.setHours(14, 0, 0, 0);

  const apointmentsss = [
    {
      appointment_id: 1,
      service: "Corte de Cabello",
      client: "Ramona Diaz",
      pay: 200,
      id: 1,
      start: date1,
      end: date2,
      resourceId: [1],
      is_active: true,
      status: "pending",
    },
    {
      appointment_id: 2,
      service: "Uñas - Shelak",
      client: "Daniela Martinez",
      pay: 200,
      id: 1,
      start: date3,
      end: date4,
      resourceId: [0],
      is_active: true,
      status: "pending",
    },
  ];
  const employees = [
    {
      resourceId: 0,
      resourceTitle: "Empleado 1",
    },
    {
      resourceId: 1,
      resourceTitle: "Empleado 2",
    },
  ];

  useEffect(() => {
    /*
    const fetchEmployees = async() =>{
      const employees = await getEmployees("1")
      setEmployees(employees.data.salon.employee.map((employee:any, index:number)=>{
        let calendarResource = {
          resourceId: employee.employee_id, resourceTitle: employee.employee_name
        }
        return calendarResource;
      }))
    } 
    fetchEmployees()

    const fetchAppointments = async() =>{
      const date = new Date()
      const startDate:string = `${date.getUTCFullYear()}-${date.getUTCMonth() + 1 > 10 ? date.getUTCMonth() + 1 : `0${date.getUTCMonth() + 1}`}-${date.getUTCDate() > 10 ? date.getUTCDate()  : `0${date.getUTCDate() }`}`
      const endDate:string = `${date.getUTCFullYear()}-${date.getUTCMonth() + 1 > 10 ? date.getUTCMonth() + 1 : `0${date.getUTCMonth() + 1}`}-${date.getUTCDate()+1 > 10 ? date.getUTCDate()+1 : `0${date.getUTCDate() +1}`}`
      const dayAppointments = await getDayApointments(startDate, endDate)
      setApointments(dayAppointments.map((dayAppointment:any)=>{
        let formatedAppointments = {
          appointment_id:dayAppointment.appointment_id,
          service: dayAppointment.service,
          client: dayAppointment.client,
          pay:  dayAppointment.pay,
          id: dayAppointment.id,
          start: new Date(dayAppointment.start),
          end: new Date(dayAppointment.end),
          resourceId: dayAppointment.services.map((service:any)=>{
            return Number(service.service_id)
          }),
          is_active:dayAppointment.is_active,
          status:dayAppointment.status
        }
        return formatedAppointments
      }))
    }
    fetchAppointments()*/
  }, []);

  const { defaultDate, views } = useMemo(
    () => ({
      defaultDate: new Date().setHours(0, 0, 0, 0),
      views: [Views.DAY, Views.WORK_WEEK],
    }),
    []
  );
  const customEventStyleGetter = () => {
    const style = {
      backgroundColor: "transparent", // Custom background color for events
      color: "black", // Custom background color for events
      border: "none", // Remove event border
      overflow: "visible",
      width: "100%",
    };

    return { style };
  };
  const handleNavigate = async (date: any) => {
    // const startDate:string = `${date.getUTCFullYear()}-${date.getUTCMonth() + 1 > 10 ? date.getUTCMonth() + 1 : `0${date.getUTCMonth() + 1}`}-${date.getUTCDate()-1 > 10 ? date.getUTCDate()-1  : `0${date.getUTCDate()-1 }`}`
    // const endDate:string = `${date.getUTCFullYear()}-${date.getUTCMonth() + 1 > 10 ? date.getUTCMonth() + 1 : `0${date.getUTCMonth() + 1}`}-${date.getUTCDate() > 10 ? date.getUTCDate() : `0${date.getUTCDate() }`}`
    // try{
    //   const apointments = await getDayApointments(startDate,endDate)
    //   setApointments(apointments)
    // }catch(err){
    //   console.log(err)
    // }
  };
  const components = {
    event: CalendarEventCard,
    resourceHeader: CalendarResource,
  };

  return (
    <>
      <div className="p-6">
        <Calendar
          eventPropGetter={customEventStyleGetter}
          components={components}
          defaultView={Views.DAY}
          events={apointmentsss}
          localizer={localizer}
          resourceIdAccessor="resourceId"
          resourceTitleAccessor="resourceTitle"
          resources={employees}
          step={20}
          min={new Date(0, 0, 0, 10, 0, 0)}
          max={new Date(0, 0, 0, 22, 0, 0)}
          views={views}
          // onNavigate={handleNavigate}
        />
      </div>
    </>
  );
}
