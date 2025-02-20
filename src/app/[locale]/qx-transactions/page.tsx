"use client";

import React, { useEffect, useState } from "react";
import { useT } from "@/hooks/useT";
import { getIssuedAssets, getTransfers } from "@/api/qx";
import type {
  Asset,
  AssetOrder,
  AveragePrice,
  EntityOrder,
  IssuedAsset,
  Trade,
  Transfer
} from '@/api/qx.types';
import { formatNumber } from "@/utils/numberFormatter";

const abbreviate = (str: string, front = 6, back = 4) => {
  if (str.length <= front + back) return str;
  return `${str.slice(0, front)}...${str.slice(-back)}`;
};

const QXTransactions: React.FC = () => {
  const t = useT();

  // Issued Assets
  const [issuedAssets, setIssuedAssets] = useState<IssuedAsset[]>([]);
  const [loadingIssued, setLoadingIssued] = useState(true);
  const [errorIssued, setErrorIssued] = useState<Error | null>(null);

  // Transfers
  const [transfers, setTransfers] = useState<Transfer[]>([]);
  const [loadingTransfers, setLoadingTransfers] = useState(true);
  const [errorTransfers, setErrorTransfers] = useState<Error | null>(null);

  // Fetch Issued Assets (neueste ausgegebene Vermögenswerte)
  useEffect(() => {
    async function fetchIssuedAssets() {
      try {
        const data = await getIssuedAssets();
        setIssuedAssets(data);
      } catch (err) {
        setErrorIssued(err as Error);
      } finally {
        setLoadingIssued(false);
      }
    }
    fetchIssuedAssets();
    const intervalIssued = setInterval(fetchIssuedAssets, 60000);
    return () => clearInterval(intervalIssued);
  }, []);

  // Fetch Transfers (neueste Vermögensübertragungen)
  useEffect(() => {
    async function fetchTransfers() {
      try {
        const data = await getTransfers();
        setTransfers(data);
      } catch (err) {
        setErrorTransfers(err as Error);
      } finally {
        setLoadingTransfers(false);
      }
    }
    fetchTransfers();
    const intervalTransfers = setInterval(fetchTransfers, 60000);
    return () => clearInterval(intervalTransfers);
  }, []);

  return (
    <div className="container mx-auto py-4">
      <h1 className="text-2xl font-bold mb-6">{t("qx.transactions") || "QX Transactions"}</h1>

      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4">
          {t("qx.issuedAssets") || "Neueste ausgegebene Vermögenswerte"}
        </h2>
        {loadingIssued ? (
          <p>{t("global.loading")}</p>
        ) : errorIssued ? (
          <p>{t("global.error-loading")}</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th className="px-4 py-2 border text-left">
                    {t("qx.issued.asset") || "Vermögenswert"}
                  </th>
                  <th className="px-4 py-2 border text-left">
                    {t("qx.issued.issuer") || "Emittent"}
                  </th>
                  <th className="px-4 py-2 border text-left">
                    {t("qx.issued.amount") || "Betrag"}
                  </th>
                  <th className="px-4 py-2 border text-left">
                    {t("qx.issued.tick") || "Tick"}
                  </th>
                  <th className="px-4 py-2 border text-left">
                    {t("qx.issued.hash") || "Hash"}
                  </th>
                  <th className="px-4 py-2 border text-left">
                    {t("qx.issued.datetime") || "Datum & Uhrzeit"}
                  </th>
                </tr>
              </thead>
              <tbody>
                {issuedAssets.map((asset, index) => {
                  const assetName = asset.extraData.name;
                  const issuerAbbr = abbreviate(asset.source);
                  const amountFormatted = formatNumber(asset.extraData.numberOfShares);
                  const tickFormatted = formatNumber(asset.tick);
                  const hashAbbr = abbreviate(asset.hash);
                  const date = new Date(asset.tickTime).toLocaleString();
                  return (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-4 py-2 border">{assetName}</td>
                      <td className="px-4 py-2 border">{issuerAbbr}</td>
                      <td className="px-4 py-2 border">{amountFormatted}</td>
                      <td className="px-4 py-2 border">{tickFormatted}</td>
                      <td className="px-4 py-2 border">{hashAbbr}</td>
                      <td className="px-4 py-2 border">{date}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">
          {t("qx.transfers") || "Neueste Vermögensübertragungen"}
        </h2>
        {loadingTransfers ? (
          <p>{t("global.loading")}</p>
        ) : errorTransfers ? (
          <p>{t("global.error-loading")}</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th className="px-4 py-2 border text-left">
                    {t("qx.transfer.asset") || "Vermögenswert"}
                  </th>
                  <th className="px-4 py-2 border text-left">
                    {t("qx.transfer.amount") || "Betrag"}
                  </th>
                  <th className="px-4 py-2 border text-left">
                    {t("qx.transfer.tick") || "Tick"}
                  </th>
                  <th className="px-4 py-2 border text-left">
                    {t("qx.transfer.hash") || "Hash"}
                  </th>
                  <th className="px-4 py-2 border text-left">
                    {t("qx.transfer.from") || "Von"}
                  </th>
                  <th className="px-4 py-2 border text-left">
                    {t("qx.transfer.to") || "An"}
                  </th>
                  <th className="px-4 py-2 border text-left">
                    {t("qx.transfer.datetime") || "Datum & Uhrzeit"}
                  </th>
                </tr>
              </thead>
              <tbody>
                {transfers.map((transfer, index) => {
                  const assetName = transfer.extraData.name;
                  const amount = formatNumber(transfer.extraData.numberOfShares);
                  const tickFormatted = formatNumber(transfer.tick);
                  const hashAbbr = abbreviate(transfer.hash);
                  const fromAbbr = abbreviate(transfer.source);
                  const toAbbr = abbreviate(transfer.extraData.newOwner);
                  const date = new Date(transfer.tickTime).toLocaleString();
                  return (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-4 py-2 border">{assetName}</td>
                      <td className="px-4 py-2 border">{amount}</td>
                      <td className="px-4 py-2 border">{tickFormatted}</td>
                      <td className="px-4 py-2 border">{hashAbbr}</td>
                      <td className="px-4 py-2 border">{fromAbbr}</td>
                      <td className="px-4 py-2 border">{toAbbr}</td>
                      <td className="px-4 py-2 border">{date}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
};

export default QXTransactions;
