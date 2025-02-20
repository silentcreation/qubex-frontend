"use client";

import React, { useState } from "react";
import { useT } from "@/hooks/useT";
import { FaArrowsAltH } from 'react-icons/fa';


export default function Swapper() {
  const [amount, setAmount] = useState("");
  const [fromToken, setFromToken] = useState("ETH");
  const [toToken, setToToken] = useState("QUBIC");
  const t = useT();

  const performSwap = async () => {
    alert("Swap functionality will be implemented later.");
  };

  return (
    <div className="max-w-md mx-auto bg-white text-black rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold mb-4">{t("swap.title")}</h2>
      <div className="mb-4">
        <label className="block font-medium mb-2">{t("swap.amount")}</label>
        <input
          type="text"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="0.0"
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-500"
        />
      </div>
      <div className="mb-4 flex items-center space-x-4">
        <div className="flex-1">
          <label className="block font-medium mb-2">{t("swap.from")}</label>
          <select
            value={fromToken}
            onChange={(e) => setFromToken(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none"
          >
            <option value="ETH">{t("global.currencies.eth")}</option>
            <option value="USDT">{t("global.currencies.usdt")}</option>
            <option value="USDC">{t("global.currencies.usdc")}</option>
            <option value="QUBIC">{t("global.currencies.qubic")}</option>
          </select>
        </div>
        <button
          onClick={() => {
            const temp = fromToken;
            setFromToken(toToken);
            setToToken(temp);
          }}
          className="bg-gray-200 hover:bg-gray-300 text-black px-3 py-2 rounded font-semibold"
        >
          <FaArrowsAltH size={20} />

        </button>
        <div className="flex-1">
          <label className="block font-medium mb-2">{t("swap.to")}</label>
          <select
            value={toToken}
            onChange={(e) => setToToken(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none"
          >
            <option value="QUBIC">{t("global.currencies.qubic")}</option>
            <option value="ETH">{t("global.currencies.eth")}</option>
            <option value="USDT">{t("global.currencies.usdt")}</option>
            <option value="USDC">{t("global.currencies.usdc")}</option>
          </select>
        </div>
      </div>
      <button
        onClick={performSwap}
        className="w-full bg-indigo-600 text-white py-2 rounded font-semibold hover:bg-indigo-700"
      >
        {t("swap.button")}
      </button>
    </div>
  );
}
