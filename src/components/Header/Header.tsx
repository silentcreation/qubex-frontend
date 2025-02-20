"use client";

import React, { useState, useEffect } from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { FaCopy, FaCog } from "react-icons/fa";
import { Link } from "@/i18n/routing";
import { useT } from "@/hooks/useT";
import Sidebar from "@/components/Sidebar/Sidebar";

export default function Header() {
  const t = useT();
  const { isConnected, address } = useAccount();
  const { connectors, connect } = useConnect();
  const { disconnect } = useDisconnect();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showConnectModal, setShowConnectModal] = useState(false);
  const [snapInstalled, setSnapInstalled] = useState(false);

  const SNAP_ID =
    process.env.NODE_ENV === "production"
      ? process.env.NEXT_PUBLIC_SNAP_ID
      : process.env.NEXT_PUBLIC_SNAP_ID_DEV;

  async function checkSnap() {
    if (window.ethereum && SNAP_ID) {
      try {
        const snaps = await window.ethereum.request({ method: "wallet_getSnaps" });
        const installed = Object.values(snaps).some((snap: any) => snap.id === SNAP_ID);
        setSnapInstalled(installed);
      } catch (error) {
        console.error("Error checking snap installation:", error);
      }
    }
  }

  useEffect(() => {
    checkSnap();
  }, [SNAP_ID]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      checkSnap();
    }, 2000);
    return () => clearInterval(intervalId);
  }, []);

  const installSnap = async () => {
    if (window.ethereum && SNAP_ID) {
      try {
        await window.ethereum.request({
          method: "wallet_requestSnaps",
          params: { [SNAP_ID]: {} },
        });
      } catch (error) {
        console.error("Error installing snap:", error);
      }
    }
  };

  const invokeSnapMethod = async () => {
    if (window.ethereum && SNAP_ID) {
      try {
        const result = await window.ethereum.request({
          method: "wallet_invokeSnap",
          params: {
            snapId: SNAP_ID,
            request: { method: "getPublicId", params: { accountIdx: 0, confirm: true } },
          },
        });
        console.log("Snap method result:", result);
      } catch (error) {
        console.error("Error invoking snap method:", error);
      }
    }
  };

  const copyAddress = () => {
    if (address) {
      navigator.clipboard.writeText(address);
    }
  };

  useEffect(() => {
    if (isConnected) {
      setShowConnectModal(false);
    }
  }, [isConnected]);

  return (
    <header className="bg-gray-800 text-white py-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          <Link href="/">{t("global.page-title")}</Link>
        </h1>
        <nav>
          <ul className="flex space-x-4 items-center">
            <li>
              <Link href="/swap">{t("global.navigation.swap")}</Link>
            </li>
            <li>
              <Link href="/qx-explorer">{t("global.navigation.qx-explorer")}</Link>
            </li>
            <li>
              <Link href="/faq">{t("global.navigation.faq")}</Link>
            </li>
            <li>
              {isConnected && address ? (
                <div className="flex items-center space-x-4">
                  <span>{address.slice(0, 6)}...{address.slice(-4)}</span>
                  <button onClick={copyAddress} className="hover:underline">
                    <FaCopy className="mr-1" />
                  </button>
                  <button onClick={() => disconnect()} className="hover:underline">
                    {t("global.wallet.disconnect")}
                  </button>
                </div>
              ) : (
                <button onClick={() => setShowConnectModal(true)} className="text-white hover:underline">
                  {t("global.wallet.connect")}
                </button>
              )}
            </li>
            <li>
              <button
                onClick={() => setSidebarOpen(true)}
                className="hover:underline"
                aria-label={t("global.settings") || "Settings"}
              >
                <FaCog size={20} />
              </button>
            </li>
          </ul>
        </nav>
      </div>
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      {showConnectModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white text-black rounded p-6 w-80">
            <h2 className="text-xl font-bold mb-4">{t("global.wallet.select")}</h2>
            <ul>
              {connectors.map((connector) => (
                <li key={connector.id} className="mb-2">
                  <button
                    key={connector.uid}
                    onClick={() => connect({ connector })}
                    className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
                  >
                    {connector.name}
                  </button>
                </li>
              ))}

              <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700" />

              <li className="mb-2">
                {snapInstalled ? (
                  <div className="w-full px-4 py-2 bg-green-500 text-white rounded text-center font-bold">
                    {t("global.snap.installed")}
                  </div>
                ) : (
                  <button
                    onClick={installSnap}
                    className="w-full px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
                  >
                    {t("global.snap.install")}
                  </button>
                )}
              </li>
              {snapInstalled && (
                <li className="mb-2">
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      publicId();
                    }}
                    className="block text-xs underline mt-1"
                  >
                    {t("global.snap.test-link")}
                  </a>
                </li>
              )}

              <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700" />
            </ul>
            <button onClick={() => setShowConnectModal(false)} className="w-full px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400">
              {t("global.wallet.cancel")}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

async function publicId() {
  const SNAP_ID =
    process.env.NODE_ENV === "production"
      ? process.env.NEXT_PUBLIC_SNAP_ID
      : process.env.NEXT_PUBLIC_SNAP_ID_DEV;
  if (window.ethereum && SNAP_ID) {
    try {
      const publicId = await window.ethereum.request({
        method: "wallet_invokeSnap",
        params: {
          snapId: SNAP_ID,
          request: { method: "getPublicId", params: { accountIdx: 0, confirm: false } },
        },
      });
      alert(`Public ID: ${publicId}`);
    } catch (error) {
      console.error("Error retrieving public id:", error);
    }
  }
}
