import PropTypes from 'prop-types'
import React from 'react'
import { injectIntl } from 'react-intl'
import { useRouteMatch } from 'react-router-dom'
import { BarChart } from '../../../../../../components/charts'
import { useFetchIssuesAffectingQuality } from '../request'
import { mountIssueAffectingQuality } from '../selectors'

const IssuesAffectingQuality = ({ column, table, monthName, intl }) => {
  const match = useRouteMatch()
  const processId = match?.params?.processId
  const data = useFetchIssuesAffectingQuality(
    processId,
    {
      objectId: table,
      columnId: column,
      monthName
    }
  )
  const chartData = mountIssueAffectingQuality(data?.[0])
  return (
    <div className='chart-container'>
      <BarChart
        shadow data={chartData} type='horizontalBar'
        yLabel={intl?.messages['label.dataIssues']}
        xLabel={intl?.messages['label.issueCount']}
      />
    </div>

  )
}

IssuesAffectingQuality.propTypes = {
  monthName: PropTypes.string,
  column: PropTypes.string,
  table: PropTypes.number,
  intl: PropTypes.object
}

export default injectIntl(IssuesAffectingQuality)
