import * as React from "react"
import styled from "styled-components"
import { FiChevronDown } from "react-icons/fi"

interface IVerticalAccordionProps {
  title: string
  children: JSX.Element[] | JSX.Element
}

export const VerticalAccordion = (props: IVerticalAccordionProps) => {
  const { title, children } = props

  const [visible, setVisible] = React.useState(false)

  const toggleAccordion = () => {
    setVisible(!visible)
  }

  return (
    <AccordionWrapper>
      <DropdownToggle onClick={toggleAccordion}>
        <p>{title}</p>
        <Arrow visible={visible}>
          <FiChevronDown />
        </Arrow>
      </DropdownToggle>
      <Dropdown visible={visible}>{children}</Dropdown>
    </AccordionWrapper>
  )
}

// Styled components

interface IVisibilityProps {
  visible: boolean
}

const AccordionWrapper = styled.div`
  border-radius: 5px;
  padding: 5px 10px;
  transition: background 0.1s linear;
  &:hover {
    background-color: #eee;
  }
`

const Arrow = styled.div<IVisibilityProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  transform: rotate(${(props) => (props.visible ? "180deg" : "0deg")});
  transform-origin: center center;
`

const Dropdown = styled.div<IVisibilityProps>`
  display: ${(props) => (props.visible ? undefined : "none")};
  user-select: none;
`

const DropdownToggle = styled.div`
  align-items: center;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  width: 100%;
  p {
    margin-bottom: 10px;
    margin-top: 10px;
  }
`
