'use client'

import { authCtx } from '@/auth'
import { scheduleCtx } from '@/schedule'
import { useDateSwitcher, useReservationApi } from '@/schedule/schedule.hooks'
import { ButtonProps, ButtonVariant, Hour } from '@/schedule/schedule.types'
import Image from 'next/image'
import { useContext, useState } from 'react'
import { useSession } from 'next-auth/react'

const DateSwitcher = () => {
  const { date } = useContext(scheduleCtx)
  const { forward, back } = useDateSwitcher()

  return (
    <li className="text-gray-900 text-sm px-4 py-3 flex justify-between items-center">
      <span>{date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
      <span className="grid grid-flow-col gap-6">
        <button onClick={() => back()}>&#9001;</button>
        <button onClick={() => forward()}>&#9002;</button>
      </span>
    </li>
  )
}

export const ScheduleList = () => {
  const { date, hours } = useContext(scheduleCtx)
  const session = useSession()

  return (
    <div className="overflow-scroll bg-white shadow w-full h-screen">
      <ul role="list" className="divide-y divide-gray-200">
        <DateSwitcher />
        {hours.map((hour: Hour) => (
          <ScheduleRow key={`${date}-${hour.hour}`} {...hour} />
        ))}
      </ul>
    </div>
  )
}

const Button = ({
  disabled,
  label,
  variant = ButtonVariant.primary,
}: ButtonProps) => {
  const styles: { [key: string]: string } = {
    primary: 'rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-transparent disabled:text-gray-400 disabled:shadow-none',
    secondary: 'rounded-md bg-indigo-50 px-3 py-2 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100 disabled:bg-transparent disabled:text-gray-400 disabled:shadow-none',
  }

  return (
    <button
      type="button"
      disabled={disabled}
      className={styles[variant]}
    >
      {label}
    </button>
  )
}

const generateButtonProps = (
  bookingUserId: string | undefined,
  past: boolean,
  userId: string
) => {
  const userBooked = bookingUserId === userId
  const buttonDisabled = past || (bookingUserId && !userBooked)
  const variant = userBooked
    ? ButtonVariant.secondary
    : ButtonVariant.primary
  const label = bookingUserId
    ? userBooked
      ? 'Cancel'
      : 'Booked'
    : 'Book'

  return {
    disabled: Boolean(buttonDisabled),
    variant,
    label,
  }
}

export const ScheduleRow = ({ booking, hour, label, past }: Hour) => {
  const user = useContext(authCtx)

  const { create, update } = useReservationApi()
  const { date } = useContext(scheduleCtx)

  if (!user?.id) return null

  const datetime = date.toISOString().replace(
    /T[0-9.:]{12}/,
    `T${hour > 9 ? hour : `0${hour}`}:00:00.000`,
  )
  const buttonProps = generateButtonProps(booking?.userID, past, user.id)
  const onCancelClick = () => update({
    id: booking?.userID,
    cancelled: true,
  })
  const onBookClick = () => create({
    date: new Date(date.setHours(hour)),
    userID: user.id,
    // dogID: user
  })

  return (
    <li className="p-4 text-gray-900">
      <div className="flex justify-between items-center">
        <time dateTime={datetime}>{label}</time>
        <Button {...buttonProps} />
      </div>
      {booking?.userID === user.id && (
        <div className="grid grid-cols-[10%_auto] w-fit mx-auto gap-x-2 items-center py-2">
          <Image
            className="h-8 w-8 rounded-full bg-gray-800"
            src={booking.dog.avatar}
            alt="Profile"
            height="60"
            width="60"
          />
          <span>Your dog {booking.dog.name} is booked for a walk!</span>
        </div>
      )}
    </li>
  )
}
