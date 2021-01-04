/* eslint-disable camelcase */
import PropTypes from 'prop-types'
import React from 'react'
import 'react-datepicker/dist/react-datepicker.css'
import { useProcessId } from '../helper'
import CreateScheduleModal from '../../../../schedule/CreateScheduleModal'
import useSchedule from '../../../../schedule/useSchedule'
import ScheduledTable from '../../../../schedule/ScheduledTable'
import { useSwrFetchSchedules, useAsyncCreateSchedule } from '../requests'

const ManageSchedule = ({ toggleCreate, openCreate }) => {
  const processId = useProcessId()
  const swrFetchedSchedules = useSwrFetchSchedules(processId)
  const [runCreateSchedule, loadingCreateSchedule] = useAsyncCreateSchedule()
  const { deleteItem, createSchedule, schedules } = useSchedule(swrFetchedSchedules, runCreateSchedule)

  return (
    <>
      <ScheduledTable
        processId={processId}
        schedules={schedules}
        onDelete={deleteItem}
      />
      <CreateScheduleModal
        open={openCreate}
        toggle={toggleCreate}
        onSubmit={createSchedule}
        loading={loadingCreateSchedule}
      />
    </>
  )
}

ManageSchedule.propTypes = {
  toggleCreate: PropTypes.func,
  openCreate: PropTypes.bool
}

export default ManageSchedule
