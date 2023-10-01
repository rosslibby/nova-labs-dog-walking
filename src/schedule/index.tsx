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
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
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
    // await: fetch all bookings for that day
    // const updatedBookings = await fetch('/bookings?date={date}')
    // setBookings(updatedBookings)
    // update hours with bookings
    // setHours(generateHours(updatedBookings))
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
