/* eslint-disable react/prop-types */
import PropTypes from 'prop-types'
import React, { useEffect } from 'react'
import { FormProvider, useForm, useFormContext } from 'react-hook-form'
import { useIntl } from 'react-intl'
import { Button, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Table } from 'reactstrap'
import Select from '../../../../../../components/Input/Select'
import { Notification } from '../../../../../../helpers/appUtils'
import IntlMessages from '../../../../../../helpers/IntlMessages'
import { dataTypeOptions } from '../../../../staticFields'
import { useSelectorSourceInformation } from '../../processEvents'
import HiddenInputs from '../connectionInformationForm/HiddenInputs'

const SchemaForm = ({ fileIndex, defaultValue }) => {
  const { fileInputs } = useSelectorSourceInformation()
  const { messages } = useIntl()
  const { extractedColumns, header: hasColumnNames, schemaColumns } = fileInputs?.[fileIndex] ?? {}
  const { register, reset } = useFormContext()

  useEffect(() => {
    reset({ schemaColumns: defaultValue || schemaColumns })
  }, [defaultValue])

  return (
    <Table>
      <thead>
        <tr>
          <th>{`${messages['label.column']}*`}</th>
          <th>{`${messages['label.dataType']}*`}</th>
          <th><IntlMessages id='label.size' /></th>
          <th className='text-center'><IntlMessages id='label.isPrimaryKey' /></th>
        </tr>
      </thead>
      <tbody>
        {extractedColumns?.map((column, index) => {
          const base = `schemaColumns[${index}]`
          return (
            <tr key={`col_${index}`}>
              <td className='align-middle'>
                {hasColumnNames ? (
                  <>
                    <input ref={register} name={`${base}.column`} type='hidden' value={column} />
                    <HiddenInputs baseName={base} />
                    <Label className='mb-0'>{column}</Label>
                  </>
                ) : <Input innerRef={register({ required: true })} name={`${base}.column`} />}
              </td>
              <td className='align-middle'>
                <Select rules={{ required: true }} notSpaced options={dataTypeOptions} name={`${base}.dataType`} />
              </td>
              <td className='align-middle'>
                <Input innerRef={register} name={`${base}.size`} />
              </td>
              <td className='align-middle text-center'>
                <input
                  name={`${base}.isPrimaryKey`}
                  ref={register}
                  type='checkbox'
                  aria-label='is primary key'
                />
              </td>
            </tr>

          )
        })}
      </tbody>
    </Table>
  )
}

const SchemaModal = ({ open, toggle, fileIndex, defaultValue, onChange }) => {
  const methods = useForm({ shouldUnregister: false })
  const { messages } = useIntl()

  const { handleSubmit } = methods

  const saveContent = ({ schemaColumns }) => {
    onChange(schemaColumns)
    toggle()
  }

  const onValidateErrors = () => {
    Notification.error(messages['formError.requiredFields'])
  }

  return (
    <FormProvider {...methods}>
      <Modal size='lg' className='modal-dialog-scrollable' data-testid='db-connection-form' isOpen={open} toggle={toggle}>
        <ModalHeader toggle={toggle}>
          <IntlMessages id='label.setupSchema' />
        </ModalHeader>
        <ModalBody className='av-tooltip tooltip-label-right'>
          <SchemaForm defaultValue={defaultValue} fileIndex={fileIndex} />
        </ModalBody>
        <ModalFooter className='d-flex justify-content-around'>
          <Button size='lg' color='primary' onClick={handleSubmit(saveContent, onValidateErrors)}>
            <IntlMessages id='label.confirmSchema' />
          </Button>
        </ModalFooter>
      </Modal>
    </FormProvider>
  )
}

SchemaModal.propTypes = {
  open: PropTypes.bool,
  toggle: PropTypes.func,
  fileIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
  baseName: PropTypes.string
}

export default SchemaModal
