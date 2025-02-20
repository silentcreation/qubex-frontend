"use client";

import React, { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import { useT } from "@/hooks/useT";
import {
  getIssuedAssets,
  getAssetAskOrders,
  getAssetBidOrders,
  getAssetTrades,
  getAssetTransfers,
  getAssetChartAveragePrice
} from "@/api/qx";
import type {
  IssuedAsset,
  AssetOrder,
  Trade,
  Transfer,
  AveragePrice
} from "@/api/qx.types";
import { createChart } from "lightweight-charts";

const QXAssetDetailPage: React.FC = () => {
  const t = useT();
  const { issuer, name } = useParams();
  console.log("URL Params:", { issuer, name });
  
  const [asset, setAsset] = useState<IssuedAsset | null>(null);
  const [askOrders, setAskOrders] = useState<AssetOrder[]>([]);
  const [bidOrders, setBidOrders] = useState<AssetOrder[]>([]);
  const [trades, setTrades] = useState<Trade[]>([]);
  const [transfers, setTransfers] = useState<Transfer[]>([]);
  const [chartData, setChartData] = useState<AveragePrice[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const chartContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        console.log("Starting API calls...");
        const [
          issuedAssets,
          asks,
          bids,
          tradesData,
          transfersData,
          chartDataResp
        ] = await Promise.all([
          getIssuedAssets(),
          getAssetAskOrders({ issuer, asset: name }),
          getAssetBidOrders({ issuer, asset: name }),
          getAssetTrades({ issuer, asset: name }),
          getAssetTransfers({ issuer, asset: name }),
          getAssetChartAveragePrice({ issuer, asset: name })
        ]);
        console.log("issuedAssets:", issuedAssets);
        console.log("asks:", asks);
        console.log("bids:", bids);
        console.log("tradesData:", tradesData);
        console.log("transfersData:", transfersData);
        console.log("chartDataResp:", chartDataResp);
        const assetData = issuedAssets.find(
          (a) => a.extraData.name.toUpperCase() === name.toUpperCase()
        );
        console.log("Filtered assetData:", assetData);
        setAsset(assetData || null);
        setAskOrders(asks);
        setBidOrders(bids);
        setTrades(tradesData);
        setTransfers(transfersData);
        setChartData(chartDataResp);
      } catch (err) {
        console.error("Error in fetchData:", err);
        setError(err as Error);
      } finally {
        setIsLoading(false);
        console.log("Loading finished.");
      }
    }
    fetchData();
  }, [issuer, name]);

  /*
  useEffect(() => {
    if (chartContainerRef.current && chartData.length > 0) {
      console.log("Initializing chart with data:", chartData);
      const chart = createChart(chartContainerRef.current, {
        width: chartContainerRef.current.clientWidth,
        height: 300,
        layout: { backgroundColor: "#ffffff" },
        timeScale: { timeVisible: true }
      });
      const lineSeries = chart.addLineSeries();
      const data = chartData.map((item) => ({
        time: item.time,
        value: item.averagePrice
      }));
      console.log("Chart data transformed:", data);
      lineSeries.setData(data);
      return () => {
        console.log("Removing chart");
        chart.remove();
      };
    }
  }, [chartData]);
  */

  if (isLoading) {
    console.log("Page is loading...");
    return (
      <div className="container mx-auto py-4">
        <h1 className="text-2xl font-bold">{t("qx.orderBookTitle") || "QTRY Order Book"}</h1>
        <p>{t("global.loading") || "Loading..."}</p>
      </div>
    );
  }

  console.log("Error state:", error);
  console.log("Asset state:", asset);

  if (error) {
    console.error("Error loading asset details");
    return (
      <div className="container mx-auto py-4">
        <h1 className="text-2xl font-bold">{t("qx.orderBookTitle") || "QTRY Order Book"}</h1>
        <p>{t("global.error-loading") || "Error loading asset details"}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-4">
      <h1 className="text-2xl font-bold mb-4">{t("qx.orderBookTitle") || "QTRY Order Book"}</h1>
      <div className="p-4 border rounded mb-4">
        <p><strong>Name:</strong> {name}</p>
        <p><strong>Issuer:</strong> {issuer}</p>
      </div>
      {chartData.length > 0 && (
        <div className="mb-4">
          <h2 className="text-xl font-bold mb-2">Chart (Avg Price)</h2>
          <div ref={chartContainerRef} className="border rounded" />
        </div>
      )}
      {askOrders.length > 0 && (
        <div className="mb-4">
          <h2 className="text-xl font-bold mb-2">Open Ask Orders</h2>
          <table className="min-w-full border">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left">Entity</th>
                <th className="px-4 py-2 text-left">Amount</th>
                <th className="px-4 py-2 text-left">Price (QUBIC)</th>
                <th className="px-4 py-2 text-left">Total (QUBIC)</th>
              </tr>
            </thead>
            <tbody>
              {askOrders.map((order) => (
                <tr key={order.entityId + order.price}>
                  <td className="border px-4 py-2">
                    {order.entityId.slice(0, 6)}...{order.entityId.slice(-6)}
                  </td>
                  <td className="border px-4 py-2">{order.numberOfShares}</td>
                  <td className="border px-4 py-2">{order.price.toLocaleString()}</td>
                  <td className="border px-4 py-2">
                    {(order.price * order.numberOfShares).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {bidOrders.length > 0 && (
        <div className="mb-4">
          <h2 className="text-xl font-bold mb-2">Open Bid Orders</h2>
          <table className="min-w-full border">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left">Entity</th>
                <th className="px-4 py-2 text-left">Amount</th>
                <th className="px-4 py-2 text-left">Price (QUBIC)</th>
                <th className="px-4 py-2 text-left">Total (QUBIC)</th>
              </tr>
            </thead>
            <tbody>
              {bidOrders.map((order) => (
                <tr key={order.entityId + order.price}>
                  <td className="border px-4 py-2">
                    {order.entityId.slice(0, 6)}...{order.entityId.slice(-6)}
                  </td>
                  <td className="border px-4 py-2">{order.numberOfShares}</td>
                  <td className="border px-4 py-2">{order.price.toLocaleString()}</td>
                  <td className="border px-4 py-2">
                    {(order.price * order.numberOfShares).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {trades.length > 0 && (
        <div className="mb-4">
          <h2 className="text-xl font-bold mb-2">Trades</h2>
          <table className="min-w-full border">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left">Asset</th>
                <th className="px-4 py-2 text-left">Side</th>
                <th className="px-4 py-2 text-left">Price (QUBIC)</th>
                <th className="px-4 py-2 text-left">Amount</th>
                <th className="px-4 py-2 text-left">Total (QUBIC)</th>
                <th className="px-4 py-2 text-left">Hash</th>
                <th className="px-4 py-2 text-left">Taker</th>
                <th className="px-4 py-2 text-left">Maker</th>
                <th className="px-4 py-2 text-left">Date & Time</th>
              </tr>
            </thead>
            <tbody>
              {trades.map((trade) => (
                <tr key={trade.transactionHash}>
                  <td className="border px-4 py-2">{trade.assetName}</td>
                  <td className="border px-4 py-2">{trade.bid ? "Buy" : "Sell"}</td>
                  <td className="border px-4 py-2">{trade.price.toLocaleString()}</td>
                  <td className="border px-4 py-2">{trade.numberOfShares}</td>
                  <td className="border px-4 py-2">
                    {(trade.price * trade.numberOfShares).toLocaleString()}
                  </td>
                  <td className="border px-4 py-2">
                    {trade.transactionHash.slice(0, 6)}...{trade.transactionHash.slice(-6)}
                  </td>
                  <td className="border px-4 py-2">
                    {trade.taker.slice(0, 6)}...{trade.taker.slice(-6)}
                  </td>
                  <td className="border px-4 py-2">
                    {trade.maker.slice(0, 6)}...{trade.maker.slice(-6)}
                  </td>
                  <td className="border px-4 py-2">
                    {new Date(trade.tickTime).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {transfers.length > 0 && (
        <div className="mb-4">
          <h2 className="text-xl font-bold mb-2">Asset Transfers</h2>
          <table className="min-w-full border">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left">Asset</th>
                <th className="px-4 py-2 text-left">Amount</th>
                <th className="px-4 py-2 text-left">Tick</th>
                <th className="px-4 py-2 text-left">Hash</th>
                <th className="px-4 py-2 text-left">From</th>
                <th className="px-4 py-2 text-left">To</th>
                <th className="px-4 py-2 text-left">Date & Time</th>
              </tr>
            </thead>
            <tbody>
              {transfers.map((transfer) => (
                <tr key={transfer.hash}>
                  <td className="border px-4 py-2">{name}</td>
                  <td className="border px-4 py-2">{transfer.amount.toLocaleString()}</td>
                  <td className="border px-4 py-2">{transfer.tick}</td>
                  <td className="border px-4 py-2">
                    {transfer.hash.slice(0, 6)}...{transfer.hash.slice(-6)}
                  </td>
                  <td className="border px-4 py-2">
                    {transfer.source.slice(0, 6)}...{transfer.source.slice(-6)}
                  </td>
                  <td className="border px-4 py-2">
                    {transfer.extraData?.newOwner
                      ? transfer.extraData.newOwner.slice(0, 6) +
                        "..." +
                        transfer.extraData.newOwner.slice(-6)
                      : ""}
                  </td>
                  <td className="border px-4 py-2">
                    {new Date(transfer.tickTime).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default QXAssetDetailPage;
