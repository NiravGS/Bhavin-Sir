/* eslint-disable camelcase */
import React from 'react'
import PropTypes from 'prop-types'
import 'react-datepicker/dist/react-datepicker.css'
import { useForm } from 'react-hook-form'
import { useIntl } from 'react-intl'
import { useDispatch } from 'react-redux'
import { Col, Row } from 'reactstrap'
import Button from '../../../../../components/button'
import { BottomNavigation } from '../../../../../components/wizard/BottomNavigation'
import IntlMessages from '../../../../../helpers/IntlMessages'
import ScheduledTable from '../../../schedule/ScheduledTable'
import ScheduleForm from '../../../schedule/ScheduleForm'
import { useSelectorSchedules } from '../processEvents'
import { validateSchedule } from './validations'

const addScheduleToList = schedule => ({
  type: 'addSchedule', payload: schedule
})

const removeScheduleFromList = schedule => ({
  type: 'removeSchedule', payload: schedule
})

const ScheduleProcess = ({ next, prev }) => {
  const schedules = useSelectorSchedules()
  const dispatch = useDispatch()
  const { messages } = useIntl()
  const { handleSubmit, control } = useForm()

  const createLocalSchedules = (data) => {
    const schedule = {
      sch_interval: data.sch_interval?.value,
      sch_time: data.sch_time
    }

    if (validateSchedule(schedules, schedule)) {
      dispatch(addScheduleToList(schedule))
    }
  }

  const deleteSchedule = (schedule) => {
    dispatch(removeScheduleFromList(schedule))
  }

  return (
    <>
      <form onSubmit={handleSubmit(createLocalSchedules)}>
        <Row>
          <Col xs={12} md={7}>
            <ScheduleForm control={control} />
          </Col>
          <Col xs={12} md={5}>
            <ScheduledTable
              schedules={schedules}
              onDelete={deleteSchedule}
              isLocalData
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Button loading={false} type='submit' color='primary'>
              <IntlMessages id='label.addSchedule' />
            </Button>
          </Col>
        </Row>
      </form>
      <BottomNavigation
        onClickNext={next}
        onClickPrev={prev}
        className='justify-content-center mt-3'
        prevLabel={messages['wizard.prev']}
        nextLabel={messages['wizard.next']}
      />
    </>
  )
}

ScheduleProcess.propTypes = {
  next: PropTypes.func,
  prev: PropTypes.func
}

export default ScheduleProcess
