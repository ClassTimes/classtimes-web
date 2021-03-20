// import dayjs from "dayjs"
import * as React from "react"
import IntervalTree from "interval-tree-type"

import { Calendar } from "../components/Calendar"

export default {
  title: "CTUI/Calendar",
  component: Calendar,
}

// const Template = (args) => <Page {...args} />;

// export const LoggedIn = Template.bind({});
// LoggedIn.args = {
//   ...HeaderStories.LoggedIn.args,
// };

// export const LoggedOut = Template.bind({});
// LoggedOut.args = {
//   ...HeaderStories.LoggedOut.args,
// };

export const Primary: React.VFC<{}> = () => {
  // startAtHour?: number
  // title?: React.ReactNode
  // eventTreeCallback: (range: [Dayjs, Dayjs]) => TEventTree
  const eventTreeCallback: React.ComponentPropsWithoutRef<
    typeof Calendar
  >["eventTreeCallback"] = (range) => {
    const tree = new IntervalTree()
    const [start, end] = range
    console.log({ start, end })
    return {
      tree,
      queryInterval: tree.queryInterval.bind(tree),
    }
  }

  return (
    <Calendar startAtHour={6} title="CalTitle" {...{ eventTreeCallback }} />
  )
}
