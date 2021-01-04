import '@testing-library/jest-dom/extend-expect'
import NewConnection from '..'
import { renderWithLangRouter } from '../../../../../../helpers/appTestUtils'

jest.mock('../../createConfiguration/requests', () => {
  return {
    useSwrFetchBasicInfo: jest.fn().mockReturnValue({
      processName: 'process name',
      sourceName: 'source name',
      databaseType: 'database type'
    })
  }
})

describe('NewConnection', () => {
  it('should find the form when fetch is not complete', () => {
    const { getByText } = renderWithLangRouter(NewConnection)
    expect(getByText('New Connection')).toBeInTheDocument()
  })
})
