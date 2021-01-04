import React from 'react'
import PropTypes from 'prop-types'
import {
  Modal,
  ModalHeader,
  ModalFooter
} from 'reactstrap'
import Button from '../../../../../components/button'
import IntlMessages from '../../../../../helpers/IntlMessages'

const AskRefreshSchema = ({ open, toggle, onRefresh, loading }) => {
  return (
    <Modal isOpen={open} toggle={toggle}>
      <ModalHeader toggle={toggle}>
        <IntlMessages id='control.refresh-schema-reset-conf' />
      </ModalHeader>
      <ModalFooter className='d-flex justify-content-center'>
        <Button loading={loading} size='lg' color='primary' onClick={onRefresh}>
          <IntlMessages id='control.yes' />
        </Button>
        <Button disabled={loading} size='lg' color='secondary' onClick={toggle}>
          <IntlMessages id='control.cancel' />
        </Button>
      </ModalFooter>
    </Modal>
  )
}

AskRefreshSchema.propTypes = {
  open: PropTypes.bool,
  toggle: PropTypes.func,
  onRefresh: PropTypes.func,
  loading: PropTypes.any
}

export default AskRefreshSchema
