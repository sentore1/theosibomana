'use client'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

type Book = {
  id: number
  title: string
  author: string
  description: string
  cover_url: string
  buy_links: { store: string; url: string }[]
  published: boolean
  created_at: string
}

const emptyForm = { title: '', author: '', description: '', cover_url: '', buy_links: '[]', published: true }

const ADMIN_PASSWORD = 'admin2024'

export default function AdminPage() {
  const [authed, setAuthed] = useState(false)
  const [pw, setPw] = useState('')
  const [pwErr, setPwErr] = useState('')

  const [books, setBooks] = useState<Book[]>([])
  const [form, setForm] = useState(emptyForm)
  const [editId, setEditId] = useState<number | null>(null)
  const [msg, setMsg] = useState('')
  const [loading, setLoading] = useState(false)
  const [tab, setTab] = useState<'books' | 'subscribers'>('books')
  const [subscribers, setSubscribers] = useState<{ id: number; name: string; email: string; type: string; created_at: string }[]>([])

  useEffect(() => { if (authed) { fetchBooks(); fetchSubscribers() } }, [authed])

  async function fetchBooks() {
    const { data } = await supabase.from('books').select('*').order('created_at', { ascending: false })
    if (data) setBooks(data)
  }

  async function fetchSubscribers() {
    const { data } = await supabase.from('subscribers').select('*').order('created_at', { ascending: false })
    if (data) setSubscribers(data)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    let buy_links
    try { buy_links = JSON.parse(form.buy_links) } catch { buy_links = [] }
    const payload = { title: form.title, author: form.author, description: form.description, cover_url: form.cover_url, buy_links, published: form.published }
    if (editId) {
      const { error } = await supabase.from('books').update(payload).eq('id', editId)
      setMsg(error ? 'Error updating.' : 'Book updated!')
    } else {
      const { error } = await supabase.from('books').insert(payload)
      setMsg(error ? 'Error adding.' : 'Book added!')
    }
    setForm(emptyForm); setEditId(null); setLoading(false); fetchBooks()
  }

  function startEdit(book: Book) {
    setEditId(book.id)
    setForm({ title: book.title, author: book.author, description: book.description, cover_url: book.cover_url, buy_links: JSON.stringify(book.buy_links || []), published: book.published })
    setMsg('')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  async function deleteBook(id: number) {
    if (!confirm('Delete this book?')) return
    await supabase.from('books').delete().eq('id', id)
    fetchBooks()
  }

  // LOGIN SCREEN
  if (!authed) {
    return (
      <div style={{ minHeight: '100vh', background: '#111', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ background: 'white', borderRadius: 16, padding: '48px 40px', width: '100%', maxWidth: 380, boxShadow: '0 24px 64px rgba(0,0,0,0.4)' }}>
          <form onSubmit={e => { e.preventDefault(); if (pw === ADMIN_PASSWORD) { setAuthed(true); setPwErr('') } else setPwErr('Incorrect password.')}}>
            <input
              type="email"
              placeholder="Email address"
              style={{ width: '100%', padding: '12px 16px', borderRadius: 8, border: '1px solid #ddd', fontSize: 14, outline: 'none', marginBottom: 12, boxSizing: 'border-box' }}
              autoFocus
            />
            <input
              type="password"
              placeholder="Password"
              value={pw}
              onChange={e => setPw(e.target.value)}
              style={{ width: '100%', padding: '12px 16px', borderRadius: 8, border: '1px solid #ddd', fontSize: 14, outline: 'none', marginBottom: 12, boxSizing: 'border-box' }}
            />
            {pwErr && <p style={{ color: 'red', fontSize: 13, marginBottom: 10 }}>{pwErr}</p>}
            <button type="submit" style={{ width: '100%', background: '#d4e600', color: '#111', fontWeight: 900, padding: '12px', borderRadius: 8, border: 'none', cursor: 'pointer', fontSize: 14, letterSpacing: '0.08em' }}>
              LOGIN →
            </button>
          </form>
        </div>
      </div>
    )
  }

  // CMS DASHBOARD
  return (
    <div style={{ minHeight: '100vh', background: '#f3f4f6', fontFamily: 'Arial, sans-serif' }}>
      {/* Header */}
      <div style={{ background: '#111', color: 'white', padding: '14px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <span style={{ fontWeight: 700, fontSize: 16 }}>Theogene Sibomana — CMS</span>
          <a href="/" style={{ color: '#34d399', fontSize: 13, textDecoration: 'none' }}>← View Site</a>
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <button onClick={() => setTab('books')} style={{ padding: '7px 18px', borderRadius: 6, fontSize: 13, fontWeight: 700, border: 'none', cursor: 'pointer', background: tab === 'books' ? '#34d399' : '#374151', color: tab === 'books' ? '#000' : '#fff' }}>Books</button>
          <button onClick={() => setTab('subscribers')} style={{ padding: '7px 18px', borderRadius: 6, fontSize: 13, fontWeight: 700, border: 'none', cursor: 'pointer', background: tab === 'subscribers' ? '#34d399' : '#374151', color: tab === 'subscribers' ? '#000' : '#fff' }}>Subscribers</button>
          <button onClick={() => setAuthed(false)} style={{ padding: '7px 14px', borderRadius: 6, fontSize: 12, fontWeight: 700, border: 'none', cursor: 'pointer', background: '#ef4444', color: 'white', marginLeft: 8 }}>Logout</button>
        </div>
      </div>

      <div style={{ maxWidth: 900, margin: '0 auto', padding: '32px 24px' }}>
        {tab === 'books' && (
          <>
            {/* Form */}
            <div style={{ background: 'white', borderRadius: 12, boxShadow: '0 2px 12px rgba(0,0,0,0.08)', padding: '32px', marginBottom: 28 }}>
              <h2 style={{ fontSize: 18, fontWeight: 900, marginBottom: 24, marginTop: 0 }}>{editId ? 'Edit Book' : 'Add New Book'}</h2>
              {msg && <p style={{ color: '#16a34a', fontWeight: 700, fontSize: 13, marginBottom: 16 }}>{msg}</p>}
              <form onSubmit={handleSubmit}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    <label style={{ fontSize: 11, fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Title *</label>
                    <input style={{ border: '1px solid #d1d5db', borderRadius: 8, padding: '10px 14px', fontSize: 14, outline: 'none' }} value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    <label style={{ fontSize: 11, fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Author *</label>
                    <input style={{ border: '1px solid #d1d5db', borderRadius: 8, padding: '10px 14px', fontSize: 14, outline: 'none' }} value={form.author} onChange={e => setForm({ ...form, author: e.target.value })} required />
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 16 }}>
                  <label style={{ fontSize: 11, fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Description</label>
                  <textarea rows={3} style={{ border: '1px solid #d1d5db', borderRadius: 8, padding: '10px 14px', fontSize: 14, outline: 'none', resize: 'none', fontFamily: 'Arial, sans-serif' }} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    <label style={{ fontSize: 11, fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Cover Image URL</label>
                    <input style={{ border: '1px solid #d1d5db', borderRadius: 8, padding: '10px 14px', fontSize: 14, outline: 'none' }} placeholder="https://..." value={form.cover_url} onChange={e => setForm({ ...form, cover_url: e.target.value })} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    <label style={{ fontSize: 11, fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Buy Links (JSON)</label>
                    <input style={{ border: '1px solid #d1d5db', borderRadius: 8, padding: '10px 14px', fontSize: 13, outline: 'none', fontFamily: 'monospace' }} placeholder='[{"store":"Amazon","url":"https://..."}]' value={form.buy_links} onChange={e => setForm({ ...form, buy_links: e.target.value })} />
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
                  <input type="checkbox" id="published" checked={form.published} onChange={e => setForm({ ...form, published: e.target.checked })} style={{ width: 16, height: 16, accentColor: '#34d399' }} />
                  <label htmlFor="published" style={{ fontSize: 14, fontWeight: 600 }}>Published (visible on site)</label>
                </div>
                <div style={{ display: 'flex', gap: 12 }}>
                  <button type="submit" disabled={loading} style={{ background: '#34d399', color: '#000', fontWeight: 900, padding: '11px 28px', borderRadius: 8, border: 'none', cursor: 'pointer', fontSize: 14, opacity: loading ? 0.6 : 1 }}>
                    {loading ? 'Saving...' : editId ? 'Update Book' : 'Add Book'}
                  </button>
                  {editId && (
                    <button type="button" onClick={() => { setEditId(null); setForm(emptyForm); setMsg('') }} style={{ background: '#e5e7eb', color: '#374151', fontWeight: 700, padding: '11px 22px', borderRadius: 8, border: 'none', cursor: 'pointer', fontSize: 14 }}>
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>

            {/* Books List */}
            <div style={{ background: 'white', borderRadius: 12, boxShadow: '0 2px 12px rgba(0,0,0,0.08)', overflow: 'hidden' }}>
              <div style={{ padding: '20px 28px', borderBottom: '1px solid #f3f4f6' }}>
                <h2 style={{ fontSize: 18, fontWeight: 900, margin: 0 }}>All Books ({books.length})</h2>
              </div>
              {books.length === 0 ? (
                <div style={{ padding: '48px', textAlign: 'center', color: '#9ca3af', fontSize: 14 }}>No books yet. Add your first book above.</div>
              ) : (
                books.map(book => (
                  <div key={book.id} style={{ padding: '20px 28px', borderBottom: '1px solid #f9fafb', display: 'flex', alignItems: 'flex-start', gap: 20 }}>
                    {book.cover_url
                      ? <img src={book.cover_url} alt={book.title} style={{ width: 52, height: 72, objectFit: 'cover', borderRadius: 6, boxShadow: '0 2px 8px rgba(0,0,0,0.15)', flexShrink: 0 }} />
                      : <div style={{ width: 52, height: 72, background: '#e5e7eb', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, color: '#9ca3af', flexShrink: 0 }}>No img</div>
                    }
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                        <span style={{ fontWeight: 700, fontSize: 15 }}>{book.title}</span>
                        <span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 999, fontWeight: 700, background: book.published ? '#d1fae5' : '#f3f4f6', color: book.published ? '#065f46' : '#6b7280' }}>
                          {book.published ? 'Published' : 'Draft'}
                        </span>
                      </div>
                      <p style={{ fontSize: 13, color: '#6b7280', margin: '0 0 4px' }}>by {book.author}</p>
                      <p style={{ fontSize: 13, color: '#374151', margin: 0, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' as const }}>{book.description}</p>
                    </div>
                    <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
                      <button onClick={() => startEdit(book)} style={{ fontSize: 13, background: '#f3f4f6', padding: '8px 16px', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 600 }}>Edit</button>
                      <button onClick={() => deleteBook(book.id)} style={{ fontSize: 13, background: '#fef2f2', color: '#dc2626', padding: '8px 16px', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 600 }}>Delete</button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </>
        )}

        {tab === 'subscribers' && (
          <div style={{ background: 'white', borderRadius: 12, boxShadow: '0 2px 12px rgba(0,0,0,0.08)', overflow: 'hidden' }}>
            <div style={{ padding: '20px 28px', borderBottom: '1px solid #f3f4f6' }}>
              <h2 style={{ fontSize: 18, fontWeight: 900, margin: 0 }}>Subscribers ({subscribers.length})</h2>
            </div>
            {subscribers.length === 0 ? (
              <div style={{ padding: '48px', textAlign: 'center', color: '#9ca3af', fontSize: 14 }}>No subscribers yet.</div>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
                  <thead>
                    <tr style={{ background: '#f9fafb' }}>
                      {['Name', 'Email', 'Type', 'Date'].map(h => (
                        <th key={h} style={{ padding: '12px 24px', textAlign: 'left', fontSize: 11, fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {subscribers.map(s => (
                      <tr key={s.id} style={{ borderTop: '1px solid #f3f4f6' }}>
                        <td style={{ padding: '14px 24px' }}>{s.name}</td>
                        <td style={{ padding: '14px 24px' }}>{s.email}</td>
                        <td style={{ padding: '14px 24px' }}>
                          <span style={{ fontSize: 11, padding: '3px 10px', borderRadius: 999, fontWeight: 700, background: s.type === 'contact' ? '#dbeafe' : '#d1fae5', color: s.type === 'contact' ? '#1d4ed8' : '#065f46' }}>{s.type}</span>
                        </td>
                        <td style={{ padding: '14px 24px', color: '#9ca3af' }}>{new Date(s.created_at).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
