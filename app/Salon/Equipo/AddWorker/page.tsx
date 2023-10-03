"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import SalonHeader from "@/components/SalonHeader";
import { SendLogo } from "@/services/Images";
import { getEmployees } from "@/services/Salons";
const IconPack = require("../../../../public/icons/Icons");
const Icons = new IconPack();

interface Roles {
  role_name: string;
}

export default function AddWorker() {
  //const salonId = localStorage.getItem("salon_id") as string;
  const salonId = "1";
  const [roles, setRoles] = useState<Roles[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [profile_picture, setProfile_picture] = useState<File | null>(null);
  const [employee_name, setEmployee_name] = useState<string>("");
  const [cellphone, setCellphone] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [commission, setCommision] = useState<string>("");
  const [paymentCycle, setPaymentCycle] = useState<string>("");
  const [payday, setPayday] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const router = useRouter();

  const headers = {
    "content-type": "application/json",
  };

  useEffect(() => {
    const fetchSalon = async () => {
      const request = await getEmployees(salonId);
      setRoles(request.data.salon.roles);
    };
    fetchSalon();
    console.log(roles);
    if (roles != null) {
      setLoading(false);
    }
  }, []);

  const handlePaymentCycleChange = (e: any) => {
    const newPaymentCycle = e.target.value;
    setPaymentCycle(newPaymentCycle);
  };

  const handleRoleChange = (e: any) => {
    const newRole = e.target.value;
    setRole(newRole);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const selectedImage = event.target.files[0];
      setProfile_picture(selectedImage);
    }
  };

  const createEmployee = async (
    profile_picture: any,
    employee_name: string,
    cellphone: string,
    email: string,
    commission: string,
    paymentCycle: string,
    payday: string,
    role: string
  ) => {
    const URL: string = "https://breta-back-end.onrender.com/graphql";
    const imageUrl = await SendLogo(profile_picture);
    const graphqlQuerry: string = `mutation{
            createEmployee(
                salon_id: ${salonId}
                role_name: "${role}"
                createEmployeeInput: {
                    profile_picture: "${imageUrl}"
                    employee_name: "${employee_name}"
                    cellphone: "${cellphone}"
                    email: "${email}"
                    commission: "${commission}"
                    paymentCycle: "${paymentCycle}"
                    payday: "${payday}"
            }){
              employee_id
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
      console.log(data);
      const result = data.data;
      if (result != null) {
        router.push("/Salon/Equipo");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {loading == true ? (
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
          <div className="w-full h-[6%] bg-breta-light-gray border-b-2 border-breta-gray">
            <div className="float-right mr-5 mt-3">
              <Link href={"/Salon/Equipo"}>
                <Icons.QuitBig />
              </Link>
            </div>
          </div>
          <div>
            <div className="flex flex-col items-center justify-center">
              <div className="w-[30%] text-[20px] text-breta-blue font-bold mt-4 mb-2">
                Colaborador
              </div>
              <div className="w-[30%] shadow-lg shadow-breta-shadow rounded-lg ">
                <div className="text-[14px] text-center text-breta-blue font-bold mt-5 mb-2">
                  Asigna una fotografia
                </div>
                <div className="flex items-center justify-center mb-4">
                  <label className="flex flex-col relative w-64 h-64 aspect-w-1 aspect-h-1 text-breta-blue text-sm font-semibold leading-6 cursor-pointer border-2 border-breta-gray border-dashed rounded-full">
                    <div className=" overflow-hidden w-full h-full bg-breta-light-gray flex items-center justify-center rounded-full">
                      <Icons.AddImage />
                    </div>
                    <input
                      className="hidden"
                      name="ProfilePictureUpload"
                      type="file"
                      onChange={(e) => handleImageChange(e)}
                    />
                  </label>
                </div>
                <div className="text-[14px] text-breta-blue font-bold mt-5 mb-2 ml-7">
                  Nombre del colaborador*
                </div>
                <div className="flex items-center justify-center mb-4">
                  <input
                    required
                    onChange={(e) => {
                      setEmployee_name(e.target.value);
                    }}
                    type="text"
                    name="employee_name"
                    className="w-[90%] text-sm ring-1 ring-gray-300 rounded-md p-2 bg-breta-light-gray focus:outline-0 placeholder:text-sm tracking-wider placeholder:text-gray-500 "
                    placeholder="Nombre comercial del proveedor..."
                    value={employee_name}
                  ></input>
                </div>
                <div className="text-[14px] text-breta-blue font-bold mt-5 mb-2 ml-7">
                  Teléfono*
                </div>
                <div className="flex items-center justify-center mb-4">
                  <input
                    required
                    onChange={(e) => {
                      setCellphone(e.target.value);
                    }}
                    type="number"
                    name="service_name"
                    className="w-[90%] text-sm ring-1 ring-gray-300 rounded-md p-2 bg-breta-light-gray focus:outline-0 placeholder:text-sm tracking-wider placeholder:text-gray-500 "
                    placeholder="Numero de celular..."
                    value={cellphone}
                  ></input>
                </div>
                <div className="text-[14px] text-breta-blue font-bold mt-5 mb-2 ml-7">
                  Email
                </div>
                <div className="flex items-center justify-center mb-4">
                  <input
                    required
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    type="email"
                    name="service_name"
                    className="w-[90%] text-sm ring-1 ring-gray-300 rounded-md p-2 bg-breta-light-gray focus:outline-0 placeholder:text-sm tracking-wider placeholder:text-gray-500 "
                    placeholder="Correo electronico..."
                    value={email}
                  ></input>
                </div>
                <div className="flex">
                  <div className="text-[14px] text-breta-blue font-bold mt-5 mb-2 ml-7">
                    Comisiones*
                  </div>
                  <div className="text-[14px] text-breta-blue font-bold mt-5 mb-2 ml-7">
                    Ciclo de pago*
                  </div>
                  <div className=" ml-auto mr-7 text-[14px] text-breta-blue font-bold mt-5 mb-2">
                    Dia de pago*
                  </div>
                </div>
                <div className="flex items-center justify-center gap-4 mb-4">
                  <input
                    required
                    onChange={(e) => {
                      setCommision(e.target.value);
                    }}
                    type="number"
                    name="comision"
                    className="w-1/6 text-sm ring-1 ring-gray-300 rounded-md p-2 bg-breta-light-gray focus:outline-0 placeholder:text-sm tracking-wider placeholder:text-gray-500 "
                    placeholder="%"
                    value={commission}
                  ></input>
                  <select
                    className="w-1/2 text-sm ring-1 ring-gray-300 rounded-md p-2 bg-breta-light-gray focus:outline-0 placeholder:text-sm tracking-wider text-breta-dark-gray"
                    value={paymentCycle}
                    onChange={handlePaymentCycleChange}
                  >
                    <option className="text-breta-dark-gray">
                      Selecciona...
                    </option>
                    <option className="text-breta-dark-gray" value="Semanal">
                      Semanal
                    </option>
                    <option className="text-breta-dark-gray" value="Catorcenal">
                      Catorcenal
                    </option>
                    <option className="text-breta-dark-gray" value="Quincenal">
                      Quincenal
                    </option>
                    <option className="text-breta-dark-gray" value="Mensual">
                      Mensual
                    </option>
                  </select>
                  <input
                    required
                    onChange={(e) => {
                      setPayday(e.target.value);
                    }}
                    type="number"
                    name="payday"
                    className="w-1/6 text-sm ring-1 ring-gray-300 rounded-md p-2 bg-breta-light-gray focus:outline-0 placeholder:text-sm tracking-wider placeholder:text-gray-500 "
                    placeholder="%"
                    value={payday}
                  ></input>
                </div>
                <div className="text-[14px] text-breta-blue font-bold mt-5 mb-2 ml-7">
                  Rol*
                </div>
                <div className="flex items-center justify-center mb-4">
                  <select
                    className="w-[90%] text-sm ring-1 ring-gray-300 rounded-md p-2 bg-breta-light-gray focus:outline-0 placeholder:text-sm tracking-wider text-breta-dark-gray"
                    value={role}
                    onChange={handleRoleChange}
                  >
                    <option className="text-breta-dark-gray" value="">
                      Selecciona un rol...
                    </option>
                    {roles.map((item: any, index: number) => {
                      return (
                        <option key={index} value={item.role_name}>
                          {item.role_name}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
              <div className="flex w-[30%] items-center justify-center mt-5 mb-5">
                <button
                  className="w-full h-12 bg-breta-blue rounded-lg text-[20px] text-white"
                  onClick={(e) =>
                    createEmployee(
                      profile_picture,
                      employee_name,
                      cellphone,
                      email,
                      commission,
                      paymentCycle,
                      payday,
                      role
                    )
                  }
                >
                  Registrar nuevo Colaborador
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
