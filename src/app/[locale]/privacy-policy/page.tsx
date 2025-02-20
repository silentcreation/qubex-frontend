"use client";

import React from "react";
import { useT } from "@/hooks/useT";

const PrivacyPolicy: React.FC = () => {
  const t = useT();

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
      <p>
        This Privacy Policy explains how we collect, use, and protect your personal data. We value your privacy and are committed to safeguarding your information. [Insert detailed policy content here.]
      </p>
    </div>
  );
};

export default PrivacyPolicy;
