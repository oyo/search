import { SearchSettings } from '../search-lib/SearchSettings'

import dayjs from 'dayjs'

const P = SearchSettings.patterns

const DATE_TS = /((19|20)[0-9]{2}(-?[0-9]{2}){2})([ T]([0-9]{2}(:?[0-9]{2}){1,2}))?/ // 21-05-31 12:34:56
const DATE_AD = /[12][06789][0-9]{12}([0-9]{3})?(\.0Z)?/ // AD 20210531123456.0Z
const DATE_NT = /13[0-9]{16}/ // Windows LDAP time
const DATE_MS = /[1][0-9]{12}/ // ms since 1970

const patterns = {
  ldap: new RegExp(`^(${['(' + P.ldapdn.source + ',)?dc=co(m|rp)'].join('|')})$`, 'i'),
  date: new RegExp(
    `^(${[DATE_TS.source, DATE_AD.source, DATE_NT.source, DATE_MS.source].join('|')})$`,
    'i',
  ),
  search: new RegExp(`^(${[P.mail.source, P.uuid.source].join('|')})$`, 'i'),
}

export const isTypePattern = (type, value) => patterns[type].test(value)
export const isLdapPattern = (value) => isTypePattern('ldap', value)
export const isDatePattern = (value) => isTypePattern('date', value)
export const isSearchPattern = (value) => isTypePattern('search', value)

export const normDate = (d) => {
  let m
  let t
  if (DATE_NT.test(d)) {
    t = new Date((1 * d) / 1e4 - 1.16444736e13).toISOString()
  } else if (DATE_AD.test(d)) {
    t = `${d.substring(0, 8)}T${d.substring(8, 14)}`
  } else if (DATE_MS.test(d)) {
    t = d * 1
  } else {
    t = d
  }
  try {
    m = dayjs(t)
  } catch (e) {
    console.log(e)
  }
  return m.isValid() ? m.format('YYYY-MM-DD HH:mm:ss') : d
}
