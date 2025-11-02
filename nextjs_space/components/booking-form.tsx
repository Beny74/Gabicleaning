
'use client'

import { useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Textarea } from './ui/textarea'
import { Checkbox } from './ui/checkbox'
import { Calendar } from './ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { CalendarIcon, Briefcase, Mail, Phone, MapPin, Sparkles } from 'lucide-react'
import { format } from 'date-fns'
import { toast } from 'react-hot-toast'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'

const EXTRAS = [
  { id: 'ceiling-fan', label: 'Ceiling Fan', icon: '🌀' },
  { id: 'pet-fee', label: 'Pet Fee', icon: '🐾' },
  { id: 'same-day', label: 'Same Day', icon: '⚡' },
  { id: 'patio', label: 'Patio', icon: '🏡' },
  { id: 'laundry', label: 'Laundry', icon: '🧺' },
  { id: 'heavy-duty', label: 'Heavy Duty', icon: '💪' },
  { id: 'inside-cabinets', label: 'Inside Cabinets', icon: '🗄️' },
  { id: 'window-blinds', label: 'Window Blinds', icon: '🪟' },
  { id: 'inside-fridge', label: 'Inside Fridge', icon: '❄️' },
  { id: 'inside-oven', label: 'Inside Oven', icon: '🔥' },
  { id: 'dishes', label: 'Dishes', icon: '🍽️' },
  { id: 'windows', label: 'Windows', icon: '🪟' }
]

export default function BookingForm() {
  const [serviceType, setServiceType] = useState('home')
  const [formData, setFormData] = useState({
    zipCode: '',
    service: 'deep-clean',
    frequency: 'one-time',
    bedrooms: '0',
    bathrooms: '1',
    sqft: '0-750',
    partialCleaning: false,
    extras: [] as string[],
    date: undefined as Date | undefined,
    firstName: '',
    lastName: '',
    email: '',
    secondaryEmail: '',
    phone: '',
    secondaryPhone: '',
    textReminders: true,
    address: '',
    aptNo: '',
    specialNotes: ''
  })

  const handleExtrasToggle = (extraId: string) => {
    setFormData(prev => ({
      ...prev,
      extras: prev.extras.includes(extraId)
        ? prev.extras.filter(id => id !== extraId)
        : [...prev.extras, extraId]
    }))
  }

  const calculateTotal = () => {
    let base = 0
    switch (formData.service) {
      case 'deep-clean':
        base = 260
        break
      case 'general-clean':
        base = 180
        break
      case 'move-clean':
        base = 350
        break
      case 'office':
        base = 200
        break
    }

    const extrasCount = formData.extras.length
    const extrasTotal = extrasCount * 25

    return (base + extrasTotal).toFixed(2)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const bookingData = {
      ...formData,
      total: calculateTotal(),
      serviceType
    }

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData)
      })

      if (response.ok) {
        toast.success('Booking submitted successfully! We\'ll contact you shortly.')
        // Reset form or redirect
      } else {
        toast.error('Failed to submit booking. Please try again.')
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.')
    }
  }

  return (
    <section className="py-8 sm:py-12 md:py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 min-h-[calc(100vh-200px)]">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 text-[#5B3A82] px-2">
            Get Pricing & Book In 60 Seconds
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 px-4 sm:px-6">
            Super simple! Pick the industry you want to book for. Select or fill the values in the fields, find the date and time you want to book for and wait for a confirmation!
          </p>
        </div>

        <Tabs value={serviceType} onValueChange={setServiceType} className="mb-6 sm:mb-8">
          <TabsList className="bg-white flex w-full sm:inline-flex sm:w-auto border border-gray-200 rounded-lg">
            <TabsTrigger data-navlink="false" role="tab" 
              value="home" 
              className="data-[state=active]:bg-[#5B3A82] data-[state=active]:text-white flex-1 sm:flex-initial px-4 sm:px-8 py-3 text-sm sm:text-base rounded-l-lg"
            >
              Home Cleaning
            </TabsTrigger>
            <TabsTrigger data-navlink="false" role="tab" 
              value="office" 
              className="data-[state=active]:bg-[#5B3A82] data-[state=active]:text-white flex-1 sm:flex-initial px-4 sm:px-8 py-3 text-sm sm:text-base rounded-r-lg"
            >
              Office Cleaning
            </TabsTrigger>
          </TabsList>

          <TabsContent value="home">
            <form onSubmit={handleSubmit}>
          <div className="max-w-4xl mx-auto">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {/* Service Type */}
              <div className="card" style={{ padding: '24px' }}>
                <h3 style={{ fontSize: '1.4rem', marginBottom: '8px', color: '#333' }}>Service Type</h3>
                <p style={{ fontSize: '0.95rem', color: '#666', marginBottom: '16px' }}>
                  Please check out our service checklist prior to booking.
                </p>
                
                <div style={{ marginBottom: '16px' }}>
                  <Label htmlFor="service">Services</Label>
                  <Select value={formData.service} onValueChange={(val) => setFormData(prev => ({ ...prev, service: val }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="deep-clean">Deep Clean</SelectItem>
                      <SelectItem value="general-clean">General Clean</SelectItem>
                      <SelectItem value="move-clean">Move In/Out</SelectItem>
                      <SelectItem value="office">Office</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <Label htmlFor="frequency">Frequency</Label>
                  <Select value={formData.frequency} onValueChange={(val) => setFormData(prev => ({ ...prev, frequency: val }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="one-time">One-Time</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="bi-weekly">Bi-Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
                  <div>
                    <Label htmlFor="bedrooms">Bedrooms</Label>
                    <Select value={formData.bedrooms} onValueChange={(val) => setFormData(prev => ({ ...prev, bedrooms: val }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {[0, 1, 2, 3, 4, 5].map(num => (
                          <SelectItem key={num} value={String(num)}>{num}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="bathrooms">Bathrooms</Label>
                    <Select value={formData.bathrooms} onValueChange={(val) => setFormData(prev => ({ ...prev, bathrooms: val }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {[1, 2, 3, 4, 5].map(num => (
                          <SelectItem key={num} value={String(num)}>{num}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <Label htmlFor="sqft">Sq Ft</Label>
                  <Select value={formData.sqft} onValueChange={(val) => setFormData(prev => ({ ...prev, sqft: val }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0-750">0 - 750 Sq F</SelectItem>
                      <SelectItem value="750-1500">750 - 1,500 Sq F</SelectItem>
                      <SelectItem value="1500-2500">1,500 - 2,500 Sq F</SelectItem>
                      <SelectItem value="2500+">2,500+ Sq F</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="partial"
                    checked={formData.partialCleaning}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, partialCleaning: checked as boolean }))}
                  />
                  <Label htmlFor="partial" className="cursor-pointer">
                    This Is Partial Cleaning Only
                  </Label>
                </div>
              </div>

              {/* Extras */}
              <div className="card" style={{ padding: '24px' }}>
                <h3 style={{ fontSize: '1.4rem', marginBottom: '16px', color: '#333' }}>Select Extras</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '12px' }}>
                  {EXTRAS.map(extra => (
                    <button
                      key={extra.id}
                      type="button"
                      onClick={() => handleExtrasToggle(extra.id)}
                      className={`card ${formData.extras.includes(extra.id) ? 'border-2 border-[#5B3A82]' : ''}`}
                      style={{ 
                        padding: '16px',
                        textAlign: 'center',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        background: formData.extras.includes(extra.id) ? '#f3f0f7' : 'white'
                      }}
                    >
                      <div style={{ fontSize: '2rem', marginBottom: '8px' }}>{extra.icon}</div>
                      <div style={{ fontSize: '0.85rem', fontWeight: '500' }}>{extra.label}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Date Selection */}
              <div className="card" style={{ padding: '24px' }}>
                <h3 style={{ fontSize: '1.4rem', marginBottom: '16px', color: '#333' }}>Select Date</h3>
                <div>
                  <Label>Select Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formData.date ? format(formData.date, 'PPP') : 'Select a date'}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={formData.date}
                        onSelect={(date) => setFormData(prev => ({ ...prev, date }))}
                        disabled={(date) => date < new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              {/* Customer Details */}
              <div className="card p-5 sm:p-6 md:p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 flex-shrink-0 rounded-full bg-[#5B3A82] flex items-center justify-center">
                    <span className="text-white text-xl">👤</span>
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800">Customer Details</h3>
                    <p className="text-xs sm:text-sm text-gray-600 mt-0.5">
                      Please provide your contact information so we can confirm your booking.
                    </p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div className="w-full">
                      <Label htmlFor="firstName" className="text-xs sm:text-sm font-medium text-gray-700 block mb-1.5">First Name *</Label>
                      <Input
                        id="firstName"
                        placeholder="Ex: James"
                        value={formData.firstName}
                        onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                        required
                        className="h-10 sm:h-11 text-sm sm:text-base w-full"
                      />
                    </div>
                    <div className="w-full">
                      <Label htmlFor="lastName" className="text-xs sm:text-sm font-medium text-gray-700 block mb-1.5">Last Name *</Label>
                      <Input
                        id="lastName"
                        placeholder="Ex: Lee"
                        value={formData.lastName}
                        onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                        required
                        className="h-10 sm:h-11 text-sm sm:text-base w-full"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div className="w-full">
                      <Label htmlFor="email" className="text-xs sm:text-sm font-medium text-gray-700 block mb-1.5">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Ex: example@xyz.com"
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        required
                        className="h-10 sm:h-11 text-sm sm:text-base w-full"
                      />
                    </div>
                    <div className="w-full">
                      <Label htmlFor="secondaryEmail" className="text-xs sm:text-sm font-medium text-gray-700 block mb-1.5">Secondary Email (Optional)</Label>
                      <Input
                        id="secondaryEmail"
                        type="email"
                        placeholder="Ex: example@xyz.com"
                        value={formData.secondaryEmail}
                        onChange={(e) => setFormData(prev => ({ ...prev, secondaryEmail: e.target.value }))}
                        className="h-10 sm:h-11 text-sm sm:text-base w-full"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div className="w-full">
                      <Label htmlFor="phone" className="text-xs sm:text-sm font-medium text-gray-700 block mb-1.5">Phone Number *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="(555) 123-4567"
                        value={formData.phone}
                        onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                        required
                        className="h-10 sm:h-11 text-sm sm:text-base w-full"
                      />
                    </div>
                    <div className="w-full">
                      <Label htmlFor="secondaryPhone" className="text-xs sm:text-sm font-medium text-gray-700 block mb-1.5">Secondary Phone (Optional)</Label>
                      <Input
                        id="secondaryPhone"
                        type="tel"
                        placeholder="(555) 123-4567"
                        value={formData.secondaryPhone}
                        onChange={(e) => setFormData(prev => ({ ...prev, secondaryPhone: e.target.value }))}
                        className="h-10 sm:h-11 text-sm sm:text-base w-full"
                      />
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 bg-gray-50 p-3 sm:p-4 rounded-lg border border-gray-200">
                    <Checkbox 
                      id="textReminders"
                      checked={formData.textReminders}
                      onCheckedChange={(checked) => setFormData(prev => ({ ...prev, textReminders: checked as boolean }))}
                      className="mt-0.5 flex-shrink-0"
                    />
                    <Label htmlFor="textReminders" className="cursor-pointer text-xs sm:text-sm text-gray-700 leading-relaxed flex-1">
                      Send me reminders about my booking via text message
                    </Label>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-[2fr_1fr] gap-3 sm:gap-4">
                    <div className="w-full">
                      <Label htmlFor="address" className="text-xs sm:text-sm font-medium text-gray-700 block mb-1.5">Address *</Label>
                      <Input
                        id="address"
                        placeholder="123 Main Street"
                        value={formData.address}
                        onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                        required
                        className="h-10 sm:h-11 text-sm sm:text-base w-full"
                      />
                    </div>
                    <div className="w-full">
                      <Label htmlFor="aptNo" className="text-xs sm:text-sm font-medium text-gray-700 block mb-1.5">Apt/Unit (Optional)</Label>
                      <Input
                        id="aptNo"
                        placeholder="#"
                        value={formData.aptNo}
                        onChange={(e) => setFormData(prev => ({ ...prev, aptNo: e.target.value }))}
                        className="h-10 sm:h-11 text-sm sm:text-base w-full"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Special Notes */}
              <div className="card" style={{ padding: '24px' }}>
                <h3 style={{ fontSize: '1.4rem', marginBottom: '16px', color: '#333' }}>Special Notes Or Instructions</h3>
                <div>
                  <Label htmlFor="specialNotes">Would You Like To Add Any Notes?</Label>
                  <Textarea
                    id="specialNotes"
                    placeholder="Special Notes Or Instructions"
                    value={formData.specialNotes}
                    onChange={(e) => setFormData(prev => ({ ...prev, specialNotes: e.target.value }))}
                    rows={4}
                  />
                </div>
              </div>

              {/* Terms and Submit */}
              <div className="card" style={{ padding: '24px' }}>
                <p style={{ fontSize: '0.85rem', color: '#666', marginBottom: '16px', lineHeight: '1.6' }}>
                  By entering any information, you affirm you have read and agree to the Terms of Service and Privacy Policy. You also agree and authorize BookingKoala and its affiliates and their networks to deliver marketing and other material via the information provided.
                </p>
                <Button 
                  type="submit" 
                  className="w-full bg-[#00bcd4] hover:bg-[#00acc1] text-white py-6 text-lg font-semibold"
                  style={{ fontSize: '1.2rem' }}
                >
                  <Sparkles className="mr-2 h-5 w-5" />
                  Save Booking
                </Button>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-5 mt-6">
                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#1e3a5f] flex items-center justify-center mx-auto mb-3">
                    <Briefcase className="text-white" size={24} />
                  </div>
                  <p className="text-sm sm:text-base text-gray-600 leading-snug">Edit & manage your booking online.</p>
                </div>
                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#1e3a5f] flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl sm:text-3xl">👍</span>
                  </div>
                  <p className="text-sm sm:text-base text-gray-600 leading-snug">Providers are friendly and background checked.</p>
                </div>
                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#1e3a5f] flex items-center justify-center mx-auto mb-3">
                    <Mail className="text-white" size={24} />
                  </div>
                  <p className="text-sm sm:text-base text-gray-600 leading-snug">Fast email response & friendly customer service.</p>
                </div>
              </div>
            </div>
          </div>
        </form>
          </TabsContent>

          <TabsContent value="office">
            <form onSubmit={handleSubmit}>
          <div className="max-w-4xl mx-auto">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {/* Service Type */}
              <div className="card" style={{ padding: '24px' }}>
                <h3 style={{ fontSize: '1.4rem', marginBottom: '8px', color: '#333' }}>Service Type</h3>
                <p style={{ fontSize: '0.95rem', color: '#666', marginBottom: '16px' }}>
                  Please check out our service checklist prior to booking.
                </p>
                
                <div style={{ marginBottom: '16px' }}>
                  <Label htmlFor="service">Services</Label>
                  <Select value={formData.service} onValueChange={(val) => setFormData(prev => ({ ...prev, service: val }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="office">Office</SelectItem>
                      <SelectItem value="deep-clean">Deep Clean</SelectItem>
                      <SelectItem value="general-clean">General Clean</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <Label htmlFor="frequency">Frequency</Label>
                  <Select value={formData.frequency} onValueChange={(val) => setFormData(prev => ({ ...prev, frequency: val }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="one-time">One-Time</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="bi-weekly">Bi-Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
                  <div>
                    <Label htmlFor="bedrooms">Bedrooms</Label>
                    <Select value={formData.bedrooms} onValueChange={(val) => setFormData(prev => ({ ...prev, bedrooms: val }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {[0, 1, 2, 3, 4, 5].map(num => (
                          <SelectItem key={num} value={String(num)}>{num}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="bathrooms">Bathrooms</Label>
                    <Select value={formData.bathrooms} onValueChange={(val) => setFormData(prev => ({ ...prev, bathrooms: val }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {[1, 2, 3, 4, 5].map(num => (
                          <SelectItem key={num} value={String(num)}>{num}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <Label htmlFor="sqft">Sq Ft</Label>
                  <Select value={formData.sqft} onValueChange={(val) => setFormData(prev => ({ ...prev, sqft: val }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0-750">0 - 750 Sq F</SelectItem>
                      <SelectItem value="750-1500">750 - 1,500 Sq F</SelectItem>
                      <SelectItem value="1500-2500">1,500 - 2,500 Sq F</SelectItem>
                      <SelectItem value="2500+">2,500+ Sq F</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="partial"
                    checked={formData.partialCleaning}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, partialCleaning: checked as boolean }))}
                  />
                  <Label htmlFor="partial" className="cursor-pointer">
                    This Is Partial Cleaning Only
                  </Label>
                </div>
              </div>

              {/* Extras */}
              <div className="card" style={{ padding: '24px' }}>
                <h3 style={{ fontSize: '1.4rem', marginBottom: '16px', color: '#333' }}>Select Extras</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '12px' }}>
                  {EXTRAS.map(extra => (
                    <button
                      key={extra.id}
                      type="button"
                      onClick={() => handleExtrasToggle(extra.id)}
                      className={`card ${formData.extras.includes(extra.id) ? 'border-2 border-[#5B3A82]' : ''}`}
                      style={{ 
                        padding: '16px',
                        textAlign: 'center',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        background: formData.extras.includes(extra.id) ? '#f3f0f7' : 'white'
                      }}
                    >
                      <div style={{ fontSize: '2rem', marginBottom: '8px' }}>{extra.icon}</div>
                      <div style={{ fontSize: '0.85rem', fontWeight: '500' }}>{extra.label}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Date, Customer Details, etc. - same as home tab */}
              <div className="card" style={{ padding: '24px' }}>
                <h3 style={{ fontSize: '1.4rem', marginBottom: '16px', color: '#333' }}>Choose Service Date</h3>
                <div>
                  <Label>Select Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formData.date ? format(formData.date, 'PPP') : 'Select a date'}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={formData.date}
                        onSelect={(date) => setFormData(prev => ({ ...prev, date }))}
                        disabled={(date) => date < new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              {/* Customer Details */}
              <div className="card p-5 sm:p-6 md:p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 flex-shrink-0 rounded-full bg-[#5B3A82] flex items-center justify-center">
                    <span className="text-white text-xl">👤</span>
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800">Customer Details</h3>
                    <p className="text-xs sm:text-sm text-gray-600 mt-0.5">
                      Please provide your contact information so we can confirm your booking.
                    </p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div className="w-full">
                      <Label htmlFor="firstName" className="text-xs sm:text-sm font-medium text-gray-700 block mb-1.5">First Name *</Label>
                      <Input
                        id="firstName"
                        placeholder="Ex: James"
                        value={formData.firstName}
                        onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                        required
                        className="h-10 sm:h-11 text-sm sm:text-base w-full"
                      />
                    </div>
                    <div className="w-full">
                      <Label htmlFor="lastName" className="text-xs sm:text-sm font-medium text-gray-700 block mb-1.5">Last Name *</Label>
                      <Input
                        id="lastName"
                        placeholder="Ex: Lee"
                        value={formData.lastName}
                        onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                        required
                        className="h-10 sm:h-11 text-sm sm:text-base w-full"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div className="w-full">
                      <Label htmlFor="email" className="text-xs sm:text-sm font-medium text-gray-700 block mb-1.5">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Ex: example@xyz.com"
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        required
                        className="h-10 sm:h-11 text-sm sm:text-base w-full"
                      />
                    </div>
                    <div className="w-full">
                      <Label htmlFor="phone" className="text-xs sm:text-sm font-medium text-gray-700 block mb-1.5">Phone Number *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="(555) 123-4567"
                        value={formData.phone}
                        onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                        required
                        className="h-10 sm:h-11 text-sm sm:text-base w-full"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-[2fr_1fr] gap-3 sm:gap-4">
                    <div className="w-full">
                      <Label htmlFor="address" className="text-xs sm:text-sm font-medium text-gray-700 block mb-1.5">Address *</Label>
                      <Input
                        id="address"
                        placeholder="123 Main Street"
                        value={formData.address}
                        onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                        required
                        className="h-10 sm:h-11 text-sm sm:text-base w-full"
                      />
                    </div>
                    <div className="w-full">
                      <Label htmlFor="aptNo" className="text-xs sm:text-sm font-medium text-gray-700 block mb-1.5">Apt/Suite (Optional)</Label>
                      <Input
                        id="aptNo"
                        placeholder="#"
                        value={formData.aptNo}
                        onChange={(e) => setFormData(prev => ({ ...prev, aptNo: e.target.value }))}
                        className="h-10 sm:h-11 text-sm sm:text-base w-full"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit */}
              <div className="card" style={{ padding: '24px' }}>
                <Button 
                  type="submit" 
                  className="w-full bg-[#00bcd4] hover:bg-[#00acc1] text-white py-6 text-lg font-semibold"
                  style={{ fontSize: '1.2rem' }}
                >
                  <Sparkles className="mr-2 h-5 w-5" />
                  Save Booking
                </Button>
              </div>
            </div>
          </div>
        </form>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}
