import PropTypes from 'prop-types'
import React from 'react'
import { useFormContext } from 'react-hook-form'
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import Button from '../../../../../components/button'
import IntlMessages from '../../../../../helpers/IntlMessages'
import { useAsync } from '../../../../../helpers/requestHelpers'
import { ConnectionFields } from './ConnectionFields'

const FileConnection = ({ open, toggle, onTest, onSave }) => {
  const { handleSubmit } = useFormContext()
  const [runTest, loadingTest] = useAsync(handleSubmit(onTest))
  const [runSave, loadingSave] = useAsync(handleSubmit(onSave))

  const blockButtons = loadingSave || loadingTest
  return (
    <Modal data-testid='db-connection-form' isOpen={open} toggle={toggle}>
      <ModalHeader toggle={toggle}>
        <IntlMessages id='label.new-connection' />
      </ModalHeader>
      <ModalBody className='av-tooltip tooltip-label-right'>
        <ConnectionFields />
      </ModalBody>
      <ModalFooter className='d-flex justify-content-between'>
        <Button disabled={blockButtons} size='lg' color='primary' onClick={runTest} loading={loadingTest}>
          <IntlMessages id='control.test' />
        </Button>
        <Button
          disabled={blockButtons} size='lg' color='primary' onClick={runSave}
          loading={loadingSave}
        >
          <IntlMessages id='control.save' />
        </Button>
        <Button size='lg' color='secondary' onClick={toggle}>
          <IntlMessages id='control.cancel' />
        </Button>
      </ModalFooter>
    </Modal>
  )
}

FileConnection.propTypes = {
  open: PropTypes.bool,
  toggle: PropTypes.func,
  onSave: PropTypes.func,
  onTest: PropTypes.func
}

export default FileConnection
