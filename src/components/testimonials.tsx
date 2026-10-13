import { useEffect, useState } from 'react'
import { ArrowLeft, ArrowRight, Star, Quote, Pause, Play, Globe2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { testimonials, type Testimonial } from '@/lib/testimonials'
import { SectionMotion } from '@/components/section-motion'

function Stars({ rating }: { rating: number }) {
 return <span className="review-stars" aria-label={`${rating} out of 5 stars`}>{Array.from({ length: 5 }, (_, i) => <Star key={i} size={13} fill="currentColor" className={i === 4 && rating < 5 ? 'partial-star' : ''} />)}<b>{rating === 5 ? '5.0' : rating}</b></span>
}
function Author({ review }: { review: Testimonial }) {
 return <div className="review-author"><span className="review-avatar" aria-hidden="true">{review.name.split(' ').map(n => n[0]).slice(0, 2).join('')}</span><div><strong>{review.name}</strong><span>{review.role}</span><small>{review.location}</small></div></div>
}
export function Testimonials() {
 const [group, setGroup] = useState<'Services' | 'Platform'>('Services')
 const [rating, setRating] = useState(0)
 const [page, setPage] = useState(0)
 const [featured, setFeatured] = useState(0)
 const [playing, setPlaying] = useState(true)
 const highlights = testimonials.filter(r => r.group === 'Services' && r.rating === 5)
 useEffect(() => {
  if (!playing || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  const timer = window.setInterval(() => setFeatured(i => (i + 1) % highlights.length), 7000)
  return () => window.clearInterval(timer)
 }, [playing, highlights.length])
 const filtered = testimonials.filter(r => r.group === group && (!rating || r.rating === rating))
 const pages = Math.ceil(filtered.length / 6)
 const review = highlights[featured]
 return <section id="testimonials" className="testimonials section-shell">
  <div className="section-heading reveal"><div><span className="eyebrow">05 / IN THEIR WORDS</span><h2>Good work.<br/>Even better words<span className="lime-dot">.</span></h2></div><SectionMotion kind="stories"/><div className="review-total"><Globe2 size={24}/><strong>50</strong><span>client stories<br/>across the world</span></div></div>
  {review && <div className="review-spotlight" onMouseEnter={() => setPlaying(false)}><div className="spotlight-mark"><Quote size={64}/><span>THE CLIENT PERSPECTIVE</span></div><div className="spotlight-content" key={review.name}><Stars rating={review.rating}/><blockquote>“{review.quote}”</blockquote><Author review={review}/><span className="review-service">{review.service}</span></div><div className="spotlight-controls"><span>{String(featured + 1).padStart(2, '0')} / {highlights.length}</span><Button variant="ghost" size="icon" aria-label="Previous featured testimonial" onClick={() => { setPlaying(false); setFeatured(i => (i - 1 + highlights.length) % highlights.length) }}><ArrowLeft/></Button><Button variant="ghost" size="icon" aria-label={playing ? 'Pause testimonials' : 'Play testimonials'} onClick={() => setPlaying(!playing)}>{playing ? <Pause/> : <Play/>}</Button><Button variant="ghost" size="icon" aria-label="Next featured testimonial" onClick={() => { setPlaying(false); setFeatured(i => (i + 1) % highlights.length) }}><ArrowRight/></Button></div></div>}
  <div className="review-toolbar"><div role="group" aria-label="Testimonial category">{(['Services', 'Platform'] as const).map(g => <Button key={g} variant="ghost" aria-pressed={group === g} className={group === g ? 'review-filter-active' : ''} onClick={() => { setGroup(g); setRating(0); setPage(0) }}>{g === 'Services' ? 'Design & growth' : 'Platform & operations'} <span>{g === 'Services' ? 20 : 30}</span></Button>)}</div><div role="group" aria-label="Testimonial rating">{[0, 5, 4.7, 4.55].map(r => <Button key={r} variant="ghost" aria-pressed={rating === r} className={rating === r ? 'review-filter-active' : ''} onClick={() => { setRating(r); setPage(0) }}>{r ? <><Star size={12}/>{r === 5 ? '5.0' : r}<span>({testimonials.filter(t => t.group === group && t.rating === r).length})</span></> : 'All ratings'}</Button>)}</div></div>
  <div className="review-grid" key={`${group}-${rating}-${page}`}>{filtered.slice(page * 6, page * 6 + 6).map(r => <article className="review-card" key={r.name}><div className="review-card-top"><Stars rating={r.rating}/><Quote size={22}/></div><span className="review-service">{r.service}</span><blockquote lang={r.name === 'Camille Dubois' ? 'fr' : undefined}>“{r.quote}”</blockquote><Author review={r}/></article>)}</div>
  <div className="review-pagination"><span role="status">{page * 6 + 1}–{Math.min((page + 1) * 6, filtered.length)} of {filtered.length} stories</span><div><Button variant="outline" size="icon" aria-label="Previous testimonials page" disabled={page === 0} onClick={() => setPage(page - 1)}><ArrowLeft/></Button><span>{page + 1} / {pages}</span><Button variant="outline" size="icon" aria-label="Next testimonials page" disabled={page + 1 >= pages} onClick={() => setPage(page + 1)}><ArrowRight/></Button></div></div>
 </section>
}
