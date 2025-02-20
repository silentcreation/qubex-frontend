"use client";

import NextError from "next/error";

interface GlobalErrorProps {
  error: Error;
}

const GlobalError: React.FC<GlobalErrorProps> = ({ error }) => {
  return (
    <NextError statusCode={500} title={error.message} />
  );
};

export default GlobalError;
