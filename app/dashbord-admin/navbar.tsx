"use client";

import { Moon, Languages, Bell } from "lucide-react";

export default function Header() {
  return (
    <header className="h-16 bg-white border-b flex items-center justify-between px-8" style={{marginBottom:"30px"}}  >

      <div className="flex items-center gap-6" style={{margin:"1px 50px"}}>
        <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold"  style={{margin:"50px"}}>
          A
        </div>

        <div>
          <h3 className="font-semibold">Horas</h3>
          <p className="text-sm text-gray-500">Admin</p>
        </div>

      </div>

      <div className="flex items-center gap-4">
        <Bell />

        <div className="text-right">
          <h2 className="font-bold text-2xl">لوحة التحكم</h2>
          <p className="text-gray-500">مرحباً بك</p>
        </div>
      </div>

    </header>
  );
}