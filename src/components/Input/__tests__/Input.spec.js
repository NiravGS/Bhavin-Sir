import '@testing-library/jest-dom/extend-expect'
import { useFormContext } from 'react-hook-form'
import { renderWithLang } from '../../../helpers/appTestUtils'
import Input from '../Input'

jest.mock('react-hook-form')

describe('Custom Input', () => {
  it('should not find error message', () => {
    const { queryByTestId } = renderWithLang(Input, { label: 'label.password' })
    expect(queryByTestId('err-message')).toBeNull()
  })

  it('should find error message when there is a error', () => {
    const message = 'error message text'
    useFormContext.mockReturnValue({ errors: { field1: { message } } })
    const { getByTestId } = renderWithLang(
      Input,
      { label: 'label.password', name: 'field1' }
    )
    expect(getByTestId('err-message')).toBeInTheDocument()
  })
})
