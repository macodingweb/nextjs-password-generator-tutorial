// Subscribe & Like

"use client";

import { TbPasswordUser } from "react-icons/tb";
import { LuCopy } from "react-icons/lu";
import { LuCopyCheck } from "react-icons/lu";
import { useState } from "react";

export default function Home() {
  const [length, setLength] = useState(4);
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);

  const generatePassword = () => {
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercase = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const symbols = "!@#$%^&*()-_=+{}[]|:;<>.,/?";

    const characters = uppercase + lowercase + numbers + symbols;

    let generatedPass = "";

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      generatedPass += characters[randomIndex];
    }

    setPassword(generatedPass);
  }

  const handleCopy = () => {
    if (password) {
      navigator.clipboard.writeText(password);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    }
  }

  return (
    <>
      <div className="wrapper w-[400px] p-6 bg-white rounded-xl shadow-lg">
        <div className="icon">
          <TbPasswordUser size={36} className="text-purple-700 mx-auto mb-2" />
        </div>
        <div className="title text-center text-[20px] font-semibold text-purple-700 mb-4">Password Generator</div>
        <div className="form-group grid w-full p-3 bg-slate-100 rounded-lg">
          <label htmlFor="length" className="length mb-2 text-slate-600">
            Length : 
            <span className="ml-1 text-black">{length}</span>
          </label>
          <div className="form-input p-3 bg-slate-200 rounded-lg flex items-center justify-between">
            <span>4</span>
            <input type="range" onChange={(e) => setLength(Number(e.target.value))} id="length" className="w-full mx-3" min={4} max={32} defaultValue={4} />
            <span>32</span>
          </div>
        </div>
        <button type="button" onClick={generatePassword} className="p-4 bg-slate-900 cursor-pointer transition-all border-solid border-2 border-transparent hover:text-slate-900 hover:bg-transparent hover:border-slate-900 text-white w-full my-4 rounded-lg">Generate Password</button>
        <div className="password-container relative w-full">
          <div className="password h-[50px] whitespace-nowrap leading-[50px] select-none text-slate-600 px-4 w-full rounded-lg bg-slate-100">{ password ? password : "Password is..." }</div>
          <button type="button" onClick={handleCopy} className="absolute px-4 rounded-r-lg bg-slate-100 cursor-pointer transition-all h-full hover:bg-slate-300 top-2/4 -translate-y-2/4 right-0">
            { copied ? (
              <LuCopyCheck />
            ) : (
              <LuCopy />
            ) }
          </button>
        </div>
      </div>
    </>
  );
}
