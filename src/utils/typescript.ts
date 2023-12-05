export  function enumValues(enumObject: any) {
  return Object.values(enumObject).filter(value => typeof value === 'number')
}

export  function enumKeys(enumObject: any) {
  return Object.keys(enumObject).filter(key => Number.isNaN(Number(key)))
}