import PropTypes from 'prop-types'
import * as R from 'ramda'
import React from 'react'
import { injectIntl } from 'react-intl'
import { SelectRow } from '../../../../components/Input/Select'
import { formDatabaseOptions } from './newConnection/formLabelFields'

const SelectDataBaseField = ({ content, onChange }) => {
  return (
    <SelectRow
      id='label.database-type'
      onChange={onChange}
      label='label.database-type'
      options={R.defaultTo(formDatabaseOptions, content)}
      name='type'
    />
  )
}

SelectDataBaseField.propTypes = {
  content: PropTypes.array,
  onChange: PropTypes.func
}

export default injectIntl(SelectDataBaseField)
