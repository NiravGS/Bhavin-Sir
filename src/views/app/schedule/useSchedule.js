/* eslint-disable camelcase */
import moment from 'moment'
import 'react-datepicker/dist/react-datepicker.css'
import { useIntl } from 'react-intl'
import { Notification } from '../../../helpers/appUtils'
import { useProcessId } from '../data-quality/setupConnection/createConfiguration/helper'
import { deleteSchedule } from '../data-quality/setupConnection/createConfiguration/requests'

export const formatSchedule = schedule => ({
  sch_interval: schedule.sch_interval?.value,
  sch_time: moment.utc(schedule.sch_time).format('YYYY-MM-DD HH:mm:ss.S')
})

const useSchedule = (swrFetchedSchedules, runCreateSchedule) => {
  const intl = useIntl()
  const processId = useProcessId()
  const { data: schedules, mutate } = swrFetchedSchedules

  const deleteItem = async (schedule) => {
    const updatedContent = await deleteSchedule({
      process_id: schedule.process_id,
      ...formatSchedule(schedule),
      sch_interval: schedule.sch_interval
    })
    mutate(updatedContent?.data)
  }

  const createSchedule = async (data) => {
    try {
      const res = await runCreateSchedule(processId, formatSchedule(data))
      mutate(res?.data)
      Notification.success(intl.messages['alert.success.createSchedule'])
    } catch (err) {
      const error = err?.response?.data?.error
      const message = error === 'already_exist' ? 'scheduleAlreadyExist' : 'createSchedule'
      Notification.error(intl.messages[`alert.error.${message}`])
    }
  }

  return { deleteItem, createSchedule, schedules }
}

export default useSchedule
