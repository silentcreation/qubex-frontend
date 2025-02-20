// Footer.tsx
import React from "react";
import { useT } from "@/hooks/useT";
import { Link } from "@/i18n/routing";

const Footer: React.FC = () => {
  const t = useT();

  return (
    <footer className="bg-gray-800 text-white py-4 mt-8">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-left">
          <p>
            © {new Date().getFullYear()} {t("footer.copyright")}
          </p>
        </div>
        <div className="flex space-x-4 text-right">
          <Link href="/privacy-policy">
            <span className="hover:underline cursor-pointer">
              {t("footer.privacy")}
            </span>
          </Link>
          <Link href="/terms-conditions">
            <span className="hover:underline cursor-pointer">
              {t("footer.terms")}
            </span>
          </Link>
          <Link href="/about">
            <span className="hover:underline cursor-pointer">
              {t("footer.about")}
            </span>
          </Link>
          <Link href="/support">
            <span className="hover:underline cursor-pointer">
              {t("footer.support")}
            </span>
          </Link>
          <Link href="/imprint">
            <span className="hover:underline cursor-pointer">
              {t("footer.imprint")}
            </span>
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
