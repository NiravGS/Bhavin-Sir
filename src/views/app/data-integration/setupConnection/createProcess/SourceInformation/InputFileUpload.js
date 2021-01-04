import get from 'lodash.get'
import PropTypes from 'prop-types'
import * as R from 'ramda'
import React, { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import Dexie from 'dexie'
import { isRequired } from '../../../../../../helpers/appUtils'
import './input.scss'

export class UserProcessIndexDb {
  constructor () {
    this.db = new Dexie('userDatabase')
    this.db.version(1).stores({
      currentFiles: 'id, name, file'
    })
  }

  getFileByLocalId = async (localId) => this.db.currentFiles.get({ id: localId })
  insertFile = async (id, file, name) => this.db.currentFiles.put({ id, file, name })
}

const InputFileUpload = ({ defaultValue, innerRef, disabled, downloadParams, ...rest }) => {
  const { register, watch, setValue, errors } = useFormContext()
  const inputValue = watch(rest.name)
  const fileName = inputValue?.[0]?.name

  const [defaultLocalValue, setDefaultLocalValue] = useState()

  useEffect(() => {
    setDefaultLocalValue(defaultValue)
  }, [defaultValue])

  const handleRef = innerRef ? { ref: innerRef } : { ref: register() }

  return (
    <>
      <input
        type={defaultLocalValue ? 'text' : 'file'}
        id={`inputFile_${rest.name}`}
        {...rest}
        {...handleRef}
        className='fileType'
        defaultValue={!disabled ? defaultLocalValue : ''}
        disabled={R.or(disabled, fileName)}
      />
      <label
        className={
          `mb-0 
          ${disabled ? 'text-muted disabledInput' : 'btn btn-link'} 
          ${isRequired(get(errors, rest.name)) ? 'error-border' : ''}`
        }
        htmlFor={`inputFile_${rest.name}`}
      >
        {!disabled ? (fileName || defaultLocalValue || rest.label) : rest.label}
      </label>
      {(!disabled && (defaultLocalValue || fileName)) && (
        <>
          <i
            onClick={() => {
              setDefaultLocalValue(null)
              setValue(rest.name, null)
            }}
            className='simple-icon-trash mr-3'
            title='remove'
            style={{ fontSize: '20px', cursor: 'pointer' }}
          />

          {downloadParams && (
            <a title='download' {...downloadParams}>
              <i style={{ fontSize: '20px' }} className='iconsminds-download-1' />
            </a>
          )}
        </>
      )}
    </>
  )
}

InputFileUpload.propTypes = {
  name: PropTypes.string,
  disabled: PropTypes.bool,
  label: PropTypes.string,
  defaultValue: PropTypes.string,
  innerRef: PropTypes.func,
  downloadParams: PropTypes.object
}

export default InputFileUpload
