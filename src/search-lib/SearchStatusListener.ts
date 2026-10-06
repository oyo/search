/**
 * SearchStatusListener
 *
 * listener interface for search status changes.
 */

import type { SearchHandler } from './SearchHandler'

export const SearchStatusType = {
  INPUT_RECEIVED: 'input_received',
  SEARCH_SUBMITTED: 'search_submitted',
  RESULT_RECEIVED: 'result_received',
}

export type SearchStatus = {
  type: string
  handler?: SearchHandler
  value?: any
}

export interface SearchStatusListener {
  statusChanged(status: SearchStatus): void
}
