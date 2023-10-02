import { useCallback, useContext } from 'react'
import { scheduleCtx } from '.'
import { Booking } from './schedule.types'
import { Booking as BookingT } from '@prisma/client'
import { authCtx } from '@/auth'

export const useHours = (
  start: number = 9, // First walk of day: 9am
  end: number = 17,  // Last walk of day: 5pm
) => {
  const generateHours = (bookings: Booking[], date: Date = new Date()) => {
    const currentDate = new Date()
    const currentHour = date > currentDate
      ? 0
      : currentDate.getHours()

    return [
      ...Array(end - start + 1).keys()]
        .map((key: number) => {
          const hour = key + start
          const booking = bookings.find(
            (booking: Booking) => booking.hour === hour
          )
          const past = hour <= currentHour
          const label = hour > 12
            ? `${hour - 12}pm`
            : `${hour}am`
          
          return {
            hour,
            label,
            booking,
            past,
          }
        })
  }

  return {
    generateHours,
  }
}

export const useDateSwitcher = () => {
  const { date, changeDate } = useContext(scheduleCtx)
  const nextDay = () => {
    changeDate(new Date(
      date.setDate(
        date.getDate() + 1
      )
    ))
  }
  const previousDay = () => {
    changeDate(new Date(
      date.setDate(
        date.getDate() - 1
      )
    ))
  }

  return {
    forward: nextDay,
    back: previousDay,
  }
}

export const useReservationApi = () => {
  const { sessionToken } = useContext(authCtx)

  const create = useCallback(async (data: Partial<BookingT>) => {
    const result = await (await fetch(`/api/bookings`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${sessionToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })).json()

    return result
  }, [sessionToken])

  const update = useCallback(async (data: Partial<BookingT>) => {
    await fetch(`/api/bookings/${data.id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${sessionToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
  }, [sessionToken])

  return {
    create,
    update,
  }
}
