import * as React from "react"
import { CalendarWithData } from "../../components/Calendar"

// Layout
import { CalendarLayout } from "../../layouts/CalendarLayout"

export function Page() {
  return (
    <div className="App">
      <CalendarLayout>
        <CalendarWithData />
      </CalendarLayout>
    </div>
  )
}
