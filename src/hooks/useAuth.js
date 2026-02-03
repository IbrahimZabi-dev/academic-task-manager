import { useState, useEffect } from "react";

const STORAGE_KEY = "currentUser";

/**
 * Simulated auth: username-based login, no passwords.
 * Session persisted in localStorage; supports logout.
 */
export function useAuth() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setCurrentUser(saved);
    } catch {
      // localStorage disabled or corrupted
    }
  }, []);

  const login = (username) => {
    const trimmed = (username || "").trim();
    if (!trimmed) return null;
    setCurrentUser(trimmed);
    localStorage.setItem(STORAGE_KEY, trimmed);
    return trimmed;
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  return { currentUser, login, logout };
}
