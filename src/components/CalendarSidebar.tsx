import * as React from "react"
import styled from "styled-components"
import { useQuery } from "@apollo/client"
// import { Link } from "react-router"

// Components
import { CalendarTitle } from "./CalendarTitle"
import { Logo } from "./Logo"
import { VerticalAccordion } from "./VerticalAccordion"

// Queries
import GET_SCHOOL_QUERY from "./Calendar/graphql/getSchoolQuery.graphql"

// Types
import { IConnection } from "../types/Connection"

// Helpers
import mapEdges from "../helpers/mapEdges"

interface ICareer {
  name?: string
  subjectsConnection?: IConnection<ISubject>
}

interface ISubject {
  _id?: string
  name?: string
}

export const CalendarSidebar = () => {
  const { loading, error, data } = useQuery(GET_SCHOOL_QUERY, {
    variables: { _id: "607a4bfc1c2f030cfa277157" }, // TODO: Placeholder for now
  })

  // TODO: Handle errors
  const school = data?.school

  const careersConnection: IConnection<ICareer> = school?.careersConnection
  const careers = mapEdges(careersConnection?.edges)

  return (
    <SidebarWrapper>
      <Logo height={70} />
      <CalendarTitle title={school?.name} />
      {careers.map((career) => {
        const { name, subjectsConnection }: ICareer = career
        const subjects = mapEdges(subjectsConnection?.edges)

        return (
          <VerticalAccordion title={name}>
            {subjects.map((subject) => (
              <p>{subject.name}</p>
            ))}
          </VerticalAccordion>
        )
      })}
    </SidebarWrapper>
  )
}

// Styled components

const SidebarWrapper = styled.div`
  height: 100vh;
  background-color: #fff;
  grid-row: span 2;
  padding: 25px 15px;
`
