import { LoginForm } from "@/components/modules/Auth/login/LoginForm";
import React from "react";

export default function page() {
  return (
    <div className="container mx-auto px-4">
      <div className="min-h-[80vh] flex items-center justify-center">
        <LoginForm />
      </div>
    </div>
  );
}
