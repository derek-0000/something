"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import "swiper/css";


export default function SalonCarousel( props: {image_gallery: any}) {
      
    const pagination = {
        horizontalClass: "swiper-pagination-salonCarousel",
        clickable: true,
        bulletClass: 'swiper-pagination-bullet-salonCarousel',
        bulletActiveClass: 'swiper-pagination-bullet-active-salonCarousel',
        renderBullet: function (index: any, className: any) {
          return `<span class=" ${className}"></span>`;
        },
      };

    return (
        <>
        {props.image_gallery != null ? (
        <div className="relative w-full h-full">
        <Swiper
                modules={[Pagination]}
                pagination={pagination}
                direction="horizontal"
                loop={true}
                className=" w-full h-full"
                >
                    <SwiperSlide className={`relative h-full w-full`}>
                      <img  src={props.image_gallery[0]}/>
                    </SwiperSlide>
                    <SwiperSlide className={`relative h-full w-full`}>
                      <img  src={props.image_gallery[1]}/>
                    </SwiperSlide>
                    <SwiperSlide className={`relative h-full w-full`}>
                      <img  src={props.image_gallery[2]}/>
                    </SwiperSlide>
                    <SwiperSlide className={`relative h-full w-full`}>
                      <img  src={props.image_gallery[3]}/>
                    </SwiperSlide>
                    <SwiperSlide className={`relative h-full w-full`}>
                      <img  src={props.image_gallery[4]}/>
                    </SwiperSlide>
                    <SwiperSlide className={`relative h-full w-full`}>
                      <img  src={props.image_gallery[5]}/>
                    </SwiperSlide>
                    <SwiperSlide className={`relative h-full w-full`}>
                      <img  src={props.image_gallery[6]}/>
                    </SwiperSlide>
                    <SwiperSlide className={`relative h-full w-full`}>
                      <img  src={props.image_gallery[7]}/>
                    </SwiperSlide>
                    <SwiperSlide className={`relative h-full w-full`}>
                      <img  src={props.image_gallery[8]}/>
                    </SwiperSlide>
                </Swiper>
        </div>
        ): (
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