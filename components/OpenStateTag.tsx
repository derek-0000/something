"use client";
export default function OpenStateTag(props: { state: string }) {
  switch (props.state) {
    case "Abierto":
      return (
        <div className="text-breta-green bg-breta-green/30 rounded-full px-2 font-bold">
          {props.state}
        </div>
      );
    case "Por Cerrar":
      return (
        <div className="text-breta-yellow bg-breta-yellow/30 rounded-full px-2 font-bold">
          {props.state}
        </div>
      );
    case "Cerrado":
      return (
        <div className="text-breta-gray bg-breta-gray/30 rounded-full px-2 font-bold">
          {props.state}
        </div>
      );
      default:
        return(<></>)
  }
}
