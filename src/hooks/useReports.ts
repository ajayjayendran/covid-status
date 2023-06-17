import axios from "axios"
import { useEffect, useState } from "react"
import { Report } from "../types/report"
import { cleanObject } from "../utils/helper"

export const useReports = () => {
  const [reports, setReports] = useState<Report[]>([])

  useEffect(() => {
    ;(async function () {
      const { data } = await axios.get<Report[]>(
        "https://covid-19.dataflowkit.com/v1"
      )
      setReports(cleanObject(data))
    })()
  }, [])

  return { reports }
}
