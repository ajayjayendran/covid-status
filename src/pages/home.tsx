import { FC, useEffect, useState } from "react"
import { useCountries } from "../hooks/useCountries"
import { useReports } from "../hooks/useReports"
import Collapse from "rc-collapse"
import { BsFillPlusCircleFill } from "react-icons/bs"
import Reports from "../components/reports"
import { Report } from "../types/report"
import moment from "moment"
import { MdOutlineUpdate } from "react-icons/md"
import { AiFillCloseCircle } from "react-icons/ai"

const Home: FC = () => {
  const continents = [
    "Asia",
    "Africa",
    "Europe",
    "North America",
    "South America",
    "Australia",
    "Antarctic",
  ]

  const { countries, getCountries } = useCountries("")
  const { reports } = useReports()

  const [reportsData, setReportsData] = useState<Report[]>([])
  const [worldReport, setWorldReport] = useState<Report | undefined>()
  const [current, setCurrent] = useState<string>("")

  useEffect(() => {
    if (reports.length > 0) {
      const world =
        reports.filter((item: any) => {
          return item.Country_text === "World"
        }).length > 0
          ? reports.filter((item: any) => {
              return item.Country_text === "World"
            })[0]
          : undefined
      setWorldReport(world)
      if (countries.length > 0) {
        const data = reports.filter((item: any) => {
          return countries.includes(item.Country_text)
        })

        setReportsData(data)
      }
    }
  }, [reports, countries])

  return (
    <>
      <div className="p-4 py-9">
        <div className="text-2xl font-bold">Coronavirus (COVID-19) Status</div>
        {worldReport &&
          worldReport.LastUpdate &&
          worldReport.LastUpdate !== "" && (
            <div className="mt-2 text-[#6c757d]">
              Globally, as of{" "}
              <span className="text-[#28a745] font-bold">
                {moment(worldReport.LastUpdate).format("LLLL")}
              </span>
              , there have been{" "}
              <span className="text-[#017bfe] font-bold">
                {worldReport.TotalCases_text}
              </span>{" "}
              confirmed cases of COVID-19, including{" "}
              <span className="text-red font-bold">
                {worldReport.TotalDeaths_text}
              </span>{" "}
              deaths, reported to WHO.
            </div>
          )}
        <div className="text-sm font-bold mt-2 flex gap-2 items-center text-[#6c757d]">
          Last update :- {worldReport?.LastUpdate} <MdOutlineUpdate />
        </div>
      </div>
      {reports &&
        reports.length > 0 &&
        continents &&
        continents.map((continent: string) => {
          return (
            <Collapse
              items={[
                {
                  label: (
                    <div className="cursor-pointer bg-[#f6f6f7] mx-3 flex my-2 text-[#6c757d] font-bold items-center justify-between px-3 py-5 rounded-md">
                      {continent}
                      {current !== continent ? (
                        <BsFillPlusCircleFill />
                      ) : (
                        <AiFillCloseCircle size={19} />
                      )}
                    </div>
                  ),
                  onItemClick: () => {
                    if (current !== continent) {
                      setCurrent(continent)
                      setReportsData([])
                      getCountries(
                        continent === "Australia" ? "Oceania" : continent
                      )
                    } else {
                      setCurrent("")
                    }
                  },
                  children: (
                    <>
                      {current === continent ? (
                        <Reports reports={reportsData} />
                      ) : (
                        <></>
                      )}
                    </>
                  ),
                },
              ]}
            ></Collapse>
          )
        })}
    </>
  )
}

export default Home
