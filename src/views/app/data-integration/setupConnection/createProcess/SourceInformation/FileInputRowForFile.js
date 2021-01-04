/* eslint-disable react/prop-types */
import * as R from 'ramda'
import React, { useState } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { useIntl } from 'react-intl'
import Input from '../../../../../../components/Input/Input'
import Select from '../../../../../../components/Input/Select'
import config from '../../../../../../config'
import { useEffectAsync } from '../../../../../../helpers/appUtils'
import { useSelectorSourceInformation } from '../../processEvents'
import { AddRemoveButton } from './AddRemoveButton'
import InputFileUpload, { UserProcessIndexDb } from './InputFileUpload'
import { isFile } from './useFileColumns'
import { xlsToJsonAsync } from './xlsToJson'

export const FileInputRowForFile = ({ item, index, fieldArray }) => {
  const { messages } = useIntl()
  const [generatedFileName] = useState(`${index}_${+new Date()}`)
  const [localFileLink, setLocalFileLink] = useState({})
  const userProcessIndexDb = new UserProcessIndexDb()
  const { fileInput } = useSelectorSourceInformation()

  const { watch, setValue, register } = useFormContext()
  const { fields, append, remove } = fieldArray

  const baseName = `fileInputs[${index}]`

  const schemaFile = watch(`${baseName}.schemaFile`)
  const header = watch(`${baseName}.header`)
  const schemaColumns = watch(`${baseName}.schemaColumns`)
  const fileType = watch(`${baseName}.fileType`);

  const onChangeHeader = (event) => {
    if (event.target.checked) {
      setValue(`${baseName}.schemaFile`, null)
      setValue(`${baseName}.schemaColumns`, [])
      setValue(`${baseName}.extractedColumns`, null)
    }
  }

  const localId = R.or(item.localId, item.id)

  useEffectAsync(async () => {
    if (isFile(schemaFile?.[0])) {
      const schemaColumns = await xlsToJsonAsync(schemaFile?.[0], {
        columnname: 'column',
        datatype: 'dataType',
        primarykey: 'isPrimaryKey'
      })
      setValue(`${baseName}.schemaColumns`, schemaColumns)
      setValue(`${baseName}.extractedColumns`, schemaColumns?.flatMap?.(R.prop('column')))
      await userProcessIndexDb.insertFile(localId, schemaFile?.[0], generatedFileName)
      if (schemaFile[0]) {
        setLocalFileLink({
          href: window.URL.createObjectURL(schemaFile[0]),
          download: schemaFile[0].name
        })
      }
    }
  }, [schemaFile?.[0]?.size])

  const downloadSchemaParams = (localFileLink.href && localFileLink) ||
    (item.objectListId &&
      { href: `${config?.baseUrlApi}/data-integration/process/file/${item.objectListId}?type=schema` })

  return (
    <>
      <tr key={item.id}>
        <td className='align-middle text-center'>
          <input
            type='hidden'
            name={`${baseName}.localId`}
            ref={register()}
            value={localId}
          />
          <input
            type='hidden'
            name={`${baseName}.objectListId`}
            ref={register()}
            value={item.objectListId}
          />
          <input
            type='hidden'
            name={`${baseName}.generatedFileName`}
            ref={register()}
            value={generatedFileName}
          />
          <Input
            placeholder={messages['label.filePath']}
            innerRef={register({ required: true })}
            name={`${baseName}.filePath`}
            defaultValue={item.filePath}
          />
        </td>
        <td>
          <Input
            placeholder={messages['label.fileMask']}
            innerRef={register()}
            name={`${baseName}.fileMask`}
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
            name={`${baseName}.fileType`}
            defaultValue={item.fileType}
          />
        </td>
        <td className='align-middle text-center'>
          <Select
            notSpaced
            rules={{ required: true }}
            options={[
              { label: ',', value: ',' },
              { label: '|', value: '|' },
              { label: '"\t"', value: '\t' },
            ]}
            innerRef={register({ required: true })}
            name={`${baseName}.delimiter`}
            defaultValue={item.delimiter}
            isDisabled={fileType !== 'Delimited'}
          />
        </td>
        <td id={`dependentOfDelimiter${index}_`} className='align-middle text-center'>
          <input
            name={`${baseName}.header`}
            ref={register()}
            type='checkbox'
            onChange={onChangeHeader}
            aria-label='header'
            defaultChecked={item.schemaFile ? fileInput?.[index]?.header : true}
          />
        </td>
        <td id={`dependentOfDelimiter${index}_`} className='align-middle text-center'>
          <InputFileUpload
            downloadParams={downloadSchemaParams}
            label={messages['label.addSchema']}
            name={`${baseName}.schemaFile`}
            defaultValue={R.isEmpty(schemaColumns) ? null : item.schemaFile}
            innerRef={register({ required: !header })}
          />
        </td>
        <td className='align-middle'>
          <AddRemoveButton
            length={fields.length}
            index={index}
            onAdd={() => append({})}
            onRemove={() => remove(index)}
          />
        </td>
      </tr>
      <Controller
        name={`${baseName}.schemaColumns`}
        defaultValue={item.schemaColumns ?? null}
        render={() => <input type='hidden' />}
      />
      <Controller
        name={`${baseName}.extractedColumns`}
        defaultValue={item.extractedColumns ?? null}
        render={() => <input type='hidden' />}
      />

    </>
  )
}
