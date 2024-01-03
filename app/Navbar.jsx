"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import HamburgerMenu from "./components/HamburgerMenu";
const Navbar = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <nav className="fixed z-10 top-0 bg-gray-50 text-gray-800 w-full p-4 grid grid-cols-3 items-center">
      <Link href="/" className={`text-center`}>
        NEXTJS-AI-TEST
      </Link>
      {isClient && <HamburgerMenu />}{" "}
      <p className={`text-center`}>WEEKNIGHTS + WEEKENDS</p>
      <div className="hidden">
        <Link href="/">Home 🏡 </Link>
        <Link href="/pdf">PDF-GPT 👨🏻‍🏫</Link>
        <Link href="/memory">Memory 🧠</Link>
        <Link href="/streaming">Streaming 🌊</Link>
        <Link href="/transcript-qa">YouTube Video Chat 💬</Link>
        <Link href="/content-generator">AI Content Wizard 🧙🏼</Link>
        <Link href="/resume-reader">RoboHR 🤖</Link>
      </div>
    </nav>
  );
};

export default Navbar;
