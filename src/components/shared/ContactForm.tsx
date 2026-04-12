'use client';
import { useState } from 'react';
import { FiCheck, FiArrowRight } from 'react-icons/fi';

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

  const inputClass =
    'w-full bg-white border border-cream-dark rounded-xl px-4 py-3 text-sm font-sans text-navy focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/10 transition-all';
  const labelClass = 'block text-xs font-heading font-bold text-navy mb-2';

  if (status === 'success') {
    return (
      <div className="bg-gold/5 border border-gold/20 rounded-2xl p-10 text-center">
        <div className="flex items-center justify-center w-14 h-14 rounded-full bg-gold/10 text-gold mx-auto mb-4">
          <FiCheck size={28} strokeWidth={3} />
        </div>
        <h3 className="font-heading text-xl font-bold text-navy mb-2">Message Received</h3>
        <p className="text-text-light text-sm font-sans">
          Thank you for reaching out. We will be in touch within one business day.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-5">
      <div>
        <label className={labelClass}>Full Name *</label>
        <input name="name" required value={form.name} onChange={handle} className={inputClass} placeholder="Your full name" />
      </div>
      <div>
        <label className={labelClass}>Email Address *</label>
        <input name="email" type="email" required value={form.email} onChange={handle} className={inputClass} placeholder="your@email.com" />
      </div>
      <div>
        <label className={labelClass}>Phone Number</label>
        <input name="phone" type="tel" value={form.phone} onChange={handle} className={inputClass} placeholder="(305) 555-0100" />
      </div>
      <div>
        <label className={labelClass}>Message *</label>
        <textarea
          name="message"
          required
          rows={5}
          value={form.message}
          onChange={handle}
          className={inputClass}
          placeholder="Tell us about your vessel and what you need..."
        />
      </div>
      {status === 'error' && (
        <p className="text-red-600 text-sm font-sans">Something went wrong. Please try again or call us directly.</p>
      )}
      <button
        type="submit"
        disabled={status === 'loading'}
        className="btn-gold w-full py-4 px-8 flex items-center justify-center gap-2 disabled:opacity-50 whitespace-nowrap"
      >
        {status === 'loading' ? 'Sending...' : <>Send Message <FiArrowRight size={14} /></>}
      </button>
    </form>
  );
}
