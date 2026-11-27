import Image from 'next/image'
import Layout from '../components/Layout'

export default function AboutPage() {
  return (
    <Layout>
      <main style={{ fontFamily: 'Arial, sans-serif', width: '100%', overflowX: 'hidden' }}>
        {/* HERO */}
        <section style={{ background: '#111', padding: '80px 40px', textAlign: 'center' }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#4b5320', marginBottom: 16 }}>About Me</p>
          <h1 style={{ color: 'white', fontSize: 48, fontWeight: 900, lineHeight: 1.1, marginBottom: 0 }}>Theogene <em style={{ fontFamily: 'Georgia,serif', fontStyle: 'italic', fontWeight: 400 }}>Sibomana</em></h1>
          <div style={{ width: 80, height: 3, background: '#4b5320', margin: '20px auto 0' }} />
        </section>

        {/* BIO */}
        <section style={{ maxWidth: 900, margin: '0 auto', padding: '80px 40px', display: 'flex', gap: 64, alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ width: 260, height: 320, overflow: 'hidden', flexShrink: 0, boxShadow: '0 16px 48px rgba(0,0,0,0.12)' }}>
            <Image src="/Theo profile image.png" alt="Theogene Sibomana" width={260} height={320} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div style={{ flex: 1, minWidth: 280 }}>
            <h2 style={{ fontSize: 32, fontWeight: 900, marginBottom: 24 }}>Entrepreneur. Author. Educator.</h2>
            <p style={{ color: '#555', lineHeight: 1.85, fontSize: 15, marginBottom: 20 }}>
              I am an entrepreneur, author and educator, passionate about empowering people, strengthening institutions and promoting wealth creation through knowledge.
            </p>
            <p style={{ color: '#555', lineHeight: 1.85, fontSize: 15, marginBottom: 20 }}>
              Through Igeno Gate Rwanda and Wealth School Africa, I contribute to care &amp; family wellbeing and wealth education — building a more educated, healthy and prosperous Africa.
            </p>
            <p style={{ color: '#555', lineHeight: 1.85, fontSize: 15 }}>
              My mission is simple: to build ideas, develop people, and create practical solutions for sustainable growth across the African continent.
            </p>
          </div>
        </section>

        {/* VALUES */}
        <section style={{ background: '#f7f7f7', padding: '80px 40px' }}>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <h2 style={{ fontSize: 32, fontWeight: 900, textAlign: 'center', marginBottom: 56 }}>What Drives Me</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32 }}>
              {[
                { icon: '💡', title: 'Ideas', desc: 'Every transformation begins with a bold idea. I believe in the power of knowledge to change lives.' },
                { icon: '🤝', title: 'Leadership', desc: 'Strong leaders build strong communities. I invest in developing leaders at every level.' },
                { icon: '🌍', title: 'Impact', desc: 'Sustainable growth requires practical action. I create solutions that make a real difference.' },
              ].map(v => (
                <div key={v.title} style={{ background: 'white', padding: '40px 28px', boxShadow: '0 4px 20px rgba(0,0,0,0.06)', borderTop: '4px solid #4b5320' }}>
                  <span style={{ fontSize: 36, display: 'block', marginBottom: 16 }}>{v.icon}</span>
                  <h3 style={{ fontWeight: 900, fontSize: 18, marginBottom: 12 }}>{v.title}</h3>
                  <p style={{ color: '#666', fontSize: 14, lineHeight: 1.75 }}>{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </Layout>
  )
}
