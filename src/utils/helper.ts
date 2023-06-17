export const cleanObject = (data: any) => {
  data.forEach((object: any) => {
    Object.keys(object).forEach((key) => {
      const newKey = key.replace(/\s+/g, "")
      if (key !== newKey) {
        object[newKey] = object[key]
        delete object[key]
      }
    })
  })
  return data
}
