"use client";
import React from "react";
import { usePathname } from "next/navigation";
import { SidebarWithState } from "../components/SidebarWithState";
import { Header } from "../components/Header";

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname.startsWith("/login") || pathname.startsWith("/register") || pathname.startsWith("/auth")) {
    return <>{children}</>;
  }
  return (
    <div className="bg-gradient-to-br from-slate-50 via-white to-blue-50/30 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900/30 flex w-full h-screen">
      <SidebarWithState />
      <div className="flex flex-col flex-1 w-full min-h-0">
        <Header />
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
