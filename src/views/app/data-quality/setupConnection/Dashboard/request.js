import * as R from 'ramda'
import { mountParams, useFetchSWR } from '../../../../../helpers/requestHelpers'

const hasBoth = (itemOne, itemTwo) => R.and(!R.isNil(itemOne), !R.isNil(itemTwo))

export const useFetchDatacheckSummary = (processId, days) => {
  const { data } = useFetchSWR(`/fetch-dashboard/${processId}`)
  return data
}

export const useFetchDatacheckByDays = (processId) => {
  const { data } = useFetchSWR(`/fetch-dashboard/datacheck/${processId}`)
  return data
}

export const useFetchPillars = (processId) => {
  const { data } = useFetchSWR(`/dashboard/pillars/${processId}`)
  return data
}

export const useFetchPillarPerfMetric = (processId, monthOne, monthTwo) => {
  const urlParams = mountParams({ monthOne, monthTwo })
  const { data } = useFetchSWR(`/dashboard/pillar/performance-metrics/${processId}${urlParams}`)
  return data
}

export const useFetchPillarCompleteness = (processId) => {
  const { data } = useFetchSWR(`/dashboard/pillar/completeness/${processId}`)
  return data
}

export const useFetchMeters = (processId) => {
  const { data } = useFetchSWR(`/fetch-dashboard/summary-meters/${processId}`)
  return data
}

export const useFetchMeanMedia = (processId, filters) => {
  const urlParams = mountParams(filters)
  const { data } = useFetchSWR(() => {
    return hasBoth(filters.columnId, filters.objectId) ? `/fetch-dashboard/mean-median/${processId}${urlParams}`
      : null
  })

  return data
}

export const useFetchGoodToBad = (processId, filters) => {
  const urlParams = mountParams(filters)
  const { data } = useFetchSWR(`/fetch-dashboard/good-to-bad/${processId}${urlParams}`)

  return data
}

export const useFetchMonthlyTrend = (processId, days, objectId, columnId) => {
  const urlParams = mountParams({ days, objectId, columnId })
  const { data } = useFetchSWR(`/fetch-dashboard/monthly-trend-datacheck/${processId}${urlParams}`)

  return data
}

export const useFetchTrendOfRange = (processId, filters) => {
  const urlParams = mountParams(filters)
  const { data } = useFetchSWR(`/dashboard/pillar/trend-range/${processId}${urlParams}`)
  return data
}

export const useFetchOutsideRange = (processId, filters) => {
  const urlParams = mountParams(filters)
  const { data } = useFetchSWR(() => filters.objectId && filters.columnId ? `/dashboard/pillar/outside-range/${processId}${urlParams}` : '')
  return data
}

export const useFetchTrendDatacheck = (processId, filters) => {
  const urlParams = mountParams(filters)
  const { data } = useFetchSWR(`/fetch-dashboard/trend-datacheck/${processId}${urlParams}`)
  return data
}

export const useFetchIssuesAffectingQuality = (processId, filters) => {
  const urlParams = mountParams(filters)
  const { data } = useFetchSWR(`/dashboard/issues-affecting-quality/${processId}${urlParams}`)
  return data
}

export const useFetchLastSummary = (processId, filters) => {
  const urlParams = mountParams(filters)
  const { data } = useFetchSWR(`/fetch-dashboard/last-run-summary/${processId}${urlParams}`)
  return data
}

export const useFetchWeeklyTrendDatacheck = (processId, filters) => {
  const urlParams = mountParams(filters)
  const { data } = useFetchSWR(`/fetch-dashboard/weekly-trend-datacheck/${processId}${urlParams}`)
  return data
}

export const useSwrGetConfiguration = (processId) => {
  const { data } = useFetchSWR(`/config/${processId}`)
  return {
    configuration: data
  }
}
