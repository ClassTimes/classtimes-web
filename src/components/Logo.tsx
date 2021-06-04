import * as React from "react"
import LOGO from "../assets/logo.svg"

export const Logo = (props) => {
  const { height } = props
  return (
    <img src={LOGO} alt="ClassTimes Logo" title="ClassTimes" height={height} />
  )
}
