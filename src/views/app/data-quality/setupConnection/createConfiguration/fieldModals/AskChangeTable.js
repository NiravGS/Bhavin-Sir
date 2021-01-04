import PropTypes from 'prop-types'
import React from 'react'
import 'react-datepicker/dist/react-datepicker.css'
import { injectIntl } from 'react-intl'
import { Modal, ModalFooter, ModalHeader } from 'reactstrap'
import Button from '../../../../../../components/button'
import IntlMessages from '../../../../../../helpers/IntlMessages'
import { useConfigDispatch, useConfigState } from '../ConfigProvider'

const AskChangeTable = ({ open, toggle, intl }) => {
  const dispatch = useConfigDispatch()
  const state = useConfigState()

  const closeModal = () => {
    dispatch({ type: 'setNextPendingTable', payload: undefined })
    toggle()
  }

  const onDiscardChanges = () => {
    dispatch({ type: 'setSelectedTable', payload: state.pendingTable })
    dispatch({ type: 'discardChanges' })
    closeModal()
  }

  return (
    <Modal isOpen={open} toggle={toggle}>
      <ModalHeader toggle={toggle}>
        <span>{`${intl?.messages['control.discardForTable']}${state.selectedTable.label}`}</span>
      </ModalHeader>
      <ModalFooter className='d-flex justify-content-center'>
        <Button
          data-testid='button-fetch'
          size='lg' color='secondary' onClick={onDiscardChanges}
        >
          <IntlMessages id='control.discard' />
        </Button>
        <Button size='lg' color='primary' onClick={closeModal}>
          <IntlMessages id='control.cancel' />
        </Button>
      </ModalFooter>
    </Modal>
  )
}

AskChangeTable.propTypes = {
  open: PropTypes.bool,
  toggle: PropTypes.func,
  intl: PropTypes.object
}

export default injectIntl(AskChangeTable)
