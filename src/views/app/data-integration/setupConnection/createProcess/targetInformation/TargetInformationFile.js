/* eslint-disable react/prop-types */
import * as R from 'ramda'
import React from 'react'
import { useFormContext } from 'react-hook-form'
import { useIntl } from 'react-intl'
import { Input, Label, Table } from 'reactstrap'
import Select from '../../../../../../components/Input/Select'
import IntlMessages from '../../../../../../helpers/IntlMessages'
import { useSelectorSourceInformation } from '../../processEvents'
import HiddenInputs from '../connectionInformationForm/HiddenInputs'

const TargetFileInputRow = ({ baseName, itemName, showTargetTableField }) => {
  const { register, watch } = useFormContext()
  const { messages } = useIntl()

  const delimiterIsDisabled = !R.equals('delimiter', watch(`${baseName}.targetFileType`))

  return (
    <tr>
      <td>
        <Label className='align-middle text-center' style={{ wordBreak: 'break-all' }}>
          {itemName}
        </Label>
        <input
          name={`${baseName}.name`}
          ref={register}
          type='hidden'
          value={itemName}
        />
        <HiddenInputs baseName={baseName} />
      </td>
      <td className='align-middle text-center'>
        <Input
          placeholder={messages['label.targetPath']}
          innerRef={register({ required: true })}
          name={`${baseName}.targetFilePath`}
        />
      </td>
      <td className='align-middle text-center'>
        <Select
          notSpaced
          rules={{ required: true }}
          options={[
            { label: 'Delimited', value: 'delimiter' },
            { label: 'JSON', value: 'json' }
          ]}
          innerRef={register({ required: true })}
          name={`${baseName}.targetFileType`}
        />
      </td>
      <td className='align-middle text-center'>
        <Select
          isDisabled={delimiterIsDisabled}
          notSpaced
          rules={{ required: !delimiterIsDisabled }}
          options={[
            { label: ',', value: ',' },
            { label: '|', value: '|' }
          ]}
          name={`${baseName}.targetDelimiter`}
        />
      </td>
    </tr>
  )
}

const TargetInformationFile = () => {
  const { messages } = useIntl()
  const {
    table: sourceTables,
    fileInputs
  } = useSelectorSourceInformation()
  const sourceContent = R.or(fileInputs, sourceTables)

  return (
    <Table>
      <thead>
        <tr>
          <th style={{ width: '25%' }}>
            <IntlMessages
              id={`label.${fileInputs ? 'fileInput' : 'sourceTable'}`}
            />
          </th>
          <th><IntlMessages id='label.targetPath' /></th>
          <th>{`${messages['label.type']}*`}</th>
          <th><IntlMessages id='label.delimiter' /></th>
        </tr>
      </thead>
      <tbody>
        {sourceContent?.map((contentItem) => {
          return (
            <TargetFileInputRow
              key={contentItem}
              itemName={contentItem}
              baseName={`targetItems[${contentItem}]`}
            />)
        }

        )}
      </tbody>
    </Table>
  )
}

export default TargetInformationFile
