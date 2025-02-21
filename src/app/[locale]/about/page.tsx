"use client";

import React from "react";
import { useT } from "@/hooks/useT";

const AboutUs: React.FC = () => {
  const t = useT();

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">{t("about.title")}</h1>
      <h2 className="text-xl font-semibold mb-2">{t("about.welcome")}</h2>
      <p className="mb-4">{t("about.description")}</p>
      <h2 className="text-xl font-semibold mb-2">{t("about.missionTitle")}</h2>
      <p className="mb-4">{t("about.missionDescription")}</p>
      <h2 className="text-xl font-semibold mb-2">{t("about.teamTitle")}</h2>
      <ul className="list-disc ml-5">
        <li>{t("about.team.member1")}</li>
        <li>{t("about.team.member2")}</li>
        <li><strong>{t("about.team.member3")}</strong></li>
        <li>{t("about.team.member4")}</li>
      </ul>
    </div>
  );
};

export default AboutUs;
