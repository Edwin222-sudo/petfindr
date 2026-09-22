import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { MapPin, Clock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Browse Reports | PetFindr',
  description: 'Browse recently reported lost and found pets across the USA.',
};

const REPORTS = [
  { name: 'Buddy', species: 'Dog', breed: 'Beagle', status: 'lost', city: 'Nashville, TN', time: '12 min ago', img: 'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?w=600&q=80' },
  { name: 'Unknown', species: 'Cat', breed: 'Orange Tabby', status: 'found', city: 'Portland, OR', time: '34 min ago', img: 'https://images.unsplash.com/photo-1592194996308-7b43878e84a6?w=600&q=80' },
  { name: 'Peanut', species: 'Rabbit', breed: 'Holland Lop', status: 'lost', city: 'San Diego, CA', time: '1 h ago', img: 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=600&q=80' },
  { name: 'Unknown', species: 'Dog', breed: 'French Bulldog', status: 'found', city: 'Miami, FL', time: '1 h ago', img: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=600&q=80' },
  { name: 'Sky', species: 'Bird', breed: 'Cockatiel', status: 'lost', city: 'Denver, CO', time: '2 h ago', img: 'https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=600&q=80' },
  { name: 'Ginger', species: 'Dog', breed: 'Golden Retriever', status: 'found', city: 'Austin, TX', time: '2 h ago', img: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=600&q=80' },
  { name: 'Unknown', species: 'Reptile', breed: 'Bearded Dragon', status: 'found', city: 'Phoenix, AZ', time: '3 h ago', img: 'https://images.unsplash.com/photo-1581207592858-8d0fa2f4b3a3?w=600&q=80' },
  { name: 'Nibbles', species: 'Ferret', breed: 'Sable Ferret', status: 'lost', city: 'Chicago, IL', time: '3 h ago', img: 'https://images.unsplash.com/photo-1563369461-1e30e2ab9050?w=600&q=80' },
  { name: 'Comet', species: 'Horse', breed: 'Quarter Horse', status: 'found', city: 'Lexington, KY', time: '4 h ago', img: 'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=600&q=80' },
];

export default function BrowsePage() {
  return (
    <>
      <Navbar />
      <main className="bg-slate-50 min-h-screen">
        <div className="max-w-7xl mx-auto container-px pt-12 pb-20">
          <header className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900">Browse Reports</h1>
              <p className="mt-2 text-slate-600">
                Active lost & found reports across all 50 states. Updated live.
              </p>
            </div>
            <div className="inline-flex items-center gap-2 text-sm text-slate-600 bg-white border border-slate-200 rounded-full px-4 py-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 animate-pulseDot" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
              12,842 users currently online
            </div>
          </header>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {REPORTS.map((r, i) => (
              <article
                key={i}
                className="rounded-2xl overflow-hidden border border-slate-200 bg-white card-shadow hover:-translate-y-0.5 transition"
              >
                <div className="relative h-48 bg-slate-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={r.img} alt={r.name} className="w-full h-full object-cover" loading="lazy" />
                  <div
                    className={`absolute top-3 left-3 rounded-full px-3 py-1 text-xs font-bold text-white shadow ${
                      r.status === 'lost' ? 'bg-red-500' : 'bg-emerald-500'
                    }`}
                  >
                    {r.status.toUpperCase()}
                  </div>
                  <div className="absolute top-3 right-3 bg-black/55 text-white text-xs rounded-full px-2.5 py-1 flex items-center gap-1">
                    <Clock size={11} /> {r.time}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-slate-900">
                    {r.name} <span className="text-slate-400 font-medium">· {r.breed}</span>
                  </h3>
                  <p className="mt-1 text-xs text-slate-500 flex items-center gap-1">
                    <MapPin size={11} /> {r.city}
                  </p>
                  <p className="mt-3 text-xs text-slate-500">{r.species}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-10 text-center">
            <p className="text-sm text-slate-500">
              Showing 9 of <strong className="text-slate-800">27,481</strong> active reports
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
