'use client'

import {
  createContext,
  useCallback,
  useContext,
  useState,
} from 'react'
import {
  Booking,
  Hour,
  ScheduleContext,
  ScheduleProviderProps,
} from './schedule.types'
import { useHours } from './schedule.hooks'

const placeholderBookings: Booking[] = [
  {
    userID: 'alpha',
    dog: {
      name: 'Fido',
      breed: 'Golden Retriever',
      avatar: 'https://images.unsplash.com/photo-1586671267731-da2cf3ceeb80',
    },
    hour: 14,
  },
]

export const scheduleCtx = createContext<ScheduleContext>({
  date: new Date(),
  bookings: placeholderBookings,
  hours: [],
  updateHours: (hours: Hour[]) => null,
  changeDate: (date: Date) => null,
  setBookings: (bookings: Booking[]) => null,
})

export const ScheduleProvider = ({ children }: ScheduleProviderProps) => {
  const schedule = useContext(scheduleCtx)
  const [date, setDate] = useState<Date>(schedule.date)
  const [bookings, setBookings] = useState<Booking[]>(schedule.bookings)
  const { generateHours } = useHours()
  const [hours, setHours] = useState<Hour[]>(generateHours(bookings))
  const changeDate = useCallback(async (date: Date) => {
    console.log('getting bookings...')
    const bookingsByDay = await (
      await fetch(`/api/bookings?date=${date}`)
    ).json()

    console.log('bookings received:', bookingsByDay)
    setBookings(bookingsByDay.data)
    setHours(generateHours(bookingsByDay.data, date))
    console.log('hours generated')
    setDate(date)
  }, [generateHours, setBookings, setDate, setHours])

  return (
    <scheduleCtx.Provider value={{
      date,
      bookings,
      changeDate,
      hours,
      updateHours: (hours: Hour[]) => {
        console.log('Got the hours:', hours)
        setHours(hours)
      },
      setBookings,
    }}>
      {children}
    </scheduleCtx.Provider>
  )
}
