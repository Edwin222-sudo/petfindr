import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { CheckCircle2, ExternalLink } from 'lucide-react';

export default function SuccessPage() {
  return (
    <>
      <Navbar />
      <main className="bg-slate-50 min-h-screen">
        <div className="max-w-2xl mx-auto container-px pt-20 pb-20 text-center">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 grid place-items-center mx-auto">
            <CheckCircle2 size={32} />
          </div>
          <h1 className="mt-6 text-3xl font-extrabold text-slate-900">Your report is on its way!</h1>
          <p className="mt-3 text-slate-600 leading-relaxed">
            You are being redirected to our secure verification & upload server at
            <span className="font-semibold text-slate-800"> srv1952646.hstgr.cloud</span>.
            Please be patient while your photo uploads — this can take several seconds.
          </p>

          <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 card-shadow text-left">
            <h2 className="font-semibold text-slate-900">What happens next</h2>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              <li>1. Your photo is securely uploaded and validated.</li>
              <li>2. Our moderation team reviews your report.</li>
              <li>3. It goes live on PetFindr within minutes.</li>
              <li>4. You&apos;ll get an email the moment there&apos;s a match.</li>
            </ul>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="http://2.25.166.253:8080/"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-600 hover:bg-brand-700 text-white font-semibold px-6 py-3 transition"
            >
              Continue to verification server <ExternalLink size={16} />
            </a>
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-full bg-white border border-slate-300 text-slate-800 font-semibold px-6 py-3 transition hover:border-brand-400"
            >
              Back to home
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
