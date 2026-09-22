import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PetForm from '@/components/PetForm';
import { AlertTriangle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Report a Lost Pet | PetFindr',
  description: 'Report your missing pet to America\'s largest lost pet network.',
};

export default function ReportLostPage() {
  return (
    <>
      <Navbar />
      <main className="bg-slate-50 min-h-screen">
        <div className="max-w-4xl mx-auto container-px pt-12 pb-20">
          <div className="mb-8">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-red-600 bg-red-50 border border-red-100 rounded-full px-3 py-1">
              <AlertTriangle size={12} /> Urgent
            </span>
            <h1 className="mt-4 text-3xl md:text-4xl font-extrabold text-slate-900">
              Report a Lost Pet
            </h1>
            <p className="mt-2 text-slate-600">
              Fill in as much detail as you can. Reports with photos get matched 5× faster.
            </p>
          </div>

          <PetForm mode="lost" />
        </div>
      </main>
      <Footer />
    </>
  );
}
