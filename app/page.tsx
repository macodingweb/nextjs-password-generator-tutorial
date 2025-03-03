"use client";

import { useState } from "react";
import { TbLockPassword } from "react-icons/tb";
import { LuClipboard } from "react-icons/lu";
import { LuClipboardCheck } from "react-icons/lu";

export default function Home() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(4);
  const [copy, setCopy] = useState(false);

  const generatePassword = () => {
    setPassword("");

    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercase = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const symbols = "!@#$%^&*()_+[]{}|;:,.<>?";

    const characters = uppercase + lowercase + numbers + symbols;

    let generatePass = "";

    for (let i = 0; i < length; i++) {
      const randomChar = Math.floor(Math.random() * characters.length);
      generatePass += characters[randomChar];
    }

    setPassword(generatePass);
  }

  const copyPassword = () => {
    if (password) {
      navigator.clipboard.writeText(password);
      setCopy(true);

      setTimeout(() => {
        setCopy(false);
      }, 2000);
    }
  }

  return (
    <div className="wrapper w-[400px] grid p-8 bg-white rounded-xl shadow-md">
      <TbLockPassword size={36} className="text-purple-700 mx-auto mb-3" />
      <div className="title text-center text-xl font-semibold text-purple-700 mb-5">Password Generator</div>
      <div className="form-group grid">
        <label htmlFor="length" className="text-slate-600">Length: <span className="text-black">{length}</span></label>
        <div className="input flex my-2 items-center justify-between p-5 rounded-lg bg-slate-100">
          <span>4</span>
          <input type="range" name="length" id="length" defaultValue={4} onChange={(e) => setLength(Number(e.target.value))} className="w-full mx-2" min={4} max={32} />
          <span>32</span>
        </div>
      </div>
      <button type="button" onClick={generatePassword} className="w-full py-3 bg-slate-900 rounded-lg text-white my-3 cursor-pointer border-solid border-2 border-transparent transition-all hover:bg-transparent hover:text-slate-900 hover:border-slate-900">Generate Password</button>
      <div className="password-area mt-4">
        <div className="password-container relative">
          <div className="w-full p-4 bg-slate-100 rounded-lg text-slate-600 select-none whitespace-nowrap">{ password ? password : "Password is..." }</div>
          <button type="button" onClick={copyPassword} className="absolute top-2/4 -translate-y-2/4 right-0 h-full w-fit px-3 bg-slate-100 rounded-r-lg cursor-pointer transition-all hover:bg-slate-300">
            { copy ? (
              <LuClipboardCheck />
            ) : (
              <LuClipboard />
            ) }
          </button>
        </div>
      </div>
    </div>
  );
}
