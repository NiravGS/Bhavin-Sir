/* eslint-disable react/prop-types */
import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import * as R from 'ramda'
import { ReactTable } from '../../../../../components/tableCard'
import { useProcessExecutions } from '../editProcess/request'
import { Spinner, UncontrolledTooltip, Label } from 'reactstrap'
import IntlMessages from '../../../../../helpers/IntlMessages'

const valueMapper = {
  Y: 'yes',
  N: 'no'
}

const TableItem = ({ value, className }) => {
  const textValue = R.defaultTo(value, valueMapper[value])
  return (
    <p
      style={{
        width: '100%',
        height: '100%'
      }} className={`d-flex align-items-center ${className}`}
    >{textValue}
    </p>
  )
}

const HeaderProcessName = ({ value }) => {
  return (
    <div
      style={{
        width: '100%',
        height: '100%'
      }} className='d-flex align-items-center list-item-heading btn-link'
    >{value}
    </div>
  )
}

const RunningStatus = ({ value, row: { original } }) => {
  const executions = useProcessExecutions()
  const isRunning = executions?.[original?.processId]?.isRunning
  return isRunning ? (
    <>
      <Spinner size='sm' color='primary' id='running-process' />
      <UncontrolledTooltip placement='top' target='running-process'>
        <IntlMessages id='label.running' />
      </UncontrolledTooltip>
    </>
  )
    : <Label className='mb-0'>{value ? moment(value).format('YYYY-MM-DD - HH:mm') : ''}</Label>
}

const dataTableColumns = [
  { Header: 'Process Name', accessor: 'processName', Cell: HeaderProcessName },
  { Header: 'Source Type', accessor: 'sourceType', Cell: TableItem },
  { Header: 'Source Name', accessor: 'sourceName', Cell: TableItem },
  { Header: 'Target Type', accessor: 'targetType', Cell: TableItem },
  { Header: 'Active', accessor: 'activeFlag', Cell: TableItem },
  { Header: 'Last Execution', accessor: 'lastExec', Cell: RunningStatus }
]

const ProcessTable = ({ processData, onClickRow }) => {
  return <ReactTable columns={dataTableColumns} data={processData} divided onClickRow={onClickRow} />
}

ProcessTable.propTypes = {
  processData: PropTypes.array.isRequired,
  onClickRow: PropTypes.func.isRequired
}

export default ProcessTable
