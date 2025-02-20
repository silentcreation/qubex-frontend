"use client";

import React from "react";
import { useT } from "@/hooks/useT";

const Imprint: React.FC = () => {
  const t = useT();

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">Imprint</h1>
      <p>
        This is the imprint page containing legal information about our company, including address and contact details. [Insert detailed imprint information here.]
      </p>
    </div>
  );
};

export default Imprint;
