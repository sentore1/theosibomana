'use client'
import { useState } from 'react'
import Image from 'next/image'
import { supabase } from '@/lib/supabase'
import { Books, House, Globe, Lightbulb, BookOpen, Globe as GlobeIcon, Handshake, LinkedinLogo, FacebookLogo, InstagramLogo, XLogo, YoutubeLogo } from '@phosphor-icons/react'


const faqs = [
  { q: 'WHAT IS WEALTH SCHOOL AFRICA?', a: null },
  { q: "WHAT ARE THE KEY THEMES IN THEOGENE'S BOOKS?", a: "Theogene Sibomana's books cover practical wealth creation, personal financial success, and leadership for impact.\n\n1. Building a wealth mindset from the ground up\n2. Practical saving, investing and financial planning tools\n3. Leadership principles for sustainable impact\n4. Empowering communities through knowledge\n5. Creating freedom through financial education" },
  { q: "WHERE CAN I BUY THEOGENE'S BOOKS?", a: null },
  { q: 'DOES THEOGENE SIBOMANA OFFER SPEAKING ENGAGEMENTS?', a: null },
  { q: 'HOW CAN I PARTNER WITH IGENO GATE RWANDA OR WEALTH SCHOOL AFRICA?', a: null },
]

const S: Record<string, React.CSSProperties> = {
  navLink: { fontSize: 11, fontWeight: 700, letterSpacing: '0.15em', color: '#888', textDecoration: 'none', textTransform: 'uppercase' as const },
  navBtn: { fontSize: 13, fontWeight: 900, padding: '16px 28px', borderRadius: 999, textTransform: 'uppercase' as const, letterSpacing: '0.12em', background: '#4b5320', color: '#fff', textDecoration: 'none', border: '2px solid #3a4119' },
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(1)
  const [tourName, setTourName] = useState('')
  const [tourEmail, setTourEmail] = useState('')
  const [newsName, setNewsName] = useState('')
  const [newsEmail, setNewsEmail] = useState('')
  const [tourMsg, setTourMsg] = useState('')
  const [newsMsg, setNewsMsg] = useState('')

  async function handleTourSubmit(e: React.FormEvent) {
    e.preventDefault()
    const res = await fetch('/api/subscribers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: tourName, email: tourEmail, type: 'tour' }),
    })
    if (!res.ok) setTourMsg('Error. Try again.')
    else { setTourMsg('Thank you! Check your email.'); setTourName(''); setTourEmail('') }
  }

  async function handleNewsSubmit(e: React.FormEvent) {
    e.preventDefault()
    const res = await fetch('/api/subscribers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: newsName, email: newsEmail, type: 'newsletter' }),
    })
    if (!res.ok) setNewsMsg('Error. Try again.')
    else { setNewsMsg('Thank you! Check your email.'); setNewsName(''); setNewsEmail('') }
  }

  return (
    <main style={{ fontFamily: 'Arial, sans-serif', width: '100%', overflowX: 'hidden' }}>
      <style>{`
        .nav-links { display: flex; gap: 32px; }
        .nav-center { position: absolute; left: 50%; transform: translateX(-50%); text-align: center; }
        .nav-btn { display: inline-block; }
        .nav-hamburger { display: none; }
        .mobile-menu { display: none; }
        .about-inner { display: flex; align-items: center; gap: 56px; }
        .steps-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 24px; }
        .footer-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 40px; margin-bottom: 56px; }
        .footer-bottom { display: flex; justify-content: space-between; font-size: 11px; color: #555; }
        .desc-buttons { display: inline-grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .hero-inner { display: flex; align-items: flex-end; justify-content: space-between; padding: 48px 40px 0; min-height: 420px; }
        .hero-photo { flex-shrink: 0; align-self: flex-end; width: 460px; height: 560px; }
        @media (max-width: 768px) {
          .nav-links { display: none; }
          .nav-btn { display: none; }
          .nav-center { position: static; transform: none; text-align: left; flex: 1; }
          .nav-hamburger { display: flex; flex-direction: column; gap: 5px; cursor: pointer; padding: 4px; background: none; border: none; }
          .mobile-menu { display: flex; flex-direction: column; gap: 0; background: white; border-bottom: 1px solid #eee; padding: 8px 24px 16px; }
          .about-inner { flex-direction: column; gap: 32px; padding: 0 20px 48px !important; align-items: center !important; }
          .about-inner > div:first-child { width: 220px !important; height: 300px !important; flex-shrink: 0 !important; }
          .steps-grid { grid-template-columns: 1fr; }
          .footer-grid { grid-template-columns: 1fr; }
          .footer-bottom { flex-direction: column; gap: 12px; align-items: center; text-align: center; }
          .desc-buttons { grid-template-columns: 1fr; width: 100%; }
          .footer-email { font-size: 18px !important; }
          .footer-right { text-align: left !important; }
          .hero-inner { flex-direction: column; align-items: center; padding: 32px 24px 0 !important; min-height: auto !important; }
          .hero-photo { width: 80% !important; max-width: 320px !important; height: 420px !important; align-self: center !important; margin: 24px auto 0 !important; display: block !important; }
          .hero-title { font-size: 32px !important; white-space: normal !important; }
          .hero-sub { font-size: 16px !important; white-space: normal !important; }
          .hero-desc { white-space: normal !important; }
        }
      `}</style>

      {/* NAV */}
      <nav style={{ position: 'sticky', top: 0, zIndex: 50, background: 'white', borderBottom: '1px solid #eee' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 32, padding: '12px 40px', position: 'relative' }}>
          <div className="nav-center">
            <div style={{ fontSize: 28, fontWeight: 400, letterSpacing: '0.15em', textTransform: 'uppercase' as const, lineHeight: '1' }}>Theogene Sibomana</div>
            <div style={{ fontSize: 11, letterSpacing: '0.12em', color: '#aaa', textTransform: 'uppercase' as const, marginTop: 2 }}>Ideas. Leadership. Impact.</div>
          </div>
          <div className="nav-links" style={{ flex: 1 }}>
            <a href="/" style={S.navLink}>Home</a>
            <a href="/about" style={S.navLink}>About Me</a>
            <a href="/my-work" style={S.navLink}>My Work</a>
            <a href="/books" style={S.navLink}>Books</a>
            <a href="/ideas" style={S.navLink}>Ideas</a>
          </div>
          <a href="/contact" className="nav-btn" style={S.navBtn}>Let&apos;s Connect &rarr;</a>
          <button className="nav-hamburger" onClick={() => setMenuOpen(o => !o)} aria-label="Toggle menu">
            <span style={{ width: 24, height: 2, background: '#333', display: 'block', transition: 'transform 0.2s', transform: menuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none' }} />
            <span style={{ width: 24, height: 2, background: '#333', display: 'block', opacity: menuOpen ? 0 : 1, transition: 'opacity 0.2s' }} />
            <span style={{ width: 24, height: 2, background: '#333', display: 'block', transition: 'transform 0.2s', transform: menuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none' }} />
          </button>
        </div>
        {menuOpen && (
          <div className="mobile-menu">
            {[{l:'Home',h:'/'},{l:'About Me',h:'/about'},{l:'My Work',h:'/my-work'},{l:'Books',h:'/books'},{l:'Ideas',h:'/ideas'}].map(({l,h}) => (
              <a key={l} href={h} onClick={() => setMenuOpen(false)} style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.15em', color: '#888', textDecoration: 'none', textTransform: 'uppercase' as const, padding: '12px 0', borderBottom: '1px solid #f5f5f5' }}>{l}</a>
            ))}
            <a href="/contact" onClick={() => setMenuOpen(false)} style={{ marginTop: 12, display: 'inline-block', fontSize: 12, fontWeight: 900, padding: '14px 24px', borderRadius: 999, textTransform: 'uppercase' as const, letterSpacing: '0.12em', background: '#4b5320', color: '#fff', textDecoration: 'none', border: '2px solid #3a4119', alignSelf: 'flex-start' }}>Let&apos;s Connect &rarr;</a>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section style={{ position: 'relative', overflow: 'hidden', minHeight: 420 }}>
        {/* Kigali city background */}
        <Image
          src="/city of kigali.jpg"
          alt="City of Kigali"
          fill
          style={{ objectFit: 'cover', objectPosition: 'center top' }}
          priority
        />
        {/* Dark overlay */}
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.45)' }} />

        {/* Content row */}
        <div className="hero-inner" style={{ position: 'relative', zIndex: 2, maxWidth: 980, margin: '0 auto', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', padding: '48px 40px 0', minHeight: 420 }}>

          {/* Left — text */}
          <div style={{ flex: 1, paddingBottom: 56, maxWidth: 600, width: '100%' }}>
            <h1 className="hero-title" style={{ fontSize: 48, fontWeight: 900, lineHeight: 1.1, color: 'white', margin: '0 0 8px', fontFamily: 'Georgia, serif' }}>
              Theogene Sibomana
            </h1>
            <p className="hero-sub" style={{ fontSize: 22, fontStyle: 'italic', fontWeight: 400, color: 'white', margin: '0 0 24px', fontFamily: 'Georgia, serif' }}>
              Ideas. Leadership. Impact.
            </p>
            <p className="hero-desc" style={{ fontSize: 14, color: 'rgba(255,255,255,0.85)', lineHeight: 1.75, margin: '0 0 32px' }}>
              Building ideas, developing people,<br />
              and creating practical solutions for sustainable growth.
            </p>
            <a
              href="/my-work"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 10,
                background: 'white', color: '#1a2a3a',
                padding: '12px 28px', borderRadius: 999,
                fontSize: 13, fontWeight: 700, letterSpacing: '0.06em',
                textDecoration: 'none', boxShadow: '0 2px 12px rgba(0,0,0,0.15)',
                border: '1.5px solid rgba(0,0,0,0.1)',
              }}
            >
              Discover My Work &nbsp;→
            </a>
          </div>

          {/* Right — profile photo */}
          <div className="hero-photo" style={{ flexShrink: 0, alignSelf: 'flex-end', position: 'relative', width: 460, height: 560 }}>
            <Image
              src="/Theo profile image.png"
              alt="Theogene Sibomana"
              width={460}
              height={560}
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }}
              priority
            />
          </div>
        </div>
      </section>

      {/* DESCRIPTION */}
      <section style={{ maxWidth: 580, margin: '0 auto', padding: '72px 32px 60px', textAlign: 'center' }}>
        <p style={{ color: '#555', lineHeight: 1.85, marginBottom: 40, fontSize: 14 }}>
          Building ideas, developing people, and creating practical solutions for sustainable growth. Through entrepreneurship, authorship and education, Theogene Sibomana empowers individuals and institutions across Africa to create lasting wealth and impact.
        </p>
        <h2 style={{ fontSize: 34, fontWeight: 900, lineHeight: 1.3, marginBottom: 40 }}>
          Discover the work and{' '}
          <em style={{ fontFamily: 'Georgia,serif', fontWeight: 400, fontStyle: 'italic' }}>ideas</em>{' '}
          shaping a prosperous Africa.
        </h2>
        <div className="desc-buttons">
          {[
            { label: 'My Books', Icon: Books, bg: '#1a1a1a', color: 'white', href: '/books' },
            { label: 'Igeno Gate Rwanda', Icon: House, bg: '#1a1a1a', color: 'white', href: '/my-work' },
            { label: 'Wealth School Africa', Icon: Globe, bg: '#4b5320', color: '#fff', href: '/my-work' },
            { label: 'Ideas & Insights', Icon: Lightbulb, bg: '#1a1a1a', color: 'white', href: '/ideas' },
          ].map(s => (
            <a key={s.label} href={s.href} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, background: s.bg, color: s.color, padding: '20px 32px', borderRadius: 999, fontSize: 14, fontWeight: 900, letterSpacing: '0.08em', textDecoration: 'none', textTransform: 'uppercase' as const, whiteSpace: 'nowrap' }}>
              <s.Icon size={24} weight="duotone" style={{ flexShrink: 0 }} /> {s.label}{s.label === 'My Books' && <span style={{ fontSize: 11, fontWeight: 400, opacity: 0.7, marginLeft: 6 }}>— Read & Explore</span>}
            </a>
          ))}
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section style={{ background: '#4b5320', padding: '72px 0 0', position: 'relative', overflow: 'hidden' }}>
        <div className="about-inner" style={{ maxWidth: 920, margin: '0 auto', padding: '0 40px 72px' }}>
          <div style={{ flexShrink: 0, position: 'relative', width: 280, height: 360, minHeight: 360 }}>
            <div style={{ position: 'absolute', left: 8, top: 30, width: 44, height: 290, background: '#2b8fc9', borderRadius: 22, opacity: 0.85, transform: 'rotate(-6deg)' }} />
            <div style={{ position: 'absolute', left: 38, top: 10, width: 24, height: 170, background: '#2b8fc9', borderRadius: 12, opacity: 0.6, transform: 'rotate(-3deg)' }} />
            <div style={{ position: 'absolute', left: 60, top: 0, width: 210, height: 340, overflow: 'hidden', boxShadow: '0 20px 50px rgba(0,0,0,0.3)' }}>
              <Image src="/Theo profile image - Copy.png" alt="Theogene Sibomana" width={210} height={340} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          </div>
          <div style={{ flex: 1 }}>
            <h2 style={{ fontSize: 42, fontWeight: 900, lineHeight: 1.2, marginBottom: 24, color: 'white' }}>
              ABOUT <em style={{ fontFamily: 'Georgia,serif', fontWeight: 400 }}>Theogene</em> SIBOMANA
            </h2>
            <p style={{ color: 'white', lineHeight: 1.85, marginBottom: 18, fontSize: 14 }}>
              I am an entrepreneur, author and educator, passionate about empowering people, strengthening institutions and promoting wealth creation through knowledge.
            </p>
            <p style={{ color: 'white', lineHeight: 1.85, fontSize: 14 }}>
              Through Igeno Gate Rwanda and Wealth School Africa, I contribute to care &amp; family wellbeing and wealth education &mdash; building a more educated, healthy and prosperous Africa.
            </p>
          </div>
        </div>
        <svg viewBox="0 0 1200 48" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', width: '100%', marginBottom: -1 }}>
          <path d="M0,24 Q150,0 300,24 Q450,48 600,24 Q750,0 900,24 Q1050,48 1200,24 L1200,48 L0,48 Z" fill="white" />
        </svg>
      </section>

      {/* QUOTE */}
      <section style={{ maxWidth: 620, margin: '0 auto', padding: '64px 32px', textAlign: 'center' }}>
        <p style={{ color: '#555', lineHeight: 1.9, marginBottom: 28, fontSize: 14 }}>
          For years, Theogene Sibomana has worked with communities across Africa, hearing the same desire:{' '}
          <em>&quot;We want to build wealth, but we don&apos;t know where to start.&quot;</em>{' '}
          As he dug deeper into the root causes of poverty and the true drivers of prosperity, Theogene discovered something transformative: the antidote to poverty wasn&apos;t just money &mdash; it was knowledge, mindset and practical action.
        </p>
        <p style={{ color: '#555', lineHeight: 1.9, fontSize: 14 }}>
          His books and initiatives are more than resources &mdash; they are a movement. Wealth School Africa and Igeno Gate Rwanda equip individuals with actionable steps to break through financial barriers and design lives rooted in purpose, health and prosperity. Begin your journey today.
        </p>
      </section>

      {/* BOOKS SLIDER */}
      <section style={{ background: '#2a2a2a', padding: '72px 40px' }}>
        <div style={{ maxWidth: 920, margin: '0 auto', display: 'flex', alignItems: 'center', gap: 48, flexWrap: 'wrap', justifyContent: 'center' }}>
          <div style={{ flex: '1 1 220px', color: 'white' }}>
            <p style={{ fontSize: 30, fontWeight: 900, lineHeight: 1.35 }}>
              EXPLORE <em style={{ fontFamily: 'Georgia,serif', fontWeight: 400 }}>books &amp; resources</em><br />
              FROM THEOGENE SIBOMANA
            </p>
          </div>
          <div style={{ display: 'flex', gap: 20, overflowX: 'auto', paddingBottom: 8 }}>
            {[
              { src: '/Book cover.jpeg', title: 'Book Cover' },
              { src: '/Books/book1.jpg', title: 'Wealth School Africa' },
              { src: '/Books/book2.jpg', title: 'Personal Financial Success' },
              { src: '/Books/book3.jpg', title: 'Leadership For Impact' },
              { src: '/Books/book4.jpeg', title: 'Wealth School Africa' },
            ].map((book, i) => (
              <div key={i} style={{ flexShrink: 0, width: 220, height: 300, overflow: 'hidden', boxShadow: '0 12px 36px rgba(0,0,0,0.5)', border: '3px solid rgba(255,255,255,0.1)', transform: i % 2 === 0 ? 'rotate(-2deg)' : 'rotate(2deg)' }}>
                <Image src={book.src} alt={book.title} width={220} height={300} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ORDER CTA */}
      <section style={{ background: '#2a2a2a', padding: '72px 40px' }}>
        <div style={{ maxWidth: 920, margin: '0 auto', display: 'flex', alignItems: 'center', gap: 48, flexWrap: 'wrap', justifyContent: 'center' }}>
          <div style={{ flex: '1 1 220px', color: 'white' }}>
            <p style={{ fontSize: 30, fontWeight: 900, lineHeight: 1.35 }}>
              EXPLORE <em style={{ fontFamily: 'Georgia,serif', fontWeight: 400 }}>books and</em><br />
              <em style={{ fontFamily: 'Georgia,serif', fontWeight: 400 }}>resources</em> FROM<br />
              THEOGENE<br />SIBOMANA
            </p>
          </div>
          <div style={{ position: 'relative', flexShrink: 0 }}>
            <div style={{ width: 210, height: 270, borderRadius: '50% 50% 6px 6px / 30% 30% 6px 6px', overflow: 'hidden', boxShadow: '0 24px 56px rgba(0,0,0,0.55)' }}>
              <Image src="/Books/book1.jpg" alt="Wealth School Africa" width={210} height={270} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ position: 'absolute', top: -14, right: -22, width: 92, height: 92, borderRadius: '50%', background: '#4b5320', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', fontSize: 9.5, fontWeight: 900, lineHeight: 1.45, color: '#fff', boxShadow: '0 4px 20px rgba(0,0,0,0.4)' }}>
              GET THE<br /><em style={{ fontFamily: 'Georgia,serif', fontSize: 12, fontStyle: 'italic' }}>book</em><br />NOW
            </div>
          </div>
          <div style={{ flex: '1 1 220px', color: '#bbb', fontSize: 14, lineHeight: 1.85 }}>
            All readers get exclusive access to Theogene Sibomana&apos;s wealth-building resources and community.
          </div>
        </div>
      </section>

      {/* 3 STEPS */}
      <section style={{ background: '#f0f4f8', padding: '72px 32px' }}>
        <div style={{ maxWidth: 820, margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: 26, fontWeight: 900, textTransform: 'uppercase', marginBottom: 4 }}>
            3 WAYS TO ENGAGE WITH <em style={{ fontFamily: 'Georgia,serif', fontWeight: 400, fontStyle: 'italic' }}>Theogene</em>
          </h2>
          <h2 style={{ fontSize: 26, fontWeight: 900, textTransform: 'uppercase', marginBottom: 52 }}>SIBOMANA&apos;S WORK</h2>
          <div className="steps-grid">
            {[
              { Icon: BookOpen, label: 'Read his books', yellow: false },
              { Icon: GlobeIcon, label: 'Join Wealth School Africa', yellow: true },
              { Icon: Handshake, label: 'Partner with Igeno Gate Rwanda', yellow: false },
            ].map(s => (
              <div key={s.label} style={{ background: s.yellow ? '#4b5320' : 'white', borderRadius: 16, padding: '44px 20px', boxShadow: '0 4px 20px rgba(0,0,0,0.07)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18 }}>
                <s.Icon size={48} weight="duotone" color={s.yellow ? 'white' : 'currentColor'} />
                <p style={{ fontWeight: 700, fontSize: 14, color: s.yellow ? '#fff' : '#333' }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BOOK TOUR */}
      <section id="tour" style={{ background: '#1a1a2e', padding: '88px 32px', color: 'white', textAlign: 'center' }}>
        <div style={{ maxWidth: 620, margin: '0 auto' }}>
          <h2 style={{ fontSize: 34, fontWeight: 900, textTransform: 'uppercase', marginBottom: 18 }}>
            BOOKS &amp; <em style={{ fontFamily: 'Georgia,serif', fontWeight: 400 }}>Publications</em> BY THEOGENE
          </h2>
          <p style={{ color: '#ccc', marginBottom: 36, fontSize: 14, lineHeight: 1.85 }}>
            Get your copy of Theogene Sibomana&apos;s books and start your journey toward wealth, leadership and impact. Register your interest now!
          </p>
          <form onSubmit={handleTourSubmit} style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
            <input className="tour-input" style={{ flex: '1 1 160px', padding: '13px 18px', borderRadius: 8, border: 'none', outline: 'none', fontSize: 13, background: 'rgba(255,255,255,0.12)', color: 'white' }} placeholder="YOUR NAME" value={tourName} onChange={e => setTourName(e.target.value)} required />
            <input className="tour-input" type="email" style={{ flex: '1 1 160px', padding: '13px 18px', borderRadius: 8, border: 'none', outline: 'none', fontSize: 13, background: 'rgba(255,255,255,0.12)', color: 'white' }} placeholder="EMAIL ADDRESS" value={tourEmail} onChange={e => setTourEmail(e.target.value)} required />
            <button type="submit" style={{ background: '#4b5320', color: '#fff', fontWeight: 900, padding: '13px 30px', borderRadius: 8, border: 'none', cursor: 'pointer', fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase' as const }}>Submit</button>
          </form>
          {tourMsg && <p style={{ marginTop: 18, color: tourMsg.startsWith('Error') ? '#ff6b6b' : '#a8d08d', fontWeight: 700 }}>{tourMsg}</p>}
        </div>
      </section>

      {/* FAQ */}
      <section style={{ maxWidth: 720, margin: '0 auto', padding: '72px 32px' }}>
        <h2 style={{ fontSize: 34, fontWeight: 900, textAlign: 'center', marginBottom: 44 }}>
          FREQUENTLY <em style={{ fontFamily: 'Georgia,serif', fontWeight: 400 }}>asked</em> Questions
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {faqs.map((faq, i) => (
            <div key={i} style={{ border: '1px solid #e5e7eb', borderRadius: 8, overflow: 'hidden' }}>
              <button onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 24px', textAlign: 'left', fontWeight: 700, fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase' as const, background: 'white', border: 'none', cursor: 'pointer' }}>
                <span>{faq.q}</span>
                <span style={{ fontSize: 22, marginLeft: 16, flexShrink: 0 }}>{openFaq === i ? '−' : '+'}</span>
              </button>
              {openFaq === i && faq.a && (
                <div style={{ padding: '16px 24px', fontSize: 14, color: '#555', lineHeight: 1.85, borderTop: '1px solid #f3f4f6', whiteSpace: 'pre-line' }}>{faq.a}</div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* NEWSLETTER */}
      <section style={{ background: '#4b5320', padding: '72px 32px' }}>
        <div style={{ maxWidth: 580, margin: '0 auto', textAlign: 'center' }}>
          <p style={{ fontSize: 10, fontWeight: 900, letterSpacing: '0.25em', textTransform: 'uppercase' as const, color: '#c8d4a0', marginBottom: 14 }}>Ideas. Leadership. Impact.</p>
          <h2 style={{ fontSize: 34, fontWeight: 900, lineHeight: 1.3, marginBottom: 18, color: 'white' }}>
            GET <em style={{ fontFamily: 'Georgia,serif', fontWeight: 400 }}>Theogene Sibomana&apos;s</em> IDEAS &amp; INSIGHTS
          </h2>
          <p style={{ color: '#c8d4a0', fontSize: 13, lineHeight: 1.85, marginBottom: 36 }}>
            Monthly, Theogene shares practical insights on leadership, wealth creation and personal growth. Join the journey toward a more educated, healthy and prosperous Africa!
          </p>
          <form onSubmit={handleNewsSubmit} style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <input className="news-input" style={{ flex: '1 1 140px', padding: '13px 18px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.3)', outline: 'none', fontSize: 13, background: 'rgba(255,255,255,0.15)', color: 'white' }} placeholder="YOUR NAME" value={newsName} onChange={e => setNewsName(e.target.value)} required />
            <input className="news-input" type="email" style={{ flex: '1 1 140px', padding: '13px 18px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.3)', outline: 'none', fontSize: 13, background: 'rgba(255,255,255,0.15)', color: 'white' }} placeholder="EMAIL ADDRESS" value={newsEmail} onChange={e => setNewsEmail(e.target.value)} required />
            <button type="submit" style={{ background: '#1a1a1a', color: 'white', fontWeight: 900, padding: '13px 22px', borderRadius: 8, border: 'none', cursor: 'pointer', fontSize: 20, flexShrink: 0 }}>&#8250;</button>
          </form>
          {newsMsg && <p style={{ margin: '18px 0 0 0', fontWeight: 700, color: newsMsg.startsWith('Error') ? '#ff6b6b' : '#a8d08d' }}>{newsMsg}</p>}
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: '#111', color: '#888', padding: '64px 40px 48px' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <div style={{ borderTop: '1px solid #333', marginBottom: 48 }} />
          <div className="footer-grid">
            <div>
              <p style={{ color: '#aaa', fontSize: 13, lineHeight: 1.7, marginBottom: 16 }}>Ready to build ideas that<br />create lasting impact?</p>
              <p style={{ color: 'white', fontSize: 15, fontWeight: 700, lineHeight: 1.6 }}>Let&apos;s make it happen.<br />Connect with me today!</p>
            </div>
            <div>
              <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', color: '#888', textTransform: 'uppercase', marginBottom: 16 }}>Let&apos;s Talk</p>
              <p style={{ color: '#aaa', fontSize: 13, marginBottom: 8 }}>theogenesibo.com</p>
              <p className="footer-email" style={{ color: 'white', fontSize: 28, fontWeight: 300, letterSpacing: '-0.01em', marginBottom: 16, borderBottom: '1px solid #333', paddingBottom: 16 }}>hello@theogenesibo.com</p>
              <p style={{ color: '#888', fontSize: 12 }}>Entrepreneur. Author. Educator.</p>
              <p style={{ color: '#666', fontSize: 12 }}>(Based in Rwanda)</p>
            </div>
            <div className="footer-right" style={{ textAlign: 'right' }}>
              {[{l:'Home',h:'/'},{l:'About Me',h:'/about'},{l:'My Work',h:'/my-work'},{l:'Books & Publications',h:'/books'},{l:'Ideas & Insights',h:'/ideas'},{l:'Contact',h:'/contact'}].map(({l,h}) => (
                <p key={l} style={{ marginBottom: 12 }}>
                  <a href={h} style={{ color: 'white', textDecoration: 'none', fontSize: 15, fontWeight: 500 }}>{l}</a>
                </p>
              ))}
              <div style={{ display: 'flex', gap: 14, justifyContent: 'flex-end', marginTop: 20 }}>
                <a href="https://rw.linkedin.com/in/theogene-sibomana-rn-152464161" target="_blank" rel="noopener noreferrer" style={{ color: '#888', transition: 'color 0.2s' }} onMouseEnter={e => (e.currentTarget.style.color='white')} onMouseLeave={e => (e.currentTarget.style.color='#888')}><LinkedinLogo size={22} weight="fill" /></a>
                <a href="https://www.facebook.com/ihca.iwawe/" target="_blank" rel="noopener noreferrer" style={{ color: '#888', transition: 'color 0.2s' }} onMouseEnter={e => (e.currentTarget.style.color='white')} onMouseLeave={e => (e.currentTarget.style.color='#888')}><FacebookLogo size={22} weight="fill" /></a>
                <a href="https://www.instagram.com/theosibo1?utm_source=qr&gwpx=eWcyaG9qeTZ4d3N5" target="_blank" rel="noopener noreferrer" style={{ color: '#888', transition: 'color 0.2s' }} onMouseEnter={e => (e.currentTarget.style.color='white')} onMouseLeave={e => (e.currentTarget.style.color='#888')}><InstagramLogo size={22} weight="fill" /></a>
                <a href="https://x.com/Theosibo1" target="_blank" rel="noopener noreferrer" style={{ color: '#888', transition: 'color 0.2s' }} onMouseEnter={e => (e.currentTarget.style.color='white')} onMouseLeave={e => (e.currentTarget.style.color='#888')}><XLogo size={22} weight="fill" /></a>
                <a href="https://youtube.com/@theosibo1?si=DG_n1OCMEPtP2GAO" target="_blank" rel="noopener noreferrer" style={{ color: '#888', transition: 'color 0.2s' }} onMouseEnter={e => (e.currentTarget.style.color='white')} onMouseLeave={e => (e.currentTarget.style.color='#888')}><YoutubeLogo size={22} weight="fill" /></a>
              </div>
            </div>
          </div>
          <div className="footer-bottom" style={{ borderTop: '1px solid #222', paddingTop: 24 }}>
            <span>&copy; 2026 Theogene Sibomana. All rights reserved. | theogenesibo.com</span>
            <div style={{ display: 'flex', gap: 20 }}>
              <a href="#" style={{ color: '#555', textDecoration: 'none' }}>Privacy</a>
              <a href="#" style={{ color: '#555', textDecoration: 'none' }}>Terms</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
