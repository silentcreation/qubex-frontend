"use client";

import React from "react";
import { useT } from "@/hooks/useT";

const TermsAndConditions: React.FC = () => {
  const t = useT();

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">Terms & Conditions</h1>
      <p>
        These Terms & Conditions govern your use of our website and services. Please read them carefully. [Insert detailed terms and conditions content here.]
      </p>
    </div>
  );
};

export default TermsAndConditions;
