"use client";

import { useEffect, useState, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuthState } from "@/lib/firebase/hooks";
import { sendEmailVerification } from "firebase/auth";

type ProtectedRouteProps = {
  children: ReactNode;
};

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, loading } = useAuthState();
  const router = useRouter();
  const pathname = usePathname();

  const [checkingVerification, setCheckingVerification] = useState(true);
  const [resending, setResending] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Redirect if not logged in
  useEffect(() => {
    if (!loading && !user) {
      const next = pathname ? `?next=${encodeURIComponent(pathname)}` : "";
      router.replace(`/login${next}`);
    }
  }, [loading, user, pathname, router]);

  // Reload user to get the latest emailVerified status
  useEffect(() => {
    if (!user) {
      setCheckingVerification(false);
      return;
    }

    let cancelled = false;

    async function checkVerification() {
      try {
        // Always reload to get the freshest status from Firebase
        await user!.reload();
      } catch (err) {
        console.error("Error reloading user:", err);
      } finally {
        if (!cancelled) {
          setCheckingVerification(false);
        }
      }
    }

    checkVerification();

    return () => {
      cancelled = true;
    };
  }, [user]);

  const handleResend = async () => {
    if (!user || resending) return;
    setResending(true);
    setMessage(null);
    setError(null);

    try {
      await sendEmailVerification(user);
      setMessage("Verification email sent. Please check your inbox (and spam folder).");
    } catch (err: any) {
      console.error(err);
      if (err?.code === "auth/too-many-requests") {
        setError("Too many requests. Please wait a few minutes before trying again.");
      } else {
        setError("Failed to send verification email. Please try again later.");
      }
    } finally {
      setResending(false);
    }
  };

  const handleRefreshStatus = async () => {
    if (!user) return;
    setCheckingVerification(true);
    setMessage(null);
    setError(null);

    try {
      await user.reload();
      // Force the auth state to update (your hook should pick this up)
      // If your useAuthState doesn't react to reload, you can force a hard refresh:
      // window.location.reload();
    } catch (err) {
      console.error(err);
      setError("Failed to refresh status. Please try again.");
    } finally {
      setCheckingVerification(false);
    }
  };

  // Still loading auth state
  if (loading || !user) {
    return <p role="status">Checking your session...</p>;
  }

  // Still checking latest verification status
  if (checkingVerification) {
    return <p role="status">Checking email verification...</p>;
  }

  // Email not verified
  if (!user.emailVerified) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 text-center px-4">
        <h2 className="text-xl font-semibold">Email not verified</h2>
        <p className="max-w-md text-zinc-600 dark:text-zinc-400">
          Please verify your email address to continue. Check your inbox for the
          verification link we sent you.
        </p>

        {message && (
          <p className="text-sm text-green-600 dark:text-green-400">{message}</p>
        )}
        {error && (
          <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
        )}

        <button
          type="button"
          onClick={handleResend}
          disabled={resending}
          className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {resending ? "Sending..." : "Resend verification email"}
        </button>

        <button
          type="button"
          onClick={handleRefreshStatus}
          className="text-sm text-zinc-500 underline hover:text-zinc-700 dark:hover:text-zinc-300"
        >
          I already verified — refresh status
        </button>
      </div>
    );
  }

  // Authenticated + email verified
  return <>{children}</>;
}