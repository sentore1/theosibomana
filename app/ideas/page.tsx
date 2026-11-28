'use client'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import Layout from '../components/Layout'

type Article = {
  id: number
  tag: string
  title: string
  excerpt: string
  content: string
  published: boolean
  created_at: string
}

export default function IdeasPage() {
  const [articles, setArticles] = useState<Article[]>([])
  const [selected, setSelected] = useState<Article | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchArticles() {
      const { data } = await supabase
        .from('articles')
        .select('*')
        .eq('published', true)
        .order('created_at', { ascending: false })
      if (data) setArticles(data)
      setLoading(false)
    }
    fetchArticles()
  }, [])

  return (
    <Layout>
      <main style={{ fontFamily: 'Arial, sans-serif', width: '100%', overflowX: 'hidden' }}>
        {/* HERO */}
        <section style={{ background: '#111', padding: '80px 40px', textAlign: 'center' }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#4b5320', marginBottom: 16 }}>Ideas &amp; Insights</p>
          <h1 className="ideas-hero-h1" style={{ color: 'white', fontWeight: 900, lineHeight: 1.1 }}>Thoughts on <em style={{ fontFamily: 'Georgia,serif', fontStyle: 'italic', fontWeight: 400 }}>leadership,</em><br />wealth &amp; growth</h1>
          <div style={{ width: 80, height: 3, background: '#4b5320', margin: '20px auto 0' }} />
        </section>

        <style>{`
          .articles-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 36px; }
          .ideas-hero-h1 { font-size: 48px; }
          @media (max-width: 768px) {
            .articles-grid { grid-template-columns: 1fr; }
            .ideas-hero-h1 { font-size: 30px; }
          }
        `}</style>
        {/* ARTICLES */}
        <section style={{ maxWidth: 960, margin: '0 auto', padding: '80px 40px' }}>
          {loading ? (
            <p style={{ textAlign: 'center', color: '#999', fontSize: 14 }}>Loading articles...</p>
          ) : articles.length === 0 ? (
            <p style={{ textAlign: 'center', color: '#999', fontSize: 14 }}>No articles published yet.</p>
          ) : (
            <div className="articles-grid">
              {articles.map(a => (
                <div key={a.id} style={{ background: 'white', boxShadow: '0 4px 20px rgba(0,0,0,0.07)', borderTop: '3px solid #4b5320', padding: '32px 28px', display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#999' }}>{a.tag}</span>
                  <h3 style={{ fontWeight: 900, fontSize: 16, lineHeight: 1.4, margin: '12px 0 16px' }}>{a.title}</h3>
                  <p style={{ color: '#666', fontSize: 13, lineHeight: 1.75, marginBottom: 24, flex: 1 }}>{a.excerpt}</p>
                  <button
                    onClick={() => setSelected(a)}
                    style={{ fontSize: 11, fontWeight: 700, color: '#111', letterSpacing: '0.1em', textTransform: 'uppercase', background: 'none', border: 'none', borderBottom: '2px solid #4b5320', cursor: 'pointer', textAlign: 'left', padding: '0 0 2px 0' }}
                  >
                    Read More →
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* MODAL */}
        {selected && (
          <div onClick={() => setSelected(null)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.65)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
            <div onClick={e => e.stopPropagation()} style={{ background: 'white', borderRadius: 12, maxWidth: 640, width: '100%', padding: '48px 40px', position: 'relative', maxHeight: '85vh', overflowY: 'auto' }}>
              <button onClick={() => setSelected(null)} style={{ position: 'absolute', top: 16, right: 20, background: 'none', border: 'none', fontSize: 24, cursor: 'pointer', color: '#888', lineHeight: 1 }}>✕</button>
              <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#4b5320' }}>{selected.tag}</span>
              <h2 style={{ fontWeight: 900, fontSize: 24, lineHeight: 1.3, margin: '12px 0 28px' }}>{selected.title}</h2>
              <div style={{ borderTop: '2px solid #4b5320', marginBottom: 28 }} />
              <p style={{ color: '#444', fontSize: 15, lineHeight: 1.9, whiteSpace: 'pre-line' }}>{selected.content}</p>
            </div>
          </div>
        )}
      </main>
    </Layout>
  )
}
