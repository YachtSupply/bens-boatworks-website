'use client';
import { useState } from 'react';
import { Check, ArrowRight, Loader2 } from 'lucide-react';

type Status = 'idle' | 'loading' | 'success' | 'error';

export function ContactForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });

  const handle = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      setStatus(res.ok ? 'success' : 'error');
      if (res.ok) setForm({ name: '', email: '', phone: '', message: '' });
    } catch { setStatus('error'); }
  };

  const input = 'w-full bg-sand border border-sand-dark rounded-xl px-4 py-3 text-[14px] text-ink placeholder:text-ink-light focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/10 transition-all';
  const label = 'block text-[11px] font-semibold text-brand mb-1.5 uppercase tracking-wider';

  if (status === 'success') {
    return (
      <div className="text-center py-10">
        <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
          <Check size={22} className="text-accent" strokeWidth={2} />
        </div>
        <h3 className="font-heading text-xl font-extrabold text-brand mb-2">Message Received</h3>
        <p className="text-ink-muted text-[14px]">We will be in touch within one business day.</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div><label className={label}>Name *</label><input name="name" required value={form.name} onChange={handle} className={input} placeholder="Your name" /></div>
        <div><label className={label}>Phone</label><input name="phone" type="tel" value={form.phone} onChange={handle} className={input} placeholder="(305) 555-0100" /></div>
      </div>
      <div><label className={label}>Email *</label><input name="email" type="email" required value={form.email} onChange={handle} className={input} placeholder="your@email.com" /></div>
      <div><label className={label}>Message *</label><textarea name="message" required rows={4} value={form.message} onChange={handle} className={input} placeholder="Tell us about your vessel..." /></div>
      {status === 'error' && <p className="text-red-600 text-[13px]">Something went wrong. Please try again or call us directly.</p>}
      <button type="submit" disabled={status === 'loading'} className="w-full bg-accent hover:bg-accent-dark text-white font-semibold text-[12px] uppercase tracking-wider py-4 rounded-xl flex items-center justify-center gap-2 transition-colors disabled:opacity-50">
        {status === 'loading' ? <><Loader2 size={14} className="animate-spin" /> Sending...</> : <>Send Message <ArrowRight size={13} strokeWidth={2} /></>}
      </button>
    </form>
  );
}
