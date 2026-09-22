import { MapPin, Clock, Heart } from 'lucide-react';

type Story = {
  pet: string;
  breed: string;
  city: string;
  hoursAgo: number;
  image: string;
  blurb: string;
  emoji: string;
};

const STORIES: Story[] = [
  {
    pet: 'Bailey',
    breed: 'Golden Retriever',
    city: 'Austin, TX',
    hoursAgo: 2,
    image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=600&q=80',
    emoji: '🐶',
    blurb: 'Escaped through the backyard gate. A neighbor posted her on PetFindr and she was home before dinner.',
  },
  {
    pet: 'Milo',
    breed: 'Orange Tabby',
    city: 'Portland, OR',
    hoursAgo: 4,
    image: 'https://images.unsplash.com/photo-1592194996308-7b43878e84a6?w=600&q=80',
    emoji: '🐱',
    blurb: 'Found hiding under a porch two streets over. Microchip + PetFindr alert = instant reunion.',
  },
  {
    pet: 'Pepper',
    breed: 'Holland Lop Rabbit',
    city: 'San Diego, CA',
    hoursAgo: 6,
    image: 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=600&q=80',
    emoji: '🐰',
    blurb: 'Hopped out during a move. Found by a college student who posted on PetFindr within the hour.',
  },
  {
    pet: 'Duke',
    breed: 'Beagle',
    city: 'Nashville, TN',
    hoursAgo: 1,
    image: 'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?w=600&q=80',
    emoji: '🐕',
    blurb: 'Got spooked by fireworks on the 4th. Reunited with his family in under 90 minutes.',
  },
  {
    pet: 'Luna',
    breed: 'French Bulldog',
    city: 'Miami, FL',
    hoursAgo: 3,
    image: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=600&q=80',
    emoji: '🐶',
    blurb: 'Slipped her harness at the dog park. A tourist found her and used PetFindr to alert us.',
  },
  {
    pet: 'Charlie',
    breed: 'Cockatiel',
    city: 'Denver, CO',
    hoursAgo: 5,
    image: 'https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=600&q=80',
    emoji: '🦜',
    blurb: 'Flew out an open window. Landed on a stranger\'s balcony 3 blocks away. Home by sunset.',
  },
];

export default function ReunionStories() {
  return (
    <section className="mt-20">
      <div className="flex items-end justify-between flex-wrap gap-3">
        <div>
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-accent-600 bg-orange-50 border border-orange-100 rounded-full px-3 py-1">
            <Heart size={12} /> Success Stories
          </span>
          <h2 className="mt-3 text-2xl md:text-3xl font-extrabold text-slate-900">
            Recently reunited fur babies
          </h2>
          <p className="text-slate-600 mt-1.5 text-sm md:text-base">
            Real reunions from the last few hours across the United States.
          </p>
        </div>
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {STORIES.map((s) => (
          <article
            key={s.pet + s.city}
            className="rounded-2xl overflow-hidden border border-slate-200 bg-white card-shadow hover:-translate-y-0.5 transition"
          >
            <div className="relative h-48 bg-slate-100">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={s.image}
                alt={s.pet}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute top-3 left-3 bg-white/95 backdrop-blur rounded-full px-3 py-1 text-xs font-bold text-emerald-700 flex items-center gap-1.5 shadow">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> REUNITED
              </div>
              <div className="absolute top-3 right-3 bg-black/55 text-white text-xs rounded-full px-2.5 py-1 flex items-center gap-1">
                <Clock size={11} /> {s.hoursAgo}h ago
              </div>
            </div>
            <div className="p-5">
              <div className="flex items-center gap-2">
                <span className="text-lg">{s.emoji}</span>
                <h3 className="font-bold text-slate-900">
                  {s.pet} <span className="text-slate-400 font-medium">· {s.breed}</span>
                </h3>
              </div>
              <p className="mt-1 text-xs text-slate-500 flex items-center gap-1">
                <MapPin size={11} /> {s.city}
              </p>
              <p className="mt-3 text-sm text-slate-600 leading-relaxed">{s.blurb}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
