"use client";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-destructive">Oops!</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Đã xảy ra lỗi không mong muốn.
        </p>
        {process.env.NODE_ENV === "development" && (
          <pre className="mt-4 max-w-lg overflow-auto rounded-md bg-muted p-4 text-left text-sm">
            {error.message}
          </pre>
        )}
        <button
          onClick={reset}
          className="mt-6 rounded-md bg-primary px-6 py-2 text-primary-foreground hover:bg-primary/90"
        >
          Thử lại
        </button>
      </div>
    </div>
  );
}
