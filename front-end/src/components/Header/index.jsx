import logoUnifor from "../../assets/logo-unifor.svg";

function Header() {
  return (
    <div className="bg-blue-800 rounded-b-xl px-[4rem] py-[1rem] flex flex-row justify-between">
      <div>
        <img className="w-[2.5rem]" src={logoUnifor} alt="Logo Unifor" />
      </div>
      <div className="flex flex-row justify-center gap-2">
        <div className="flex items-center justify-center bg-white rounded-full w-10 h-10">
          <i className="pi pi-user text-black text-lg" />
        </div>
        <div className="flex flex-col justify-center">
          <i className="pi pi-angle-down text-white"></i>
        </div>
      </div>
    </div>
  );
}

export default Header;
