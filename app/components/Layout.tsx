'use client'
import { useState } from 'react'
import { LinkedinLogo, FacebookLogo, InstagramLogo, XLogo, YoutubeLogo } from '@phosphor-icons/react'

export default function Layout({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      <style>{`
        .nav-links { display: flex; gap: 32px; }
        .nav-center { position: absolute; left: 50%; transform: translateX(-50%); text-align: center; }
        .nav-btn { display: inline-block; }
        .nav-hamburger { display: none; }
        .mobile-menu { display: none; }
        .footer-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 40px; margin-bottom: 56px; }
        .footer-bottom { display: flex; justify-content: space-between; font-size: 11px; color: #555; }
        @media (max-width: 768px) {
          .nav-links { display: none; }
          .nav-btn { display: none; }
          .nav-center { position: static; transform: none; text-align: left; flex: 1; }
          .nav-hamburger { display: flex; flex-direction: column; gap: 5px; cursor: pointer; padding: 4px; background: none; border: none; }
          .mobile-menu { display: flex; flex-direction: column; gap: 0; background: white; border-bottom: 1px solid #eee; padding: 8px 24px 16px; }
          .footer-grid { grid-template-columns: 1fr; }
          .footer-bottom { flex-direction: column; gap: 12px; align-items: center; text-align: center; }
          .footer-email { font-size: 18px !important; }
          .footer-right { text-align: left !important; }
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
            <a href="/" style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.15em', color: '#888', textDecoration: 'none', textTransform: 'uppercase' as const }}>Home</a>
            <a href="/about" style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.15em', color: '#888', textDecoration: 'none', textTransform: 'uppercase' as const }}>About Me</a>
            <a href="/my-work" style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.15em', color: '#888', textDecoration: 'none', textTransform: 'uppercase' as const }}>My Work</a>
            <a href="/books" style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.15em', color: '#888', textDecoration: 'none', textTransform: 'uppercase' as const }}>Books</a>
            <a href="/ideas" style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.15em', color: '#888', textDecoration: 'none', textTransform: 'uppercase' as const }}>Ideas</a>
          </div>
          <a href="/contact" className="nav-btn" style={{ fontSize: 13, fontWeight: 900, padding: '16px 28px', borderRadius: 999, textTransform: 'uppercase' as const, letterSpacing: '0.12em', background: '#4b5320', color: '#fff', textDecoration: 'none', border: '2px solid #3a4119' }}>Let&apos;s Connect &rarr;</a>
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

      {children}

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
              <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', color: '#888', textTransform: 'uppercase' as const, marginBottom: 16 }}>Let&apos;s Talk</p>
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
    </>
  )
}
