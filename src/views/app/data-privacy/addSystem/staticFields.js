import * as R from 'ramda'
import { getIntl } from '../../../../IntlProvider'

const intl = getIntl()

export const sourceTypes = [
  { label: intl.messages['label.dataBase'], value: 'database' },
  { label: intl.messages['label.fileSystem'], value: 'fileSystem' }
]

const databaseTypes = [
  {
    type: 'select',
    options: [
      { label: 'MySQL', value: 'mysql' },
      { label: 'Aurora-postgres', value: 'aurora-postgres' },
      { label: 'Aurora-MySQL', value: 'aurora-mysql' },
      { label: 'Redshift', value: 'redshift' },
    ],
    name: 'database-type'
  }
]

export const getLabelByOption = (options, value) => options.find(R.propEq('value', value))?.label

const common = [
  'host',
  'username',
  'password',
  'port',
  'database'
]

const formFileFields = [
  {
    type: 'select',
    options: databaseTypes,
    name: 'type'
  }
]

export const getFieldsByDb = (db) => {
  const objFound = [...formFileFields, ...common]
  return objFound
}
