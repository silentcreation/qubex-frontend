"use client";

import React, { useEffect, useRef } from "react";
import { useT } from "@/hooks/useT";
import { useTheme } from "next-themes";
import { usePathname, useRouter } from "next/navigation";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const t = useT();
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const pathname = usePathname();
  const sidebarRef = useRef<HTMLDivElement>(null);

  const switchLanguage = (lang: string) => {
    const pathSegments = pathname.split("/");
    if (pathSegments[1] === "en" || pathSegments[1] === "de") {
      pathSegments[1] = lang;
    } else {
      pathSegments.splice(1, 0, lang);
    }
    const newPath = pathSegments.join("/") || "/";
    router.replace(newPath);
  };

  // Schließe die Sidebar, wenn außerhalb geklickt wird
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        onClose();
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  return (
    <div
      ref={sidebarRef}
      className={`fixed top-0 right-0 h-full bg-gray-900 text-white transform transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      } w-64 shadow-lg z-50 flex flex-col`}
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        <h2 className="text-xl font-semibold">{t("global.sidebar.title")}</h2>
        <button onClick={onClose} className="text-white hover:underline">
          {t("global.sidebar.close")}
        </button>
      </div>
      <div className="p-4 flex flex-col space-y-6">
        <div>
          <h3 className="text-lg font-semibold">{t("global.sidebar.language")}</h3>
          <div className="flex flex-col items-start space-y-2 mt-2">
            <button onClick={() => switchLanguage("en")} className="hover:underline">
              {t("global.sidebar.en")}
            </button>
            <button onClick={() => switchLanguage("de")} className="hover:underline">
              {t("global.sidebar.de")}
            </button>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold">{t("global.sidebar.theme")}</h3>
          <div className="flex flex-col items-start space-y-2 mt-2">
            <button
              onClick={() => setTheme("light")}
              className={`hover:underline ${theme === "light" ? "font-bold" : ""}`}
            >
              {t("global.sidebar.light")}
            </button>
            <button
              onClick={() => setTheme("dark")}
              className={`hover:underline ${theme === "dark" ? "font-bold" : ""}`}
            >
              {t("global.sidebar.dark")}
            </button>
            <button
              onClick={() => setTheme("system")}
              className={`hover:underline ${theme === "system" ? "font-bold" : ""}`}
            >
              {t("global.sidebar.system")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
