/* eslint-disable camelcase */
import * as R from 'ramda'
import { getIntl } from '../../../../../../IntlProvider'
import { Notification } from '../../../../../../helpers/appUtils'

export const validateTarget = (targetContent, sourceTableLength) => () => {
  const { messages } = getIntl()
  if (!targetContent?.targetItems) {
    Notification.error(messages['formError.targetInformation'])
    return false
  }
  return true
}

export const validateSource = (sourceContent) => () => {
  const isOfType = R.equals(sourceContent?.type)
  const { messages } = getIntl()
  const isDatabaseWithoutTable = isOfType('database') && (R.isNil(sourceContent?.table) || R.isEmpty(sourceContent?.table))
  if (R.isEmpty(sourceContent) || isDatabaseWithoutTable) {
    Notification.error(messages['formError.sourceInformation'])
    return false
  }

  return true
}

export const validateScheduleExists = (schedules) => () => {
  const { messages } = getIntl()
  if (R.isEmpty(schedules)) {
    Notification.error(messages['formError.scheduleInformation'])
    return false
  }
  return true
}

export const validateSchedule = (schedules, currentSchedule) => {
  const { messages } = getIntl()
  const alreadyExists = schedules.some(R.equals(currentSchedule))
  if (alreadyExists) {
    Notification.error(messages['alert.error.scheduleAlreadyExist'])
    return false
  }
  if (!currentSchedule?.sch_interval) {
    Notification.error(messages['alert.error.missingInterval'])
    return false
  }
  return true
}

export const validateProcessName = (processName) => {
  const { messages } = getIntl()
  if (R.isEmpty(R.trim(processName))) {
    Notification.error(messages['formError.processReq'])
    return false
  }
  return true
}
