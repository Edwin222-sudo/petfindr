import Link from 'next/link';
import { PawPrint, Facebook, Twitter, Instagram, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 mt-24">
      <div className="max-w-7xl mx-auto container-px py-14 grid gap-10 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2 font-extrabold text-xl text-white">
            <span className="w-9 h-9 rounded-xl bg-brand-600 text-white grid place-items-center">
              <PawPrint size={20} />
            </span>
            PetFindr
          </div>
          <p className="mt-4 text-sm leading-relaxed text-slate-400">
            America's fastest-growing lost & found pet network. Built by pet lovers,
            for pet lovers.
          </p>
          <div className="flex gap-3 mt-5">
            <a className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700" href="#" aria-label="Facebook">
              <Facebook size={16} />
            </a>
            <a className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700" href="#" aria-label="Twitter">
              <Twitter size={16} />
            </a>
            <a className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700" href="#" aria-label="Instagram">
              <Instagram size={16} />
            </a>
            <a className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700" href="#" aria-label="Email">
              <Mail size={16} />
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4">Report</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/report/lost" className="hover:text-white">Report Lost Pet</Link></li>
            <li><Link href="/report/found" className="hover:text-white">Report Found Pet</Link></li>
            <li><Link href="/browse" className="hover:text-white">Browse Reports</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4">Company</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-white">About Us</a></li>
            <li><a href="#" className="hover:text-white">How It Works</a></li>
            <li><a href="#" className="hover:text-white">Press</a></li>
            <li><a href="#" className="hover:text-white">Careers</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4">Support</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-white">Help Center</a></li>
            <li><a href="#" className="hover:text-white">Safety Tips</a></li>
            <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-white">Terms of Service</a></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto container-px py-6 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500">
          <p>© {new Date().getFullYear()} PetFindr, Inc. All rights reserved. Made in the USA 🇺🇸</p>
          <p className="mt-2 md:mt-0">Reuniting families, one paw at a time.</p>
        </div>
      </div>
    </footer>
  );
}
