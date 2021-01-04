import PropTypes from 'prop-types'
import React, { Fragment, useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { Input, Label } from 'reactstrap'
import Select from '../../../../../../components/Input/Select'
import { ingestionTypeOptions, scdTypeOptions } from '../../../../staticFields'
import HiddenInputs from '../connectionInformationForm/HiddenInputs'

const TargetInformationRow = ({
  tables, baseName, columns, createTargetTables,
  itemName, showTargetTableText, loadingTable
}) => {
  const { watch, setValue, register } = useFormContext()

  const isIngestionNotIncremental = watch(`${baseName}.ingestionType`) !== 'I'

  useEffect(() => {
    if (isIngestionNotIncremental) {
      setValue(`${baseName}.cdcColumns`, null)
      setValue(`${baseName}.scdType`, null)
      setValue(`${baseName}.scdColumns`, null)
    }
  }, [isIngestionNotIncremental])

  useEffect(() => {
    if (createTargetTables) {
      setValue(`${baseName}.targetTable`, null)
    }
  }, [createTargetTables])

  return (
    <Fragment key={baseName}>
      <tr>
        <td><Label style={{ wordBreak: 'break-all' }}>{itemName}</Label></td>
        <td>
          <input
            name={`${baseName}.name`}
            ref={register}
            type='hidden'
            value={itemName}
          />
          <HiddenInputs baseName={baseName} />
          {showTargetTableText ? (
            <Input name={`${baseName}.targetTable`} innerRef={register({ required: true })} />
          ) : (
            <Select
              isDisabled={createTargetTables}
              notSpaced
              options={tables}
              isLoading={loadingTable}
              rules={{ required: !createTargetTables }}
              name={`${baseName}.targetTable`}
            />
          )}
        </td>
        <td>
          <Select
            notSpaced options={ingestionTypeOptions}
            name={`${baseName}.ingestionType`}
          />
        </td>
        <td>
          <Select
            isDisabled={isIngestionNotIncremental}
            notSpaced
            options={columns}
            name={`${baseName}.cdcColumns`}
            isMultiCheckbox
          />
        </td>
        <td>
          <Select
            notSpaced
            isDisabled={isIngestionNotIncremental}
            options={scdTypeOptions}
            name={`${baseName}.scdType`}
          />
        </td>
        <td>
          <Select
            notSpaced
            options={columns}
            isDisabled={isIngestionNotIncremental}
            name={`${baseName}.scdColumns`}
            isMultiCheckbox
          />
        </td>
      </tr>
    </Fragment>
  )
}

TargetInformationRow.propTypes = {
  tables: PropTypes.array,
  baseName: PropTypes.string,
  columns: PropTypes.array,
  createTargetTables: PropTypes.bool,
  itemName: PropTypes.string,
  showTargetTableText: PropTypes.bool,
  loadingTable: PropTypes.bool
}

export default TargetInformationRow
