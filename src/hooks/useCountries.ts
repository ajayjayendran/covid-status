import axios from "axios"
import { useEffect, useState } from "react"
import { Country } from "../types/country"

export const useCountries = (region: string) => {
  const [countries, setCountries] = useState<Country[]>([])

  const getCountries = async (region: string) => {
    if (region !== "") {
      const { data } = await axios.get<Country[]>(
        `https://restcountries.com/v3.1/region/${region}`
      )
      setCountries(
        data.map((item: any) => {
          return item.name.common
        })
      )
    }
  }

  useEffect(() => {
    getCountries(region)
  }, [region])

  return { countries, getCountries }
}
