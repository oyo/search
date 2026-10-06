import { BehaviorSubject } from 'rxjs'
import { distinctUntilChanged } from 'rxjs/operators'
//import { SearchPromise, SearchStatusType } from '../search-lib';
import SearchPromise from '../search-lib/SearchPromise'
import { SearchStatusType } from '../search-lib/SearchStatusListener'
import { CalendarHandler } from '../handler/CalendarHandler'
import { TestHandler } from '../handler/TestHandler'
import { UnicodeHandler } from '../handler/UnicodeHandler'
import { PokemonHandler } from '../handler/PokemonHandler'
import { LensHandler } from '../handler/LensHandler'

class SearchController {
  constructor() {
    this.status = new BehaviorSubject(false).pipe(distinctUntilChanged())
    this.loading = new BehaviorSubject(false).pipe(distinctUntilChanged())
    this.profile = new BehaviorSubject(null).pipe(distinctUntilChanged())
    this.raw = new BehaviorSubject(false).pipe(distinctUntilChanged())
    this.clear = new BehaviorSubject(false).pipe(distinctUntilChanged())
    this.output = new BehaviorSubject(null).pipe(distinctUntilChanged())
    this.input = new BehaviorSubject(null).pipe(distinctUntilChanged())
    this.input.subscribe((expr) => this.doSearch(expr))
    const promise = new SearchPromise().addHandler([
      new CalendarHandler(),
      new UnicodeHandler(),
      new PokemonHandler(),
      new LensHandler(),
      new TestHandler(),
    ])
    this.search = promise.search.bind(promise)
  }

  statusChanged(e) {
    this.status.next(e)
    switch (e.type) {
      case SearchStatusType.SEARCH_SUBMITTED:
        this.loading.next(true)
        break
      case SearchStatusType.RESULT_RECEIVED:
        this.loading.next(false)
        this.output.next(e)
        break
    }
  }

  async doSearch(expr) {
    if (!expr || expr.trim() === '') {
      this.output.next('')
      return
    }
    void this.search(expr, false, this)
  }
}

export const searchController = new SearchController()
