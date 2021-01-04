import PropTypes from 'prop-types'
import * as R from 'ramda'
import React from 'react'
import { Label, Progress } from 'reactstrap'
import IntlMessages from '../../../../../../helpers/IntlMessages'
import { useFiltersToRequest } from '../filters/events'
import { useFetchMeanMedia } from '../request'
import { mountLastRunStats } from '../selectors'

const LastRunStats = ({ processId, cardClass = 'h-100' }) => {
  const filters = useFiltersToRequest()
  const res = useFetchMeanMedia(processId, filters)

  const data = mountLastRunStats(res)
  return (
    <div style={{ minHeight: '390px' }}>
      <h5 className='pb-4'><IntlMessages id='label.lastRunStatus' /></h5>
      {!R.isEmpty(data) ? data.map(({ label, value, progress }, index) => {
        return (
          <div key={index} className='mb-3'>
            <p className='mb-2'>
              {label}
              <span className='float-right text-muted'>
                {value}
              </span>
            </p>
            <Progress value={progress} />
          </div>
        )
      }) : (
        <>
          <Label className='font-italic mt-5'><IntlMessages id='label.noChartData' /></Label>
          <p className='mb-0 text-muted text-small mb-0'>
            <IntlMessages id='label.selectTableAndColumn' />
          </p>
        </>
      )}
    </div>
  )
}

LastRunStats.propTypes = {
  processId: PropTypes.string,
  cardClass: PropTypes.string
}

export default LastRunStats
