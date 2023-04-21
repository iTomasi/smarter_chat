'use client'
import { useState } from 'react'
import { HiBars3, HiXMark } from 'react-icons/hi2'
import Bottom, { ModalSettings } from './Bottom'

export default function SideBar () {
  const [show, setShow] = useState<boolean>(false)
  const [showSettings, setShowSettings] = useState<boolean>(false)

  const handleOnClickBars = () => {
    setShow(true)
  }

  const handleOnClickX = () => {
    setShow(false)
  }

  const handleOnClickSettings = () => {
    setShowSettings(true)
  }

  return (
    <>
    <button
      className="lg:hidden fixed top-5 left-4"
      type="button"
      onClick={handleOnClickBars}
    >
      <HiBars3
        className="w-7 h-7"
      />
    </button>
    <div className={`fixed inset-0 bg-black bg-opacity-50 z-10 transition-all lg:static lg:bg-transparent lg:opacity-100 lg:visible ${show ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
      <div className={`h-full flex flex-col justify-between min-w-[17rem] max-w-[17rem] bg-gray-200 dark:bg-stone-900 border-r border-gray-300 dark:border-stone-700 transition-all lg:translate-x-0 ${show ? 'translate-x-0' : '-translate-x-full'}`}>
        <div>
          <div className="p-4 border-b border-gray-300 dark:border-stone-700 mb-4 lg:mb-0 lg:hidden">
            <button
              type="button"
              onClick={handleOnClickX}
            >
              <HiXMark
                className="w-7 h-7"
              />
            </button>
          </div>

          <div>asdasdsad</div>
        </div>

        <Bottom
          onClickSettings={handleOnClickSettings}
        />
      </div>
    </div>

    <ModalSettings
      show={showSettings}
      setShow={setShowSettings}
    />
    </>
  )
}
