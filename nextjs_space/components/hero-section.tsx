
'use client'

export default function HeroSection() {
  const scrollToQuote = () => {
    const quoteElement = document.getElementById('quote')
    quoteElement?.scrollIntoView({ behavior: 'smooth' })
  }

  const scrollToServices = () => {
    const servicesElement = document.getElementById('services')
    servicesElement?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-inner" role="region" aria-label="Hero">
        <div className="hero-left">
          <h2 className="hero-title" id="hero-title">Professional Cleaning Services You Can Trust.</h2>
          <p className="hero-sub">Serving the entire Bay Area with care, reliability, and sparkle. Licensed & insured, eco-friendly products, and a 100% satisfaction guarantee.</p>

          <div className="hero-actions" role="group" aria-label="Hero actions">
            <button className="btn-cta" onClick={scrollToQuote}>Get a Free Quote</button>
            <button className="secondary" onClick={scrollToServices}>Our Services</button>
          </div>

          <div style={{marginTop:'14px',display:'flex',gap:'10px',flexWrap:'wrap'}}>
            <div style={{padding:'8px 10px',background:'#fff',borderRadius:'8px',fontSize:'13px',border:'1px solid rgba(160,132,202,0.06)'}}>
              <strong>Eco-Friendly</strong>
              <div style={{fontSize:'12px',color:'#666'}}>Safe for kids & pets</div>
            </div>
            <div style={{padding:'8px 10px',background:'#fff',borderRadius:'8px',fontSize:'13px',border:'1px solid rgba(160,132,202,0.06)'}}>
              <strong>Licensed & Insured</strong>
              <div style={{fontSize:'12px',color:'#666'}}>Trusted local teams</div>
            </div>
            <div style={{padding:'8px 10px',background:'#fff',borderRadius:'8px',fontSize:'13px',border:'1px solid rgba(160,132,202,0.06)'}}>
              <strong>Flexible Hours</strong>
              <div style={{fontSize:'12px',color:'#666'}}>Weekdays & weekends</div>
            </div>
          </div>
        </div>

        <div className="hero-visual" aria-hidden="true">
          <div className="circle">
            <svg viewBox="0 0 120 120" width="120" height="120" aria-hidden="true">
              <defs>
                <linearGradient id="g1" x1="0" x2="1" y1="0" y2="1">
                  <stop offset="0" stopColor="#cbb0ea"/>
                  <stop offset="1" stopColor="#8f6ecf"/>
                </linearGradient>
              </defs>
              <g transform="translate(12,6)" fill="url(#g1)" opacity="0.98">
                <rect x="46" y="10" width="28" height="6" rx="2" transform="rotate(-10 60 13)"/>
                <rect x="56" y="16" width="6" height="48" rx="3" transform="rotate(2 59 40)"/>
                <rect x="10" y="48" width="24" height="48" rx="4" transform="rotate(6 22 72)"/>
                <ellipse cx="18" cy="102" rx="6" ry="3" opacity="0.9"/>
              </g>
            </svg>
          </div>
        </div>

        <svg className="sparkles" viewBox="0 0 200 200" width="200" height="200" aria-hidden="true">
          <g fill="#A084CA">
            <circle cx="12" cy="10" r="1.6"/>
            <circle cx="36" cy="26" r="1.1"/>
            <circle cx="60" cy="40" r="1.6"/>
            <circle cx="92" cy="18" r="2"/>
          </g>
        </svg>
      </div>
    </section>
  )
}
