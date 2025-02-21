"use client";

import React from "react";
import { useT } from "@/hooks/useT";

const Imprint: React.FC = () => {
  const t = useT();

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">{t("imprint.title")}</h1>
      <h2 className="text-xl font-semibold mb-2">{t("imprint.projectDetailsTitle")}</h2>
      <p className="mb-2">{t("imprint.projectName")}</p>
      <p className="mb-2">{t("imprint.platform")}</p>
      <p className="mb-4">{t("imprint.team")}</p>
      <h2 className="text-xl font-semibold mb-2">{t("imprint.legalNoticeTitle")}</h2>
      <p className="mb-4">{t("imprint.legalNotice")}</p>
      <h2 className="text-xl font-semibold mb-2">{t("imprint.disclaimerTitle")}</h2>
      <p>{t("imprint.disclaimer")}</p>
    </div>
  );
};

export default Imprint;
