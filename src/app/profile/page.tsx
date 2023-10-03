'use client'

import { authCtx } from "@/auth";
import { Button } from "@/components/schedule";
import { ButtonVariant } from "@/schedule/schedule.types";
import { Address, Dog } from "@prisma/client";
import Image from "next/image";
import { useContext } from "react";

export default function Profile() {
  const user = useContext(authCtx)
  const address: Address = user?.address as Address
  const writtenAddress = address ? Object.values(address)
    .filter((value: any) => value && value.length)
    .join(', ') : ''

  return (
    <div className="overflow-scroll bg-white shadow w-full h-screen">
      <div className="divide-y divide-gray-200">
        <div className="text-gray-900 text-sm px-4 py-3 flex justify-between items-center">
          <span>Personal Details</span>
          <Button variant={ButtonVariant.secondary} label="Edit" />
        </div>
        <div className="p-4 text-gray-900">
          <p><strong>Name:</strong>&nbsp;<span>{user?.name}</span></p>
          <p><strong>Address:</strong>&nbsp;<span>{writtenAddress}</span></p>
        </div>
        <div className="text-gray-900 text-sm px-4 py-3 flex justify-between items-center">
          <span>Your dogs</span>
          <Button variant={ButtonVariant.secondary} label="New Dog" />
        </div>
        <ul role="list">
          {user?.dogs?.map((dog: Dog) => (
            <li className="p-4 text-gray-900" key={dog.id}>
              <span>
                {dog?.avatar && (
                  <Image
                    className="h-8 w-8 rounded-full bg-gray-800"
                    src={dog?.avatar}
                    alt="Profile"
                    height="60"
                    width="60"
                  />
                )}
                {!dog?.avatar && (
                  <span className="inline-block h-8 w-8 overflow-hidden rounded-full bg-gray-100">
                    <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </span>
                )}
              </span>
              <span>{dog.name}</span>
              <br />
              <div className="grid grid-cols-[10%_auto] w-fit mx-auto gap-x-2 justify-between items-center py-2">
                <strong>Breed:</strong>&nbsp;<span>{dog.breed}</span>
                <Button variant={ButtonVariant.secondary} label="Remove" />
              </div>
              <p><strong>Breed:</strong>&nbsp;<span>{dog.breed}</span></p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
