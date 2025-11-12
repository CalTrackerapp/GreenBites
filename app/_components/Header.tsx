"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sparkles,
  Leaf,
  Utensils,
  Zap,
  House,
  Menu,
  X,
  User,
} from "lucide-react";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { useState } from "react";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  function toggleMobileMenu() {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  }

  function closeMobileMenu() {
    setIsMobileMenuOpen(false);
  }

  function navClass(target: string) {
    const isActive =
      pathname === target || (target === "/" && pathname === "/");
    return `relative font-semibold text-lg px-4 py-2 rounded-xl transition-all duration-300 group ${
      isActive
        ? "text-white bg-gradient-to-r from-emerald-500 to-green-600 shadow-lg"
        : "text-slate-700 hover:text-emerald-600 hover:bg-emerald-50"
    }`;
  }

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-white/20 shadow-[0_8px_32px_rgba(34,197,94,0.15)] overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-emerald-400/20 to-green-400/20 rounded-full blur-2xl"></div>
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-to-br from-teal-400/20 to-emerald-400/20 rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-br from-green-400/10 to-teal-400/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex justify-between items-center">
          <Link
            href="/"
            className="flex items-center gap-2 sm:gap-3  flex-shrink-0 group"
            onClick={closeMobileMenu}
          >
            <div className="relative">
              <div className="bg-gradient-to-br from-emerald-500 to-green-600 p-2 sm:p-3 rounded-xl sm:rounded-2xl shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:rotate-3">
                <Leaf className="h-5 w-5 sm:h-7 sm:w-7 text-white" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-emerald-700 via-green-600 to-teal-600 bg-clip-text text-transparent group-hover:from-emerald-600 group-hover:via-green-500 group-hover:to-teal-500 transition-all duration-300">
                GreenBites
              </span>
              <span className="text-xs text-slate-500 font-medium -mt-1 hidden sm:block">
                Track your nutrition and environmental impact
              </span>
            </div>
          </Link>

          <nav className="hidden lg:flex gap-2 items-center">
            <Link href="/" className={navClass("/")}>
              <span className="flex items-center gap-2">
                <House className="w-4 h-4" />
                Home
              </span>
            </Link>

            <SignedIn>
              <Link href="/dashboard" className={navClass("/dashboard")}>
                <span className="flex items-center gap-2">
                  <Zap className="w-4 h-4" />
                  Dashboard
                </span>
              </Link>
              <Link href="/add-meal" className={navClass("/add-meal")}>
                <span className="flex items-center gap-2">
                  <Utensils className="w-4 h-4" />
                  Add Meal
                </span>
              </Link>
              <Link href="/account" className={navClass("/account")}>
                <span className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Account
                </span>
              </Link>
            </SignedIn>
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden lg:flex gap-3 items-center ">
              <SignedOut>
                <Link
                  href="/login"
                  className="px-4 lg:px-6 py-2 lg:py-2.5 rounded-xl text-emerald-700 font-semibold border-2 border-emerald-200 hover:bg-gradient-to-r hover:from-emerald-50 hover:to-green-50 hover:border-emerald-300 transition-all duration-300 hover:shadow-md"
                >
                  Log In
                </Link>
                <Link
                  href="/sign-up"
                  className="px-4 lg:px-6 py-2 lg:py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 text-white font-bold hover:from-emerald-600 hover:to-green-700 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center gap-2"
                >
                  <Utensils className="w-4 h-4" />
                  Sign Up
                </Link>
              </SignedOut>

              <SignedIn>
                <div className="relative">
                  <UserButton
                    appearance={{
                      elements: {
                        avatarBox:
                          "w-8 h-8 lg:w-10 lg:h-10 ring-2 ring-emerald-500 ring-offset-2 shadow-lg hover:shadow-xl transition-all duration-300",
                        userButtonPopoverCard:
                          "shadow-2xl border border-emerald-100 bg-white/95 backdrop-blur-xl rounded-2xl",
                        userButtonPopoverActionButton:
                          "hover:bg-gradient-to-r hover:from-emerald-50 hover:to-green-50 transition-all duration-300 rounded-xl mx-2 my-1",
                        userButtonPopoverActionButtonText:
                          "text-slate-700 font-medium",
                        userButtonPopoverFooter: "hidden",
                        userButtonPopoverHeader:
                          "bg-gradient-to-r from-emerald-50 to-green-50 rounded-t-2xl",
                      },
                    }}
                    afterSignOutUrl="/"
                  />
                  <div className="absolute -top-1 -right-1 w-2 h-2 lg:w-3 lg:h-3 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full animate-pulse"></div>
                </div>
              </SignedIn>
            </div>

            <button
              onClick={toggleMobileMenu}
              className="lg:hidden p-2 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 bg-white/90 backdrop-blur-md rounded-2xl shadow-xl border border-white/30 p-6 animate-in slide-in-from-top-2 duration-300">
            <nav className="space-y-4">
              <Link
                href="/"
                onClick={closeMobileMenu}
                className={` ${navClass(
                  "/"
                )} flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all duration-300 text-slate-700 hover:text-emerald-600 hover:bg-emerald-50`}
              >
                <House className="w-5 h-5" />
                Home
              </Link>

              <SignedIn>
                <Link
                  href="/dashboard"
                  onClick={closeMobileMenu}
                  className={` ${navClass(
                    "/dashboard"
                  )} flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all duration-300 text-slate-700 hover:text-emerald-600 hover:bg-emerald-50`}
                >
                  <Zap className="w-5 h-5" />
                  Dashboard
                </Link>
                <Link
                  href="/add-meal"
                  onClick={closeMobileMenu}
                  className={` ${navClass(
                    "/add-meal"
                  )} flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all duration-300 text-slate-700 hover:text-emerald-600 hover:bg-emerald-50`}
                >
                  <Utensils className="w-5 h-5" />
                  Add Meal
                </Link>
                <Link
                  href="/account"
                  onClick={closeMobileMenu}
                  className={` ${navClass(
                    "/account"
                  )} flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all duration-300 text-slate-700 hover:text-emerald-600 hover:bg-emerald-50`}
                >
                  <User className="w-5 h-5" />
                  Account
                </Link>
              </SignedIn>

              <div className="pt-4 border-t border-slate-200">
                <SignedOut>
                  <div className="space-y-3">
                    <Link
                      href="/login"
                      onClick={closeMobileMenu}
                      className={` ${navClass(
                        "/login"
                      )} block w-full px-4 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 text-white font-bold hover:from-emerald-600 hover:to-green-700 shadow-lg hover:shadow-xl transition-all duration-300 text-center flex items-center justify-center gap-2`}
                    >
                      Log In
                    </Link>
                    <Link
                      href="/sign-up"
                      onClick={closeMobileMenu}
                      className={` ${navClass(
                        "/sign-up"
                      )} block w-full px-4 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 text-white font-bold hover:from-emerald-600 hover:to-green-700 shadow-lg hover:shadow-xl transition-all duration-300 text-center flex items-center justify-center gap-2`}
                    >
                      <Sparkles className="w-4 h-4" />
                      Sign Up
                    </Link>
                  </div>
                </SignedOut>

                <SignedIn>
                  <div className="flex items-center justify-center">
                    <UserButton
                      appearance={{
                        elements: {
                          avatarBox:
                            "w-12 h-12 ring-2 ring-emerald-500 ring-offset-2 shadow-lg hover:shadow-xl transition-all duration-300",
                          userButtonPopoverCard:
                            "shadow-2xl border border-emerald-100 bg-white/95 backdrop-blur-xl rounded-2xl",
                          userButtonPopoverActionButton:
                            "hover:bg-gradient-to-r hover:from-emerald-50 hover:to-green-50 transition-all duration-300 rounded-xl mx-2 my-1",
                          userButtonPopoverActionButtonText:
                            "text-slate-700 font-medium",
                          userButtonPopoverFooter: "hidden",
                          userButtonPopoverHeader:
                            "bg-gradient-to-r from-emerald-50 to-green-50 rounded-t-2xl",
                        },
                      }}
                      afterSignOutUrl="/"
                    />
                  </div>
                </SignedIn>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
