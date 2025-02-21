// "use client";

// import NextError from "next/error";

// interface GlobalErrorProps {
//   error: Error;
// }

// const GlobalError: React.FC<GlobalErrorProps> = ({ error }) => {
//   return (
//     <NextError statusCode={500} title={error.message} />
//   );
// };

// export default GlobalError;


"use client";

interface GlobalErrorProps {
  error: Error;
}

const GlobalError: React.FC<GlobalErrorProps> = ({ error }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-4">Ein Fehler ist aufgetreten</h1>
      <p className="mb-4">{error.message}</p>
      <p className="text-sm text-gray-600">Bitte versuchen Sie es später erneut.</p>
    </div>
  );
};

export default GlobalError;
