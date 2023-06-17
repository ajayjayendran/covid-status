import { Report } from "../types/report"
import Table from "rc-table"
import "./reports.css"
import { AiOutlineArrowUp } from "react-icons/ai"
import { useEffect, useState } from "react"
import { useDebounce } from "../hooks/useDebounce"

interface Props {
  reports: Report[]
}

const Reports = ({ reports: data }: Props) => {
  const [search, setSearch] = useState("")

  const query = useDebounce(search, 500)
  const [filteredReports, setFilteredReports] = useState<Report[]>([])
  const [reports, setReports] = useState<Report[]>([])

  const column = [
    {
      title: "Country",
      dataIndex: "Country_text",
      key: "Country_text",
    },
    {
      title: "Confirmed",
      dataIndex: "TotalCases_text",
      key: "TotalCases_text",
      sorter: (a: any, b: any) => parseInt(a) - parseInt(b),
      render: (value: string, data: Report) => {
        return (
          <div className="flex gap-2 ">
            {data.NewCases_text && data.NewCases_text !== "" && (
              <span className="text-red flex gap-1 items-center font-bold">
                <AiOutlineArrowUp />
                {data.NewCases_text}
              </span>
            )}
            <span>{value}</span>
          </div>
        )
      },
    },
    {
      title: "Active",
      dataIndex: "ActiveCases_text",
      key: "ActiveCases_text",
      render: (value: string) => {
        return (
          <div>
            {value && value !== "" && value !== "N/A" ? (
              <span className="text-red flex items-center gap-2 font-bold">
                <AiOutlineArrowUp /> {value}
              </span>
            ) : (
              "No Cases Recorded."
            )}
          </div>
        )
      },
    },
    {
      title: "Recovered",
      dataIndex: "TotalRecovered_text",
      key: "TotalRecovered_text",
      render: (value: string) => {
        return (
          <div>
            {value && value !== "" && value !== "N/A"
              ? value
              : "No Cases Recorded."}
          </div>
        )
      },
    },
    {
      title: "Total Deaths",
      dataIndex: "TotalDeaths_text",
      key: "TotalDeaths_text",
      render: (value: string, data: Report) => {
        return (
          <div className="flex gap-2">
            {data.NewDeaths_text && data.NewDeaths_text !== "" && (
              <span className="text-red flex gap-1 items-center">
                <AiOutlineArrowUp />
                {data.NewDeaths_text}
              </span>
            )}
            <span>{value}</span>
          </div>
        )
      },
    },
  ]

  useEffect(() => {
    setFilteredReports(data)
    setReports(data)
  }, [data])

  useEffect(() => {
    if (query.trim().length > 0) {
      const result = reports.filter((report) => {
        return report.Country_text.toLowerCase().includes(query.toLowerCase())
      })
      setFilteredReports(result)
    } else {
      setFilteredReports(reports)
    }
  }, [query, reports])

  return (
    <div className="mx-3">
      <input
        value={search}
        onChange={(event) => {
          setSearch(event.target.value)
        }}
        className="bg-[#f6f6f7] h-[42px] mx-1 border rounded-md min-w-[30%] my-4 px-4 outline-none"
        placeholder="Search by Country..."
      />
      <Table data={filteredReports} columns={column} />
    </div>
  )
}

export default Reports
