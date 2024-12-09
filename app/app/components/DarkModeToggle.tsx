"use client";
import { useState } from "react";
import Image from "next/image";
import sunDark from "../../public/sunDark.svg";
import moonLight from "../../public/moonLight.svg";

export default function DarkModeToggle() {
  const [theme, setTheme] = useState(false);

  return (
    <div
      className={`flex items-center justify-center relative overflow-hidden w-fit h-fit rounded-full px-[0.2rem] py-[0.1rem] transition-colors duration-300 ${
        theme
          ? "bg-[#07a776] shadow-inner shadow-[#707070]"
          : "bg-[#707070] shadow-inner shadow-[#000000]"
      }`}
      onClick={() => setTheme(!theme)}
    >
      <div
        className={`absolute size-[1.15rem] rounded-full transition-all duration-300 shadow-lg shadow-[#000000] bg-[#efefef] ${
          theme ? "translate-x-[0.6rem]" : "-translate-x-[0.6rem]"
        }`}
      ></div>
      <Image src={sunDark} alt="" className="w-[1.1rem]"></Image>
      <Image src={moonLight} alt="" className="w-[1.1rem]"></Image>
    </div>
  );
}
