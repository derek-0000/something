const IconPack = require("../public/icons/Icons");
const Icons = new IconPack();
export default function ClientRow(props:{
  client:any
}) {
  return (
    <>
    <div key={props.client.name} className="grid grid-cols-6 max-h-16 mb-2 items-center text-center">
      <div className="w-full flex justify-center h-full max-w-12">
        <img className="h-16 rounded-full" src= {props.client.profilePicture} alt="Client Profile Picture" />
      </div>
      <div className="max-w-12">{props.client.name}</div>
      <div className="max-w-12">{props.client.gender}</div>
      <div className="max-w-12">{props.client.cellphone}</div>
      <div className="max-w-12">{props.client.email}</div>
      <div className="w-full flex justify-center ">
      <Icons.ThreeDots/>

      </div>
    </div>
    <hr className="bg-breta-gray text-breta-gray h-[1px] mb-6" />
    </>

  );
}
