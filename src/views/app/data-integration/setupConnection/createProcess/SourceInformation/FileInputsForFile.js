/* eslint-disable react/prop-types */
import * as R from 'ramda'
import React from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { useIntl } from 'react-intl'
import { Table } from 'reactstrap'
import IntlMessages from '../../../../../../helpers/IntlMessages'
import { useEffectUnmountCancel } from '../../../../../../helpers/useEffectUnmountCancel'
import { FileInputRowForFile } from './FileInputRowForFile'
import FileDownload from 'js-file-download'
import request from '../../../../../../helpers/Request'

const FileInputsForFile = ({ name }) => {
  const { control } = useFormContext()
  const { messages } = useIntl()

  const fieldArray = useFieldArray({ control, name })

  const { fields, append } = fieldArray

  const downloadTemplate = async () => {
    const response = await request.get('/data-integration/process/templateSchemaFile', { responseType: 'blob' })
    FileDownload('columnname,datatype,primarykey,size,format,precision,scale', 'schemaTemplate.xlsx')
  }

  useEffectUnmountCancel(() => {
    if (!fields.length) { append({}) }
  }, [fields.length])

  return (
    <>
      <Table>
        <thead>
          <tr>
            <th className='text-center' style={{ width: '20%' }}><IntlMessages id='label.filePath' /></th>
            <th className='text-center'><IntlMessages id='label.fileMask' /></th>
            <th className='text-center' style={{ width: '12%' }}><IntlMessages id='label.fileType' /></th>
            <th className='text-center' style={{ width: '12%' }}><IntlMessages id='label.delimiter' /></th>
            <th className='text-center' style={{ width: '13%' }}><IntlMessages id='label.header' /></th>
            <th className='text-center d-flex flex-column'>
              <IntlMessages id='label.schemaFile' />
              <span
                className='btn-link'
                role='button'
                style={{ cursor: 'pointer' }}
                onClick={downloadTemplate}
              >
                {messages['label.downloadTemplate']}
                <i style={{ fontSize: '15px' }} className='iconsminds-download-1 ml-2' />
              </span>
            </th>
          </tr>
        </thead>
        <tbody>
          {fields.map((item, index) => {
            return (
              <FileInputRowForFile
                key={item.id}
                item={item}
                index={index}
                fieldArray={fieldArray}
              />)
          })}
        </tbody>
      </Table>
    </>
  )
}

FileInputsForFile.propTypes = {}

export default React.memo(FileInputsForFile, R.equals)
