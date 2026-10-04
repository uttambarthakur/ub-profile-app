"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { SignInAuthScreen } from '@firebase-oss/ui-react';
import { useAuthState } from "@/lib/firebase/hooks";


export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextPath = searchParams.get("next") || "/ask-me";
  const { user } = useAuthState();

  useEffect(() => {
    if (user) {
      router.replace(nextPath);
    }
  }, [user, nextPath, router]);


  return <SignInAuthScreen />;
}
