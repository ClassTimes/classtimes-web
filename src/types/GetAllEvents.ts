/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetAllEvents
// ====================================================

export interface GetAllEvents_calendarEvents_calendar {
  __typename: "Calendar"
  _id: string
  name: string
}

export interface GetAllEvents_calendarEvents {
  __typename: "CalendarEvent"
  _id: string
  title: string
  isAllDay: boolean | null
  durationHours: number
  startDateUtc: any
  endDateUtc: any | null
  rrule: string | null
  exceptionsDatesUtc: any[] | null
  calendar: GetAllEvents_calendarEvents_calendar
}

export interface GetAllEvents {
  calendarEvents: GetAllEvents_calendarEvents[]
}
