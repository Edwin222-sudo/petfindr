'use client';

import { useEffect, useState } from 'react';
import { CheckCircle2, Search, MapPin } from 'lucide-react';

type Activity = {
  id: number;
  type: 'found' | 'lost' | 'reunited';
  pet: string;
  city: string;
  minutesAgo: number;
};

const SEED: Activity[] = [
  { id: 1, type: 'reunited', pet: 'Golden Retriever', city: 'Austin, TX', minutesAgo: 2 },
  { id: 2, type: 'found', pet: 'Orange Tabby Cat', city: 'Portland, OR', minutesAgo: 4 },
  { id: 3, type: 'reunited', pet: 'Beagle', city: 'Nashville, TN', minutesAgo: 6 },
  { id: 4, type: 'lost', pet: 'Blue Budgie', city: 'Denver, CO', minutesAgo: 8 },
  { id: 5, type: 'reunited', pet: 'Holland Lop Rabbit', city: 'San Diego, CA', minutesAgo: 11 },
  { id: 6, type: 'found', pet: 'French Bulldog', city: 'Miami, FL', minutesAgo: 14 },
  { id: 7, type: 'reunited', pet: 'Quarter Horse', city: 'Lexington, KY', minutesAgo: 17 },
  { id: 8, type: 'lost', pet: 'Siamese Cat', city: 'Seattle, WA', minutesAgo: 21 },
];

function iconFor(type: Activity['type']) {
  if (type === 'reunited') return <CheckCircle2 className="text-emerald-600" size={16} />;
  if (type === 'found') return <Search className="text-brand-600" size={16} />;
  return <MapPin className="text-accent-600" size={16} />;
}

function labelFor(type: Activity['type']) {
  if (type === 'reunited') return 'Reunited';
  if (type === 'found') return 'Just reported found';
  return 'Just reported lost';
}

export default function LiveActivity() {
  const [items, setItems] = useState<Activity[]>(SEED);

  useEffect(() => {
    // Every few seconds, prepend a new synthetic activity and shift age.
    const interval = setInterval(() => {
      setItems((prev) => {
        const aged = prev.map((a) => ({ ...a, minutesAgo: a.minutesAgo + 1 }));
        return aged.slice(0, 8);
      });
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white card-shadow overflow-hidden">
      <div className="px-5 py-3 border-b border-slate-100 flex items-center gap-2 bg-slate-50">
        <span className="relative flex h-2.5 w-2.5">
          <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 animate-pulseDot" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
        </span>
        <p className="text-sm font-semibold text-slate-800">Live Activity</p>
        <span className="ml-auto text-xs text-slate-500">Updating now</span>
      </div>
      <ul className="divide-y divide-slate-100">
        {items.slice(0, 6).map((a) => (
          <li key={a.id} className="px-5 py-3 flex items-start gap-3 text-sm animate-slideUp">
            <div className="mt-0.5">{iconFor(a.type)}</div>
            <div className="flex-1">
              <p className="font-medium text-slate-800">
                {labelFor(a.type)}: <span className="text-slate-600">{a.pet}</span>
              </p>
              <p className="text-xs text-slate-500">{a.city} · {a.minutesAgo} min ago</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
