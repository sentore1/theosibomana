'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import Layout from '../components/Layout'

export default function ContactPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [msg, setMsg] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const { error } = await supabase.from('subscribers').insert({ name, email, type: 'contact' })
    if (error) setMsg('Error. Please try again.')
    else { setMsg('Thank you! I will be in touch soon.'); setName(''); setEmail(''); setMessage('') }
  }

  return (
    <Layout>
      <main style={{ fontFamily: 'Arial, sans-serif', width: '100%', overflowX: 'hidden' }}>
        {/* HERO */}
        <section style={{ background: '#111', padding: '80px 40px', textAlign: 'center' }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#4b5320', marginBottom: 16 }}>Contact</p>
          <h1 className="contact-hero-h1" style={{ color: 'white', fontWeight: 900, lineHeight: 1.1 }}>Let&apos;s <em style={{ fontFamily: 'Georgia,serif', fontStyle: 'italic', fontWeight: 400 }}>Connect</em></h1>
          <div style={{ width: 80, height: 3, background: '#4b5320', margin: '20px auto 0' }} />
        </section>

        <style>{`
          .contact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: start; }
          .contact-hero-h1 { font-size: 48px; }
          @media (max-width: 768px) {
            .contact-grid { grid-template-columns: 1fr; gap: 40px; }
            .contact-hero-h1 { font-size: 32px; }
          }
        `}</style>
        {/* CONTACT LAYOUT */}
        <section id="form" style={{ maxWidth: 900, margin: '0 auto', padding: '80px 40px' }}>
          <div className="contact-grid">
          <div>
            <h2 style={{ fontSize: 28, fontWeight: 900, marginBottom: 24 }}>Get in Touch</h2>
            <p style={{ color: '#555', lineHeight: 1.85, fontSize: 15, marginBottom: 40 }}>
              Whether you have a speaking request, collaboration idea, book inquiry or just want to connect — I&apos;d love to hear from you.
            </p>
            {[
              { label: 'Email', value: 'hello@theogenesibo.com' },
              { label: 'Website', value: 'theogenesibo.com' },
              { label: 'Based in', value: 'Rwanda, Africa' },
            ].map(c => (
              <div key={c.label} style={{ marginBottom: 24, paddingBottom: 24, borderBottom: '1px solid #eee' }}>
                <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#aaa', marginBottom: 4 }}>{c.label}</p>
                <p style={{ fontWeight: 700, fontSize: 15 }}>{c.value}</p>
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <input style={{ padding: '14px 18px', border: '1px solid #ddd', outline: 'none', fontSize: 14 }} placeholder="Your Name" value={name} onChange={e => setName(e.target.value)} required />
            <input type="email" style={{ padding: '14px 18px', border: '1px solid #ddd', outline: 'none', fontSize: 14 }} placeholder="Email Address" value={email} onChange={e => setEmail(e.target.value)} required />
            <textarea rows={5} style={{ padding: '14px 18px', border: '1px solid #ddd', outline: 'none', fontSize: 14, resize: 'vertical' }} placeholder="Your Message" value={message} onChange={e => setMessage(e.target.value)} />
            <button type="submit" style={{ background: '#111', color: 'white', fontWeight: 900, padding: '16px', border: 'none', cursor: 'pointer', fontSize: 13, letterSpacing: '0.12em', textTransform: 'uppercase' }}>Send Message →</button>
            {msg && <p style={{ color: '#1a6b3c', fontWeight: 700, fontSize: 14 }}>{msg}</p>}
          </form>
          </div>
        </section>
      </main>
    </Layout>
  )
}
