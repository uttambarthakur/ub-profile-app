"use client";

import Link from "next/link";
import { useAuthState } from "@/lib/firebase/hooks";
import Image from "next/image";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase/clientApp";
import { useRouter } from "next/navigation";


export default function NavBar() {
  const { user } = useAuthState();
  const router = useRouter();

  return (
    <nav className="border-b border-gray-200 bg-white mb-6">
      <div className="mx-auto flex w-full items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        
        <div className="flex gap-3">
          <div className="relative h-18 w-18 overflow-hidden rounded-full">
            <Image
              src="/mypic.jpg"
              fill
              sizes="48px"
              alt="Profile pic"
              className="object-cover"
            />
          </div>
            <div className="flex flex-col pt-3">
                <span className="text-lg font-semibold text-gray-900">Uttam Kumar Barthakur</span>
                <span className="text-balance text-gray-500 text-sm"><strong>Address: </strong>Bengaluru, KA 560037 | <strong>Phone: </strong>+91 8123870863 | <strong>E-mail: </strong>u_barthakur5@yahoo.co.in | <strong>Linkedin: </strong><a className="hover:underline hover:text-blue-500" href="https://www.linkedin.com/in/uttam-kumar-barthakur-23764938" target="_blank" rel="noopener noreferrer">www.linkedin.com/in/uttam-kumar-barthakur-23764938</a></span>
            </div>
        </div>

        <div className="flex items-center gap-5 text-sm font-medium text-gray-700">
          <Link href="/profile" className="hover:text-gray-900 transition-colors">
            My Profile
          </Link>
          <Link href="/ask-me" className="hover:text-gray-900 transition-colors">
            Ask Me
          </Link>

          {!user && (
            <Link href="/login" className="hover:text-gray-900 transition-colors">
              Login
            </Link>
          )}

          {user && (
            <button
              type="button"
              onClick={async () => {
                await signOut(auth);
                router.push("/login");
              }}
              className="cursor-pointer hover:text-gray-900 transition-colors"
            >
              Logout
            </button>
          )}

          {!user && (
            <Link
              href="/register"
              className="rounded-md bg-gray-900 px-3 py-1.5 text-white hover:bg-gray-700 transition-colors"
            >
              Register
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
