import PropTypes from 'prop-types'
import React from 'react'
import { Modal, ModalFooter, ModalHeader } from 'reactstrap'
import Button from '../../../../../components/button'
import { Notification } from '../../../../../helpers/appUtils'
import IntlMessages from '../../../../../helpers/IntlMessages'

const AskFetchModal = ({ open, toggle, processId, asyncFetchDbInfo, onFinishFetch }) => {
  const { runFetchDbInfo, loadingFetch } = asyncFetchDbInfo
  const onFetch = async () => {
    try {
      await runFetchDbInfo(processId)
      toggle()
      Notification.success('Fetch successful!')
      onFinishFetch && onFinishFetch()
    } catch (error) {
      Notification.error('Fetch failed!')
    }
  }
  return (
    <Modal isOpen={open} toggle={toggle}>
      <ModalHeader toggle={toggle}>
        <IntlMessages id='control.fetch-modal-title' />
      </ModalHeader>
      <ModalFooter className='d-flex justify-content-center'>
        <Button
          data-testid='button-fetch'
          loading={loadingFetch} size='lg' color='primary' onClick={onFetch}
        >
          <IntlMessages id='control.fetch' />
        </Button>
        <Button size='lg' color='secondary' onClick={toggle}>
          <IntlMessages id='control.cancel' />
        </Button>
      </ModalFooter>
    </Modal>
  )
}

AskFetchModal.propTypes = {
  open: PropTypes.bool,
  toggle: PropTypes.func,
  processId: PropTypes.number,
  asyncFetchDbInfo: PropTypes.object,
  onFinishFetch: PropTypes.func
}

AskFetchModal.defaultProps = {
  asyncFetchDbInfo: {}
}

export default AskFetchModal
