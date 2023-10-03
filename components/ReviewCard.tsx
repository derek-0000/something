import Rating from "./Rating";
const IconPack = require("../public/icons/Icons");
const Icons = new IconPack();

export default function ReviewsCard(props: {
    score: string;
    comment: string;
}) {
    const score = parseInt(props.score, 10);
    
    return (
        <>
            <div>
                <div className="relative w-[90%]  flex gap-4 rounded-lg ml-[1rem] mr-[4rem] grid grid-cols-1 gap-4 top-1">
                        <div className="flex gap-4 ml-[1rem]">
                            <div className="w-[30px] h-[30px] rounded-full overflow-hidden">
                                <img src="https://res.cloudinary.com/djwbr4c3k/image/upload/v1690534573/ontcbe9gw5hibyncm50x.jpg"/>
                            </div>
                            <div className="text-[12px] text-breta-dark-gray mt-1">
                                Daniel Reyes
                            </div>
                        </div>
                        <div className=" flex text-breta-dark-gray text-[12px] sm:text-[14px] ml-[1rem] mr-[6rem]">
                            <Rating ratings={score}/> 
                        </div>
                        <div className="relative text-breta-dark-gray text-[12px] sm:text-[14px] ml-[1rem] mr-[2rem] mt-[-.5rem]">
                            {props.comment}
                        </div>
                        <hr className="relative border-breta-light-gray  mt-[-.5rem] sm:top-7 border-[1px] mr-[1rem] ml-[1rem]"/>
                    </div>
            </div>
        </>
    )
}