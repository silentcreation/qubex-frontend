"use client";

import React from "react";
import { useT } from "@/hooks/useT";

const AboutUs: React.FC = () => {
  const t = useT();

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">About Us</h1>
      <p>
        Learn more about our mission, vision, and the team behind Qubex. We are dedicated to providing innovative solutions for digital asset trading and cross-chain bridging. [Insert detailed information about your company here.]
      </p>
    </div>
  );
};

export default AboutUs;
