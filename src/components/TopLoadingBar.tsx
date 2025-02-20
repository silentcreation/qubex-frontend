"use client";

import { useState, useEffect } from "react";
import LoadingBar from "react-top-loading-bar";
import { usePathname } from "next/navigation";

export default function TopLoadingBar() {
  const [progress, setProgress] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    setProgress(40);
    setProgress(100);
  }, [pathname]);

  return (
    <LoadingBar
      color="rgb(180, 130, 251)"
      progress={progress}
      waitingTime={400}
      onLoaderFinished={() => setProgress(0)}
    />
  );
}
