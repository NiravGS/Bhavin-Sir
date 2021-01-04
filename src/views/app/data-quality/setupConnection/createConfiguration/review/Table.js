/* eslint-disable react/prop-types */
/* eslint-disable camelcase */
import React, { useState } from 'react'
import * as R from 'ramda'
import { Label, Row, Col } from 'reactstrap'
import { ReactTable } from '../../../../../../components/tableCard'
import { useAsyncGetConfiguration } from '../../requests'
import { getTableChangesToReview, tableSelector } from '../configurationSelector'
import { useProcessId } from '../helper'
import IntlMessages from '../../../../../../helpers/IntlMessages'
import { useIntl } from 'react-intl'

export const TableItem = ({ value }) => {
  return <Label className='mb-0'>{value}</Label>
}

const dataTableColumns = [
  {
    Header: 'S.No',
    filterable: false,
    width: 40,
    Cell: ({ row }) => {
      return (
        <span
          style={{
            height: '100%'
          }} className='text-muted d-flex align-items-center'
        >
          {row.index + 1}
        </span>
      )
    }
  },
  {
    Header: 'Table',
    accessor: 'tableName',
    Cell: TableItem
  },
  {
    Header: 'Column',
    accessor: 'columnName',
    Cell: TableItem
  },
  {
    Header: 'Data check',
    accessor: 'dataCheckColumn',
    Cell: TableItem
  },
  {
    Header: 'Value',
    accessor: 'dataCheckValue',
    Cell: TableItem
  }

]

const ReviewTable = () => {
  const processId = useProcessId()
  const { configuration } = useAsyncGetConfiguration(processId)
  const contentTable = tableSelector(configuration?.configData)
  const data = getTableChangesToReview(contentTable)
  const [searchTableText, setSeachTableText] = useState('')
  const { messages } = useIntl()

  if (!data) return null

  const dataFilteredByTable = data?.filter(R.compose(
    R.contains(searchTableText), R.prop('tableName')
  ))

  return (
    <>
      <Row>
        <Col>
          <h6 className='font-weight-bold'><IntlMessages id='label.details' /></h6>
        </Col>
      </Row>
      <Row>
        <Col xs='auto'>
          <div className='search-sm d-inline-block float-md-left mr-1 mb-1 align-top'>
            <input
              type='text'
              name='keyword'
              id='search'
              placeholder={messages['menu.search-table']}
              onChange={(e) => setSeachTableText(e.target.value)}
            />
          </div>
        </Col>
      </Row>
      <Row className='mt-2'>
        <Col>
          <ReactTable
            data={dataFilteredByTable}
            columns={dataTableColumns}
            defaultPageSize={data.length < 10 ? 5 : 10}
            filterable
            showPageJump
            showPageSizeOptions
            striped
            staticContent
          />
        </Col>
      </Row>
    </>

  )
}

export default ReviewTable
