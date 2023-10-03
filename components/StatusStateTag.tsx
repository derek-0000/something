"use client";
export default function StatusStateTag(props: { state: boolean }) {
  switch (props.state) {
    case true:
      return (
        <div className="text-breta-green bg-breta-green/30 rounded-full px-2 font-bold">
          Activo
        </div>
      );
    case false:
      return (
        <div className="text-breta-red bg-breta-red/30 rounded-full px-2 font-bold">
            De Baja
        </div>
      );
      default:
        return(<></>)
  }
}