
'use client'

export default function Header() {
  const scrollToQuote = () => {
    const quoteElement = document.getElementById('quote')
    quoteElement?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header>
      <div className="brand" aria-label="Gabi Cleaning brand">
        <div className="logo-mark" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <g fill="white" fillOpacity="0.98">
              <path d="M6 12c0 1.657-1.343 3-3 3s-3-1.343-3-3 1.343-3 3-3 3 1.343 3 3z" opacity="0.14"/>
              <rect x="6.2" y="3" width="12.6" height="3.2" rx="1.2" transform="rotate(22 6.2 3)" />
              <rect x="8" y="16" width="2" height="6" rx="1"/>
            </g>
          </svg>
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
