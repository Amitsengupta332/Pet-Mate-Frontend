import { RegisterForm } from "@/components/modules/Auth/Register/RegisterForm";
import React from "react";

const RegisterPage = () => {
  return (
    <div className="container mx-auto px-4">
      <div className="min-h-[80vh] flex items-center justify-center">
        <RegisterForm />
      </div>
    </div>
  );
};

export default RegisterPage;
