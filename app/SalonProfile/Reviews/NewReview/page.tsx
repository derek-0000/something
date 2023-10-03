"use client";
import { useSearchParams } from "next/navigation";
import { useRef, useState } from "react";
import Link from "next/link";
const IconPack = require("../../../../public/icons/Icons");
const Icons = new IconPack();

export default function NewReview() {
    const url = "http://localhost:3000/graphql";
    const router = useSearchParams();
    const id = router.get('id') as string;
    const [errors, setErrors] = useState<string[]>([]);

    const headers = {
        "content-type": "application/json",
      };

    const sendReview = async (score: number, comment: string)=> {
        if (comment == "" || score == null) {
            setErrors([]);
            setErrors((errors) => [...errors, "Porfavor llene todos los campos"]);
          }
          else {
              const graphqlQuerry: string = `mutation{
                  createRating(
                      user_id: "7533db32-23fb-4e94-a379-cfc6d851a7ca",
                      salon_id: "${id}",
                      createRatingInput: {
                          score: ${score}
                          comment: "${comment}"
                        }){
                            rating_id
                        }
                    }`;
                    const options = {
                        method: "POST",
                        headers: headers,
                        body: JSON.stringify({ query: graphqlQuerry }),
                    };
                    try {
                        const response = await fetch(url, options);
                        const data = await response.json();
                        console.log(data)
                    }
                    catch (err) {
                        console.log(err);
                    }
            }
        }
    return (
        <>
            <div>
                <div className="flex h-12 w-full gap-10 shadow shadow-lg">
                    <div className="flex mt-5 ml-5 cursor-pointer">
                        <Link
                            href={`/SalonProfile/Reviews/?id=${id}`}
                            className="" >
                            <Icons.Quit />
                        </Link>
                    </div>
                    <div className="text-[16px] text-breta-dark-gray font-bold ml-auto mt-3 mr-4">
                        Enviar
                    </div>
            </div>
                <div className="flex gap-4 ml-4 mt-4">
                    <div className="w-[40px] h-[40px] rounded-full overflow-hidden">
                        <img src="https://res.cloudinary.com/djwbr4c3k/image/upload/v1690534573/ontcbe9gw5hibyncm50x.jpg"/>
                    </div>
                    <div className="text-[16px] text-breta-dark-gray font-bold mt-1">
                        Daniel Reyes
                    </div>
                </div>
                <div className="text-[14px] text-breta-dark-gray ml-[4.5rem] mt-[-.5rem]">
                    Las reseñas son publicas y incluyen la informacion de tu cuenta
                </div>
                <div className="flex items-center justify-center mt-5">
                  <Icons.StarRating />
                  <Icons.StarRating />
                  <Icons.StarRating />
                  <Icons.StarRating />
                  <Icons.StarRating />
                </div>
                <div className='flex items-center justify-center mt-5'>
                        <input
                          required
                          type="text"
                          name="service_name"
                          className="w-[90%] h-32 text-sm ring-1 ring-gray-300 rounded-md p-2 bg-breta-light-gray focus:outline-0 placeholder:text-sm tracking-wider placeholder:text-breta-dark-gray placeholder-top"
                          placeholder="Redacta tu reseña aqui"
                          ></input>
                    </div>
            </div>
        </>
    )
}