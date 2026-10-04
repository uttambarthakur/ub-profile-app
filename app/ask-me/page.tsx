import Chat from "@/components/Chat";
import ProtectedRoute from "@/components/ProtectedRoute";



export default function AskMePage() {
  return (
    <ProtectedRoute>
      <Chat />
    </ProtectedRoute>
  );
}
