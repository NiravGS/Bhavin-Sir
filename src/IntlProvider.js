import React from 'react'
import PropTypes from 'prop-types'
import { createIntl, createIntlCache, RawIntlProvider } from 'react-intl'
import AppLocale from './lang'
import { configureStore } from './redux/store'

// This is optional but highly recommended
// since it prevents memory leak
const cache = createIntlCache()

let state
try {
  const store = configureStore()
  state = store.getState?.()
} catch (error) {

}
const startLocale = state?.settings?.locale || 'en'
export const getIntl = () => {
  const locale = localStorage.getItem('currentLanguage') || startLocale
  const currentAppLocale = AppLocale[locale]
  return createIntl({
    locale: currentAppLocale.locale,
    messages: currentAppLocale.messages
  }, cache)
}

export const IntlProvider = ({ children }) => {
  return <RawIntlProvider value={getIntl()}>{children}</RawIntlProvider>
}

IntlProvider.propTypes = {
  children: PropTypes.any
}
