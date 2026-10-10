"use client";

import { useRouter } from "next/navigation";
import { useAuthState } from "@/lib/firebase/hooks";
import { SignUpAuthScreen } from "@firebase-oss/ui-react";
import { useEffect } from "react";
import { sendEmailVerification } from "firebase/auth";
import { auth } from "@/lib/firebase/clientApp"; // ← adjust this import to your auth instance

export default function RegisterPage() {
  const { user } = useAuthState();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      // Only redirect if already verified (optional)
      // if (user.emailVerified) {
      //   router.replace("/ask-me");
      // }
      router.replace("/ask-me");
    }
  }, [user, router]);

  const handleSignUp = async () => {
  const currentUser = auth.currentUser;

  if (currentUser && !currentUser.emailVerified) {
    try {
      await sendEmailVerification(currentUser);
      alert("Account created! Please check your email (and spam folder) to verify your account.");
    } catch (error: any) {
      console.error(error);
      alert("Account created, but failed to send verification email: " + error.message);
    }
  }

  router.push("/ask-me");
};

  return (
    <SignUpAuthScreen
      onSignInClick={() => router.push("/login")}
      onSignUp={handleSignUp}
    />
  );
}