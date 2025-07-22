// src/components/AuthFormBase.tsx
import React from "react";
import { Card } from "./ui/card";

interface AuthFormBaseProps {
  title: React.ReactNode;
  children: React.ReactNode;
}

export default function AuthFormBase({ title, children }: AuthFormBaseProps) {
  return (
    <Card className="max-w-md mx-auto mt-10 p-6">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold">{title}</h1>
      </div>
      {children}
    </Card>
  );
}