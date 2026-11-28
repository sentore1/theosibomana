'use client'
import Image from 'next/image'
import { useState } from 'react'
import Layout from '../components/Layout'

const books = [
  { src: '/Book cover.jpeg', title: 'Wealth School Africa', sub: 'Build Wealth, Create Freedom', price: 'RWF 5,000' },
  { src: '/Books/book1.jpg', title: 'Wealth School Africa', sub: 'Build Wealth, Create Freedom', price: 'RWF 5,000' },
  { src: '/Books/book2.jpg', title: 'Personal Financial Success', sub: 'Plan • Save • Invest • Grow', price: 'RWF 4,500' },
  { src: '/Books/book3.jpg', title: 'Leadership For Impact', sub: 'Lead with Purpose', price: 'RWF 4,500' },
]

const MOMO_NUMBER = '0788433298'
const MOMO_NAME = 'Theogene Sibomana'

export default function BooksPage() {
  const [selected, setSelected] = useState<typeof books[0] | null>(null)
  const [file, setFile] = useState<File | null>(null)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [bookType, setBookType] = useState<'soft' | 'hard' | ''>('')
  const [deliveryAddress, setDeliveryAddress] = useState('')
  const [deliveryEmail, setDeliveryEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  function openModal(book: typeof books[0]) {
    setSelected(book); setFile(null); setName(''); setPhone('')
    setBookType(''); setDeliveryAddress(''); setDeliveryEmail(''); setSubmitted(false)
  }
  function closeModal() { setSelected(null); setSubmitted(false) }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!file || !name || !phone || !bookType) return
    if (bookType === 'hard' && !deliveryAddress) return
    if (bookType === 'soft' && !deliveryEmail) return
    setLoading(true)
    await new Promise(r => setTimeout(r, 1200))
    setLoading(false)
    setSubmitted(true)
  }

  return (
    <Layout>
      <main style={{ fontFamily: 'Arial, sans-serif', width: '100%', overflowX: 'hidden' }}>
        <section style={{ background: '#111', padding: '80px 40px', textAlign: 'center' }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#4b5320', marginBottom: 16 }}>Books &amp; Publications</p>
          <h1 className="books-hero-h1" style={{ color: 'white', fontWeight: 900, lineHeight: 1.1 }}>Knowledge for a <em style={{ fontFamily: 'Georgia,serif', fontStyle: 'italic', fontWeight: 400 }}>better future</em></h1>
          <div style={{ width: 80, height: 3, background: '#4b5320', margin: '20px auto 0' }} />
        </section>

        <style>{`
          .books-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 40px; }
          .books-hero-h1 { font-size: 48px; }
          @media (max-width: 768px) {
            .books-grid { grid-template-columns: 1fr 1fr; gap: 20px; }
            .books-hero-h1 { font-size: 30px; }
          }
          @media (max-width: 480px) {
            .books-grid { grid-template-columns: 1fr; }
          }
        `}</style>
        <section style={{ maxWidth: 1000, margin: '0 auto', padding: '80px 40px' }}>
          <div className="books-grid">
            {books.map((book, i) => (
              <div key={i} style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column' }}>
                <div style={{ height: 340, overflow: 'hidden', background: '#f0f0f0' }}>
                  <Image src={book.src} alt={book.title} width={320} height={340} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ padding: '20px 24px', background: 'white', borderTop: '3px solid #4b5320', flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <p style={{ fontWeight: 900, fontSize: 14, margin: 0 }}>{book.title}</p>
                  <p style={{ fontSize: 12, color: '#888', margin: 0 }}>{book.sub}</p>
                  <p style={{ fontSize: 13, fontWeight: 700, color: '#111', margin: 0 }}>{book.price}</p>
                  <button onClick={() => openModal(book)} style={{ marginTop: 8, background: '#4b5320', border: '2px solid #3a4119', borderRadius: 999, padding: '9px 0', fontWeight: 900, fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer', width: '100%' }}>
                    Buy Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* MODAL */}
        {selected && (
          <div onClick={closeModal} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
            <div onClick={e => e.stopPropagation()} style={{ background: 'white', borderRadius: 12, maxWidth: 460, width: '100%', padding: 36, position: 'relative', maxHeight: '90vh', overflowY: 'auto' }}>
              <button onClick={closeModal} style={{ position: 'absolute', top: 16, right: 20, background: 'none', border: 'none', fontSize: 22, cursor: 'pointer', color: '#888' }}>✕</button>
              {submitted ? (
                <div style={{ textAlign: 'center', padding: '20px 0' }}>
                  <div style={{ fontSize: 48, marginBottom: 12 }}>✅</div>
                  <h2 style={{ fontWeight: 900, fontSize: 20, marginBottom: 8 }}>Order Received!</h2>
                  <p style={{ color: '#555', fontSize: 14 }}>Thank you <strong>{name}</strong>. Your payment proof has been submitted. We will confirm your order and {bookType === 'soft' ? `send the soft copy to ${deliveryEmail}` : `deliver the hard copy to your address`} shortly.</p>
                  <button onClick={closeModal} style={{ marginTop: 24, background: '#4b5320', border: '2px solid #3a4119', borderRadius: 999, padding: '10px 32px', fontWeight: 900, fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer' }}>Close</button>
                </div>
              ) : (
                <>
                  <h2 style={{ fontWeight: 900, fontSize: 18, marginBottom: 4 }}>{selected.title}</h2>
                  <p style={{ fontSize: 12, color: '#888', marginBottom: 20 }}>{selected.sub}</p>
                  <div style={{ background: '#f9f9f9', border: '1px solid #eee', borderRadius: 8, padding: 16, marginBottom: 24 }}>
                    <Image src="/momo_mtna.png" alt="MTN MoMo" width={160} height={64} style={{ objectFit: 'contain', marginBottom: 10 }} />
                    <p style={{ fontWeight: 700, fontSize: 13, marginBottom: 8 }}>Pay via MoMo</p>
                    <p style={{ fontSize: 13, marginBottom: 4 }}>Send <strong>{selected.price}</strong> to:</p>
                    <p style={{ fontSize: 22, fontWeight: 900, letterSpacing: '0.1em', color: '#111', marginBottom: 2 }}>{MOMO_NUMBER}</p>
                    <p style={{ fontSize: 12, color: '#888' }}>Name: {MOMO_NAME}</p>
                    <p style={{ fontSize: 11, color: '#aaa', marginTop: 8 }}>After payment, fill in the form below and upload your MoMo payment screenshot.</p>
                  </div>
                  <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                    <div>
                      <label style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#555' }}>Your Full Name</label>
                      <input required value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Jean Pierre" style={{ display: 'block', width: '100%', marginTop: 6, padding: '10px 12px', border: '1px solid #ddd', borderRadius: 6, fontSize: 13, boxSizing: 'border-box' }} />
                    </div>
                    <div>
                      <label style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#555' }}>Your Phone Number</label>
                      <input required value={phone} onChange={e => setPhone(e.target.value)} placeholder="e.g. 0788123456" style={{ display: 'block', width: '100%', marginTop: 6, padding: '10px 12px', border: '1px solid #ddd', borderRadius: 6, fontSize: 13, boxSizing: 'border-box' }} />
                    </div>
                    <div>
                      <label style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#555' }}>Book Format</label>
                      <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
                        {(['soft', 'hard'] as const).map(type => (
                          <button
                            key={type}
                            type="button"
                            onClick={() => setBookType(type)}
                            style={{
                              flex: 1, padding: '10px', borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: 'pointer',
                              border: bookType === type ? '2px solid #4b5320' : '2px solid #ddd',
                              background: bookType === type ? '#4b5320' : 'white',
                              color: bookType === type ? 'white' : '#555',
                            }}
                          >
                            {type === 'soft' ? '📧 Soft Copy (PDF)' : '📦 Hard Copy (Physical)'}
                          </button>
                        ))}
                      </div>
                    </div>
                    {bookType === 'soft' && (
                      <div>
                        <label style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#555' }}>Email to Send the Book</label>
                        <input required type="email" value={deliveryEmail} onChange={e => setDeliveryEmail(e.target.value)} placeholder="e.g. you@email.com" style={{ display: 'block', width: '100%', marginTop: 6, padding: '10px 12px', border: '1px solid #ddd', borderRadius: 6, fontSize: 13, boxSizing: 'border-box' }} />
                      </div>
                    )}
                    {bookType === 'hard' && (
                      <div>
                        <label style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#555' }}>Delivery Address</label>
                        <textarea required rows={3} value={deliveryAddress} onChange={e => setDeliveryAddress(e.target.value)} placeholder="e.g. KG 123 St, Kigali, Rwanda" style={{ display: 'block', width: '100%', marginTop: 6, padding: '10px 12px', border: '1px solid #ddd', borderRadius: 6, fontSize: 13, boxSizing: 'border-box', resize: 'vertical' }} />
                      </div>
                    )}
                    <div>
                      <label style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#555' }}>Upload Payment Proof (screenshot)</label>
                      <input required type="file" accept="image/*" onChange={e => setFile(e.target.files?.[0] ?? null)} style={{ display: 'block', width: '100%', marginTop: 6, padding: '8px 0', fontSize: 13 }} />
                      {file && <p style={{ fontSize: 11, color: '#888', marginTop: 4 }}>Selected: {file.name}</p>}
                    </div>
                    <button type="submit" disabled={loading || !bookType} style={{ background: '#4b5320', border: '2px solid #3a4119', borderRadius: 999, padding: '11px 0', fontWeight: 900, fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', cursor: (loading || !bookType) ? 'not-allowed' : 'pointer', opacity: (loading || !bookType) ? 0.7 : 1 }}>
                      {loading ? 'Submitting...' : 'Submit Order'}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        )}
      </main>
    </Layout>
  )
}
