import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PetForm from '@/components/PetForm';
import { HeartHandshake } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Report a Found Pet | PetFindr',
  description: 'Found a pet? Post it and reunite them with their family.',
};

export default function ReportFoundPage() {
  return (
    <>
      <Navbar />
      <main className="bg-slate-50 min-h-screen">
        <div className="max-w-4xl mx-auto container-px pt-12 pb-20">
          <div className="mb-8">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 border border-emerald-100 rounded-full px-3 py-1">
              <HeartHandshake size={12} /> Thank you
            </span>
            <h1 className="mt-4 text-3xl md:text-4xl font-extrabold text-slate-900">
              Report a Found Pet
            </h1>
            <p className="mt-2 text-slate-600">
              Your kindness could be the reason a family sleeps soundly tonight.
            </p>
          </div>

          <PetForm mode="found" />
        </div>
      </main>
      <Footer />
    </>
  );
}
