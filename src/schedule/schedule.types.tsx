import { ReactNode } from 'react'

export enum ButtonVariant {
  primary = 'primary',
  secondary = 'secondary',
}

export type ButtonProps = {
  disabled?: boolean
  label: string
  variant?: ButtonVariant
  onClick?(e: MouseEvent): void
}

export type Dog = {
  name: string
  breed: string
  avatar: string
}

export type Booking = {
  userID: string
  dog: Dog
  hour: number
}

export type Hour = {
  hour: number
  label: string
  booking?: Booking
  past: boolean
}

export type ScheduleContext = {
  date: Date
  bookings: Booking[]
  hours: Hour[]
  updateHours(hours: Hour[]): void
  changeDate(date: Date): void
  setBookings(bookings: Booking[]): void
}

export type ScheduleProviderProps = {
  children: ReactNode
}
