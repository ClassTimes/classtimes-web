import { IEdge } from "../types/Connection"

const mapEdges = <T extends unknown>(edges: IEdge<T>[]): T[] => {
  return edges.map((edge) => edge.node)
}

export default mapEdges
