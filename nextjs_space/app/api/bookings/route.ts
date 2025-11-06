
import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { sendBookingRequestEmail } from '@/lib/email'

const prisma = new PrismaClient()

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      serviceType,
      zipCode,
      service,
      frequency,
      bedrooms,
      bathrooms,
      sqft,
      partialCleaning,
      extras,
      date,
      firstName,
      lastName,
      email,
      secondaryEmail,
      phone,
      secondaryPhone,
      textReminders,
      address,
      aptNo,
      specialNotes,
      total
    } = body

    // Basic validation
    if (!firstName || !lastName || !email || !phone || !zipCode) {
      return NextResponse.json(
        { error: 'Required fields: firstName, lastName, email, phone, zipCode' },
        { status: 400 }
      )
    }

    // Create booking in database
    const booking = await prisma.booking.create({
      data: {
        serviceType: serviceType || 'home',
        zipCode: zipCode?.trim() ?? '',
        service: service || 'deep-clean',
        frequency: frequency || 'one-time',
        bedrooms: bedrooms || null,
        bathrooms: bathrooms || null,
        sqft: sqft || null,
        partialCleaning: partialCleaning ?? false,
        extras: extras || [],
        date: date || null,
        firstName: firstName?.trim() ?? '',
        lastName: lastName?.trim() ?? '',
        email: email?.trim() ?? '',
        secondaryEmail: secondaryEmail?.trim() || null,
        phone: phone?.trim() ?? '',
        secondaryPhone: secondaryPhone?.trim() || null,
        textReminders: textReminders ?? true,
        address: address?.trim() || null,
        aptNo: aptNo?.trim() || null,
        specialNotes: specialNotes?.trim() || null,
        total: total || null,
      },
    })

    // Send email notification
    try {
      await sendBookingRequestEmail({
        serviceType: serviceType || 'home',
        zipCode: zipCode?.trim() ?? '',
        service: service || 'deep-clean',
        frequency: frequency || 'one-time',
        bedrooms: bedrooms || null,
        bathrooms: bathrooms || null,
        sqft: sqft || null,
        partialCleaning: partialCleaning ?? false,
        extras: extras || [],
        date: date || null,
        firstName: firstName?.trim() ?? '',
        lastName: lastName?.trim() ?? '',
        email: email?.trim() ?? '',
        secondaryEmail: secondaryEmail?.trim() || null,
        phone: phone?.trim() ?? '',
        secondaryPhone: secondaryPhone?.trim() || null,
        textReminders: textReminders ?? true,
        address: address?.trim() || null,
        aptNo: aptNo?.trim() || null,
        specialNotes: specialNotes?.trim() || null,
        total: total || null,
      })
    } catch (emailError) {
      console.error('Error sending email notification:', emailError)
      // Continue even if email fails - booking is still saved in database
    }

    return NextResponse.json(
      { 
        success: true, 
        message: 'Booking submitted successfully',
        id: booking?.id
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error creating booking:', error)
    return NextResponse.json(
      { error: 'Failed to submit booking' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const bookings = await prisma.booking.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json({ bookings }, { status: 200 })
  } catch (error) {
    console.error('Error fetching bookings:', error)
    return NextResponse.json(
      { error: 'Failed to fetch bookings' },
      { status: 500 }
    )
  }
}
