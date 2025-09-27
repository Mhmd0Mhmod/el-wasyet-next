"use client";

import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect } from "react";

function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="bg-background flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="space-y-2 text-center">
          <AlertTriangle className="text-destructive mx-auto h-16 w-16" />
          <h1 className="text-3xl font-bold tracking-tight">
            Oops! Something went wrong
          </h1>
          <p className="text-muted-foreground">
            We encountered an unexpected error. Please try again.
          </p>
        </div>

        <Alert variant="destructive" className="border-destructive/20">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Error Details</AlertTitle>
          <AlertDescription className="mt-2">
            <code className="bg-muted rounded px-2 py-1 text-sm">
              {error.message || "An unknown error occurred"}
            </code>
            {error.digest && (
              <div className="text-muted-foreground mt-2 text-xs">
                Error ID: {error.digest}
              </div>
            )}
          </AlertDescription>
        </Alert>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Button onClick={reset} className={cn("flex-1 gap-2")}>
            <RefreshCw className="h-4 w-4" />
            Try Again
          </Button>
          <Button
            variant="outline"
            onClick={() => (window.location.href = "/")}
            className={cn("flex-1 gap-2")}
          >
            <Home className="h-4 w-4" />
            Go Home
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Error;
