const IconPack = require("../public/icons/Icons");
const Icons = new IconPack();
export default function LoginSigninHeader() {
    return(
        <nav className="absolute items-center px-4 md:px-24 py-4 w-full md:relative md:flex md:justify-between  md:bg-breta-blue z-50">
          <div className="hidden md:block">
           <Icons.MonochromaticLogo/>
          </div>
          <div className="visible md:hidden">
           <Icons.ColoredLogo/>
          </div>
        {/* <div className="md:hidden">
          <Icons.ColoredLogo/>
        </div> */}
        <div className="hidden md:visible md:flex gap-8 text-white font-light tracking-wide text-md select-none">
          <div>Conocer Más</div>
          <div>Paquetes</div>
        </div>
      </nav>
    )
};
