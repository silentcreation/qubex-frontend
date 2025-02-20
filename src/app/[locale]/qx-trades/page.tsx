"use client";

import React, { useEffect, useState } from "react";
import { useT } from "@/hooks/useT";
import { getTrades } from "@/api/qx";
import type {
  Asset,
  AssetOrder,
  AveragePrice,
  EntityOrder,
  IssuedAsset,
  Trade,
  Transfer
} from '@/api/qx.types'

import { Link } from "@/i18n/routing";
import { formatNumber } from "@/utils/numberFormatter";

const abbreviate = (str: string, front = 6, back = 4) => {
  if (str.length <= front + back) return str;
  return `${str.slice(0, front)}...${str.slice(-back)}`;
};

const QXTrades: React.FC = () => {
  const t = useT();
  const [data, setData] = useState<Trade[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Funktion zum Abrufen der Trades
  const fetchTrades = async () => {
    try {
      const trades = await getTrades();
      setData(trades);
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTrades();
    const interval = setInterval(fetchTrades, 60000); // alle 60 Sekunden aktualisieren
    return () => clearInterval(interval);
  }, []);

  if (isLoading)
    return (
      <div className="container mx-auto py-4">
        <h1 className="text-2xl font-bold mb-4">{t("qx.trades")}</h1>
        <p>{t("global.loading")}</p>
      </div>
    );

  if (error)
    return (
      <div className="container mx-auto py-4">
        <h1 className="text-2xl font-bold mb-4">{t("qx.trades")}</h1>
        <p>{t("global.error-loading")}</p>
      </div>
    );

  return (
    <div className="container mx-auto py-4">
      <h1 className="text-2xl font-bold mb-6">
        {t("qx.trades") || "Neueste QX-Handel"}
      </h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="px-4 py-2 border text-left">
                {t("qx.trade.asset") || "Vermögenswert"}
              </th>
              <th className="px-4 py-2 border text-left">
                {t("qx.trade.side") || "Seite"}
              </th>
              <th className="px-4 py-2 border text-left">
                {t("qx.trade.price") || "Preis (QUBIC)"}
              </th>
              <th className="px-4 py-2 border text-left">
                {t("qx.trade.amount") || "Betrag"}
              </th>
              <th className="px-4 py-2 border text-left">
                {t("qx.trade.total") || "Gesamt (QUBIC)"}
              </th>
              <th className="px-4 py-2 border text-left">
                {t("qx.trade.hash") || "Hash"}
              </th>
              <th className="px-4 py-2 border text-left">
                {t("qx.trade.taker") || "Taker"}
              </th>
              <th className="px-4 py-2 border text-left">
                {t("qx.trade.maker") || "Maker"}
              </th>
              <th className="px-4 py-2 border text-left">
                {t("qx.trade.datetime") || "Datum & Uhrzeit"}
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((trade, index) => {
              const sideText = trade.bid
                ? (t("qx.trade.buy") || "Kaufen")
                : (t("qx.trade.sell") || "Verkaufen");
              const sideColor = trade.bid ? "text-green-600" : "text-red-600";
              const total = trade.price * trade.numberOfShares;
              const formattedPrice = formatNumber(trade.price);
              const formattedTotal = formatNumber(total);
              const formattedShares = formatNumber(trade.numberOfShares);
              const date = new Date(trade.tickTime).toLocaleString();
              const href = `/qx-trades/${trade.transactionHash}`;

              return (
                <tr key={index} className="hover:bg-gray-50 cursor-pointer">
                  <td className="px-4 py-2 border">
                    <Link href={href} className="block">
                      {trade.assetName}
                    </Link>
                  </td>
                  <td className="px-4 py-2 border">
                    <Link href={href} className={`block ${sideColor}`}>
                      {sideText}
                    </Link>
                  </td>
                  <td className="px-4 py-2 border">
                    <Link href={href} className="block">
                      {formattedPrice}
                    </Link>
                  </td>
                  <td className="px-4 py-2 border">
                    <Link href={href} className="block">
                      {formattedShares}
                    </Link>
                  </td>
                  <td className="px-4 py-2 border">
                    <Link href={href} className="block">
                      {formattedTotal}
                    </Link>
                  </td>
                  <td className="px-4 py-2 border">
                    <Link href={href} className="block">
                      {abbreviate(trade.transactionHash)}
                    </Link>
                  </td>
                  <td className="px-4 py-2 border">
                    <Link href={href} className="block">
                      {abbreviate(trade.taker)}
                    </Link>
                  </td>
                  <td className="px-4 py-2 border">
                    <Link href={href} className="block">
                      {abbreviate(trade.maker)}
                    </Link>
                  </td>
                  <td className="px-4 py-2 border">
                    <Link href={href} className="block">
                      {date}
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default QXTrades;
