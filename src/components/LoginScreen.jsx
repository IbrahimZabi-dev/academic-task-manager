import { User } from "lucide-react";

/**
 * Simulated login: username only. Trimmed; no empty/whitespace.
 * Enter key submits; disabled state 50% opacity.
 * Touch-friendly: min-h-touch (44px) on primary CTA.
 */
export default function LoginScreen({ username, setUsername, onLogin }) {
  const trimmed = (username || "").trim();
  const canSubmit = trimmed.length > 0;

  const handleSubmit = (e) => {
    e?.preventDefault?.();
    if (canSubmit) onLogin();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-10 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full mb-4 shadow-lg">
            <User size={40} className="text-white" aria-hidden />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Welcome Back
          </h1>
          <p className="text-gray-600">
            Sign in to manage your academic tasks
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="username" className="block text-sm font-semibold text-gray-700 mb-2">
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              autoFocus
              autoComplete="username"
              aria-required="true"
            />
          </div>

          <button
            type="submit"
            disabled={!canSubmit}
            className="w-full min-h-touch py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all shadow-md hover:shadow-lg disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed disabled:shadow-none disabled:opacity-50"
          >
            Sign In
          </button>
        </form>

        <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-100">
          <p className="text-sm text-gray-700 text-center">
            <strong className="text-blue-700">Demo Mode:</strong> Enter any
            username to get started.
          </p>
        </div>
      </div>
    </div>
  );
}
