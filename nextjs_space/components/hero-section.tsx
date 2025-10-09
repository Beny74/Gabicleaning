
'use client'

import Image from 'next/image'

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
    <>
      {/* Hero Banner */}
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-inner" role="region" aria-label="Hero">
          <div className="hero-left">
            <h2 className="hero-title" id="hero-title">
              Reliable Home Cleaning in the <span style={{color:'var(--primary)'}}>Bay Area</span>
            </h2>
            <p className="hero-sub">
              Experience the convenience of professional cleaning services. Designed to meet your specific needs, save you time, and eliminate stress.
            </p>

            <div className="hero-actions" role="group" aria-label="Hero actions">
              <button className="btn-cta" onClick={scrollToQuote}>Book a Cleaning</button>
              <button className="secondary" onClick={scrollToServices}>View Services</button>
            </div>

            {/* Feature badges */}
            <div style={{marginTop:'24px',display:'flex',gap:'12px',flexWrap:'wrap'}}>
              <div style={{padding:'10px 14px',background:'var(--gray-50)',borderRadius:'10px',fontSize:'14px',border:'1px solid var(--gray-200)',display:'flex',alignItems:'center',gap:'8px'}}>
                <span style={{fontSize:'18px'}}>✓</span>
                <div>
                  <strong style={{color:'var(--text-dark)'}}>Eco-Friendly</strong>
                  <div style={{fontSize:'12px',color:'var(--text-muted)'}}>Safe for kids & pets</div>
                </div>
              </div>
              <div style={{padding:'10px 14px',background:'var(--gray-50)',borderRadius:'10px',fontSize:'14px',border:'1px solid var(--gray-200)',display:'flex',alignItems:'center',gap:'8px'}}>
                <span style={{fontSize:'18px'}}>✓</span>
                <div>
                  <strong style={{color:'var(--text-dark)'}}>Licensed & Insured</strong>
                  <div style={{fontSize:'12px',color:'var(--text-muted)'}}>Trusted professionals</div>
                </div>
              </div>
              <div style={{padding:'10px 14px',background:'var(--gray-50)',borderRadius:'10px',fontSize:'14px',border:'1px solid var(--gray-200)',display:'flex',alignItems:'center',gap:'8px'}}>
                <span style={{fontSize:'18px'}}>✓</span>
                <div>
                  <strong style={{color:'var(--text-dark)'}}>Flexible Scheduling</strong>
                  <div style={{fontSize:'12px',color:'var(--text-muted)'}}>7 days a week</div>
                </div>
              </div>
            </div>
          </div>

          <div className="hero-visual" style={{width:'100%',maxWidth:'500px',display:'flex',alignItems:'center',justifyContent:'center'}}>
            <div style={{width:'100%',aspectRatio:'16/10',position:'relative',borderRadius:'16px',overflow:'hidden',boxShadow:'0 8px 32px rgba(0,0,0,0.12)'}}>
              <Image 
                src="https://cdn.abacus.ai/images/69430ba2-c067-44ee-916a-c22e4d30b0a4.png"
                alt="Spotless modern kitchen showcasing professional cleaning results"
                fill
                style={{objectFit:'cover'}}
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section style={{marginTop:'48px',background:'var(--white)',padding:'40px',borderRadius:'16px',border:'1px solid var(--gray-200)',boxShadow:'0 2px 12px rgba(0,0,0,0.04)'}}>
        <div style={{display:'grid',gridTemplateColumns:'1fr',gap:'32px',alignItems:'center'}} className="why-choose-grid">
          <div style={{aspectRatio:'3/2',position:'relative',borderRadius:'12px',overflow:'hidden'}}>
            <Image 
              src="https://cdn.abacus.ai/images/b0774aff-f8cf-4582-b418-bc75ed7d7b88.png"
              alt="Professional cleaner with supplies ready to provide exceptional service"
              fill
              style={{objectFit:'cover'}}
            />
          </div>
          <div>
            <h3 style={{fontFamily:'Poppins',fontSize:'28px',color:'var(--text-dark)',margin:'0 0 16px',fontWeight:'600'}}>
              Why Choose Gabi Cleaning?
            </h3>
            <p style={{color:'var(--text-muted)',fontSize:'16px',lineHeight:'1.6',marginBottom:'20px'}}>
              For over a decade, we've provided exceptional housekeeping services to families across the Bay Area. Our agency is known for its high industry standards, personalized matching process, and first-rate professionals.
            </p>
            <div style={{display:'flex',flexDirection:'column',gap:'12px'}}>
              {[
                {icon:'✓', title:'Background Checked', desc:'All cleaners thoroughly vetted'},
                {icon:'✓', title:'Professional Experience', desc:'Trained and experienced staff'},
                {icon:'✓', title:'Quality Supplies', desc:'We bring eco-friendly products'},
                {icon:'✓', title:'Satisfaction Guaranteed', desc:'100% happiness or we make it right'}
              ].map((item, i) => (
                <div key={i} style={{display:'flex',alignItems:'start',gap:'12px'}}>
                  <div style={{width:'24px',height:'24px',borderRadius:'50%',background:'var(--primary)',color:'white',display:'grid',placeItems:'center',fontSize:'14px',fontWeight:'bold',flexShrink:0}}>
                    {item.icon}
                  </div>
                  <div>
                    <div style={{fontWeight:'600',color:'var(--text-dark)',fontSize:'15px'}}>{item.title}</div>
                    <div style={{fontSize:'14px',color:'var(--text-muted)'}}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        @media(min-width: 768px) {
          .why-choose-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
      `}</style>
    </>
  )
}
