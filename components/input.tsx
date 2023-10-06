"use client"

import React from "react"
import { useRouter } from "next/navigation"

export const Input = () => {
  const [input, setInput] = React.useState("")
  const [error, setError] = React.useState("")

  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
  }

  const isPolyCamURL = (url: string) => {
    const pattern =
      /^https:\/\/poly\.cam\/gaussian-splatting\?capture=([a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12})$/
    const match = url.match(pattern)
    return match ? match[1] : null // returns the UUID if it's a match
  }

  const isSplatURL = (url: string) => {
    return url.endsWith(".splat") && new URL(url) ? true : false
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (input === "") {
      setError("Please enter a valid url")
      return
    }

    const uuid = isPolyCamURL(input)
    if (uuid) {
      router.push(`/polycam/${uuid}`)
      return
    }

    if (isSplatURL(input)) {
      router.push(`/splat?url=${encodeURIComponent(input)}`)
      return
    }

    setError("Invalid URL format")
  }

  return (
    <div className="relative z-10 flex h-12 w-full max-w-lg items-center justify-center gap-2 divide-x divide-zinc-600 rounded-3xl bg-zinc-900 px-2 shadow-lg shadow-black/40">
      <div className="flex aspect-square h-8 items-center justify-center rounded-full bg-background">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1"
          stroke-linecap="round"
          stroke-linejoin="round"
          className="lucide lucide-box"
        >
          <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
          <path d="m3.3 7 8.7 5 8.7-5" />
          <path d="M12 22V12" />
        </svg>
      </div>
      <div className="flex min-w-0 flex-1 items-center self-center">
        <form onSubmit={handleSubmit} className="h-full w-full">
          <div className="relative flex h-full w-full items-center transition-all duration-300">
            <label className="sr-only">Model link</label>
            <div className="relative flex min-w-0 flex-1 items-center">
              <input
                className="min-w-[50%] flex-[1_0_50%] resize-none border-0 bg-transparent py-3 pl-3 text-base text-white shadow-none outline-none ring-0 selection:bg-teal-300 selection:text-black placeholder:text-zinc-400 disabled:bg-transparent disabled:opacity-80 sm:leading-6 md:text-sm"
                spellCheck="false"
                placeholder="Paste link to your Polycam capture or custom .splat"
                control-id="ControlID-1"
                onChange={handleChange}
              ></input>
              <button
                type="submit"
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-zinc-50 opacity-50 outline-none transition-colors hover:bg-zinc-800 focus-visible:ring-1 focus-visible:ring-zinc-400"
              >
                <span className="sr-only">Send</span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M13.5 3V2.25H15V3V10C15 10.5523 14.5522 11 14 11H3.56062L5.53029 12.9697L6.06062 13.5L4.99996 14.5607L4.46963 14.0303L1.39641 10.9571C1.00588 10.5666 1.00588 9.93342 1.39641 9.54289L4.46963 6.46967L4.99996 5.93934L6.06062 7L5.53029 7.53033L3.56062 9.5H13.5V3Z"
                    fill="currentColor"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
