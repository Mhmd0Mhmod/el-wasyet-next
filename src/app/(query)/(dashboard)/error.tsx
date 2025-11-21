"use client";

import ErrorClientPage from "@/components/shared/ErrorClientPage";

function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return <ErrorClientPage error={error} reset={reset} />;
}

export default Error;
