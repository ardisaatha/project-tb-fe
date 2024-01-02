import logoUdinus from "../assets/logo-udinus.png";

const Footer = () => {
  return (
    <div className="items-center text-center pt-48 pb-5">
      © Copyright by Team TB
      <div className="flex justify-center items-center mt-3 pl-7">
        <img src={logoUdinus} alt="logo UDINUS" className="w-[70px] h-[70px]" />
        <img src="/logo_dkk.png" alt="logo" className="w-23 h-20" />
      </div>
    </div>
  );
};

export default Footer;
