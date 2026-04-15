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
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      setStatus(res.ok ? 'success' : 'error');
      if (res.ok) setForm({ name: '', email: '', phone: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  const inputClass = 'w-full bg-white border border-black/10 rounded px-4 py-3 text-sm text-navy placeholder:text-txt-muted/60 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/30 transition-colors';
  const labelClass = 'block text-xs font-semibold text-navy mb-1.5 uppercase tracking-wider';

  if (status === 'success') {
    return (
      <div className="text-center py-10">
        <div className="w-14 h-14 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-4">
          <Check size={24} className="text-gold" strokeWidth={2} />
        </div>
        <h3 className="font-serif text-2xl text-navy mb-2">Message Received</h3>
        <p className="text-txt-muted text-sm">We will be in touch within one business day.</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Name *</label>
          <input name="name" required value={form.name} onChange={handle} className={inputClass} placeholder="Your full name" />
        </div>
        <div>
          <label className={labelClass}>Phone</label>
          <input name="phone" type="tel" value={form.phone} onChange={handle} className={inputClass} placeholder="(305) 555-0100" />
        </div>
      </div>
      <div>
        <label className={labelClass}>Email *</label>
        <input name="email" type="email" required value={form.email} onChange={handle} className={inputClass} placeholder="your@email.com" />
      </div>
      <div>
        <label className={labelClass}>Message *</label>
        <textarea name="message" required rows={4} value={form.message} onChange={handle} className={inputClass} placeholder="Tell us about your vessel..." />
      </div>
      {status === 'error' && (
        <p className="text-red-600 text-sm">Something went wrong. Please try again or call us directly.</p>
      )}
      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full bg-gold hover:bg-gold-dark text-navy font-semibold text-sm uppercase tracking-widest py-4 rounded flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
      >
        {status === 'loading' ? <><Loader2 size={16} className="animate-spin" /> Sending...</> : <>Send Message <ArrowRight size={14} strokeWidth={2} /></>}
      </button>
    </form>
  );
}
