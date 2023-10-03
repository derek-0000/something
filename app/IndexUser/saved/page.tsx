const IconPack = require("../../../public/icons/Icons");
const Icons = new IconPack();
export default function Saved() {
  return(
    <div className="w-[100vw] h-[100vh] flex justify-center items-center">
      <Icons.ColoredLogo></Icons.ColoredLogo>
    </div>
  )
};
