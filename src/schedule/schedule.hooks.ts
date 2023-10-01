import { useContext } from 'react'
import { scheduleCtx } from '.'
import { Booking } from './schedule.types'

export const useHours = (
  start: number = 9, // First walk of day: 9am
  end: number = 17,  // Last walk of day: 5pm
) => {
  const currentHour = (new Date()).getHours()
  const generateHours = (bookings: Booking[]) => [
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
