'use client'
import type { ReactNode } from 'react'
import { HiXMark } from 'react-icons/hi2'

interface Props {
  className?: string
  show: boolean
  setShow: (value: boolean | ((prev: boolean) => boolean)) => void
  children: ReactNode
}

export default function Normal ({
  className = '',
  show,
  setShow,
  children
}: Props) {
  const handleOnClickX = () => {
    setShow(false)
  }

  const handleOnMouseDown = (e: any) => {
    if (
      !show ||
      (
        e.currentTarget !== e.target &&
        e.currentTarget !== e.target.parentElement
      )
    ) return

    setShow(false)
  }

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 grid place-items-center transition-all ${show ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
      onMouseDown={handleOnMouseDown}
    >
      <div className="w-full p-8 max-h-screen overflow-y-auto">
        <div className="max-w-xl mx-auto bg-stone-900 rounded-md">
          <div className="flex justify-end p-4 border-b border-stone-700">
            <button
              type="button"
              onClick={handleOnClickX}
            >
              <HiXMark
                className="w-7 h-7"
              />
            </button>
          </div>

          <div className={`p-4 ${className}`}>
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}