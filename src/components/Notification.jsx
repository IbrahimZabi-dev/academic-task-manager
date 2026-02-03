import { CheckCircle2 } from "lucide-react";

/**
 * Toast notification. Auto-dismiss 3s handled by parent.
 * Types: success, info.
 */
export default function Notification({ notification }) {
  if (!notification) return null;
  const bg =
    notification.type === "info" ? "bg-blue-500" : "bg-green-500";
  return (
    <div className="fixed top-4 right-4 z-50 animate-slide-in" role="alert">
      <div
        className={`${bg} text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2`}
      >
        <CheckCircle2 size={20} aria-hidden />
        <span className="font-medium">{notification.message}</span>
      </div>
    </div>
  );
}
