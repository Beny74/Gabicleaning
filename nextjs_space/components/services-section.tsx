
import Link from 'next/link'

export default function ServicesSection() {
  const services = [
    {
      icon: "🏠",
      title: "Regular Home Cleaning",
      description: "Weekly, biweekly or monthly maintenance cleaning to keep your home fresh and tidy."
    },
    {
      icon: "🧼",
      title: "Deep Cleaning",
      description: "Thorough cleaning for kitchens, bathrooms and living spaces"
    },
    {
      icon: "🚚",
      title: "Move-Out / Move-In Cleaning",
      description: "Reliable move cleaning to ensure deposit returns or a spotless new home."
    },
    {
      icon: "🏢",
      title: "Office Cleaning",
      description: "Flexible scheduling for office spaces."
    }
  ]

  return (
    <div style={{display:'flex',flexDirection:'column',gap:'20px'}}>
      <div id="services" style={{display:'flex',gap:'12px',overflow:'auto',paddingTop:'10px'}}>
        {services?.map((service, index) => (
          <div key={index} className="card" style={{minWidth:'240px'}}>
            <div className="icon-circle">{service?.icon}</div>
            <div>
              <h4>{service?.title}</h4>
              <p>{service?.description}</p>
            </div>
          </div>
        ))}
      </div>
      <div style={{ textAlign: 'center', marginTop: '10px' }}>
        <Link href="/services">
          <button className="secondary" style={{ fontSize: '1rem', padding: '12px 28px' }}>
            View Detailed Service Checklist →
          </button>
        </Link>
      </div>
    </div>
  )
}
