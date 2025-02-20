"use client";

import React from "react";
import { useT } from "@/hooks/useT";

const Support: React.FC = () => {
  const t = useT();
  const supportUrl = process.env.NEXT_PUBLIC_SUPPORT_URL;

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">{t("support.title") || "Support"}</h1>
      <p className="mb-4">
        {t("support.description") || "If you need assistance, please visit our support page."}
      </p>
      <a
        href={supportUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 underline"
      >
        {t("support.linkText")}
      </a>
    </div>
  );
};

export default Support;
