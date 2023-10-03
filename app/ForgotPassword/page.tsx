"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useRef, useState } from "react";
const IconPack = require("../../public/icons/Icons");
const Icons = new IconPack();

export default function ForgotPassword() {
    const [passwordVisibilityRef, setpasswordVisibilityRef] =
    useState<string>("password");
    const passwordField = useRef<string>("");
    const passwordConfirm = useRef<string>("");
    const [errors, setErrors] = useState<string[]>([]);

    //let email = "";
    const router = useSearchParams();
    const routing = useRouter();
    const token = router.get('token');
    const URL: string = " http://localhost:3000/graphql";
    const headers = {
    "content-type": "application/json",
    };

    const passwordVisibilityHandler = () => {
      passwordVisibilityRef == "password"
        ? setpasswordVisibilityRef("text")
        : setpasswordVisibilityRef("password");
    };

    const verifyToken = async ()=> {
        if(token)
        {
          const graphqlQuerry: string = `mutation{
            verifyToken(forgotPasswordTokenInput: {
              token: "${token}"
            }){
              email
            }
          }`;
          const options = {
            method: "POST",
            headers: headers,
            body: JSON.stringify({ query: graphqlQuerry }),
          };
    
          const response = await fetch(URL, options);
          const data = await response.json();
          const result = data.data.verifyToken.email
          return result
        }
      }

      const updatePassword = async (password: string, passwordConfirm: string) => {
        const email = await verifyToken();
        
        if (passwordConfirm == "" || passwordConfirm == "") {
          setErrors([]);
          return setErrors((errors) => [
            ...errors,
            "Porfavor, complete con toda su información",
          ]);
        } else if (password != passwordConfirm) {
          setErrors([]);
          return setErrors((errors) => [...errors, "Las contraseñas no coinciden"]);
        }
          const graphqlQuerry: string = `mutation{
                updatePassword(
                  email: "${email}"
                  updateUserInput:{
                    password: "${password}"
                }){
                    email
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
            if (result != null) {
                routing.push('/')
              }
          } catch (err) {
            console.log(err);
          }
      };

      return (
        <>
          <nav className="absolute items-center px-4 md:px-24 py-4 w-full md:relative md:flex md:justify-between  md:bg-breta-blue z-50">
              <div className="hidden md:block">
               <Icons.MonochromaticLogo/>
              </div>
          </nav>
          <>
          <div className="flex flex-col justify-center items-center h-3/4 ">
          <div className="flex flex-col justify-around gap-2 h-1.5/3 w-1/3 p-4 shadow-lg shadow-breta-blue/40 border-2 border-gray-300 rounded-xl">
            <div>
              <label
                  className="relative block text-sm font-semibold leading-6 text-breta-blue select-none"
                  htmlFor="password"
                  >
                  Nueva contraseña
                <div className="absolute left-3 top-8">
                  <Icons.IconPassword />
                </div>
                <div
                  onClick={() => passwordVisibilityHandler()}
                  className={"absolute right-3 top-9 cursor-pointer"}
                >
                  <Icons.PasswordVisibility />
                </div>
              </label>
              <input
                required
                onChange={(e) =>
                (passwordField.current = e.target.value)
                }
                type={passwordVisibilityRef}
                name="password"
                className="w-full px-10 text-sm ring-1 ring-gray-300 rounded-md p-2 bg-breta-light-gray focus:outline-0 placeholder:text-sm tracking-wider placeholder:text-gray-500"
                placeholder="Mayor a 8 caracteres"
              />
            </div>
            <div>
            <label
              className="relative block text-sm font-semibold leading-6 text-breta-blue select-none"
              htmlFor="passwordConfirm"
              >
                Confirmar Contraseña
              <div className="absolute left-3 top-8">
                <Icons.IconPassword />
              </div>
              <div
                onClick={() => passwordVisibilityHandler()}
                className="absolute right-3 top-9 cursor-pointer"
              >
                <Icons.PasswordVisibility />
              </div>
            </label>
            <input
              onChange={(e) =>
              (passwordConfirm.current = e.target.value)
              }
              type={passwordVisibilityRef}
              name="passwordConfirm"
              className="w-full px-10 text-sm ring-1 ring-gray-300 rounded-md p-2 bg-breta-light-gray focus:outline-0 placeholder:text-sm tracking-wider placeholder:text-gray-500 "
              placeholder="Vuelve a escribir tu contraseña"
              />
            </div>
            <div className="flex flex-col justify-center items-center">
              <button
                type="button"
                onClick={(e) =>
                  updatePassword(
                    passwordField.current,
                    passwordConfirm.current,
                    )}
                className="text-sm py-5 ring-1  tracking-wide font-bold ring-gray-300 bg-breta-blue hover:bg-breta-dark-blue rounded-md px-6 focus:outline-0 placeholder:text-sm text-gray-100">
                  Enviar Contraseña
              </button>
            </div>
          </div>
          </div>          
            </>
        </>
      );

}