// Helpers
import { deepClone } from "./deepClone"

// Types
import { IConnection } from "../types/Connection"
import { ICareer } from "../types/Career"
import { ISubject } from "../types/Subject"

export const addTogglesToCareers = (careers: ICareer[]): ICareer[] => {
  const updatedCareers: ICareer[] = deepClone(careers)

  for (const career of updatedCareers) {
    const edges = career?.subjectsConnection?.edges
    for (let edge of edges) {
      edge.node.toggled = true
    }
  }

  return updatedCareers
}
