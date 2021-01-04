import '@testing-library/jest-dom/extend-expect'
import { fireEvent } from '@testing-library/react'
import { renderWithLang } from '../../../../../../helpers/appTestUtils'
import TimeDropdown from '../ChartDropdown'

jest.mock('react-hook-form')

describe('TimeDropdown', () => {
  it('should call change method with the clicked object', () => {
    const data = [{ label: '60Days', value: 60 }, { label: 'weekly', value: 7 }]
    const onChangeInterval = jest.fn()
    const { getByText } = renderWithLang(TimeDropdown, { data, selected: data[0], onChangeInterval })
    fireEvent.click(getByText('Weekly'))
    expect(onChangeInterval).toBeCalledWith({ label: 'weekly', value: 7 })
  })
})
