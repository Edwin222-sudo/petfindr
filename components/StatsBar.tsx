'use client';

import { useEffect, useState } from 'react';
import { Users, Search, HeartHandshake, Clock } from 'lucide-react';

type Stats = {
  usersOnline: number;
  reportsToday: number;
  reunionsToday: number;
  avgReunionMinutes: number;
};

export default function StatsBar() {
  const [stats, setStats] = useState<Stats>({
    usersOnline: 12842,
    reportsToday: 3261,
    reunionsToday: 1284,
    avgReunionMinutes: 5,
  });

  useEffect(() => {
    let mounted = true;
    const fetchStats = async () => {
      try {
        const res = await fetch('/api/stats', { cache: 'no-store' });
        if (!res.ok) return;
        const data = (await res.json()) as Stats;
        if (mounted) setStats(data);
      } catch {
        /* ignore */
      }
    };
    fetchStats();
    const t = setInterval(fetchStats, 8000);
    return () => {
      mounted = false;
      clearInterval(t);
    };
  }, []);

  const items = [
    { icon: <Users size={18} />, label: 'Users online now', value: stats.usersOnline.toLocaleString(), live: true },
    { icon: <Search size={18} />, label: 'Reports today', value: stats.reportsToday.toLocaleString() },
    { icon: <HeartHandshake size={18} />, label: 'Reunions today', value: stats.reunionsToday.toLocaleString() },
    { icon: <Clock size={18} />, label: 'Avg. reunion time', value: `${stats.avgReunionMinutes} min` },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {items.map((it) => (
        <div key={it.label} className="rounded-xl border border-slate-200 bg-white p-4 card-shadow">
          <div className="flex items-center gap-2 text-brand-700">
            {it.icon}
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">
              {it.label}
            </span>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-slate-900">{it.value}</span>
            {it.live && (
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 animate-pulseDot" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
