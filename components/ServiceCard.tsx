const IconPack = require("../public/icons/Icons");
const Icons = new IconPack();

export default function ServiceCard(props: {
    services: any
}) {
    return (
        <>
            {props.services.map((item: any, index: number) => {
                  const timespanValues = Object.values(item.timespan) as number[];
                  const totalSum = timespanValues.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
                  return (
                    <div key={item.service_name}> 
                        <div className="relative w-[90%] h-[122px] shadow-lg shadow-breta-shadow flex gap-4 rounded-lg ml-[1rem] mr-[4rem] grid grid-cols-1 gap-4 top-4 mt-5">
                            <div className="relative text-breta-dark-blue font-bold text-[12px] sm:text-[14px] ml-[1rem] top-2 inline-block">
                                {item.service_name}
                            </div>
                            <div className="absolute right-2 cursor-pointer">
                                <Icons.AddButton />
                            </div>
                            <div className=" flex text-breta-blue text-[12px] sm:text-[14px] ml-[1rem] mr-[6rem]">
                                {item.description}
                            </div>
                            <div className="absolute bottom-[13px] sm:bottom-[18px] left-4">
                                <Icons.ServiceDuration />
                            </div>
                            <div className="relative text-breta-dark-blue text-[12px] text-[14px] left-10 top-[-0.4rem]">
                                {totalSum}
                            </div>
                        </div>
                    </div>
                  )
                })}
            
        </>
    )
}