export const deepClone = <T extends unknown>(object: T): T => {
  return JSON.parse(JSON.stringify(object))
}
