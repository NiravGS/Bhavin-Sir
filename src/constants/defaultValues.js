/*
Menu Types:
"menu-default", "menu-sub-hidden", "menu-hidden"
*/
export const defaultMenuType = 'menu-default'

export const subHiddenBreakpoint = 1440
export const menuHiddenBreakpoint = 768
export const defaultLocale = 'en'
export const localeOptions = [
  { id: 'en', name: 'English - LTR', direction: 'ltr' },
  { id: 'es', name: 'Español', direction: 'ltr' },
  { id: 'enrtl', name: 'English - RTL', direction: 'rtl' }
]

export const firebaseConfig = {
  apiKey: 'AIzaSyAyKkNiCent8AegHZT1SEYXZGczREh1S2s',
  authDomain: 'dataplatform-wavicledata.firebaseapp.com',
  databaseURL: 'https://dataplatform-wavicledata.firebaseio.com',
  projectId: 'dataplatform-wavicledata',
  storageBucket: 'dataplatform-wavicledata.appspot.com',
  messagingSenderId: '262277301822',
  appId: '1:262277301822:web:7ca97499ab28a7f304736f'
}

export const searchPath = '/app/pages/search'
export const servicePath = 'https://api.coloredstrategies.com'

/*
Color Options:
"light.purple", "light.blue", "light.green", "light.orange", "light.red", "dark.purple", "dark.blue", "dark.green", "dark.orange", "dark.red"
*/
export const isMultiColorActive = true
export const defaultColor = 'light.blue'
export const defaultDirection = 'ltr'
export const isDarkSwitchActive = true
export const themeColorStorageKey = '__theme_color'
export const themeRadiusStorageKey = '__theme_radius'
export const isDemo = false
