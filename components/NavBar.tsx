"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAuthState } from "@/lib/firebase/hooks";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase/clientApp";
import { useRouter, usePathname } from "next/navigation";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";

export default function NavBar() {
  const { user } = useAuthState();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const closeMenu = () => setOpen(false);

  const navLinks = (
    <>
      <Link
        href="/profile"
        onClick={closeMenu}
        className={
          pathname === "/profile"
            ? "text-blue-600 font-semibold"
            : "hover:text-gray-900 transition-colors"
        }
      >
        Profile
      </Link>
      <Link
        href="/ask-me"
        onClick={closeMenu}
        className={
          pathname === "/ask-me"
            ? "text-blue-600 font-semibold"
            : "hover:text-gray-900 transition-colors"
        }
      >
        Ask Me
      </Link>
      <Link
        href="/collaborate"
        onClick={closeMenu}
        className={
          pathname === "/collaborate"
            ? "text-blue-600 font-semibold"
            : "hover:text-gray-900 transition-colors"
        }
      >
        Collaborate
      </Link>

      {!user && (
        <Link
          href="/login"
          onClick={closeMenu}
          className={
            pathname === "/login"
              ? "text-blue-600 font-semibold"
              : "hover:text-gray-900 transition-colors"
          }
        >
          Login
        </Link>
      )}

      {user && (
        <button
          type="button"
          onClick={async () => {
            await signOut(auth);
            closeMenu();
            router.push("/login");
          }}
          className="cursor-pointer hover:text-gray-900 transition-colors text-left"
        >
          Logout
        </button>
      )}

      {!user && (
        <Link
          href="/register"
          onClick={closeMenu}
          className="rounded-md bg-gray-900 px-3 py-1.5 text-white hover:bg-gray-700 transition-colors text-center"
        >
          Register
        </Link>
      )}
    </>
  );

  return (
    <>
      <nav className="border-b border-gray-200 bg-white mb-6">
        <div className="mx-auto flex w-full items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          {/* Left side - Logo + Name */}
          <div className="flex gap-3 items-center min-w-0">
            <div className="relative h-12 w-12 sm:h-[4.5rem] sm:w-[4.5rem] overflow-hidden rounded-full shrink-0">
              <Image
                src="/mypic.jpg"
                fill
                sizes="(max-width: 640px) 48px, 72px"
                alt="Profile pic"
                className="object-cover"
              />
            </div>

            <div className="flex flex-col pt-1 min-w-0">
              <span className="text-base sm:text-lg font-semibold text-gray-900 truncate">
                Uttam Kumar Barthakur
              </span>
              {/* Contact info only on desktop */}
              <span className="hidden md:block text-balance text-gray-500 text-sm">
                <strong>Address: </strong>Bengaluru, KA 560037 |{" "}
                <strong>Phone: </strong>+91 8123870863 |{" "}
                <strong>E-mail: </strong>u_barthakur5@yahoo.co.in |{" "}
                <strong>Linkedin: </strong>
                <a
                  className="hover:underline hover:text-blue-500"
                  href="https://www.linkedin.com/in/uttam-kumar-barthakur-23764938"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  www.linkedin.com/in/uttam-kumar-barthakur-23764938
                </a>
              </span>
            </div>
          </div>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-4 text-sm font-medium text-gray-700">
            {navLinks}
          </div>

          {/* Mobile hamburger button */}
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="md:hidden fixed top-3 right-3 z-50 p-2.5 rounded-full bg-white shadow-md border border-gray-200 hover:bg-gray-50"
            aria-label="Open menu"
          >
            <HiOutlineMenu className="h-6 w-6 text-gray-700" />
          </button>
        </div>
      </nav>

      {/* ========== Mobile Drawer ========== */}
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 md:hidden ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeMenu}
      />

      {/* Drawer panel */}
      <div
        className={`fixed top-0 right-0 z-50 flex h-full w-72 max-w-[85vw] flex-col bg-white shadow-xl transform transition-transform duration-300 ease-in-out md:hidden ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header - stays fixed */}
        <div className="flex shrink-0 items-center justify-between border-b px-5 py-4">
          <span className="font-semibold text-gray-900">Menu</span>
          <button
            type="button"
            onClick={closeMenu}
            className="p-2 rounded-md hover:bg-gray-100"
            aria-label="Close menu"
          >
            <HiOutlineX className="h-6 w-6 text-gray-700" />
          </button>
        </div>

        {/* Scrollable content */}
        <div className="flex flex-1 flex-col overflow-y-auto">
          <div className="flex flex-col gap-5 px-6 py-6 text-base font-medium text-gray-700">
            {navLinks}
          </div>

          {/* Contact section */}
          <div className="mt-auto border-t border-gray-200 px-6 py-5 text-sm text-gray-600">
            <p className="mb-3 font-semibold text-gray-900">Contact</p>
            <div className="space-y-2">
              <a
                href="mailto:u_barthakur5@yahoo.co.in"
                className="flex items-center gap-2 break-all hover:text-blue-600"
              >
                📧 u_barthakur5@yahoo.co.in
              </a>
              <a
                href="tel:+918123870863"
                className="flex items-center gap-2 hover:text-blue-600"
              >
                📞 +91 8123870863
              </a>
              <a
                href="https://www.linkedin.com/in/uttam-kumar-barthakur-23764938"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 break-all hover:text-blue-600"
              >
                🔗 LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}