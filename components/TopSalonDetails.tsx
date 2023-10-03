import { useSearchParams, useRouter } from "next/navigation";
const IconPack = require("../public/icons/Icons");
const Icons = new IconPack();


export default function TopSalonDetails(props: {
    salon_id: string
    title: string;
    }) {
    const router = useRouter();

    const handleBack = () => {
        router.push(`/SalonProfile/?id=${props.salon_id}`);
    };

    return (
        <>
            <div className="flex h-16 w-full gap-10 shadow shadow-lg">
                <div className="flex mt-5 ml-5 cursor-pointer" onClick={handleBack}>
                    <Icons.Back />
                </div>
                <div className="flex mt-5 text-breta-dark-blue text-[18px] font-bold">
                    {props.title}
                </div>
            </div>
        </>
    )
}