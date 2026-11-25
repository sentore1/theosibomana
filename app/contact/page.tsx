'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'

const S: Record<string, React.CSSProperties> = {
  nav: { position: 'sticky', top: 0, zIndex: 50, background: 'white', borderBottom: '1px solid #eee', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 40px' },
  navLink: { fontSize: 11, fontWeight: 700, letterSpacing: '0.15em', color: '#888', textDecoration: 'none', textTransform: 'uppercase' },
  navCenter: { position: 'absolute', left: '50%', transform: 'translateX(-50%)', textAlign: 'center' },
  navTitle: { fontSize: 14, fontWeight: 900, letterSpacing: '0.25em', textTransform: 'uppercase', lineHeight: '1' },
  navSub: { fontSize: 8, letterSpacing: '0.12em', color: '#aaa', textTransform: 'uppercase', marginTop: 2 },
  navBtn: { fontSize: 11, fontWeight: 900, padding: '8px 22px', borderRadius: 999, textTransform: 'uppercase', letterSpacing: '0.12em', background: '#d4e600', color: '#000', textDecoration: 'none', border: '2px solid #b8cc00' },
}

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
    <main style={{ fontFamily: 'Arial, sans-serif', width: '100%', overflowX: 'hidden' }}>
      <nav style={S.nav as React.CSSProperties}>
        <div style={{ display: 'flex', gap: 32 }}>
          <a href="/" style={S.navLink as React.CSSProperties}>Home</a>
          <a href="/about" style={S.navLink as React.CSSProperties}>About Me</a>
        </div>
        <div style={S.navCenter as React.CSSProperties}>
          <div style={S.navTitle as React.CSSProperties}>Theogene Sibomana</div>
          <div style={S.navSub as React.CSSProperties}>Ideas. Leadership. Impact.</div>
        </div>
        <a href="#form" style={S.navBtn as React.CSSProperties}>Let&apos;s Connect →</a>
      </nav>

      {/* HERO */}
      <section style={{ background: '#111', padding: '80px 40px', textAlign: 'center' }}>
        <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#d4e600', marginBottom: 16 }}>Contact</p>
        <h1 style={{ color: 'white', fontSize: 48, fontWeight: 900, lineHeight: 1.1 }}>Let&apos;s <em style={{ fontFamily: 'Georgia,serif', fontStyle: 'italic', fontWeight: 400 }}>Connect</em></h1>
        <div style={{ width: 80, height: 3, background: '#d4e600', margin: '20px auto 0' }} />
      </section>

      {/* CONTACT LAYOUT */}
      <section id="form" style={{ maxWidth: 900, margin: '0 auto', padding: '80px 40px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'start' }}>
        {/* Left info */}
        <div>
          <h2 style={{ fontSize: 28, fontWeight: 900, marginBottom: 24 }}>Get in Touch</h2>
          <p style={{ color: '#555', lineHeight: 1.85, fontSize: 15, marginBottom: 40 }}>
            Whether you have a speaking request, collaboration idea, book inquiry or just want to connect — I&apos;d love to hear from you.
          </p>
          {[
            { label: 'Email', value: 'hello@theosibomana.com' },
            { label: 'Website', value: 'theosibomana.com' },
            { label: 'Based in', value: 'Rwanda, Africa' },
          ].map(c => (
            <div key={c.label} style={{ marginBottom: 24, paddingBottom: 24, borderBottom: '1px solid #eee' }}>
              <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#aaa', marginBottom: 4 }}>{c.label}</p>
              <p style={{ fontWeight: 700, fontSize: 15 }}>{c.value}</p>
            </div>
          ))}
        </div>

        {/* Right form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <input style={{ padding: '14px 18px', border: '1px solid #ddd', outline: 'none', fontSize: 14 }} placeholder="Your Name" value={name} onChange={e => setName(e.target.value)} required />
          <input type="email" style={{ padding: '14px 18px', border: '1px solid #ddd', outline: 'none', fontSize: 14 }} placeholder="Email Address" value={email} onChange={e => setEmail(e.target.value)} required />
          <textarea rows={5} style={{ padding: '14px 18px', border: '1px solid #ddd', outline: 'none', fontSize: 14, resize: 'vertical' }} placeholder="Your Message" value={message} onChange={e => setMessage(e.target.value)} />
          <button type="submit" style={{ background: '#111', color: 'white', fontWeight: 900, padding: '16px', border: 'none', cursor: 'pointer', fontSize: 13, letterSpacing: '0.12em', textTransform: 'uppercase' }}>Send Message →</button>
          {msg && <p style={{ color: '#1a6b3c', fontWeight: 700, fontSize: 14 }}>{msg}</p>}
        </form>
      </section>

      <footer style={{ background: '#111', color: '#555', padding: '40px', textAlign: 'center', fontSize: 12 }}>
        <p style={{ color: 'white', fontWeight: 700, marginBottom: 8 }}>Theogene Sibomana</p>
        <p>© 2026 All rights reserved. | theosibomana.com</p>
      </footer>
    </main>
  )
}
