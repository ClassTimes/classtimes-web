import * as React from "react"
import { Calendar, CalendarWithData } from "../../components/Calendar"
import { useQuery } from "@apollo/client"

// Helpers
import { addStateVariablesToSchool } from "../../helpers/addStateVariablesToSchool"

// Layout
import { CalendarLayout } from "../../layouts/CalendarLayout"

// Context
import { SchoolCalendarContext } from "./SchoolCalendarContext"

// Queries
import GET_SCHOOL_QUERY from "../../components/Calendar/graphql/getSchoolQuery.graphql"

export function Page() {
  const { loading, error, data } = useQuery(GET_SCHOOL_QUERY, {
    variables: { _id: "607a4bfc1c2f030cfa277157" }, // TODO: Placeholder for now
  })

  const schoolRawData = data?.school
  /* Preprocessing step to add state variables to school object */
  const schoolInitialValue = addStateVariablesToSchool(schoolRawData)

  const [school, setSchool] = React.useState(schoolInitialValue)

  return (
    <div className="App">
      <SchoolCalendarContext.Provider value={{ school, setSchool }}>
        <CalendarLayout>
          <CalendarWithData />
        </CalendarLayout>
      </SchoolCalendarContext.Provider>
    </div>
  )
}
