"use client";

import React from "react";
import { useT } from "@/hooks/useT";

const PrivacyPolicy: React.FC = () => {
  const t = useT();

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">{t("privacyPolicy.title")}</h1>
      <h2 className="text-xl font-semibold mb-4">{t("privacyPolicy.subtitle")}</h2>
      <p className="mb-4">{t("privacyPolicy.intro")}</p>

      <h3 className="text-lg font-semibold mb-2">{t("privacyPolicy.whatWeCollectTitle")}</h3>
      <p className="mb-2">{t("privacyPolicy.whatWeCollect.userData")}</p>
      <p className="mb-2">{t("privacyPolicy.whatWeCollect.transactionData")}</p>
      <p className="mb-4">{t("privacyPolicy.whatWeCollect.usageData")}</p>

      <h3 className="text-lg font-semibold mb-2">{t("privacyPolicy.howWeUseTitle")}</h3>
      <ul className="list-disc ml-5 mb-4">
        <li>{t("privacyPolicy.howWeUse.0")}</li>
        <li>{t("privacyPolicy.howWeUse.1")}</li>
        <li>{t("privacyPolicy.howWeUse.2")}</li>
      </ul>

      <h3 className="text-lg font-semibold mb-2">{t("privacyPolicy.securityMeasuresTitle")}</h3>
      <p className="mb-4">{t("privacyPolicy.securityMeasures")}</p>

      <h3 className="text-lg font-semibold mb-2">{t("privacyPolicy.yourRightsTitle")}</h3>
      <p>{t("privacyPolicy.yourRights")}</p>
    </div>
  );
};

export default PrivacyPolicy;
