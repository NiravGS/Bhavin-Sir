import * as R from 'ramda'
import { getIntl } from '../../IntlProvider'

const intl = getIntl()

export const sourceTypes = [
  { label: intl.messages['label.dataBase'], value: 'database' },
  { label: intl.messages['label.fileSystem'], value: 'fileSystem' }
]

export const getSourceTypes = onlyDatabase => {
  if (onlyDatabase) {
    return [{ label: intl.messages['label.dataBase'], value: 'database' }]
  } else {
    return [
      { label: intl.messages['label.dataBase'], value: 'database' },
      { label: intl.messages['label.fileSystem'], value: 'fileSystem' }
    ]
  }
}

export const dataTypeOptions = [
  { label: 'BOOLEAN', value: 'BOOLEAN' },
  { label: 'BYTE', value: 'BYTE' },
  { label: 'CHAR', value: 'CHAR' },
  { label: 'DATE', value: 'DATE' },
  { label: 'DOUBLE', value: 'DOUBLE' },
  { label: 'FLOAT', value: 'FLOAT' },
  { label: 'BIGDECIMAL', value: 'BIGDECIMAL' },
  { label: 'NUMERIC', value: 'NUMERIC' },
  { label: 'INTEGER', value: 'INTEGER' },
  { label: 'LONG', value: 'LONG' },
  { label: 'SHORT', value: 'SHORT' },
  { label: 'STRING', value: 'STRING' },
  { label: 'VARCHAR', value: 'VARCHAR' },
  { label: 'BIGINT', value: 'BIGINT' },
  { label: 'SMALLINT', value: 'SMALLINT' },
  { label: 'TIMESTAMP', value: 'TIMESTAMP' },
  { label: 'TIMESTAMPZ', value: 'TIMESTAMPZ' }
]

export const ingestionTypeOptions = [
  { label: intl.messages['label.fullRefresh'], value: 'F' },
  { label: intl.messages['label.incremental'], value: 'I' },
  { label: intl.messages['label.masterScd'], value: 'MS' }
]
export const scdTypeOptions = [
  { label: intl.messages['label.none'], value: 'none' },
  { label: intl.messages['label.type1'], value: 'type_1' },
  { label: intl.messages['label.type2'], value: 'type_2' }
]

export const getLabelByOption = (options, value) => options.find(R.propEq('value', value))?.label
