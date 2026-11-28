'use client'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

type Book = {
  id: number
  title: string
  author: string
  description: string
  cover_url: string
  price: string
  buy_links: { store: string; url: string }[]
  published: boolean
  created_at: string
}

type BuyLink = { store: string; url: string }

const emptyForm = { title: '', author: '', description: '', cover_url: '', price: '', buy_links: '[]', published: true }

const ADMIN_EMAIL = 'theogenesiboo@gmail.com'

export default function AdminPage() {
  const [authed, setAuthed] = useState(false)
  const [email, setEmail] = useState('')
  const [pw, setPw] = useState('')
  const [pwErr, setPwErr] = useState('')
  const [loginLoading, setLoginLoading] = useState(false)

  const [books, setBooks] = useState<Book[]>([])
  const [form, setForm] = useState(emptyForm)
  const [editId, setEditId] = useState<number | null>(null)
  const [msg, setMsg] = useState('')
  const [loading, setLoading] = useState(false)
  const [tab, setTab] = useState<'books' | 'subscribers' | 'articles'>('books')
  const [subscribers, setSubscribers] = useState<{ id: number; name: string; email: string; type: string; created_at: string }[]>([])
  const [articles, setArticles] = useState<{ id: number; tag: string; title: string; excerpt: string; content: string; published: boolean; created_at: string }[]>([])
  const [articleForm, setArticleForm] = useState({ tag: '', title: '', excerpt: '', content: '', published: true })
  const [articleEditId, setArticleEditId] = useState<number | null>(null)
  const [articleMsg, setArticleMsg] = useState('')
  const [articleLoading, setArticleLoading] = useState(false)
  const [coverFile, setCoverFile] = useState<File | null>(null)
  const [coverPreview, setCoverPreview] = useState('')
  const [buyLinks, setBuyLinks] = useState<BuyLink[]>([{ store: '', url: '' }])

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session?.user?.email === ADMIN_EMAIL) setAuthed(true)
    })
  }, [])

  useEffect(() => { if (authed) { fetchBooks(); fetchSubscribers(); fetchArticles() } }, [authed])

  async function fetchBooks() {
    const { data } = await supabase.from('books').select('*').order('created_at', { ascending: false })
    if (data) setBooks(data)
  }

  async function fetchSubscribers() {
    const { data } = await supabase.from('subscribers').select('*').order('created_at', { ascending: false })
    if (data) setSubscribers(data)
  }

  async function fetchArticles() {
    const { data } = await supabase.from('articles').select('*').order('created_at', { ascending: false })
    if (data) setArticles(data)
  }

  async function handleArticleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setArticleLoading(true)
    const payload = { tag: articleForm.tag, title: articleForm.title, excerpt: articleForm.excerpt, content: articleForm.content, published: articleForm.published }
    if (articleEditId) {
      const { error } = await supabase.from('articles').update(payload).eq('id', articleEditId)
      setArticleMsg(error ? 'Error updating.' : 'Article updated!')
    } else {
      const { error } = await supabase.from('articles').insert(payload)
      setArticleMsg(error ? 'Error adding.' : 'Article published!')
    }
    setArticleForm({ tag: '', title: '', excerpt: '', content: '', published: true })
    setArticleEditId(null)
    setArticleLoading(false)
    fetchArticles()
  }

  async function deleteArticle(id: number) {
    if (!confirm('Delete this article?')) return
    await supabase.from('articles').delete().eq('id', id)
    fetchArticles()
  }

  function startEditArticle(a: typeof articles[0]) {
    setArticleEditId(a.id)
    setArticleForm({ tag: a.tag, title: a.title, excerpt: a.excerpt, content: a.content, published: a.published })
    setArticleMsg('')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    let cover_url = form.cover_url
    if (coverFile) {
      const ext = coverFile.name.split('.').pop()
      const path = `${Date.now()}.${ext}`
      const { error: upErr } = await supabase.storage.from('book-covers').upload(path, coverFile)
      if (upErr) { setMsg(`Image upload failed: ${upErr.message}`); setLoading(false); return }
      const { data: urlData } = supabase.storage.from('book-covers').getPublicUrl(path)
      cover_url = urlData.publicUrl
    }
    const buy_links = buyLinks.filter(l => l.store || l.url)
    const payload = { title: form.title, author: form.author, description: form.description, cover_url, price: form.price, buy_links, published: form.published }
    if (editId) {
      const { error } = await supabase.from('books').update(payload).eq('id', editId)
      setMsg(error ? 'Error updating.' : 'Book updated!')
    } else {
      const { error } = await supabase.from('books').insert(payload)
      setMsg(error ? 'Error adding.' : 'Book added!')
    }
    setForm(emptyForm); setCoverFile(null); setCoverPreview(''); setBuyLinks([{ store: '', url: '' }]); setEditId(null); setLoading(false); fetchBooks()
  }

  function startEdit(book: Book) {
    setEditId(book.id)
    setForm({ title: book.title, author: book.author, description: book.description, cover_url: book.cover_url, price: book.price || '', buy_links: '[]', published: book.published })
    setCoverFile(null)
    setCoverPreview(book.cover_url || '')
    setBuyLinks(book.buy_links?.length ? book.buy_links : [{ store: '', url: '' }])
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
          <form onSubmit={async e => {
            e.preventDefault()
            setLoginLoading(true)
            const { data, error } = await supabase.auth.signInWithPassword({ email, password: pw })
            setLoginLoading(false)
            if (error || data.user?.email !== ADMIN_EMAIL) {
              await supabase.auth.signOut()
              setPwErr('Invalid email or password.')
            } else {
              setAuthed(true)
              setPwErr('')
            }
          }}>
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={e => setEmail(e.target.value)}
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
            <button type="submit" disabled={loginLoading} style={{ width: '100%', background: '#4b5320', color: '#fff', fontWeight: 900, padding: '12px', borderRadius: 8, border: 'none', cursor: 'pointer', fontSize: 14, letterSpacing: '0.08em', opacity: loginLoading ? 0.6 : 1 }}>
              {loginLoading ? 'Signing in...' : 'LOGIN →'}
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
          <button onClick={() => setTab('articles')} style={{ padding: '7px 18px', borderRadius: 6, fontSize: 13, fontWeight: 700, border: 'none', cursor: 'pointer', background: tab === 'articles' ? '#34d399' : '#374151', color: tab === 'articles' ? '#000' : '#fff' }}>Articles</button>
          <button onClick={() => setTab('subscribers')} style={{ padding: '7px 18px', borderRadius: 6, fontSize: 13, fontWeight: 700, border: 'none', cursor: 'pointer', background: tab === 'subscribers' ? '#34d399' : '#374151', color: tab === 'subscribers' ? '#000' : '#fff' }}>Subscribers</button>
          <button onClick={async () => { await supabase.auth.signOut(); setAuthed(false) }} style={{ padding: '7px 14px', borderRadius: 6, fontSize: 12, fontWeight: 700, border: 'none', cursor: 'pointer', background: '#ef4444', color: 'white', marginLeft: 8 }}>Logout</button>
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
                    <label style={{ fontSize: 11, fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Cover Image</label>
                    <input type="file" accept="image/*" onChange={e => {
                      const file = e.target.files?.[0] || null
                      setCoverFile(file)
                      setCoverPreview(file ? URL.createObjectURL(file) : '')
                    }} style={{ border: '1px solid #d1d5db', borderRadius: 8, padding: '8px 14px', fontSize: 13, outline: 'none', cursor: 'pointer' }} />
                    {coverPreview && <img src={coverPreview} alt="preview" style={{ width: 60, height: 80, objectFit: 'cover', borderRadius: 6, marginTop: 6 }} />}
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    <label style={{ fontSize: 11, fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Price (e.g. RWF 5,000)</label>
                    <input style={{ border: '1px solid #d1d5db', borderRadius: 8, padding: '10px 14px', fontSize: 14, outline: 'none' }} placeholder="e.g. RWF 5,000" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} />
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
                  <label style={{ fontSize: 11, fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Buy Links</label>
                  {buyLinks.map((link, i) => (
                    <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 2fr auto', gap: 8, alignItems: 'center' }}>
                      <input placeholder="Store (e.g. Amazon)" value={link.store} onChange={e => { const u = [...buyLinks]; u[i].store = e.target.value; setBuyLinks(u) }} style={{ border: '1px solid #d1d5db', borderRadius: 8, padding: '9px 12px', fontSize: 13, outline: 'none' }} />
                      <input placeholder="URL (https://...)" value={link.url} onChange={e => { const u = [...buyLinks]; u[i].url = e.target.value; setBuyLinks(u) }} style={{ border: '1px solid #d1d5db', borderRadius: 8, padding: '9px 12px', fontSize: 13, outline: 'none' }} />
                      <button type="button" onClick={() => setBuyLinks(buyLinks.filter((_, j) => j !== i))} style={{ background: '#fef2f2', color: '#dc2626', border: 'none', borderRadius: 8, padding: '9px 12px', cursor: 'pointer', fontWeight: 700, fontSize: 13 }}>✕</button>
                    </div>
                  ))}
                  <button type="button" onClick={() => setBuyLinks([...buyLinks, { store: '', url: '' }])} style={{ alignSelf: 'flex-start', background: '#f3f4f6', border: 'none', borderRadius: 8, padding: '8px 16px', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>+ Add Link</button>
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

        {tab === 'articles' && (
          <>
            <div style={{ background: 'white', borderRadius: 12, boxShadow: '0 2px 12px rgba(0,0,0,0.08)', padding: '32px', marginBottom: 28 }}>
              <h2 style={{ fontSize: 18, fontWeight: 900, marginBottom: 24, marginTop: 0 }}>{articleEditId ? 'Edit Article' : 'New Article'}</h2>
              {articleMsg && <p style={{ color: '#16a34a', fontWeight: 700, fontSize: 13, marginBottom: 16 }}>{articleMsg}</p>}
              <form onSubmit={handleArticleSubmit}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 16, marginBottom: 16 }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    <label style={{ fontSize: 11, fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Tag *</label>
                    <input style={{ border: '1px solid #d1d5db', borderRadius: 8, padding: '10px 14px', fontSize: 14, outline: 'none' }} placeholder="e.g. Leadership" value={articleForm.tag} onChange={e => setArticleForm({ ...articleForm, tag: e.target.value })} required />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    <label style={{ fontSize: 11, fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Title *</label>
                    <input style={{ border: '1px solid #d1d5db', borderRadius: 8, padding: '10px 14px', fontSize: 14, outline: 'none' }} value={articleForm.title} onChange={e => setArticleForm({ ...articleForm, title: e.target.value })} required />
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 16 }}>
                  <label style={{ fontSize: 11, fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Excerpt * (short summary shown on card)</label>
                  <textarea rows={2} style={{ border: '1px solid #d1d5db', borderRadius: 8, padding: '10px 14px', fontSize: 14, outline: 'none', resize: 'vertical', fontFamily: 'Arial, sans-serif' }} value={articleForm.excerpt} onChange={e => setArticleForm({ ...articleForm, excerpt: e.target.value })} required />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 16 }}>
                  <label style={{ fontSize: 11, fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Full Content *</label>
                  <textarea rows={10} style={{ border: '1px solid #d1d5db', borderRadius: 8, padding: '10px 14px', fontSize: 14, outline: 'none', resize: 'vertical', fontFamily: 'Arial, sans-serif', lineHeight: 1.7 }} value={articleForm.content} onChange={e => setArticleForm({ ...articleForm, content: e.target.value })} required />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
                  <input type="checkbox" id="art-published" checked={articleForm.published} onChange={e => setArticleForm({ ...articleForm, published: e.target.checked })} style={{ width: 16, height: 16, accentColor: '#34d399' }} />
                  <label htmlFor="art-published" style={{ fontSize: 14, fontWeight: 600 }}>Published (visible on site)</label>
                </div>
                <div style={{ display: 'flex', gap: 12 }}>
                  <button type="submit" disabled={articleLoading} style={{ background: '#34d399', color: '#000', fontWeight: 900, padding: '11px 28px', borderRadius: 8, border: 'none', cursor: 'pointer', fontSize: 14, opacity: articleLoading ? 0.6 : 1 }}>
                    {articleLoading ? 'Saving...' : articleEditId ? 'Update Article' : 'Publish Article'}
                  </button>
                  {articleEditId && (
                    <button type="button" onClick={() => { setArticleEditId(null); setArticleForm({ tag: '', title: '', excerpt: '', content: '', published: true }); setArticleMsg('') }} style={{ background: '#e5e7eb', color: '#374151', fontWeight: 700, padding: '11px 22px', borderRadius: 8, border: 'none', cursor: 'pointer', fontSize: 14 }}>Cancel</button>
                  )}
                </div>
              </form>
            </div>

            <div style={{ background: 'white', borderRadius: 12, boxShadow: '0 2px 12px rgba(0,0,0,0.08)', overflow: 'hidden' }}>
              <div style={{ padding: '20px 28px', borderBottom: '1px solid #f3f4f6' }}>
                <h2 style={{ fontSize: 18, fontWeight: 900, margin: 0 }}>All Articles ({articles.length})</h2>
              </div>
              {articles.length === 0 ? (
                <div style={{ padding: '48px', textAlign: 'center', color: '#9ca3af', fontSize: 14 }}>No articles yet. Write your first article above.</div>
              ) : (
                articles.map(a => (
                  <div key={a.id} style={{ padding: '20px 28px', borderBottom: '1px solid #f9fafb', display: 'flex', alignItems: 'flex-start', gap: 16 }}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                        <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#4b5320' }}>{a.tag}</span>
                        <span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 999, fontWeight: 700, background: a.published ? '#d1fae5' : '#f3f4f6', color: a.published ? '#065f46' : '#6b7280' }}>{a.published ? 'Published' : 'Draft'}</span>
                      </div>
                      <p style={{ fontWeight: 700, fontSize: 15, margin: '0 0 4px' }}>{a.title}</p>
                      <p style={{ fontSize: 13, color: '#6b7280', margin: 0 }}>{a.excerpt}</p>
                    </div>
                    <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
                      <button onClick={() => startEditArticle(a)} style={{ fontSize: 13, background: '#f3f4f6', padding: '8px 16px', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 600 }}>Edit</button>
                      <button onClick={() => deleteArticle(a.id)} style={{ fontSize: 13, background: '#fef2f2', color: '#dc2626', padding: '8px 16px', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 600 }}>Delete</button>
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
