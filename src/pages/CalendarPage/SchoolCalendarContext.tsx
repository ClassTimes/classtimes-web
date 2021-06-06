import * as React from "react"

interface IDefaultValue {
  school: any
  setSchool: React.Dispatch<any>
}

const defaultValue = {
  school: undefined,
  setSchool: undefined,
}

export const SchoolCalendarContext = React.createContext(defaultValue)
export const useSchoolCalendar = () => {
  return React.useContext(SchoolCalendarContext)
}
