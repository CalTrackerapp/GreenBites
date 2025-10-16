import { Link, NavLink } from "react-router-dom";
import { Leaf } from "lucide-react";
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-green-50 via-white to-green-50 backdrop-blur-md border-b border-green-100 shadow-[0_4px_12px_rgba(34,197,94,0.25)]">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        <Link
          to="/"
          className="flex items-center gap-2 hover:scale-105 transition-transform"
        >
          <div className="bg-green-100 p-2 rounded-full">
            <Leaf className="h-6 w-6 text-green-600" />
          </div>
          <span className="text-2xl font-extrabold bg-gradient-to-r from-green-700 to-green-500 bg-clip-text text-transparent">
            GreenBites
          </span>
        </Link>

        <nav className="flex gap-6">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `font-medium transition-colors ${
                isActive
                  ? "text-green-700 underline underline-offset-4 decoration-green-500"
                  : "text-gray-700 hover:text-green-600"
              }`
            }
          >
            Home
          </NavLink>

          <SignedIn>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `font-medium transition-colors ${
                  isActive
                    ? "text-green-700 underline underline-offset-4 decoration-green-500"
                    : "text-gray-700 hover:text-green-600"
                }`
              }
            >
              Dashboard
            </NavLink>
          </SignedIn>
        </nav>

        <div className="flex gap-3 items-center">
          <SignedOut>
            <Link
              to="/login"
              className="px-4 py-2 rounded-lg text-green-700 font-medium border border-green-200 hover:bg-green-100 transition-colors"
            >
              Log In
            </Link>
            <Link
              to="/sign-up"
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-green-600 to-green-500 text-white font-semibold hover:from-green-700 hover:to-green-600 shadow-md transition-all"
            >
              Sign Up
            </Link>
          </SignedOut>

          <SignedIn>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-8 h-8 ring-2 ring-green-500 ring-offset-1",
                  userButtonPopoverCard:
                    "shadow-xl border border-green-100 bg-white",
                  userButtonPopoverActionButton:
                    "hover:bg-green-50 transition-colors",
                  userButtonPopoverActionButtonText: "text-gray-700",
                  userButtonPopoverFooter: "hidden",
                },
              }}
              afterSignOutUrl="/"
            />
          </SignedIn>
        </div>
      </div>
    </header>
  );
}
