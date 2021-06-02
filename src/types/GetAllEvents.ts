/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetAllEvents
// ====================================================

export interface GetAllEvents_listCalendarEvents {
  edges: GetAllEvents_calendarEventEdges[]
  pageInfo: GetAllEvents_pageInfo
}

export interface GetAllEvents_calendarEventEdges {
  node: GetAllEvents_calendarEvent
  cursor?: string
}

// TODO: Since pageInfo is always the same for any paginated result, move to a more general type
export interface GetAllEvents_pageInfo {
  __typename: "PageInfoType"
  endCursor?: string
  hasNextPage?: boolean
}
export interface GetAllEvents_calendarEvent {
  __typename: "CalendarEvent"
  _id: string
  title: string
  isAllDay: boolean | null
  durationHours: number
  startDateUtc: any
  endDateUtc: any | null
  rrule: string | null
  exceptionsDatesUtc: any[] | null
  subject: GetAllEvents_subject
}

interface GetAllEvents_subject {
  name: string
}

export interface GetAllEvents {
  listCalendarEvents: GetAllEvents_listCalendarEvents
}
