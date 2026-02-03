import { LogOut } from "lucide-react";

export default function Header({ currentUser, onLogout }) {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Academic Task Manager
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              Stay organized, stay ahead
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <div className="text-xs text-gray-500">Logged in as</div>
              <div className="font-semibold text-gray-900">{currentUser}</div>
            </div>
            <button
              type="button"
              onClick={onLogout}
              className="flex items-center gap-2 min-h-touch px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition font-medium"
              title="Logout"
            >
              <LogOut size={18} aria-hidden />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
