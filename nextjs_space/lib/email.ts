
import nodemailer from 'nodemailer'

// Create transporter with Gmail configuration
const createTransporter = () => {
  // If email credentials are not provided, return a test transporter
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
    console.warn('Email credentials not configured. Using test account.')
    return nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: 'test@test.com',
        pass: 'test',
      },
    })
  }

  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  })
}

interface QuoteRequestData {
  name: string
  phone: string
  address?: string | null
  service: string
  size?: string | null
  date?: string | null
  notes?: string | null
}

export async function sendQuoteRequestEmail(data: QuoteRequestData) {
  const transporter = createTransporter()
  
  const emailContent = `
    <h2>Nova Solicitação de Orçamento - Gabi Cleaning</h2>
    
    <h3>Informações do Cliente:</h3>
    <ul>
      <li><strong>Nome:</strong> ${data.name}</li>
      <li><strong>Telefone:</strong> ${data.phone}</li>
      ${data.address ? `<li><strong>Endereço:</strong> ${data.address}</li>` : ''}
    </ul>
    
    <h3>Detalhes do Serviço:</h3>
    <ul>
      <li><strong>Tipo de Limpeza:</strong> ${data.service}</li>
      ${data.size ? `<li><strong>Tamanho do Imóvel:</strong> ${data.size}</li>` : ''}
      ${data.date ? `<li><strong>Data Preferida:</strong> ${data.date}</li>` : ''}
    </ul>
    
    ${data.notes ? `
    <h3>Notas Adicionais:</h3>
    <p>${data.notes}</p>
    ` : ''}
    
    <hr>
    <p style="color: #666; font-size: 12px;">
      Este e-mail foi enviado automaticamente pelo formulário de solicitação de orçamento do site Gabi Cleaning.
    </p>
  `
  
  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER || 'noreply@gabicleaning.com',
      to: 'gabifcleaning@gmail.com',
      subject: `Nova Solicitação de Orçamento - ${data.name}`,
      html: emailContent,
      replyTo: data.phone.includes('@') ? data.phone : undefined,
    })
    
    console.log('Email sent successfully:', info.messageId)
    return { success: true, messageId: info.messageId }
  } catch (error) {
    console.error('Error sending email:', error)
    return { success: false, error }
  }
}

interface BookingRequestData {
  serviceType: string
  zipCode: string
  service: string
  frequency: string
  bedrooms?: string | null
  bathrooms?: string | null
  sqft?: string | null
  partialCleaning: boolean
  extras: string[]
  date?: string | null
  firstName: string
  lastName: string
  email: string
  secondaryEmail?: string | null
  phone: string
  secondaryPhone?: string | null
  textReminders: boolean
  address?: string | null
  aptNo?: string | null
  specialNotes?: string | null
  total?: string | null
}

const EXTRA_LABELS: { [key: string]: string } = {
  'ceiling-fan': 'Ceiling Fan',
  'pet-fee': 'Pet Fee',
  'same-day': 'Same Day',
  'oven-cleaning': 'Oven Cleaning',
  'fridge-cleaning': 'Fridge Cleaning',
  'window-cleaning': 'Window Cleaning',
  'laundry': 'Laundry',
  'cabinet-organization': 'Cabinet Organization'
}

export async function sendBookingRequestEmail(data: BookingRequestData) {
  const transporter = createTransporter()
  
  const extrasText = data.extras.length > 0 
    ? data.extras.map(id => EXTRA_LABELS[id] || id).join(', ')
    : 'Nenhum'
  
  const emailContent = `
    <h2>Nova Proposta de Limpeza - Gabi Cleaning</h2>
    
    <h3>Informações do Cliente:</h3>
    <ul>
      <li><strong>Nome:</strong> ${data.firstName} ${data.lastName}</li>
      <li><strong>Email:</strong> ${data.email}</li>
      ${data.secondaryEmail ? `<li><strong>Email Secundário:</strong> ${data.secondaryEmail}</li>` : ''}
      <li><strong>Telefone:</strong> ${data.phone}</li>
      ${data.secondaryPhone ? `<li><strong>Telefone Secundário:</strong> ${data.secondaryPhone}</li>` : ''}
      <li><strong>Aceita Lembretes por SMS:</strong> ${data.textReminders ? 'Sim' : 'Não'}</li>
      ${data.address ? `<li><strong>Endereço:</strong> ${data.address}</li>` : ''}
      ${data.aptNo ? `<li><strong>Apto/Unidade:</strong> ${data.aptNo}</li>` : ''}
    </ul>
    
    <h3>Detalhes do Serviço:</h3>
    <ul>
      <li><strong>Tipo de Serviço:</strong> ${data.serviceType === 'home' ? 'Residencial' : 'Comercial'}</li>
      <li><strong>CEP/Zip Code:</strong> ${data.zipCode}</li>
      <li><strong>Serviço:</strong> ${data.service}</li>
      <li><strong>Frequência:</strong> ${data.frequency}</li>
      ${data.bedrooms ? `<li><strong>Quartos:</strong> ${data.bedrooms}</li>` : ''}
      ${data.bathrooms ? `<li><strong>Banheiros:</strong> ${data.bathrooms}</li>` : ''}
      ${data.sqft ? `<li><strong>Área (Sq Ft):</strong> ${data.sqft}</li>` : ''}
      <li><strong>Limpeza Parcial:</strong> ${data.partialCleaning ? 'Sim' : 'Não'}</li>
      <li><strong>Extras:</strong> ${extrasText}</li>
      ${data.date ? `<li><strong>Data Preferida:</strong> ${data.date}</li>` : ''}
      ${data.total ? `<li><strong>Valor Estimado:</strong> $${data.total}</li>` : ''}
    </ul>
    
    ${data.specialNotes ? `
    <h3>Notas Especiais:</h3>
    <p>${data.specialNotes}</p>
    ` : ''}
    
    <hr>
    <p style="color: #666; font-size: 12px;">
      Este e-mail foi enviado automaticamente pelo formulário "Request Free Proposal" do site Gabi Cleaning.
    </p>
  `
  
  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER || 'noreply@gabicleaning.com',
      to: 'gabifcleaning@gmail.com',
      subject: `Nova Proposta de Limpeza - ${data.firstName} ${data.lastName}`,
      html: emailContent,
      replyTo: data.email,
    })
    
    console.log('Email sent successfully:', info.messageId)
    return { success: true, messageId: info.messageId }
  } catch (error) {
    console.error('Error sending email:', error)
    return { success: false, error }
  }
}
