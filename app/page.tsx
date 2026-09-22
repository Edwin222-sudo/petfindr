import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import StatsBar from '@/components/StatsBar';
import LiveActivity from '@/components/LiveActivity';
import ReunionStories from '@/components/ReunionStories';
import {
  Search,
  MapPin,
  ShieldCheck,
  Zap,
  Users,
  PawPrint,
  ArrowRight,
  HeartHandshake,
} from 'lucide-react';

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="gradient-hero border-b border-slate-100">
          <div className="max-w-7xl mx-auto container-px pt-14 pb-16 md:pt-20 md:pb-24 grid gap-12 lg:grid-cols-2 items-center">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-white border border-brand-100 text-brand-700 text-xs font-bold uppercase tracking-wider px-3 py-1.5 shadow-sm">
                <Zap size={12} /> America&apos;s #1 lost pet network
              </span>

              <h1 className="mt-6 text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-slate-900">
                Bring your <span className="text-brand-700">fur baby</span> home — fast.
              </h1>

              <p className="mt-5 text-lg text-slate-600 leading-relaxed max-w-xl">
                PetFindr connects lost pets with their families across all 50 states.
                Post a report in under 60 seconds, and our community of thousands of
                verified pet lovers will help you search.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Link
                  href="/report/lost"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-600 hover:bg-brand-700 text-white font-semibold px-7 py-3.5 transition shadow-sm"
                >
                  <Search size={18} /> I lost my pet
                </Link>
                <Link
                  href="/report/found"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-white border border-slate-300 hover:border-brand-400 hover:text-brand-700 text-slate-800 font-semibold px-7 py-3.5 transition shadow-sm"
                >
                  <HeartHandshake size={18} /> I found a pet
                </Link>
              </div>

              <div className="mt-8 flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2 text-slate-600">
                  <ShieldCheck size={16} className="text-emerald-600" /> Verified reporters
                </div>
                <div className="flex items-center gap-2 text-slate-600">
                  <MapPin size={16} className="text-brand-600" /> All 50 states
                </div>
                <div className="flex items-center gap-2 text-slate-600">
                  <Users size={16} className="text-accent-600" /> 1.4M+ members
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="rounded-3xl overflow-hidden border border-slate-200 bg-white card-shadow">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=1200&q=80"
                  alt="Happy dog reunited with owner"
                  className="w-full h-[420px] object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl border border-slate-200 card-shadow p-4 max-w-[240px] hidden sm:block">
                <div className="flex items-center gap-2">
                  <span className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-700 grid place-items-center">
                    <PawPrint size={16} />
                  </span>
                  <div>
                    <p className="text-xs text-slate-500">Bailey reunited</p>
                    <p className="text-sm font-bold text-slate-900">in 22 minutes</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats + Live Activity */}
        <section className="max-w-7xl mx-auto container-px mt-12">
          <StatsBar />
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2 rounded-2xl border border-slate-200 bg-white p-6 md:p-8 card-shadow">
              <h2 className="text-xl font-bold text-slate-900">How PetFindr works</h2>
              <div className="mt-6 grid gap-5 sm:grid-cols-3">
                {[
                  {
                    step: '1',
                    title: 'Post a report',
                    text: 'Add a photo, breed, sex, location and contact info.',
                  },
                  {
                    step: '2',
                    title: 'We match instantly',
                    text: 'Our engine scans the network for look-alikes nearby.',
                  },
                  {
                    step: '3',
                    title: 'Reunite',
                    text: 'Coordinate a safe, verified hand-off with the finder.',
                  },
                ].map((s) => (
                  <div key={s.step} className="rounded-xl border border-slate-200 p-5">
                    <div className="w-8 h-8 rounded-full bg-brand-600 text-white font-bold grid place-items-center text-sm">
                      {s.step}
                    </div>
                    <h3 className="mt-3 font-semibold text-slate-900">{s.title}</h3>
                    <p className="mt-1 text-sm text-slate-600 leading-relaxed">{s.text}</p>
                  </div>
                ))}
              </div>

              <Link
                href="/browse"
                className="mt-7 inline-flex items-center gap-2 text-brand-700 font-semibold text-sm hover:gap-3 transition-all"
              >
                Browse recent reports <ArrowRight size={16} />
              </Link>
            </div>

            <LiveActivity />
          </div>
        </section>

        {/* Reunion stories */}
        <section className="max-w-7xl mx-auto container-px">
          <ReunionStories />
        </section>

        {/* Trust / CTA band */}
        <section className="mt-24 bg-slate-900 text-white">
          <div className="max-w-7xl mx-auto container-px py-16 grid gap-10 md:grid-cols-2 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-extrabold leading-tight">
                Every minute counts. Every report matters.
              </h2>
              <p className="mt-4 text-slate-300 leading-relaxed">
                Over <strong className="text-white">17,800 reunions</strong> happened on PetFindr
                in the last 12 months alone. When you post, you tap into a nationwide
                community of thousands of volunteers and shelters actively watching the
                network.
              </p>
              <div className="mt-7 flex flex-col sm:flex-row gap-3">
                <Link
                  href="/report/lost"
                  className="rounded-full bg-brand-500 hover:bg-brand-400 text-white font-semibold px-6 py-3 text-center transition"
                >
                  Report a lost pet
                </Link>
                <Link
                  href="/report/found"
                  className="rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold px-6 py-3 text-center transition"
                >
                  Report a found pet
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { k: '17,842', v: 'Reunions in 2024' },
                { k: '1.4M+', v: 'Registered members' },
                { k: '50', v: 'States covered' },
                { k: '< 5 min', v: 'Average match time' },
              ].map((s) => (
                <div key={s.v} className="rounded-2xl bg-white/5 border border-white/10 p-5">
                  <p className="text-2xl md:text-3xl font-extrabold text-white">{s.k}</p>
                  <p className="text-sm text-slate-300 mt-1">{s.v}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
