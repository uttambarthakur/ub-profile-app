import { ForgotPasswordAuthScreen } from "@firebase-oss/ui-react";
import { useRouter } from "next/navigation";

export default function ForgotPasswordPage() {
   const router = useRouter();
   return <ForgotPasswordAuthScreen onBackToSignInClick={() => router.push("/login")} />;
}