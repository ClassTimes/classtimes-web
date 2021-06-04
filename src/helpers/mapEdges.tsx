// TODO: Testing!!

interface edge<T> {
  node: T
  cursor: string
}

const mapEdges = <T extends unknown>(edges: edge<T>[]): T[] => {
  return edges.map((edge) => edge.node)
}

export default mapEdges
