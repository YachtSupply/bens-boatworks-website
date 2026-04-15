'use client';
import { useState } from 'react';

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

  if (status === 'success') {
    return (
      <div>
        <h3>Message Received</h3>
        <p>Thank you for reaching out. We will be in touch within one business day.</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit}>
      <div>
        <label>Full Name *</label>
        <input name="name" required value={form.name} onChange={handle} placeholder="Your full name" />
      </div>
      <div>
        <label>Email Address *</label>
        <input name="email" type="email" required value={form.email} onChange={handle} placeholder="your@email.com" />
      </div>
      <div>
        <label>Phone Number</label>
        <input name="phone" type="tel" value={form.phone} onChange={handle} placeholder="(305) 555-0100" />
      </div>
      <div>
        <label>Message *</label>
        <textarea name="message" required rows={5} value={form.message} onChange={handle} placeholder="Tell us about your vessel and what you need..." />
      </div>
      {status === 'error' && <p>Something went wrong. Please try again or call us directly.</p>}
      <button type="submit" disabled={status === 'loading'}>
        {status === 'loading' ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
}
