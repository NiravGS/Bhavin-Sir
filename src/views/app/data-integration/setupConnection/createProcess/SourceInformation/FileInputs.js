/* eslint-disable react/prop-types */
import * as R from 'ramda'
import React from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { Table } from 'reactstrap'
import IntlMessages from '../../../../../../helpers/IntlMessages'
import { useEffectUnmountCancel } from '../../../../../../helpers/useEffectUnmountCancel'
import { FileInputRowForDb } from './FileInputRowForDb'

const FileInputs = ({ name }) => {
  const { control, register, watch } = useFormContext()

  const fieldArray = useFieldArray({ control, name })
  const isLocalSystem = R.equals(watch('system'), 'localSystem')

  const { fields, append } = fieldArray

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
            <th className='text-center' style={{ width: '12%' }}><IntlMessages id='label.schemaFile' /></th>
          </tr>
        </thead>
        <tbody>
          {fields.map((item, index) => {
            return (
              <FileInputRowForDb
                key={item.id}
                item={item}
                index={index}
                register={register}
                fieldArray={fieldArray}
                isLocalSystem={isLocalSystem}
              />)
          })}
        </tbody>
      </Table>
    </>
  )
}

FileInputs.propTypes = {}

export default React.memo(FileInputs, R.equals)
