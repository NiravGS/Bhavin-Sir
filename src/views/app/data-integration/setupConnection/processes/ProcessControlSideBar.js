/* eslint-disable react/prop-types */
import * as R from 'ramda'
import React from 'react'
import { useIntl } from 'react-intl'
import { Link } from 'react-router-dom'
import {
  Modal,
  ModalBody
} from 'reactstrap'
import Button from '../../../../../components/button'
import { Notification } from '../../../../../helpers/appUtils'
import { useAsyncRunProcess, useProcessExecutions } from '../editProcess/request'
import { useToggleModal, useViewProcesses } from './reducer'

const ProcessControlSideBar = ({ onChangeStatus }) => {
  const { toggleModal } = useToggleModal()
  const { messages } = useIntl()
  const [runProcess] = useAsyncRunProcess()
  const executions = useProcessExecutions()

  const {
    showProcessModal,
    currentProcess: { processId, activeFlag }
  } = useViewProcesses()

  const isNotActive = R.equals('N', activeFlag)

  const executeProcess = () => {
    if (isNotActive) {
      Notification.error(messages['label.activateFirst'])
      return
    }
    runProcess(processId)
    toggleModal()
  }

  const isRunning = executions?.[processId]?.isRunning

  return (
    <Modal
      isOpen={showProcessModal}
      toggle={() => toggleModal()}
      wrapClassName='modal-right'
      size='sm'
      style={{ width: '170px' }}
    >
      <ModalBody className='d-flex justify-content-center flex-column'>
        <Link to={`/app/data-integration/set-up-connection/review-process/${processId}`}>
          <Button icon='simple-icon-eye' className='mt-4 w-100' color='primary'>
            {messages['label.view']}
          </Button>
        </Link>
        <Button
          onClick={executeProcess}
          loading={isRunning}
          icon='simple-icon-settings'
          className='mt-4 w-100'
          color='primary'
        >
          {messages['label.run']}
        </Button>
        <Link to={`/app/data-integration/set-up-connection/process/${processId}`}>
          <Button icon='simple-icon-pencil' className='mt-4 w-100' outline color='primary'>
            {messages['label.edit']}
          </Button>
        </Link>

        {isNotActive ? (
          <Button
            icon='iconsminds-yes'
            onClick={() => onChangeStatus('activate')}
            color='success'
            outline
            className='mt-4 w-100'
          >
            {messages['label.activate']}
          </Button>)
          : (
            <Button
              icon='iconsminds-close'
              color='dark'
              onClick={() => onChangeStatus('deactivate')}
              outline
              className='mt-4 w-100'
            >
              {messages['label.deactivate']}
            </Button>
          )}
        <Button
          icon='simple-icon-trash'
          onClick={() => onChangeStatus('delete')}
          outline
          className='mt-4 w-100' color='secondary'
        >
          {messages['label.delete']}
        </Button>

      </ModalBody>
    </Modal>
  )
}

ProcessControlSideBar.propTypes = {}

export default ProcessControlSideBar
