"use client";
import { useState, useEffect } from "react";
import SalonHeader from "@/components/SalonHeader";
import SalonSidebarNavigation from "@/components/SalonSidebarNavigation";
import Workers from "@/components/Workers";
import { getEmployees } from "@/services/Salons";
import Link from "next/link";
const IconPack = require("../../../public/icons/Icons");
const Icons = new IconPack();

export default function Equipo() {
  const [employees, setEmployees] = useState([]);
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);
  const id = "1";

  useEffect(() => {
    // const token = localStorage.getItem("token");
    // token ? setLoading(false) : routing.push("/");
    const fetchSalon = async () => {
      const request = await getEmployees(id);
      setEmployees(request.data.salon.employee);
      setRoles(request.data.salon.roles);
    };
    fetchSalon();
    if (roles != null && employees != null) {
      setLoading(false);
    }
  }, []);

  return (
    <>
      {loading ? (
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
      ) : (
        <>
          {roles.length > 0 && employees.length > 0 ? (
            <div className="w-full h-full flex-1">
              <Workers roles={roles} employees={employees} />
            </div>
          ) : (
            <>
              <div className="h-full flex justify-center items-center gap-4">
                Este salon no tinene ningun empleado
                <Link href={"/Salon/Equipo/AddWorker"}>
                  <button className="flex w-[230px] gap-4 rounded-lg bg-breta-blue text-white font-bold py-2 px-4">
                    <Icons.New />
                    Nuevo Colaborador
                  </button>
                </Link>
                <Link href={"/Salon/Equipo/AddRole"}>
                  <button className="flex w-[200px] ml-5 gap-4 rounded-lg bg-breta-blue text-white font-bold py-2 px-4">
                    <div className="ml-5">
                      <Icons.New />
                    </div>
                    <div>Nuevo Rol</div>
                  </button>
                </Link>
              </div>
            </>
          )}
        </>
      )}
    </>
  );
}
