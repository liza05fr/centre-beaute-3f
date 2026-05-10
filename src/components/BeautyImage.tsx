import { useEffect, useRef, useState } from 'react'

type Props = {
  /** Image principale (souvent Unsplash). */
  src: string
  /** Si la principale échoue (réseau, blocage), on charge celle-ci (souvent Pexels). */
  fallback: string
  alt: string
  /** Classes sur le conteneur (ex. h-full dans une carte à hauteur fixe). */
  frameClassName?: string
  className?: string
  width?: number
  height?: number
  loading?: 'eager' | 'lazy'
  fetchPriority?: 'high' | 'low' | 'auto'
  /** Apparition douce lorsque la zone entre dans l’écran */
  reveal?: boolean
  /** Léger mouvement au scroll (effet « vivant » dans le cadre) */
  parallax?: boolean
}

export function BeautyImage({
  src,
  fallback,
  alt,
  frameClassName = '',
  className = '',
  width = 900,
  height = 600,
  loading = 'lazy',
  fetchPriority,
  reveal = true,
  parallax = false,
}: Props) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)
  const [uri, setUri] = useState(src)
  const [visible, setVisible] = useState(!reveal)

  useEffect(() => {
    setUri(src)
  }, [src])

  useEffect(() => {
    if (!reveal) {
      setVisible(true)
      return
    }
    const el = wrapRef.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => {
        if (e?.isIntersecting) setVisible(true)
      },
      { threshold: 0.08, rootMargin: '80px 0px' }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [reveal])

  useEffect(() => {
    if (!parallax) return
    const wrap = wrapRef.current
    const img = imgRef.current
    if (!wrap || !img) return
    const onScroll = () => {
      const rect = wrap.getBoundingClientRect()
      const vh = window.innerHeight
      const mid = rect.top + rect.height / 2
      const n = (mid - vh / 2) / Math.max(vh, 1)
      img.style.transform = `translateY(${n * 18}px) scale(1.07)`
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [parallax])

  return (
    <div
      ref={wrapRef}
      className={`relative overflow-hidden ${frameClassName} ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-7'} transition-all duration-[850ms] ease-out`}
    >
      <img
        ref={imgRef}
        src={uri}
        alt={alt}
        width={width}
        height={height}
        loading={loading}
        decoding="async"
        fetchPriority={fetchPriority}
        onError={() => {
          if (uri !== fallback) setUri(fallback)
        }}
        className={className}
      />
    </div>
  )
}
