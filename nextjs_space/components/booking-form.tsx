
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
import { CalendarIcon, Home, Building2, Fan, Dog, Zap, Flame, Refrigerator, Square, WashingMachine, Archive } from 'lucide-react'
import { format } from 'date-fns'
import { toast } from 'react-hot-toast'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'

const EXTRAS = [
  { id: 'ceiling-fan', label: 'Ceiling Fan', Icon: Fan, bgColor: 'bg-blue-100', iconColor: 'text-blue-500' },
  { id: 'pet-fee', label: 'Pet Fee', Icon: Dog, bgColor: 'bg-purple-100', iconColor: 'text-purple-500' },
  { id: 'same-day', label: 'Same Day', Icon: Zap, bgColor: 'bg-yellow-100', iconColor: 'text-yellow-500' },
  { id: 'oven-cleaning', label: 'Oven Cleaning', Icon: Flame, bgColor: 'bg-orange-100', iconColor: 'text-orange-500' },
  { id: 'fridge-cleaning', label: 'Fridge Cleaning', Icon: Refrigerator, bgColor: 'bg-cyan-100', iconColor: 'text-cyan-500' },
  { id: 'window-cleaning', label: 'Window Cleaning', Icon: Square, bgColor: 'bg-green-100', iconColor: 'text-green-500' },
  { id: 'laundry', label: 'Laundry', Icon: WashingMachine, bgColor: 'bg-pink-100', iconColor: 'text-pink-500' },
  { id: 'cabinet-organization', label: 'Cabinet Organization', Icon: Archive, bgColor: 'bg-purple-100', iconColor: 'text-purple-500' }
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
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-5 text-[#7C3AED] px-2">
            Request Your Free Cleaning Proposal
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 px-4 sm:px-6 max-w-3xl mx-auto">
            Tell us about your space and cleaning needs. We'll provide a customized quote within 24 hours with no obligation. Get started in just a few clicks!
          </p>
        </div>

        <Tabs value={serviceType} onValueChange={setServiceType} className="mb-6 sm:mb-8">
          <TabsList className="bg-gray-100 flex w-full sm:grid sm:grid-cols-2 sm:w-auto border border-gray-200 rounded-lg p-1 gap-1">
            <TabsTrigger data-navlink="false" role="tab" 
              value="home" 
              className="data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm flex-1 sm:flex-initial px-4 sm:px-6 py-3 text-sm sm:text-base rounded-md flex items-center justify-center gap-2"
            >
              <Home className="w-4 h-4" />
              Home Cleaning
            </TabsTrigger>
            <TabsTrigger data-navlink="false" role="tab" 
              value="office" 
              className="data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm flex-1 sm:flex-initial px-4 sm:px-6 py-3 text-sm sm:text-base rounded-md flex items-center justify-center gap-2"
            >
              <Building2 className="w-4 h-4" />
              Office Cleaning
            </TabsTrigger>
          </TabsList>

          <TabsContent value="home">
            <form onSubmit={handleSubmit}>
          <div className="max-w-4xl mx-auto">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {/* Zip Code */}
              <div className="card" style={{ padding: '24px', backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '8px', color: '#111827', fontWeight: '600' }}>Where Will The Service Be Taking Place?</h3>
                <p style={{ fontSize: '0.875rem', color: '#6B7280', marginBottom: '16px' }}>
                  Enter Zip Code For Pricing
                </p>
                <div style={{ maxWidth: '300px' }}>
                  <Input
                    type="text"
                    placeholder="Zip Code"
                    value={formData.zipCode}
                    onChange={(e) => setFormData(prev => ({ ...prev, zipCode: e.target.value }))}
                    className="h-11"
                  />
                </div>
              </div>

              {/* Service Type */}
              <div className="card" style={{ padding: '24px', backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '8px', color: '#111827', fontWeight: '600' }}>Service Type</h3>
                <p style={{ fontSize: '0.875rem', color: '#7C3AED', marginBottom: '16px' }}>
                  <a href="/services" className="hover:underline">Please check out our service checklist prior to booking.</a>
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
              <div className="card" style={{ padding: '24px', backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '20px', color: '#111827', fontWeight: '600' }}>Select Extras</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {EXTRAS.map(extra => {
                    const IconComponent = extra.Icon
                    return (
                      <button
                        key={extra.id}
                        type="button"
                        onClick={() => handleExtrasToggle(extra.id)}
                        className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all duration-200 ${
                          formData.extras.includes(extra.id) 
                            ? 'border-[#7C3AED] bg-purple-50' 
                            : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
                        }`}
                      >
                        <div className={`w-10 h-10 rounded-lg ${extra.bgColor} flex items-center justify-center flex-shrink-0`}>
                          <IconComponent className={`w-5 h-5 ${extra.iconColor}`} />
                        </div>
                        <span className="flex-1 text-left text-sm font-medium text-gray-800">{extra.label}</span>
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                          formData.extras.includes(extra.id) ? 'border-[#7C3AED] bg-[#7C3AED]' : 'border-gray-300'
                        }`}>
                          {formData.extras.includes(extra.id) && (
                            <div className="w-2 h-2 rounded-full bg-white"></div>
                          )}
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Date Selection */}
              <div className="card" style={{ padding: '24px', backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '16px', color: '#111827', fontWeight: '600' }}>Select Preferred Date</h3>
                <div>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full sm:w-auto justify-start text-left font-normal h-11 px-4 border-gray-300">
                        <CalendarIcon className="mr-2 h-4 w-4 text-[#7C3AED]" />
                        {formData.date ? format(formData.date, 'PPP') : <span className="text-gray-500">Pick a date</span>}
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
              <div className="card" style={{ padding: '24px', backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '16px', color: '#111827', fontWeight: '600' }}>Your Contact Information</h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="fullName" className="text-sm font-medium text-gray-700 block mb-2">Full Name</Label>
                    <Input
                      id="fullName"
                      placeholder="Enter your full name"
                      value={`${formData.firstName} ${formData.lastName}`.trim()}
                      onChange={(e) => {
                        const parts = e.target.value.split(' ')
                        setFormData(prev => ({ 
                          ...prev, 
                          firstName: parts[0] || '',
                          lastName: parts.slice(1).join(' ') || ''
                        }))
                      }}
                      required
                      className="h-11 text-base w-full"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-sm font-medium text-gray-700 block mb-2">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      required
                      className="h-11 text-base w-full"
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone" className="text-sm font-medium text-gray-700 block mb-2">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="Enter your phone number"
                      value={formData.phone}
                      onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                      required
                      className="h-11 text-base w-full"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div style={{ marginTop: '8px' }}>
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-[#7C3AED] to-[#6366F1] hover:from-[#6D28D9] hover:to-[#4F46E5] text-white py-6 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
                  style={{ fontSize: '1.1rem', height: '56px' }}
                >
                  Request Free Proposal
                </Button>
              </div>
            </div>
          </div>
        </form>
          </TabsContent>

          <TabsContent value="office">
            <form onSubmit={handleSubmit}>
          <div className="max-w-4xl mx-auto">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {/* Zip Code */}
              <div className="card" style={{ padding: '24px', backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '8px', color: '#111827', fontWeight: '600' }}>Where Will The Service Be Taking Place?</h3>
                <p style={{ fontSize: '0.875rem', color: '#6B7280', marginBottom: '16px' }}>
                  Enter Zip Code For Pricing
                </p>
                <div style={{ maxWidth: '300px' }}>
                  <Input
                    type="text"
                    placeholder="Zip Code"
                    value={formData.zipCode}
                    onChange={(e) => setFormData(prev => ({ ...prev, zipCode: e.target.value }))}
                    className="h-11"
                  />
                </div>
              </div>

              {/* Service Type */}
              <div className="card" style={{ padding: '24px', backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '8px', color: '#111827', fontWeight: '600' }}>Service Type</h3>
                <p style={{ fontSize: '0.875rem', color: '#7C3AED', marginBottom: '16px' }}>
                  <a href="/services" className="hover:underline">Please check out our service checklist prior to booking.</a>
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
                      <SelectItem value="move-clean">Move In/Out</SelectItem>
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
                      <SelectItem value="0-750">0 - 750 Sq Ft</SelectItem>
                      <SelectItem value="750-1500">750 - 1,500 Sq Ft</SelectItem>
                      <SelectItem value="1500-2500">1,500 - 2,500 Sq Ft</SelectItem>
                      <SelectItem value="2500+">2,500+ Sq Ft</SelectItem>
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
              <div className="card" style={{ padding: '24px', backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '20px', color: '#111827', fontWeight: '600' }}>Select Extras</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {EXTRAS.map(extra => {
                    const IconComponent = extra.Icon
                    return (
                      <button
                        key={extra.id}
                        type="button"
                        onClick={() => handleExtrasToggle(extra.id)}
                        className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all duration-200 ${
                          formData.extras.includes(extra.id) 
                            ? 'border-[#7C3AED] bg-purple-50' 
                            : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
                        }`}
                      >
                        <div className={`w-10 h-10 rounded-lg ${extra.bgColor} flex items-center justify-center flex-shrink-0`}>
                          <IconComponent className={`w-5 h-5 ${extra.iconColor}`} />
                        </div>
                        <span className="flex-1 text-left text-sm font-medium text-gray-800">{extra.label}</span>
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                          formData.extras.includes(extra.id) ? 'border-[#7C3AED] bg-[#7C3AED]' : 'border-gray-300'
                        }`}>
                          {formData.extras.includes(extra.id) && (
                            <div className="w-2 h-2 rounded-full bg-white"></div>
                          )}
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Date Selection */}
              <div className="card" style={{ padding: '24px', backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '16px', color: '#111827', fontWeight: '600' }}>Select Preferred Date</h3>
                <div>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full sm:w-auto justify-start text-left font-normal h-11 px-4 border-gray-300">
                        <CalendarIcon className="mr-2 h-4 w-4 text-[#7C3AED]" />
                        {formData.date ? format(formData.date, 'PPP') : <span className="text-gray-500">Pick a date</span>}
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
              <div className="card" style={{ padding: '24px', backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '16px', color: '#111827', fontWeight: '600' }}>Your Contact Information</h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="fullName2" className="text-sm font-medium text-gray-700 block mb-2">Full Name</Label>
                    <Input
                      id="fullName2"
                      placeholder="Enter your full name"
                      value={`${formData.firstName} ${formData.lastName}`.trim()}
                      onChange={(e) => {
                        const parts = e.target.value.split(' ')
                        setFormData(prev => ({ 
                          ...prev, 
                          firstName: parts[0] || '',
                          lastName: parts.slice(1).join(' ') || ''
                        }))
                      }}
                      required
                      className="h-11 text-base w-full"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email2" className="text-sm font-medium text-gray-700 block mb-2">Email Address</Label>
                    <Input
                      id="email2"
                      type="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      required
                      className="h-11 text-base w-full"
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone2" className="text-sm font-medium text-gray-700 block mb-2">Phone Number</Label>
                    <Input
                      id="phone2"
                      type="tel"
                      placeholder="Enter your phone number"
                      value={formData.phone}
                      onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                      required
                      className="h-11 text-base w-full"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div style={{ marginTop: '8px' }}>
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-[#7C3AED] to-[#6366F1] hover:from-[#6D28D9] hover:to-[#4F46E5] text-white py-6 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
                  style={{ fontSize: '1.1rem', height: '56px' }}
                >
                  Request Free Proposal
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