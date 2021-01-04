import '@testing-library/jest-dom/extend-expect'
import { fireEvent } from '@testing-library/react'
import React from 'react'
import selectEvent from 'react-select-event'
import { renderWithFilterContext } from '../../../../../../helpers/appTestUtils'
import FilterFields from '../filters/FilterFields'
import { contentTable } from '../__mocks__/filterContent'
import { useFilterState, FilterProvider } from '../filters/events'

jest.mock('react-hook-form')

const ChildrenComp = () => {
  const { selectedInterval, selectedColumn, selectedTable } = useFilterState()
  return (
    <>
      <div>interval is: {selectedInterval?.value}</div>
      <div>table is: {selectedTable?.value}</div>
      <div>column is: {selectedColumn?.value}</div>
    </>
  )
}

const FilterComp = (props) => {
  return (
    <FilterProvider extraValue={{ contentTable }}>
      <FilterFields {...props} />
      <ChildrenComp />
    </FilterProvider>
  )
}

// eslint-disable-next-line react/prop-types

describe('FilterFields', () => {
  it('should find the title back', async () => {
    const { getByText } = renderWithFilterContext(FilterComp,
      { title: 'back', extraValue: { contentTable } })
    expect(getByText('Back')).toBeInTheDocument()
  })

  it('should not find monthly field when it is not monthly', async () => {
    renderWithFilterContext(FilterComp,
      { title: 'back', extraValue: { contentTable } })
    const monthlyField = document.getElementById('month-select')
    expect(monthlyField).not.toBeInTheDocument()
  })

  it('should find interval dropdown when it is not monthly', async () => {
    const { getByTestId } = renderWithFilterContext(FilterComp,
      { title: 'back', extraValue: { contentTable } })
    expect(getByTestId('interval-dropdown')).toBeInTheDocument()
  })

  it('should not find interval dropdown when dont show interval prop is true', async () => {
    const { queryByTestId } = renderWithFilterContext(FilterComp,
      { title: 'back', extraValue: { contentTable }, dontShowInterval: true })
    expect(queryByTestId('interval-dropdown')).toBeNull()
  })

  it('should find monthly field when it is monthly', async () => {
    renderWithFilterContext(FilterComp,
      { title: 'back', extraValue: { contentTable }, isMonthly: true })
    const monthlyField = document.getElementById('month-select')
    expect(monthlyField).toBeInTheDocument()
  })

  it('should pass the interval id to child component when select it', async () => {
    const { getByTestId, getByText } = renderWithFilterContext(FilterComp,
      { title: 'back', extraValue: { contentTable } })
    fireEvent.click(getByTestId('interval-1'))
    expect(getByText('interval is: 1')).toBeInTheDocument()
  })

  describe('select table', () => {
    let render
    beforeEach(async () => {
      render = renderWithFilterContext(FilterComp,
        { title: 'back', extraValue: { contentTable } })
      // data-testid is not working properly for react-select (3.1.0)
      const tableSelect = document.getElementById('table-select')
      await selectEvent.select(tableSelect, ['covid'])
    })
    it('should pass the table id to child component when select it', () => {
      expect(render.getByText('table is: 1')).toBeInTheDocument()
    })

    it('should pass the column id to child component when select it', async () => {
      const columnSelect = document.getElementById('column-select')
      await selectEvent.select(columnSelect, 'date')
      expect(render.getByText('column is: 2')).toBeInTheDocument()
    })
  })
})
