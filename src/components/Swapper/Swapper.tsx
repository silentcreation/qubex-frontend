"use client";

import React, { useState, useEffect } from "react";
import { useT } from "@/hooks/useT";
import { getAssets, Asset } from "@/api/qx";
import { FaArrowsAltH } from "react-icons/fa";

export default function Swapper() {
  const t = useT();
  const [swapMode, setSwapMode] = useState("normal");
  const [amount, setAmount] = useState("");
  const [fromToken, setFromToken] = useState("");
  const [toToken, setToToken] = useState("");
  const [tokens, setTokens] = useState<Asset[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const normalCurrencies = ["ETH", "USDT", "USDC", "QUBIC"];

  useEffect(() => {
    async function fetchAssets() {
      try {
        const data = await getAssets();
        setTokens(data);
      } catch (err) {
        console.error("Error fetching assets:", err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchAssets();
  }, []);

  useEffect(() => {
    if (swapMode === "qx") {
      setFromToken("QX");
      setToToken("QUBIC");
    } else {
      setFromToken("ETH");
      setToToken("QUBIC");
    }
  }, [swapMode]);

  const performSwap = async () => {
    alert("Swap functionality will be implemented later.");
  };

  return (
    <div className="max-w-md mx-auto bg-white text-black rounded-lg shadow-lg p-12">
      <div className="mb-4 flex space-x-4">
        <button
          onClick={() => setSwapMode("normal")}
          className={`flex-1 py-2 rounded ${swapMode === "normal" ? "bg-indigo-600 text-white" : "bg-gray-200 text-black"
            }`}
        >
          Normal Swap
        </button>
        <button
          onClick={() => setSwapMode("qx")}
          className={`flex-1 py-2 rounded ${swapMode === "qx" ? "bg-indigo-600 text-white" : "bg-gray-200 text-black"
            }`}
        >
          QX Swap
        </button>
      </div>
      <div className="mb-4">
        <label className="block font-medium mb-2">{t("swap.amount") || "Amount"}</label>
        <input
          type="text"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="0.0"
          className="w-full border rounded px-3 py-2"
        />
      </div>
      <div className="mb-4 flex space-x-4">
        <div className="flex-1">
          <label className="block font-medium mb-2">{t("swap.from") || "From"}</label>
          {swapMode === "qx" ? (
            <select
              value={fromToken}
              onChange={(e) => setFromToken(e.target.value)}
              className="w-full border rounded px-3 py-2"
            >
              <optgroup label="Smart Contract Shares">
                {tokens
                  .filter(
                    (asset) =>
                      asset.issuer === "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFXIB" &&
                      asset?.name
                  )
                  .map((asset) => (
                    <option key={asset.name} value={asset.name}>
                      {asset.name}
                    </option>
                  ))}
              </optgroup>
              <optgroup label="Tokens">
                {tokens
                  .filter(
                    (asset) =>
                      asset.issuer !== "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFXIB" &&
                      asset?.name
                  )
                  .map((asset) => (
                    <option key={asset.name} value={asset.name}>
                      {asset.name}
                    </option>
                  ))}
              </optgroup>
            </select>
          ) : (
            <select
              value={fromToken}
              onChange={(e) => setFromToken(e.target.value)}
              className="w-full border rounded px-3 py-2"
            >
              {normalCurrencies.map((token) => (
                <option key={token} value={token}>
                  {token}
                </option>
              ))}
            </select>
          )}
        </div>
        {swapMode === "normal" && (
          <button
            onClick={() => {
              const temp = fromToken;
              setFromToken(toToken);
              setToToken(temp);
            }}
            className="text-black"
          >
            <FaArrowsAltH size={20} />
          </button>
        )}
        <div className="flex-1">
          <label className="block font-medium mb-2">{t("swap.to") || "To"}</label>
          <select
            value={toToken}
            onChange={(e) => setToToken(e.target.value)}
            className="w-full border rounded px-3 py-2"
          >
            {normalCurrencies.map((token) => (
              <option key={token} value={token}>
                {token}
              </option>
            ))}
          </select>
        </div>
      </div>

      <button
        onClick={performSwap}
        className="w-full bg-indigo-600 text-white py-2 rounded font-semibold hover:bg-indigo-700"
      >
        {t("swap.button") || "Swap"}
      </button>
    </div>
  );
}
