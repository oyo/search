export const SuggestionType = {
  NO_CLUE: 'no_clue',
}

/**
 * Suggestion
 *
 * Defines the object for a single result entry of suggestion query. Each handler is
 * responsible to transform 'his' results into an array of suggestion items
 */
export type Suggestion = {
  id: string
  suggestionType: typeof SuggestionType
  name: string
  description: string
  icon?: string
  data?: any
}
