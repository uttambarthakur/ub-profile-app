import { SiInstagram, SiFacebook } from "react-icons/si";
import { FaXTwitter } from "react-icons/fa6";


export default function Footer() {
  return (
    <footer className="bg-gray-600 text-white py-2.5 fixed bottom-0 w-full">
      <div className="container mx-auto text-center">
        <p>&copy; {new Date().getFullYear()} UB. All rights reserved.</p>
      </div>
      <div className="flex mx-auto text-center justify-center flex-row gap-2">
        <p>Follow me:</p>
        <div className="flex flex-row space-x-3 pt-0.5">
          <a target="_blank" href="https://www.instagram.com/uttambarthakur?utm_source=qr&stkn=bDNrdmI5b3Z6bDVi"><SiInstagram /></a>
          <a target="_blank" href="https://www.facebook.com/share/19EwSSShEP"><SiFacebook /></a>
          <a target="_blank" href="https://x.com/uttambarthakur"><FaXTwitter /></a>
        </div>
      </div>
    </footer>
  );
}