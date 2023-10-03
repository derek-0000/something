"use client";
// import { ServiceIcon } from "./ServiceIcon";
// import ConfirmedEvendIcon from "./ConfirmedEvendIcon";
// import CancelIcon from "./CancelIcon";
// import EditIcon from "./EditIcon";
import { Popover } from "@headlessui/react";
import { useState } from "react";
import { usePopper } from "react-popper";
interface event {
  appointment_id: number;
  service: string;
  client: string;
  pay: string;
  id: number;
  start: Date;
  end: Date;
  resourceId: [];
  is_active: string;
  status: string;
}
export const CalendarEventCard = ({ event }: any) => {
  const [referenceElement, setReferenceElement] =
    useState<HTMLButtonElement | null>(null);
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(
    null
  );
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: "right",
    modifiers: [{ name: "offset", options: { offset: [0, 20] } }],
  });

  const dateFormater = () => {
    const events = {
      start: {
        day: event.start.getUTCDate(),
        month: event.start.toLocaleString("default", { month: "long" }),
        year: event.start.getFullYear().toString().substr(-2),
        hour: event.start.getHours(),
        minute:
          event.start.getMinutes() >= 10 || event.start.getMinutes() != 0
            ? event.start.getMinutes()
            : event.start.getMinutes().toString().padStart(2, "0"),
        time: event.start.getHours() >= 12 ? "pm" : "am",
        fullDate: `${event.start.getUTCDate()}/${event.start.toLocaleString(
          "default",
          { month: "long" }
        )}/${event.start.getFullYear().toString().substr(-2)}`,
        fullHour: `${event.start.getHours()}:${
          event.start.getMinutes() >= 10 || event.start.getMinutes() != 0
            ? event.start.getMinutes()
            : event.start.getMinutes().toString().padStart(2, "0")
        }${event.start.getHours() >= 12 ? "pm" : "am"}`,
      },
      end: {
        day: event.end.getUTCDate(),
        month: event.end.toLocaleString("default", { month: "long" }),
        year: event.end.getFullYear().toString().substr(-2),
        hour: event.end.getHours(),
        minute:
          event.end.getMinutes() >= 10 || event.end.getMinutes() != 0
            ? event.end.getMinutes()
            : event.end.getMinutes().toString().padStart(2, "0"),
        time: event.end.getHours() >= 12 ? "pm" : "am",
        fullDate: `${event.end.getUTCDate()}/${event.end.toLocaleString(
          "default",
          { month: "long" }
        )}/${event.end.getFullYear().toString().substr(-2)}`,
        fullHour: `${event.end.getHours()}:${
          event.end.getMinutes() >= 10 || event.end.getMinutes() != 0
            ? event.end.getMinutes()
            : event.end.getMinutes().toString().padStart(2, "0")
        }${event.end.getHours() >= 12 ? "pm" : "am"}`,
      },
    };
    return events;
  };

  return (
    <>
      <Popover className="h-full rounded-lg flex">
        <div
          style={{
            backgroundColor:
              event.status === "accepted" ? "#29CC00" : event.status === "finished" ? "#668393" : "#F9CD45",
          }}
          className="w-2 h-full rounded-l-md z-10"
        ></div>

        <div className="bg-white text-cyan-800 flex flex-col justify-between flex-1 p-2 text-sm">
          <div>
            <div className="flex justify-between text-black">
              <div className="">Tradicional</div>
            </div>
            <div className="flex ">
              {/* <ServiceIcon /> */}
              <div>{event.service}</div>
            </div>
            {event.client}
          </div>
          <div className="flex justify-between">
            <div className=" text-right">${event.pay}</div>
            <Popover.Button
              className="text-cyan-700 border border-cyan-700 rounded-md px-4 hover:bg-gray-200 hover:"
              ref={(ref) => setReferenceElement(ref)}
            >
              Detalles
            </Popover.Button>
          </div>
        </div>
        <Popover.Panel
          ref={(ref) => setPopperElement(ref)}
          style={styles.popper}
          {...attributes.popper}
          className="absolute z-50 min-h-64 min-w-5/6 w-72 rounded-lg shadow-lg"
        >
          <div
            style={{
              backgroundColor:
              event.status === "accepted" ? "#29CC00" : event.status === "finished" ? "#668393" : "#F9CD45",
            }}
            className="flex items-center justify-start gap-4 px-2 w-full text-white h-8 rounded-t-md z-10"
          >
            {/* <ConfirmedEvendIcon />  */}
            {event.status === "accepted" ? "Aceptada" : event.status === "finished" ? "Terminada" : "Pendiente"}
          </div>

          <div className="bg-white text-cyan-800 flex flex-col justify-between flex-1 p-2 rounded-md">
            <div className="w-full">
              <div className="mb-2">
                <div className="font-bold">{event.service}</div>
                <div className="text-xs">
                  {(event.end - event.start) / (1000 * 60 * 60)} horas.
                </div>
              </div>
              <div className="mb-2">
                <div className="font-bold">{event.client}</div>
              </div>
                <div className=" text-left">${event.pay}</div>
            </div>
          </div>
          <div className="px-2 py-1 h-8 flex justify-between bg-gray-100 rounded-b-lg">
            {event.status === "accepted" && (
              <button onClick={()=>{event.status = "finished"}} className="flex items-center justify-center gap-2 text-white px-3 py-1 bg-cyan-700 rounded-md">
                {/* <CancelIcon /> */}
                Terminar
              </button>
            )}
            {event.status === "pending" && (
              <button onClick={()=>{event.status = "accepted"}}className="flex items-center justify-center gap-2 text-white px-3 py-1 bg-cyan-700 rounded-md">
                {/* <CancelIcon /> */}
                Aceptar
              </button>
            )}
          </div>
        </Popover.Panel>
      </Popover>
    </>
  );
};
