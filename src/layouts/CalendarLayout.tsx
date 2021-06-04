import * as React from "react"
import styled from "styled-components"

// Components
import { Navbar } from "../components/Navbar"
import { CalendarSidebar } from "../components/CalendarSidebar"

interface ICalendarLayoutProps {
  children: JSX.Element[]
}

export const CalendarLayout = (props: ICalendarLayoutProps) => {
  const { children } = props

  return (
    <LayoutWrapper>
      <CalendarSidebar />
      <Navbar />
      {children}
    </LayoutWrapper>
  )
}

const LayoutWrapper = styled.div`
  display: grid;
  grid-template-columns: 250px auto;
  grid-template-rows: var(--navbar-height) auto;
`
