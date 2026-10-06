export const SearchType = {
  HELP: 'help',
  NO_CLUE: 'no_clue',
}

export type SearchResult = {
  input: string
  type: string
  url?: string
  result?: any
  error?: any
}
