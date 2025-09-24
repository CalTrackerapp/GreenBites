import { Link, NavLink } from "react-router-dom";
import { Leaf } from "lucide-react";

export default function Header() {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo + Brand */}
        <Link to="/" className="flex items-center gap-2">
          <Leaf className="h-8 w-8 text-green-600" />
          <span className="text-2xl font-bold text-green-700">GreenBites</span>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex gap-6">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `font-medium ${
                isActive
                  ? "text-green-600"
                  : "text-gray-700 hover:text-green-600"
              }`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `font-medium ${
                isActive
                  ? "text-green-600"
                  : "text-gray-700 hover:text-green-600"
              }`
            }
          >
            Dashboard
          </NavLink>
        </nav>

        {/* Auth buttons */}
        <div className="flex gap-3">
          <Link
            to="/login"
            className="px-4 py-2 rounded-lg text-green-700 font-medium hover:bg-green-50"
          >
            Log In
          </Link>
          <Link
            to="/sign-up"
            className="px-4 py-2 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </header>
  );
}
