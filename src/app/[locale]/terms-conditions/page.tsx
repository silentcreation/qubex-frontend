"use client";

import React from "react";
import { useT } from "@/hooks/useT";

const TermsAndConditions: React.FC = () => {
  const t = useT();

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">{t("terms.title")}</h1>
      <h2 className="text-xl font-semibold mb-4">{t("terms.subtitle")}</h2>
      <p className="mb-4">{t("terms.intro")}</p>

      <h3 className="text-lg font-semibold mb-2">{t("terms.usingQubexTitle")}</h3>
      <p className="mb-2">{t("terms.usingQubex.access")}</p>
      <p className="mb-2">{t("terms.usingQubex.responsibilities")}</p>
      <p className="mb-4">{t("terms.usingQubex.risk")}</p>

      <h3 className="text-lg font-semibold mb-2">{t("terms.tradingTitle")}</h3>
      <p className="mb-2">{t("terms.trading.pairs")}</p>
      <p className="mb-2">{t("terms.trading.fee")}</p>
      <ul className="list-disc ml-5 mb-2">
        <li>{t("terms.trading.feeBreakdown.fund")}</li>
        <li>{t("terms.trading.feeBreakdown.platform")}</li>
        <li>{t("terms.trading.feeBreakdown.liquidity")}</li>
      </ul>
      <p className="mb-4">{t("terms.trading.noGuarantees")}</p>

      <h3 className="text-lg font-semibold mb-2">{t("terms.disputeTitle")}</h3>
      <p className="mb-4">{t("terms.dispute")}</p>

      <h3 className="text-lg font-semibold mb-2">{t("terms.modificationsTitle")}</h3>
      <p>{t("terms.modifications")}</p>
    </div>
  );
};

export default TermsAndConditions;
