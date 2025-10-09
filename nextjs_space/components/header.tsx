
'use client'

import Image from 'next/image'

export default function Header() {
  const scrollToQuote = () => {
    const quoteElement = document.getElementById('quote')
    quoteElement?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header>
      <div className="brand" aria-label="Gabi Cleaning brand">
        <div className="logo-mark" aria-hidden="true" style={{ background: 'transparent', boxShadow: 'none' }}>
          <Image 
            src="/logo-circular.jpg" 
            alt="Gabi Cleaning Logo"
            width={64}
            height={64}
            style={{ borderRadius: '50%', objectFit: 'cover' }}
            priority
          />
        </div>
        <div>
          <h1>Gabi Cleaning</h1>
          <p>By Gabi Di Francescantonio — Bay Area</p>
        </div>
      </div>

      <nav aria-label="Primary">
        <button className="secondary" onClick={scrollToQuote}>Get a Quote</button>
        <button className="btn-cta" onClick={scrollToQuote}>Book Now</button>
      </nav>
    </header>
  )
}
