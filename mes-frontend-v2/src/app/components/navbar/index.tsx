import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <div className="w-full h-16 bg-gray-800 text-white flex items-center justify-between">
      <div className="page flex items-center gap-16">
        <Link href="/dashboard">Dashboard</Link>
        <Link href="/production-tracking">Production Tracking</Link>
        <Link href="/quality-control">Quality Control</Link>
      </div>
    </div>
  );
};

export default Navbar;
