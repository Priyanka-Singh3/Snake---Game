import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Show Back button on all pages except home
  const showBack = location.pathname !== "/";

  return (
    <nav className="w-full bg-cyan-800 text-white shadow sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          {showBack && (
            <button
              onClick={() => navigate(-1)}
              className="px-3 py-1 bg-cyan-600 hover:bg-cyan-700 rounded font-bold transition-colors mr-2"
            >
              ← Back
            </button>
          )}
          <span className="text-2xl font-extrabold tracking-wide">🎮 Gaming Arena</span>
        </div>
        <div className="flex items-center gap-6">
          <Link to="/" className="hover:text-cyan-200 font-semibold transition-colors">Home</Link>
          {!user ? (
            <button
              onClick={() => setUser({ name: "Demo User" })}
              className="bg-cyan-600 hover:bg-cyan-700 px-4 py-1 rounded font-bold transition-colors"
            >
              Login
            </button>
          ) : (
            <>
              <span className="font-semibold">{user.name}</span>
              <button
                onClick={() => setUser(null)}
                className="bg-cyan-600 hover:bg-cyan-700 px-4 py-1 rounded font-bold transition-colors"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}