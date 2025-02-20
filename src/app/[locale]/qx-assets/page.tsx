"use client";

import React, { useEffect, useState } from "react";
import { useT } from "@/hooks/useT";
import { getAssets } from "@/api/qx";
import type { Asset } from "@/api/qx.types";
import { Link } from "@/i18n/routing";

const SMART_CONTRACT_ISSUER = "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFXIB";

const QXExplorer: React.FC = () => {
  const t = useT();
  const [assets, setAssets] = useState<Asset[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchAssets() {
      try {
        const data = await getAssets();
        setAssets(data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchAssets();
  }, []);

  if (isLoading) {
    return (
      <div className="container mx-auto py-4">
        <h1 className="text-3xl font-bold mb-6">{t("qx.assetsTitle")}</h1>
        <p>{t("global.loading")}</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-4">
        <h1 className="text-3xl font-bold mb-6">{t("qx.assetsTitle")}</h1>
        <p>{t("global.error-loading")}</p>
      </div>
    );
  }

  const smartContracts = assets.filter(asset => asset.issuer === SMART_CONTRACT_ISSUER);
  const tokens = assets.filter(asset => asset.issuer !== SMART_CONTRACT_ISSUER);

  return (
    <div className="container mx-auto py-4">
      <h1 className="text-3xl font-bold mb-6">{t("qx.assetsTitle") || "QX-Vermögenswerte"}</h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          {t("qx.smartContractAssets") || "Smart-Contract-Anteile"}
        </h2>
        <div className="space-y-4">
          {smartContracts.map((asset) => (
            <div key={asset.name + asset.issuer}>
              <Link
                href={`/qx-assets/${asset.issuer}/${asset.name}`}
                className="block p-4 border rounded hover:bg-gray-100"
              >
                <div className="font-bold text-lg">{asset.name}</div>
                <div className="text-sm text-gray-600">{asset.issuer}</div>
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">{t("qx.tokens") || "Tokens"}</h2>
        <div className="space-y-4">
          {tokens.map((asset) => (
            <div key={asset.name + asset.issuer}>
              <Link
                href={`/qx-assets/${asset.issuer}/${asset.name}`}
                className="block p-4 border rounded hover:bg-gray-100"
              >
                <div className="font-bold text-lg">{asset.name}</div>
                <div className="text-sm text-gray-600">{asset.issuer}</div>
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default QXExplorer;
