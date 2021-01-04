import '@testing-library/jest-dom/extend-expect'
import { renderWithLang } from '../../../../../../helpers/appTestUtils'
import AskFetchModal from '../AskFetchModal'
import { fireEvent } from '@testing-library/react'

describe('AskFetchModal', () => {
  it('should find the form when fetch is not complete', () => {
    const { getByText } = renderWithLang(AskFetchModal, { open: true })
    expect(getByText('Fetch Objects?')).toBeInTheDocument()
  })

  it('should call the fetch when click on fetch', () => {
    const runFetchDbInfo = jest.fn()
    const processId = 1
    const { getByTestId } = renderWithLang(AskFetchModal,
      { open: true, processId, asyncFetchDbInfo: { runFetchDbInfo } })
    fireEvent.click(getByTestId('button-fetch'))
    expect(runFetchDbInfo).toBeCalledWith(processId)
  })

  it('should fetch button be loading while fetching', () => {
    const { getByTestId } = renderWithLang(AskFetchModal,
      { open: true, asyncFetchDbInfo: { loadingFetch: true } })
    expect(getByTestId('button-fetch')).toHaveClass('show-spinner')
  })
})
