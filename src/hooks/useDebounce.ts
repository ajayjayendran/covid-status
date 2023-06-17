import { useState, useEffect } from "react"

export const useDebounce = (value: string, milliSeconds: number) => {
  const [query, setQuery] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setQuery(value)
    }, milliSeconds)

    return () => {
      clearTimeout(handler)
    }
  }, [value, milliSeconds])

  return query
}
