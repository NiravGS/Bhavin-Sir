import * as R from 'ramda'
import React from 'react'
import PropTypes from 'prop-types'
import { CardBody, CardTitle, Col, Row, Label } from 'reactstrap'
import IntlMessages from '../../../../../../helpers/IntlMessages'
import { useProcessId } from '../../createConfiguration/helper'
import ChartCard from '../ChartCard'
import { useFiltersToRequest } from '../filters/events'
import { useFetchOutsideRange } from '../request'
import { useIntl } from 'react-intl'

const OutsideRangeCard = ({ value, hasContent, label }) => {
  const intl = useIntl()
  return (
    <ChartCard>
      <CardTitle className='text-center mb-0'><IntlMessages id={`label.${label}`} /></CardTitle>
      <CardBody className='text-center'>
        {
          hasContent ? (
            <h5 className='font-bold'>{R.defaultTo(0, value)}</h5>
          )
            : (
              <Label className='mb-0 text-muted font-italic'>
                {intl.messages['label.selectAColumn']}
              </Label>
            )
        }

      </CardBody>
    </ChartCard>
  )
}

OutsideRangeCard.propTypes = {
  value: PropTypes.string,
  hasContent: PropTypes.bool,
  label: PropTypes.string
}

const OutsideRange = () => {
  const filters = useFiltersToRequest()
  const processId = useProcessId()
  const data = useFetchOutsideRange(processId, filters)
  const content = data?.[0]
  return (
    <Row>
      <Col>
        <Row>
          <Col>
            <OutsideRangeCard hasContent={!!data} value={content?.rowcount} label='rowsScanned' />
          </Col>
        </Row>

        <Row className='mt-3'>
          <Col>
            <OutsideRangeCard hasContent={!!data} value={content?.outsiderange} label='outSideRange' />
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

export default OutsideRange
