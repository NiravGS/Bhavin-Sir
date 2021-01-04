/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import { useIntl } from 'react-intl'
import { Col, Row, Spinner } from 'reactstrap'
import LayoutBase from '../../../../components/LayoutContainer'
import { ReactTable, SearchInput, TableItem, useFilterTable } from '../../../../components/tableCard'
import { toggle } from '../../../../helpers/appUtils'
import { axiosGetSwr, useAsync, useFetchSWR } from '../../../../helpers/requestHelpers'
import AskModalDefault from '../setupConnection/createConfiguration/fieldModals/AskModalDefault'

const useConnections = () => {
  return useFetchSWR('/user/connections')
}

const useAsyncDeleteConnection = (connectionId) =>
  useAsync(() => axiosGetSwr(`/user/connections/delete/${connectionId}`))

const DeleteButton = ({ row: { original }, updateList }) => {
  const [askDelete, setAskDelete] = useState(false)
  const { messages } = useIntl()
  const [runDelete, loadingDelete] = useAsyncDeleteConnection(original.id)
  if (loadingDelete) {
    return (
      <Spinner color='primary' />
    )
  }
  return (
    <>
      <i
        onClick={() => {
          setAskDelete(true)
        }}
        className='simple-icon-trash btn-link text-decoration-none'
        title={messages['label.delete']}
        style={{ fontSize: '20px', cursor: 'pointer' }}
      />
      <AskModalDefault
        open={askDelete}
        loading={loadingDelete}
        toggle={toggle(setAskDelete)}
        titleLabel='label.deleteAllConnProcess'
        onSubmit={async () => {
          await runDelete()
          setAskDelete(false)
          updateList()
        }}
        submitLabel='delete'
      >{messages['label.warningDeleteProcesses']}
      </AskModalDefault>
    </>
  )
}

const connectionColumns = mutate => [
  { Header: 'Connection', accessor: 'sourceName', Cell: TableItem },
  { Header: 'Database Type', accessor: 'type', Cell: TableItem },
  { Header: 'Action', Cell: (props) => <DeleteButton {...props} updateList={mutate} /> }
]

const Connections = () => {
  const { data, mutate } = useConnections()
  const { dataFiltered, setSeachTableText } = useFilterTable(data, ['connectionName'])

  return (
    <LayoutBase withoutCard label='connections'>
      <Row>
        <Col xs='auto' className='mt-2'>
          <SearchInput placeholder='label.name' onChangeInput={setSeachTableText} />
        </Col>
      </Row>
      <Row className='mt-2'>
        <Col>
          <ReactTable
            data={dataFiltered}
            columns={connectionColumns(mutate)}
            defaultPageSize={data.length < 10 ? 5 : 10}
            filterable
            showPageJump
            showPageSizeOptions
            divided
          />
        </Col>
      </Row>
    </LayoutBase>
  )
}

Connections.propTypes = {}

export default Connections
