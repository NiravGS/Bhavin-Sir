import PropTypes from 'prop-types'
import moment from 'moment'
import React from 'react'
import ReactDatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { Controller } from 'react-hook-form'
import { useIntl } from 'react-intl'
import Select from 'react-select'
import {
  Card, CardBody,
  Col,
  FormGroup, Label,

  Row
} from 'reactstrap'
import IntlMessages from '../../../helpers/IntlMessages'

const ScheduleForm = ({ control }) => {
  const intlMessages = useIntl()?.messages
  return (
    <Row>
      <Col>
        <Row>
          <Col>
            <h6><IntlMessages id='label.choseScheduleDate' /></h6>
          </Col>
        </Row>
        <Row className='mt-3'>
          <Col>
            <Card className='h-100'>
              <CardBody>
                <Controller
                  name='sch_time'
                  control={control}
                  defaultValue={new Date(moment('12:00', 'hh:mm'))}
                  render={({ onChange, onBlur, value }) => {
                    return (
                      <ReactDatePicker
                        valueName='selected'
                        className='mb-5'
                        calendarClassName='embedded with-time'
                        inline
                        showTimeSelect
                        timeFormat='hh:mm aa'
                        timeIntervals={30}
                        dateFormat='LLL'
                        timeCaption='Time'
                        onChange={onChange}
                        onBlur={onBlur}
                        selected={value}
                      />)
                  }}
                />

              </CardBody>
            </Card>
          </Col>

        </Row>
        <Row className='mt-2'>
          <Col>
            <FormGroup>
              <Label>
                <IntlMessages id='label.interval' />
              </Label>
              <Controller
                as={Select}
                options={[
                  { label: intlMessages?.['label.oneTime'], value: 'one time' },
                  { label: intlMessages?.['label.daily'], value: 'daily' },
                  { label: intlMessages?.['label.weekly'], value: 'weekly' },
                  { label: intlMessages?.['label.monthly'], value: 'monthly' }
                ]}
                defaultValue={{ label: intlMessages?.['label.daily'], value: 'daily' }}
                control={control}
                classNamePrefix='react-select'
                className='react-select'
                name='sch_interval'
              />
            </FormGroup>
          </Col>
        </Row>
      </Col>
    </Row>)
}

ScheduleForm.propTypes = {
  control: PropTypes.object
}

export default ScheduleForm
