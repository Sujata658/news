export interface Preferences {
  user: string
  categories: string[]
  rows: number
  ncards: number
  columns: number
  rowSpan: number[]
  colSpan: number[]
}

export interface PreferencesProps {
  categories: string[]
  rows: number
  ncards: number
  columns: number
  rowSpan: number[]
  colSpan: number[]
}
