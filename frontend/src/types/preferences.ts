export interface Preferences {
  _id: string
  user: string
  preferences: Preference[]
}

export interface Preference {
  type: string
  rows: number
  columns: number
  ncards: number
  rowSpan: number[]
  colSpan: number[]
  categories: string[]
}
