/* eslint-disable camelcase */
import * as R from 'ramda'
import moment from 'moment'
import { ThemeColors } from '../../../../../helpers/ThemeColors'
import { getIntl } from '../../../../../IntlProvider'

const intlMessages = getIntl().messages
const chartLabel = val => intlMessages[`chart.${val}`]
const getLabel = val => intlMessages[`label.${val}`]

const colors = ThemeColors()
const objectDefault = R.defaultTo({})
const zeroDefault = R.defaultTo(0)

const getColumnsToRender = (columns, content) => {
  return R.pick(columns, content)
}

export const mountDataLabel = (columnsToRender) => {
  const data = R.values(columnsToRender).map(zeroDefault)
  const labels = R.keys(columnsToRender)?.map(chartLabel)
  return { data, labels }
}

export const getDataAndLabel = (columns, content) => {
  const columnsToRender = getColumnsToRender(columns, objectDefault(content))
  return mountDataLabel(columnsToRender, intlMessages)
}

export const mountBarChart = (data, labels, label = 'columns') => {
  return {
    labels,
    datasets: [
      {
        label: chartLabel(label),
        borderColor: colors.themeColor1,
        backgroundColor: colors.themeColor1_10,
        data,
        borderWidth: 1
      }
    ]
  }
}

const months = {
  January: 0,
  February: 0,
  March: 0,
  April: 0,
  May: 0,
  June: 0,
  July: 0,
  August: 0,
  September: 0,
  October: 0,
  November: 0,
  December: 0
}

export const mountValueByMonth = (content, property) => {
  content.filter(R.prop(property)).forEach((item) => {
    months[item.mnth] = item[property]
  })
  const labels = R.keys(months).map(getLabel)
  const data = R.values(months)
  return { labels, data }
}

export const mountPillarChart = (content) => {
  const { process_id, ...restContent } = objectDefault(content)
  const { data, labels } = mountDataLabel(restContent)
  return mountBarChart(data, labels)
}

const sortValues = ({ data, labels }) => {
  const sortItems = R.compose(
    R.reverse,
    R.sortBy(R.compose(zeroDefault, Number, R.prop('value'))),
    R.addIndex(R.map)((label, i) => ({ label, value: data[i] }))
  )

  const sortedItems = sortItems(labels)
  return {
    labels: R.map(R.prop('label'), sortedItems),
    data: R.map(R.prop('value'), sortedItems)
  }
}

export const mountIssueAffectingQuality = (content) => {
  const { process_id, ...restContent } = objectDefault(content)
  const res = sortValues(mountDataLabel(restContent))
  const { data, labels } = res
  return mountBarChart(data, labels)
}

export const mountTrendChartData = (content) => {
  const { process_id, mnth, object_id, column_id, ...restContent } = objectDefault(content)
  const { data, labels } = mountDataLabel(restContent)

  return {
    labels,
    datasets: [
      {
        label: intlMessages['label.columns'],
        borderColor: colors.themeColor1,
        backgroundColor: colors.themeColor1_10,
        data,
        borderWidth: 2
      }
    ]
  }
}

const mountAreaChart = (labels, data, label) => {
  return {
    labels,
    datasets: [
      {
        label: label && chartLabel(label),
        data,
        borderColor: colors.themeColor1,
        pointBackgroundColor: colors.foregroundColor,
        pointBorderColor: colors.themeColor1,
        pointHoverBackgroundColor: colors.themeColor1,
        pointHoverBorderColor: colors.foregroundColor,
        pointRadius: 4,
        pointBorderWidth: 2,
        pointHoverRadius: 5,
        fill: true,
        borderWidth: 2,
        backgroundColor: colors.themeColor1_10
      }
    ]
  }
}

export const mountMonthlyTrendData = (content, dataCheck) => {
  const { labels, data } = mountValueByMonth(content, dataCheck)
  return mountAreaChart(labels, data, 'dataChecks')
}

export const mountWeek = () => {
  const currentDate = moment(new Date()).local()
  const week = Array.from({ length: 7 }).map((a, i) => currentDate.clone().subtract(i, 'days'))
  const formattedWeek = {}
  week.reverse().map(date => { formattedWeek[date.format('DD-MMM')] = 0 })
  return formattedWeek
}

export const mountTrendOfRangeWeekly = (content) => {
  const formattedWeek = mountWeek()

  content.forEach(item => {
    formattedWeek[moment(item.run_date).local().format('DD-MMM')] = zeroDefault(item.threshold)
  })

  return mountAreaChart(R.keys(formattedWeek), R.values(formattedWeek))
}

export const mountPieChartData = (content) => {
  const { data, labels } = getDataAndLabel(['good_perc', 'bad_perc'], content)
  return {
    labels,
    datasets: [
      {
        label: '',
        borderColor: [colors.themeColor1, colors.themeColor2],
        backgroundColor: [
          colors.themeColor1_10,
          colors.themeColor2_10
        ],
        borderWidth: 2,
        data
      }
    ]
  }
}

export const mountLastSummary = (content) => {
  const { dte, process_id, ...restLabels } = objectDefault(content)
  return R.keys(restLabels).map(label => {
    return {
      label: chartLabel(label),
      value: zeroDefault(parseInt(restLabels[label]))
    }
  })
}

export const basicWeeklyTrendData = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [
    {
      label: '',
      borderColor: colors.themeColor1,
      pointBorderColor: colors.themeColor1,
      pointHoverBackgroundColor: colors.themeColor1,
      pointHoverBorderColor: colors.themeColor1,
      pointRadius: 2,
      pointBorderWidth: 3,
      pointHoverRadius: 2,
      fill: false,
      borderWidth: 2,
      data: [],
      datalabels: {
        align: 'end',
        anchor: 'end'
      }
    }
  ]
}

export const mountWeeklyTrendData = (content) => {
  const { dte, process_id, ...restLabels } = objectDefault(content)
  return R.keys(restLabels).map(label => {
    return {
      label: chartLabel(label),
      value: parseInt(restLabels[label])
    }
  })
}

export const mountLastRunStats = (content) => {
  const { process_id, object_id, column_id, dq_col_data_type, ...labels } = objectDefault(content)

  return R.keys(labels)
    .map(label => {
      const value = labels[label]
      return {
        label: chartLabel(label),
        value: parseInt(value) || 0,
        progress: 0
      }
    })
}

// const annotationOptions = (start, end) => ({
//   annotation: {
//     annotations: [{
//       type: 'line',
//       mode: 'horizontal',
//       scaleID: 'y-axis-0',
//       value: start,
//       endValue: end,
//       borderColor: 'rgb(75, 192, 192)',
//       borderWidth: 4,
//       label: {
//         enabled: false,
//         content: 'Test label'
//       }
//     }]
//   }
// })

const getPerfDataSet = (content, label) => {
  const data = R.map(R.compose(zeroDefault, R.prop(label)), content)
  return {
    label: '',
    data,
    borderColor: colors.themeColor1,
    pointBackgroundColor: colors.foregroundColor,
    pointBorderColor: colors.themeColor1,
    pointHoverBackgroundColor: colors.themeColor1,
    pointHoverBorderColor: colors.foregroundColor,
    pointRadius: 6,
    pointBorderWidth: 2,
    pointHoverRadius: 8,
    fill: false
  }
}

const getPerfMetricsLabels = R.map(R.compose(chartLabel, R.prop('functionalities')))
export const mountPerfMetrics = (content, firstMonth, secondMonth) => {
  const dataset = getPerfDataSet(content, 'sucessorfailure_perc')
  const lineChartData = {
    labels: getPerfMetricsLabels(content),
    datasets: [dataset]
  }
  // const startAnnotation = R.median(R.slice(0, 2, data))
  // const endAnnotation = R.median(R.slice(-2, data.length, data))

  // const complementOptions = annotationOptions(startAnnotation, endAnnotation)
  const complementOptions = {}
  return { lineChartData, complementOptions }
}
