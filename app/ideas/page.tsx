const S: Record<string, React.CSSProperties> = {
  nav: { position: 'sticky', top: 0, zIndex: 50, background: 'white', borderBottom: '1px solid #eee', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 40px' },
  navLink: { fontSize: 11, fontWeight: 700, letterSpacing: '0.15em', color: '#888', textDecoration: 'none', textTransform: 'uppercase' },
  navCenter: { position: 'absolute', left: '50%', transform: 'translateX(-50%)', textAlign: 'center' },
  navTitle: { fontSize: 14, fontWeight: 900, letterSpacing: '0.25em', textTransform: 'uppercase', lineHeight: '1' },
  navSub: { fontSize: 8, letterSpacing: '0.12em', color: '#aaa', textTransform: 'uppercase', marginTop: 2 },
  navBtn: { fontSize: 11, fontWeight: 900, padding: '8px 22px', borderRadius: 999, textTransform: 'uppercase', letterSpacing: '0.12em', background: '#d4e600', color: '#000', textDecoration: 'none', border: '2px solid #b8cc00' },
}

const articles = [
  { tag: 'Leadership', title: 'The 3 Qualities Every African Leader Must Develop', excerpt: 'Leadership is not a title — it is a responsibility. Here are the three qualities that separate good leaders from transformational ones.' },
  { tag: 'Wealth', title: 'Why Financial Education is Africa\'s Greatest Asset', excerpt: 'Before you can build wealth, you must understand it. Financial literacy is the foundation of every prosperous community.' },
  { tag: 'Personal Growth', title: 'How to Build Habits That Create Lasting Change', excerpt: 'Change does not happen overnight. It is the result of small, consistent actions repeated daily with intention and purpose.' },
  { tag: 'Wealth', title: 'The Difference Between Earning and Building Wealth', excerpt: 'Many people earn money but few build wealth. Understanding this distinction is the first step toward financial freedom.' },
  { tag: 'Leadership', title: 'Strengthening Institutions for Sustainable Growth', excerpt: 'Strong institutions are the backbone of prosperous nations. Here is how we can build them from the ground up.' },
  { tag: 'Personal Growth', title: 'Purpose-Driven Living: Finding Your Why', excerpt: 'When you know your purpose, every decision becomes clearer. Purpose is the compass that guides you through uncertainty.' },
]

export default function IdeasPage() {
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
        <a href="/contact" style={S.navBtn as React.CSSProperties}>Let&apos;s Connect →</a>
      </nav>

      {/* HERO */}
      <section style={{ background: '#111', padding: '80px 40px', textAlign: 'center' }}>
        <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#d4e600', marginBottom: 16 }}>Ideas &amp; Insights</p>
        <h1 style={{ color: 'white', fontSize: 48, fontWeight: 900, lineHeight: 1.1 }}>Thoughts on <em style={{ fontFamily: 'Georgia,serif', fontStyle: 'italic', fontWeight: 400 }}>leadership,</em><br />wealth &amp; growth</h1>
        <div style={{ width: 80, height: 3, background: '#d4e600', margin: '20px auto 0' }} />
      </section>

      {/* ARTICLES */}
      <section style={{ maxWidth: 960, margin: '0 auto', padding: '80px 40px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 36 }}>
          {articles.map((a, i) => (
            <div key={i} style={{ background: 'white', boxShadow: '0 4px 20px rgba(0,0,0,0.07)', borderTop: '3px solid #d4e600', padding: '32px 28px' }}>
              <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#999' }}>{a.tag}</span>
              <h3 style={{ fontWeight: 900, fontSize: 16, lineHeight: 1.4, margin: '12px 0 16px' }}>{a.title}</h3>
              <p style={{ color: '#666', fontSize: 13, lineHeight: 1.75, marginBottom: 24 }}>{a.excerpt}</p>
              <a href="#" style={{ fontSize: 11, fontWeight: 700, color: '#111', letterSpacing: '0.1em', textTransform: 'uppercase', textDecoration: 'none', borderBottom: '2px solid #d4e600', paddingBottom: 2 }}>Read More →</a>
            </div>
          ))}
        </div>
      </section>

      <footer style={{ background: '#111', color: '#555', padding: '40px', textAlign: 'center', fontSize: 12 }}>
        <p style={{ color: 'white', fontWeight: 700, marginBottom: 8 }}>Theogene Sibomana</p>
        <p>© 2026 All rights reserved. | theosibomana.com</p>
      </footer>
    </main>
  )
}
