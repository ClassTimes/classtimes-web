import * as React from "react"
import { CalendarWithData } from "../../components/Calendar"
import { useParams } from "react-router"
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
  const { schoolShortName } = useParams()
  const { loading, error, data } = useQuery(GET_SCHOOL_QUERY, {
    variables: { shortName: schoolShortName },
  })

  /* Preprocessing step to add state variables to school object */
  const schoolRawData = data?.school
  const schoolInitialValue = addStateVariablesToSchool(schoolRawData)

  /* Set school as state for Context */
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
