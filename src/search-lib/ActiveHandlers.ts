import type { SearchHandler } from './SearchHandler'
import HelpHandler from './Handler/HelpHandler'

/**
 * ActiveHandlers
 *
 * List of commonly used SearchHandlers to register them in a single line of code.
 * Sequence is irrelevant.
 */
export const ActiveHandlers: SearchHandler[] = [HelpHandler.Instance]
