import { fireEvent } from '@testing-library/react'
import { renderWithLang } from '../../../../../../helpers/appTestUtils'
import { mountCheckBox } from '../mountCheckbox'

jest.mock('../helper', () => {
  return {
    isChecked: jest.fn(),
    staticDataChecks: [
      { label: 'count', column: 'Count' },
      { label: 'unique', column: 'col_unique', checkedValue: true }
    ],
    getVisualValue: jest.fn()
  }
})

describe('mountCheckbox', () => {
  it('should get the right length as return from mount checkbox', () => {
    const onChange = jest.fn()
    const checkboxItem = mountCheckBox(onChange)
    expect(checkboxItem.length).toBe(2)
  })

  it('should call on change with the right object', () => {
    const onChange = jest.fn()
    const checkboxItem = mountCheckBox(onChange)
    const { getByTestId } = renderWithLang(() => checkboxItem[0].element)
    fireEvent.click(getByTestId('count_checkbox'))
    expect(onChange).toBeCalledWith({ label: 'count', column: 'Count' })
  })
})
