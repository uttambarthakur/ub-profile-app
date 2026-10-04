"use client";

import { ui } from "@/lib/firebase/clientApp";
import { FirebaseUIProvider } from "@firebase-oss/ui-react";

export function FirebaseUIProviderHoc({ children }: { children: React.ReactNode }) {
  return (
    <FirebaseUIProvider ui={ui}>
      {children}
    </FirebaseUIProvider>
  );
}