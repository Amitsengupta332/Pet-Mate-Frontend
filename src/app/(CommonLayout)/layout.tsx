import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import React from "react";

const CommonLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="container mx-auto px-4">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};

export default CommonLayout;
