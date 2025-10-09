
'use client'

import { useEffect, useState } from 'react'

export default function Footer() {
  const [currentYear, setCurrentYear] = useState('')

  useEffect(() => {
    setCurrentYear(new Date().getFullYear().toString())
  }, [])

  return (
    <footer>
      <div className="contact">
        <div>
          <strong style={{display:'block',color:'var(--lilac-3)'}}>Gabi Cleaning</strong>
          <div style={{fontSize:'14px',color:'#444'}}>
            (510) 837-0505 • <a href="mailto:gabifcleaning@gmail.com">gabifcleaning@gmail.com</a>
          </div>
          <div style={{fontSize:'12px',color:'#7b6f86',marginTop:'6px'}}>
            Serving the entire Bay Area • Licensed & Insured
          </div>
        </div>
      </div>

      <div style={{display:'flex',flexDirection:'column',alignItems:'flex-end'}}>
        <div className="social" aria-label="Social links">
          <a aria-label="Instagram" href="#" title="Instagram">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
              <path 
                d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5z" 
                stroke="#6E56A8" 
                strokeWidth="1.2" 
                fill="none"
              />
              <circle cx="12" cy="12" r="3" stroke="#6E56A8" strokeWidth="1.2" fill="none"/>
              <circle cx="17.5" cy="6.5" r="0.6" fill="#6E56A8"/>
            </svg>
          </a>
          <a aria-label="Yelp" href="#" title="Yelp">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
              <path d="M12 12c-1 0-2 1-2 2s1 2 2 2 2-1 2-2-1-2-2-2z" fill="#6E56A8"/>
            </svg>
          </a>
          <a aria-label="Google" href="#" title="Google">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="#6E56A8" strokeWidth="1.2" fill="none"/>
            </svg>
          </a>
        </div>
        <small style={{fontSize:'12px',color:'#8a799d',marginTop:'8px'}}>
          © {currentYear} Gabi Cleaning
        </small>
      </div>
    </footer>
  )
}
