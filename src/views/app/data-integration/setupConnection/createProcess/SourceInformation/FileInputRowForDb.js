import get from 'lodash.get'
/* eslint-disable react/prop-types */
import * as R from 'ramda'
import React, { useState } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { useIntl } from 'react-intl'
import { Label, UncontrolledTooltip } from 'reactstrap'
import Input from '../../../../../../components/Input/Input'
import Select from '../../../../../../components/Input/Select'
import { isRequired, Notification, toggle, useEffectAsync } from '../../../../../../helpers/appUtils'
import IntlMessages from '../../../../../../helpers/IntlMessages'
import { AddRemoveButton } from './AddRemoveButton'
import InputFileUpload, { UserProcessIndexDb } from './InputFileUpload'
import SchemaModal from './SchemaModal'
import { getColumnsFromFile, isFile, getColumnsFromJsonFile, getColumnsFromParquetFile } from './useFileColumns'

export const FileInputRowForDb = ({ item, index, register, fieldArray, isLocalSystem }) => {
  const { messages } = useIntl()
  const [openSchemaModal, setOpenSchemaModal] = useState()
  const [generatedFileName] = useState(`${index}_${+new Date()}`)
  const userProcessIndexDb = new UserProcessIndexDb()

  const { watch, setValue, errors } = useFormContext()
  const { fields, append, remove } = fieldArray

  const file = watch(`fileInputs[${index}].filePath`)
  const delimiter = watch(`fileInputs[${index}].delimiter`)
  const fileType = watch(`fileInputs[${index}].fileType`)

  const onChangeHeader = (event) => {
    if (event.target.checked) {
      setValue(`fileInputs[${index}].schemaFile`, null)
      setOpenSchemaModal(index)
    }
  }

  const localId = R.or(item.localId, item.id)

  useEffectAsync(async () => {
    if (R.and(isFile(file?.[0]), delimiter)) {
      try {
          const columns = await getColumnsFromFile(file?.[0], delimiter)
          setValue(`fileInputs[${index}].extractedColumns`, columns)
          await userProcessIndexDb.insertFile(localId, file?.[0], generatedFileName)
      } catch (error) {
        Notification.error(messages['label.failedToReadFile'])
      }
    }
    if (R.and(isFile(file?.[0])) && fileType === 'JSON') {
      const columns = await getColumnsFromJsonFile(file?.[0])
      setValue(`fileInputs[${index}].extractedColumns`, columns)
      await userProcessIndexDb.insertFile(localId, file?.[0], generatedFileName)
    }
    if (R.and(isFile(file?.[0])) && fileType === 'Parquet') {
      const columns = await getColumnsFromParquetFile(file?.[0])
     // setValue(`fileInputs[${index}].extractedColumns`, columns)
     // await userProcessIndexDb.insertFile(localId, file?.[0], generatedFileName)
    }
  }, [file?.[0]?.size, fileType, delimiter ])

  return (
    <>
      <tr key={item.id}>
        <td className='align-middle text-center'>
          <input
            type='hidden'
            name={`fileInputs[${index}].localId`}
            ref={register()}
            value={localId}
          />
          <input
            type='hidden'
            name={`fileInputs[${index}].generatedFileName`}
            ref={register()}
            value={generatedFileName}
          />
          {isLocalSystem ? (
            <InputFileUpload
              label={messages['label.addFile']}
              name={`fileInputs[${index}].filePath`}
              defaultValue={item.filePath}
              innerRef={register({ required: true })}
            />
          ) : (
            <Input
              placeholder={messages['label.filePath']}
              innerRef={register({ required: true })}
              name={`fileInputs[${index}].filePath`}
              defaultValue={item.filePath}
            />
          )}
        </td>
        <td>
          <Input
            placeholder={messages['label.fileMask']}
            innerRef={register()}
            name={`fileInputs[${index}].fileMask`}
            defaultValue={item.fileMask}
          />
        </td>
        <td className='align-middle text-center'>
          <Select
            notSpaced
            rules={{ required: true }}
            options={[
              { label: 'Delimited', value: 'Delimited' },
              { label: 'JSON', value: 'JSON' },
              // { label: 'Parquet', value: 'Parquet' }
            ]}
            innerRef={register({ required: true })}
            name={`fileInputs[${index}].fileType`}
            defaultValue={item.fileType}
          />
        </td>
        <td className='align-middle text-center'>
          <Select
            notSpaced
            rules={{ required: false }}
            options={[
              { label: ',', value: ',' },
              { label: '|', value: '|' },
              { label: '/t', value: '\t' }
            ]}
            innerRef={register({ required: true })}
            name={`fileInputs[${index}].delimiter`}
            defaultValue={item.delimiter}
            isDisabled={fileType !== 'Delimited'}
          />
        </td>
        <td id={`dependentOfDelimiter${index}_`} className='align-middle text-center'>
          <input
            name={`fileInputs[${index}].header`}
            ref={register()}
            type='checkbox'
            onChange={onChangeHeader}
            aria-label='header'
            disabled={!fileType}
            defaultChecked={item.header}
          />
        </td>
        <td id={`dependentOfDelimiter${index}_`} className='align-middle text-center'>
          <Label
            onClick={() => delimiter && setOpenSchemaModal(index)}
            className={
              `${delimiter ? 'btn btn-link mb-0' : 'text-muted mb-0'}
              ${isRequired(get(errors, `fileInputs[${index}].schemaColumns`)) ? 'error-border' : ''}
              `
            }
          >
            {messages['label.editSchema']}
          </Label>
        </td>
        {(!delimiter || !file?.[0]) && (
          <UncontrolledTooltip placement='top' target={`dependentOfDelimiter${index}_`}>
            <IntlMessages id='label.selectDelimiterFirst' />
          </UncontrolledTooltip>
        )}
        <td className='align-middle'>
          <AddRemoveButton
            length={fields.length}
            index={index}
            onAdd={() => append({})}
            onRemove={() => remove(index)}
          />
          <Controller
            name={`fileInputs[${index}].schemaColumns`}
            defaultValue={item.schemaColumns ?? null}
            rules={{ required: true }}
            as={
              <SchemaModal
                fileIndex={openSchemaModal}
                toggle={toggle(setOpenSchemaModal)}
                open={Number.isInteger(openSchemaModal)}
                name={`fileInputs[${index}].schemaColumns`}
              />
            }
          />

          <Controller
            name={`fileInputs[${index}].extractedColumns`}
            defaultValue={item.extractedColumns ?? null}
            rules={{ required: true }}
            render={() => <input type='hidden' />}
          />
        </td>
      </tr>

    </>
  )
}
