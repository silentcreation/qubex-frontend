"use client";

import React, { useEffect, useState } from "react";
import { useT } from "@/hooks/useT";
import { getTradeDetail, TradeDetail } from "@/api/qx"; // Stelle sicher, dass diese API-Funktion existiert
import { formatNumber } from "@/utils/numberFormatter";

interface PageProps {
  params: {
    locale: string;
    transactionHash: string;
  };
}

const QXTradeDetailPage: React.FC<PageProps> = ({ params }) => {
  const { locale, transactionHash } = params;
  const t = useT();
  const [trade, setTrade] = useState<TradeDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchTradeDetail() {
      try {
        const data = await getTradeDetail(transactionHash);
        setTrade(data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchTradeDetail();
  }, [transactionHash]);

  if (isLoading) {
    return (
      <div className="container mx-auto py-4">
        <h1 className="text-2xl font-bold mb-4">{t("qx.trade.detail") || "Trade Detail"}</h1>
        <p>{t("global.loading")}</p>
      </div>
    );
  }

  if (error || !trade) {
    return (
      <div className="container mx-auto py-4">
        <h1 className="text-2xl font-bold mb-4">{t("qx.trade.detail") || "Trade Detail"}</h1>
        <p>{t("global.error-loading")}</p>
      </div>
    );
  }

  const side = trade.bid
    ? (t("qx.trade.buy") || "Kaufen")
    : (t("qx.trade.sell") || "Verkaufen");
  const total = trade.price * trade.numberOfShares;
  const formattedPrice = formatNumber(trade.price);
  const formattedTotal = formatNumber(total);
  const formattedShares = formatNumber(trade.numberOfShares);
  const date = new Date(trade.tickTime).toLocaleString();

  return (
    <div className="container mx-auto py-4">
      <h1 className="text-2xl font-bold mb-4">{t("qx.trade.detail") || "Trade Detail"}</h1>
      <div className="p-4 border rounded">
        <p>
          <strong>{t("qx.trade.asset") || "Vermögenswert"}:</strong> {trade.assetName}
        </p>
        <p>
          <strong>{t("qx.trade.side") || "Seite"}:</strong> {side}
        </p>
        <p>
          <strong>{t("qx.trade.price") || "Preis (QUBIC)"}:</strong> {formattedPrice}
        </p>
        <p>
          <strong>{t("qx.trade.amount") || "Betrag"}:</strong> {formattedShares}
        </p>
        <p>
          <strong>{t("qx.trade.total") || "Gesamt (QUBIC)"}:</strong> {formattedTotal}
        </p>
        <p>
          <strong>{t("qx.trade.hash") || "Hash"}:</strong> {trade.transactionHash}
        </p>
        <p>
          <strong>{t("qx.trade.taker") || "Taker"}:</strong> {trade.taker}
        </p>
        <p>
          <strong>{t("qx.trade.maker") || "Maker"}:</strong> {trade.maker}
        </p>
        <p>
          <strong>{t("qx.trade.datetime") || "Datum & Uhrzeit"}:</strong> {date}
        </p>
      </div>
    </div>
  );
};

export default QXTradeDetailPage;
