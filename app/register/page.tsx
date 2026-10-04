"use client";

import { useRouter } from "next/navigation";
import { useAuthState } from "@/lib/firebase/hooks";
import { SignUpAuthScreen } from "@firebase-oss/ui-react";
import { useEffect } from "react";


export default function RegisterPage() {
  const { user } = useAuthState();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.replace("/ask-me");
    }
  }, [user, router]);

  return (
          <SignUpAuthScreen onSignInClick={() => router.push("/login")} onSignUp={() => router.push("/ask-me")} />
    );
}
