/* eslint-disable no-useless-escape */

/**
 * SearchSettings
 *
 * gobal settings that can be reused from multiple handlers like
 * server names and input patterns
 */
export const SearchSettings = {
  server: {
    search:
      typeof location === 'object' && !location.origin.match(/^http:\/\/localhost/)
        ? location.origin
        : 'https://oyo.github.io/search',
  },
  patterns: {
    filter: /([a-z-]+=[\S]+)/i,
    uuid: /([a-z0-9]{8}(-[a-z0-9]{4}){4}[a-z0-9]{8})/i,
    name: /([a-zäöüß']{2,22}(-[a-zäöüß']{2,22}){0,2})/i,
    phone: /((\+(\d{1,8})*)?\d{5})/i,
    mail: /(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/,
    mailPrefix:
      /(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|([a-zA-Z\-0-9*]{0,40})|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/,
    title: /(dr\.?|phd)/i,
    female: /(frau|(fr|mr?s)\.?|miss)/i,
    male: /(herr|(h|m)r\.?|mann?)/i,
    intext: /((int|ext)(ern(als?)?)?)/i,
    ldapdn:
      /(?:[a-z][\w-]*|\d+(?:\.\d+)*)=(?:#(?:[\da-f]{2})+|(?:[^,=+<>#;\\"]|\\[,=+<>#;\\"]|\\[\da-f]{2})*|"(?:[^\\"]|\\[,=+<>#;\\"]|\\[\da-f]{2})*")(?:\+(?:[a-z][\w-]*|\d+(?:\.\d+)*)=(?:#(?:[\da-f]{2})+|(?:[^,=+<>#;\\"]|\\[,=+<>#;\\"]|\\[\da-f]{2})*|"(?:[^\\"]|\\[,=+<>#;\\"]|\\[\da-f]{2})*"))*(?:,(?:[a-z][\w-]*|\d+(?:\.\d+)*)=(?:#(?:[\da-f]{2})+|(?:[^,=+<>#;\\"]|\\[,=+<>#;\\"]|\\[\da-f]{2})*|"(?:[^\\"]|\\[,=+<>#;\\"]|\\[\da-f]{2})*")(?:\+(?:[a-z][\w-]*|\d+(?:\.\d+)*)=(?:#(?:[\da-f]{2})+|(?:[^,=+<>#;\\"]|\\[,=+<>#;\\"]|\\[\da-f]{2})*|"(?:[^\\"]|\\[,=+<>#;\\"]|\\[\da-f]{2})*"))*)*/i,
    dlGroup: /(dl-[a-z0-9-_*]{0,40})/i,
    caxGroup: /(cax_[a-z0-9*]{0,8})/i,
    cdhGroup: /((bd|cdh)_[a-z0-9-_*]{0,40})/i,
    awsAccount: /([0-9]{12})/,
    cmdbapp: /APP[DR]?-\d+/i,
    date: {
      iso: /(\d{4}-\d{2}-\d{2}([\sT]\d{2}:\d{2}(:\d{2}(\.\d+)?)?)?)/,
      ad: /([1-2]\d\d\d[0-1]\d[0-3]\d[0-2]\d[0-5]\d[0-5]\d\.\dZ)/,
      de: /(\d{2}\.\d{2}\.[1-2]\d{3})/,
      en: /(([A-Z][a-z]{1,2},? )?[0-3]\d [A-Z][a-z]{1,2} [1-2]\d\d\d( \d{2}:\d{2}:\d{2}( (GMT|UTC|CEST))?)?)/,
    },
  },
}
