import PropTypes from 'prop-types'
import React from 'react'
import 'react-datepicker/dist/react-datepicker.css'
import { useForm } from 'react-hook-form'
import {
  Modal, ModalBody, ModalFooter,
  ModalHeader
} from 'reactstrap'
import Button from '../../../components/button'
import IntlMessages from '../../../helpers/IntlMessages'
import ScheduleForm from './ScheduleForm'

const CreateScheduleModal = ({ open, toggle, loading, onSubmit }) => {
  const { handleSubmit, control } = useForm()
  return (
    <Modal isOpen={open} toggle={toggle}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ModalHeader toggle={toggle}>
          <IntlMessages id='control.createSchedule' />
        </ModalHeader>
        <ModalBody className='mt-5'>
          <ScheduleForm control={control} />
        </ModalBody>
        <ModalFooter className='d-flex justify-content-center'>
          <Button
            loading={loading}
            type='submit' color='primary'
          ><IntlMessages id='control.create' />
          </Button>
          <Button outline color='secondary' onClick={toggle}>
            <IntlMessages id='control.close' />
          </Button>
        </ModalFooter>
      </form>
    </Modal>

  )
}

CreateScheduleModal.propTypes = {
  open: PropTypes.bool,
  toggle: PropTypes.func,
  loading: PropTypes.bool,
  onSubmit: PropTypes.func
}

CreateScheduleModal.defaultProps = {
  asyncFetchDbInfo: {}
}

export default CreateScheduleModal
