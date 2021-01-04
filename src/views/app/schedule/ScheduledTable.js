/* eslint-disable camelcase */
import moment from 'moment'
import PropTypes from 'prop-types'
import * as R from 'ramda'
import React, { useState } from 'react'
import { Fade, Label, Table } from 'reactstrap'
import Button from '../../../components/button'
import IntlMessages from '../../../helpers/IntlMessages'

const ScheduledTable = ({ schedules, onDelete }) => {
  const [scheduleLoading, setscheduleLoading] = useState(false)

  const deleteItem = async (schedule) => {
    try {
      setscheduleLoading(schedule)
      await onDelete(schedule)
    } catch (error) {

    } finally {
      setscheduleLoading(false)
    }
  }
  return (
    <Table>
      <thead>
        <tr>
          <th scope='col'><IntlMessages id='label.time' /></th>
          <th scope='col'><IntlMessages id='label.interval' /></th>
          <th scope='col' className='text-center'>#</th>
        </tr>
      </thead>
      <tbody className='schedule-body-style shadow-sm'>
        {
          schedules?.map((schedule, index) => {
            return (
              <Fade tag='tr' key={`${index}_key`} in={!!schedules}>
                <td scope='row' className='align-middle'>
                  <div className='d-flex justify-content-between align-items-center flex-column'>
                    <Label className='mb-0'>
                      {moment(schedule?.sch_time).local()
                        .format('YY-MM-DD')}
                    </Label>
                    <Label className='mb-0'>
                      {moment(schedule?.sch_time).local()
                        .format('hh:mm A')}
                    </Label>
                  </div>

                </td>
                <td className='align-middle' scope='row'><Label className='mb-0'>{schedule?.sch_interval}</Label></td>
                <td scope='row' className='text-center'>
                  <Button type='button' onClick={() => deleteItem(schedule)} size='sm' outline>
                    {
                      R.equals(scheduleLoading, schedule)
                        ? (
                          <>
                            <span className='spinner-border spinner-border-sm' role='status' aria-hidden='true' />
                            <span className='sr-only'>Loading...</span>
                          </>
                        )
                        : <i className='simple-icon-trash' />
                    }

                  </Button>
                </td>
              </Fade>
            )
          })
        }

      </tbody>
    </Table>
  )
}

ScheduledTable.propTypes = {
  schedules: PropTypes.array,
  onDelete: PropTypes.func
}

export default ScheduledTable
