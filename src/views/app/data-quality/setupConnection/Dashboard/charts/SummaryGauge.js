/* eslint-disable camelcase */
import PropTypes from 'prop-types'
import React from 'react'
import ArcProgress from 'react-arc-progress'
import { useRouteMatch } from 'react-router-dom'
import { Card, CardBody, CardTitle } from 'reactstrap'
import IntlMessages from '../../../../../../helpers/IntlMessages'
import { ThemeColors } from '../../../../../../helpers/ThemeColors'
import { useFetchMeters } from '../request'
import * as R from 'ramda'
import './chartStyle.scss'

const colors = ThemeColors()

const Gauge = ({ label, value, color }) => {
  return (
    <div className='d-flex flex-column'>
      <h6 className='text-center'><IntlMessages id={`label.${label}`} /></h6>
      <ArcProgress
        className='arcProgress'
        progress={value / 100}
        text={`${parseInt(value)}%`}
        arcStart={180}
        arcEnd={360}
        thickness={22}
        lineCap='butt'
        size={150}
        fillColor={color + 'cf'}
        animation={500}
        textStyle={{ font: 'sans-serif', size: '14px' }}
      />
    </div>

  )
}

Gauge.propTypes = {
  label: PropTypes.string,
  value: PropTypes.number,
  color: PropTypes.string
}

export const SummaryGauge = () => {
  const match = useRouteMatch()
  const processId = match?.params?.processId
  const dataCheckSummary = useFetchMeters(processId)

  const { good_perc = 0, bad_perc = 0 } = R.defaultTo({}, dataCheckSummary[0])

  return (
    <Card>
      <CardBody>
        <CardTitle>
          <IntlMessages id='label.dataCompliance' />
        </CardTitle>
        <div className='d-flex flex-md-row flex-xs-column justify-content-around align-items-center'>

          <Gauge color={colors.themeColor1} label='compliant' value={Math.round(good_perc)} />
          <Gauge color={colors.themeColor2} label='nonCompliant' value={Math.round(bad_perc)} />
        </div>

      </CardBody>
    </Card>
  )
}
