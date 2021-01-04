import React from 'react'
import * as R from 'ramda'
import PropTypes from 'prop-types'
import { Label } from 'reactstrap'
import IntlMessages from '../../../../../../helpers/IntlMessages'

const HandleNoChartData = ({ data, children }) => {
  return !data || R.isEmpty(data)
    ? (<Label className='font-italic mt-5'><IntlMessages id='label.noChartData' /></Label>)
    : children
}

HandleNoChartData.propTypes = {
  data: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  children: PropTypes.any
}

export default HandleNoChartData
