import Image from 'next/image'
import Layout from '../components/Layout'

export default function MyWorkPage() {
  return (
    <Layout>
      <main style={{ fontFamily: 'Arial, sans-serif', width: '100%', overflowX: 'hidden' }}>
        {/* HERO */}
        <section style={{ background: '#111', padding: '80px 40px', textAlign: 'center' }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#4b5320', marginBottom: 16 }}>My Work</p>
          <h1 style={{ color: 'white', fontSize: 48, fontWeight: 900, lineHeight: 1.1 }}>Initiatives &amp; <em style={{ fontFamily: 'Georgia,serif', fontStyle: 'italic', fontWeight: 400 }}>Impact</em></h1>
          <div style={{ width: 80, height: 3, background: '#4b5320', margin: '20px auto 0' }} />
        </section>

        {/* INTRO */}
        <section style={{ maxWidth: 720, margin: '0 auto', padding: '72px 40px', textAlign: 'center' }}>
          <p style={{ color: '#555', lineHeight: 1.85, fontSize: 16 }}>
            Through two flagship initiatives, I work to empower individuals, strengthen families and build wealth across Africa.
          </p>
        </section>

        {/* INITIATIVES */}
        <section style={{ maxWidth: 900, margin: '0 auto', padding: '0 40px 80px', display: 'flex', flexDirection: 'column', gap: 64 }}>
          {[
            {
              name: 'Igeno Gate Rwanda',
              tagline: 'Care. Train. Support.',
              desc: 'Igeno Gate Rwanda is dedicated to family wellbeing, care and community support. We work with families to strengthen their foundations — emotionally, physically and socially — so they can thrive together.',
              pillars: ['Family Care', 'Community Training', 'Wellbeing Support'],
              img: '/Theo profile image.png',
              reverse: false,
            },
            {
              name: 'Wealth School Africa (WSA)',
              tagline: 'Learn. Grow. Prosper.',
              desc: 'Wealth School Africa equips individuals with the knowledge, tools and mindset to build lasting financial freedom. Through books, workshops and education programs, WSA is transforming how Africa thinks about wealth.',
              pillars: ['Financial Education', 'Wealth Building', 'Entrepreneurship'],
              img: '/Books/book1.jpg',
              reverse: true,
            },
          ].map(org => (
            <div key={org.name} style={{ display: 'flex', gap: 56, alignItems: 'center', flexDirection: org.reverse ? 'row-reverse' : 'row', flexWrap: 'wrap' }}>
              <div style={{ width: 280, height: 320, overflow: 'hidden', flexShrink: 0, boxShadow: '0 16px 48px rgba(0,0,0,0.12)' }}>
                <Image src={org.img} alt={org.name} width={280} height={320} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ flex: 1, minWidth: 260 }}>
                <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#999', marginBottom: 8 }}>{org.tagline}</p>
                <h2 style={{ fontSize: 30, fontWeight: 900, marginBottom: 20 }}>{org.name}</h2>
                <p style={{ color: '#555', lineHeight: 1.85, fontSize: 15, marginBottom: 24 }}>{org.desc}</p>
                <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                  {org.pillars.map(p => (
                    <span key={p} style={{ background: '#4b5320', color: '#fff', padding: '6px 16px', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>{p}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </section>
      </main>
    </Layout>
  )
}
