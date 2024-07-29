export interface Preferences {
  _id: string
  user: string
  configs: Config[]
}

export interface Config {
  _id: string
  rows: number
  columns: number
  ncards: number
  rowSpan: number[]
  colSpan: number[]
  categories: string[]
  isDefault: boolean
}

