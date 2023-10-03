import { SalonData } from "./SalonCustomization";
import SalonCard from "./SalonCard";
export default function SalonList(props: { salonList: any }) {
  console.log(props.salonList)
  const setGrade = (ratings:any) =>{
    if(ratings.length == 0){
      return 0
    }else{
      let totalSum = 0
      ratings.forEach((item:any)=>{
        totalSum = totalSum + item.score
      })
      return Math.round((totalSum / ratings.length)*10)/10
    }
  }
  return (
    <>
      {props.salonList.salons != null ? (
        <div>
          {props.salonList.salons.map((salon: any, index: number) => {
            return (
              <div className="mb-4" key={index}>
                <SalonCard
                  salon_id={salon.salon_id}
                  title={salon.salon_name}
                  address={salon.address != null ? salon.address.street + " #"+salon.address.interior_number : ""}
                  grade={setGrade(salon.ratings)}
                  openState={salon.openState}
                  image={salon.main_picture}
                />
              </div>
            );
          })}
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
