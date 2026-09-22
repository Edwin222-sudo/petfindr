'use client';

import Link from 'next/link';
import { useState } from 'react';
import { PawPrint, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const links = [
    { href: '/', label: 'Home' },
    { href: '/report/lost', label: 'Report Lost' },
    { href: '/report/found', label: 'Report Found' },
    { href: '/browse', label: 'Browse Pets' },
  ];

  return (
    <header className="sticky top-0 z-50 backdrop-blur bg-white/85 border-b border-slate-200">
      <nav className="max-w-7xl mx-auto container-px flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-2 font-extrabold text-xl text-brand-700">
          <span className="w-9 h-9 rounded-xl bg-brand-600 text-white grid place-items-center">
            <PawPrint size={20} />
          </span>
          PetFindr
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-slate-700 hover:text-brand-700 transition"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/report/found"
            className="rounded-full bg-brand-600 hover:bg-brand-700 text-white text-sm font-semibold px-5 py-2.5 transition shadow-sm"
          >
            Report a Pet
          </Link>
        </div>

        <button
          className="md:hidden p-2 text-slate-700"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {open && (
        <div className="md:hidden border-t border-slate-200 bg-white">
          <div className="px-4 py-3 flex flex-col gap-3">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-sm font-medium text-slate-700 py-2"
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/report/found"
              onClick={() => setOpen(false)}
              className="rounded-full bg-brand-600 text-white text-sm font-semibold px-5 py-2.5 text-center"
            >
              Report a Pet
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
