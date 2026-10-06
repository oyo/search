import SearchPromise from './SearchPromise'
//import { SearchSettings } from './SearchSettings';
//import SearchService from './SearchService';
//import { SearchStatusType } from './SearchStatusListener';
//import { ActiveHandlers } from './ActiveHandlers';
export * from './ActiveHandlers'
export * from './SearchHandler'
export * from './SearchPromise'
export * from './SearchResult'
export * from './SearchService'
export * from './SearchSettings'
export * from './SearchStatusListener'

const promise = new SearchPromise()
export const search = promise.search.bind(promise)
/*
module.exports = {
    ActiveHandlers: ActiveHandlers,
    SearchPromise: SearchPromise,
    SearchService: SearchService,
    SearchSettings: SearchSettings,
    SearchStatusType: SearchStatusType,
    search: search
};
*/
