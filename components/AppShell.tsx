"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const noSidebar = pathname === "/connexion" || pathname === "/inscription";

  if (noSidebar) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />
      <div className="ml-48">{children}</div>
    </>
  );
}