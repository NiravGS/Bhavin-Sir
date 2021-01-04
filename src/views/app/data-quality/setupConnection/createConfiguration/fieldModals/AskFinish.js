import PropTypes from 'prop-types'
import React from 'react'
import * as R from 'ramda'
import 'react-datepicker/dist/react-datepicker.css'
import { Modal, ModalFooter, ModalHeader, ModalBody } from 'reactstrap'
import Button from '../../../../../../components/button'
import IntlMessages from '../../../../../../helpers/IntlMessages'

const AskFinish = ({ askDiscard, open, toggle, onChoseFinish, creating, onSaveAndFinish }) => {
  const hasChanges = askDiscard?.columns?.length
  const columnsChanged = askDiscard?.columns?.flatMap((R.prop('label')))
  return (
    <Modal size={hasChanges ? 'lg' : 'md'} isOpen={open} toggle={toggle}>
      <ModalHeader toggle={toggle}>
        <IntlMessages id='control.askFinish' />
      </ModalHeader>
      {
        hasChanges ? (
          <ModalBody>
            <h6><IntlMessages id='control.askForChanges' /></h6>
            <h6 className='font-italic'>{columnsChanged.join(', ')}</h6>
          </ModalBody>
        ) : ''
      }

      <ModalFooter className='d-flex justify-content-center'>
        {
          hasChanges ? (
            <Button
              loading={creating}
              data-testid='button-finish-modal'
              size='lg' color='secondary' onClick={onSaveAndFinish}
            >
              <IntlMessages id='control.saveAndFinish' />
            </Button>
          ) : ''
        }
        <Button
          disabled={creating}
          data-testid='button-finish-modal'
          size='lg' color='secondary' onClick={onChoseFinish}
        >
          <IntlMessages id={`control.${hasChanges ? 'finishWithoutSave' : 'finish'}`} />
        </Button>
        <Button size='lg' color='primary' onClick={toggle}>
          <IntlMessages id='control.cancel' />
        </Button>
      </ModalFooter>
    </Modal>
  )
}

AskFinish.propTypes = {
  open: PropTypes.bool,
  toggle: PropTypes.func,
  onChoseFinish: PropTypes.func,
  askDiscard: PropTypes.object,
  creating: PropTypes.bool,
  onSaveAndFinish: PropTypes.func
}

export default AskFinish
