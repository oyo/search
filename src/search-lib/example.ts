import { search } from '.'
import type { SearchStatusListener, SearchStatus } from './SearchStatusListener'
void (async () => {
  const query = process.argv.slice(2).join(' ')
  const notify: SearchStatusListener = {
    statusChanged: (e: SearchStatus) => {
      console.log(e)
    },
  }
  const result = await search(query, true, notify)
  console.log(JSON.stringify(result, null, 4))
})()
