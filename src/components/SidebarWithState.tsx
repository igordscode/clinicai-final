"use client";
import { useState } from "react";
import { Sidebar } from "./Sidebar";

export function SidebarWithState() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  return (
    <Sidebar
      isCollapsed={sidebarCollapsed}
      onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
    />
  );
} 