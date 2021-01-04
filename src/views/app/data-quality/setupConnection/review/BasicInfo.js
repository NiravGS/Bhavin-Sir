import PropTypes from 'prop-types'
import React from 'react'
import { Row } from 'reactstrap'
import { ColItem } from '../../../../../components/ColItem'
import { useSwrFetchBasicInfo } from '../createConfiguration/requests'

const BasicInfo = ({ processId }) => {
  const { data } = useSwrFetchBasicInfo(processId)
  return (
    <>
      <Row className='mb-1'>
        <ColItem label='dqProcessName' content={data?.processName} />
        <ColItem label='sourceName' content={data?.sourceName} />
        <ColItem label='databaseType' content={data?.databaseType} />
      </Row>
    </>
  )
}

BasicInfo.propTypes = {
  processId: PropTypes.string
}

export default BasicInfo
