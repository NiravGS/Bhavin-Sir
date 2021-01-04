/* eslint-disable react/prop-types */
import classnames from 'classnames'
import React, { useState, useEffect } from 'react'
import { usePagination, useSortBy, useTable } from 'react-table'
import * as R from 'ramda'
import DatatablePagination from '../../components/DatatablePagination'
import { toggle } from '../../helpers/appUtils'
import { useIntl } from 'react-intl'
import { Label } from 'reactstrap'
import { motion, AnimatePresence } from 'framer-motion'

const usePrevValue = (value) => {
  const [prev, setPrev] = useState(value)
  useEffect(() => {
    return () => {
      setPrev(value)
    }
  }, [value])
  return prev
}

export const TableItem = ({ value }) => {
  return <Label className='mb-0'>{value}</Label>
}

// refactor replace filters by this component
// eslint-disable-next-line react/prop-types
export const SearchInput = ({ placeholder, onChangeInput }) => {
  const { messages } = useIntl()
  return (
    <div className='search-sm d-inline-block float-md-left mr-1 mb-1 align-top'>
      <input
        type='text'
        name='keyword'
        id='search'
        placeholder={messages[placeholder ?? 'label.search']}
        onChange={(e) => onChangeInput(e.target.value)}
      />
    </div>
  )
}

export const useFilterTable = (data, filterColumn) => {
  const [searchTableText, setSeachTableText] = useState('')

  const dataFiltered = searchTableText ? data?.filter(R.compose(
    R.contains(R.toLower(searchTableText)), R.toLower, R.path(filterColumn)
  ))
    : data

  return { dataFiltered, setSeachTableText }
}

export function ReactTable ({
  columns, data, divided = false, striped = false,
  defaultPageSize = 6, onClickRow, staticContent, ...rest
}) {
  const [content, setContent] = React.useState(data)
  const prevData = usePrevValue(content)
  const [mouseEnter, setMouseEnter] = useState(false)

  const skipPageResetRef = React.useRef()

  React.useEffect(() => {
    skipPageResetRef.current = false
  })

  // todo refactor this
  useEffect(() => {
    setContent(data)
  }, [data])

  const {
    getTableProps,
    getTableBodyProps,
    prepareRow,
    headerGroups,
    page,
    canPreviousPage,
    canNextPage,
    pageCount,
    gotoPage,
    setPageSize,
    state: { pageIndex, pageSize }
  } = useTable(
    {
      columns: React.useMemo(() => columns, []),
      data: React.useMemo(() => {
        // todo refactor this?? it works
        if (staticContent) {
          return data
        } else {
          skipPageResetRef.current = true
          setContent(data)
          return content
        }
      }, [!R.equals(content, prevData)]),
      initialState: { pageSize: defaultPageSize },
      autoResetPage: !skipPageResetRef.current,
      autoResetExpanded: !skipPageResetRef.current,
      autoResetGroupBy: !skipPageResetRef.current,
      autoResetSelectedRows: !skipPageResetRef.current,
      autoResetSortBy: !skipPageResetRef.current,
      autoResetFilters: !skipPageResetRef.current,
      autoResetRowState: !skipPageResetRef.current
    },
    useSortBy,
    usePagination
  )

  return (
    <>
      <table
        {...getTableProps()}
        className={`r-table table ${classnames({ 'table-divided': divided, 'table-striped': striped })}`}
      >
        <thead>
          {headerGroups.map((headerGroup, index) => (
            <tr
              {...headerGroup.getHeaderGroupProps()} key={`keyTable_${index}`}
            >
              {headerGroup.headers.map((column, columnIndex) => (
                <th
                  key={`th_${columnIndex}`}
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className={
                    column.isSorted
                      ? column.isSortedDesc
                        ? 'sorted-desc'
                        : 'sorted-asc'
                      : ''
                  }
                >
                  {column.render('Header')}
                  <span />
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody {...getTableBodyProps()}>
          <AnimatePresence>
            {page.map((row, index) => {
              prepareRow(row)
              return (
                <motion.tr
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  {...row.getRowProps({
                    onClick: () => {
                      onClickRow && onClickRow(row.original)
                    }
                  })}
                  onMouseEnter={() => onClickRow && setMouseEnter(index)}
                  onMouseLeave={() => onClickRow && toggle(setMouseEnter)()}

                  style={{ cursor: onClickRow ? 'pointer' : 'auto' }}
                  className={classnames({ shadow: mouseEnter === index })}
                  key={`key_table_${JSON.stringify(row.original)}`}
                >
                  {row.cells.map((cell, cellIndex) => (
                    <td
                      key={`td_${cellIndex}`}
                      {...cell.getCellProps({
                        className: cell.column.cellClass
                      })}
                    >
                      {cell.render('Cell')}
                    </td>
                  ))}
                </motion.tr>
              )
            })}
          </AnimatePresence>
        </tbody>
      </table>

      <DatatablePagination
        page={pageIndex}
        pages={pageCount}
        canPrevious={canPreviousPage}
        canNext={canNextPage}
        pageSizeOptions={[4, 10, 20, 30, 40, 50]}
        showPageSizeOptions={false}
        showPageJump={false}
        defaultPageSize={pageSize}
        onPageChange={(p) => gotoPage(p)}
        onPageSizeChange={(s) => setPageSize(s)}
        paginationMaxSize={pageCount}
        {...rest}
      />
    </>
  )
}
