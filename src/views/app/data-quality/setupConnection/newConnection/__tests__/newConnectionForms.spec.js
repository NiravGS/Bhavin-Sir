import '@testing-library/jest-dom/extend-expect'
import { fireEvent, screen, waitFor } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import selectEvent from 'react-select-event'
import { renderWithLangForm, renderWithLangRouter } from '../../../../../../helpers/appTestUtils'
import NewConnectionForms from '../NewConnectionForms'

jest.mock('../../../../../../helpers/Request')

describe('NewConnectionForms', () => {
  it('should find the new connection label', () => {
    const { getByText } = renderWithLangRouter(NewConnectionForms)
    expect(getByText('New Connection')).toBeInTheDocument()
  })

  it('should not find the form after select database and click on ok due the validations', async () => {
    const { getByText, queryByTestId } = renderWithLangRouter(NewConnectionForms)
    await act(async () => {
      await fireEvent.click(getByText('Ok'))
    })
    expect(queryByTestId('db-connection-form')).toBeNull()
  })

  describe('With connection form', () => {
    let renders
    let runSaveConnection
    beforeEach(() => {
      runSaveConnection = jest.fn().mockResolvedValue({})
      renders = renderWithLangForm(NewConnectionForms, { runSaveConnection })
      const { getByText, getByLabelText } = renders
      selectEvent.select(screen.getByLabelText('Database Type'), ['Mysql'])
      fireEvent.input(getByLabelText('Source Name'), { target: { value: 'some source' } })
      fireEvent.click(getByText('Ok'))
    })

    it('should find the form after fill source and process name', async () => {
      expect(await renders.findByTestId('db-connection-form')).toBeInTheDocument()
    })

    it.only('should call api request to save when click ok after fill the form', async () => {
      const { getByText, getByLabelText, findByLabelText } = renders
      fireEvent.input(await findByLabelText('Host'), { target: { value: 'val host' } })
      fireEvent.input(getByLabelText('Password'), { target: { value: 'val pass' } })
      fireEvent.input(getByLabelText('User'), { target: { value: 'val user' } })
      fireEvent.input(getByLabelText('Port'), { target: { value: 1234 } })
      await act(async () => {
        await fireEvent.click(getByText('Save'))
      })

      await waitFor(() => {
        expect(runSaveConnection).toBeCalledWith({
          additionalInfo: '',
          database: '',
          host: 'val host',
          type: 'mysql',
          password: 'val pass',
          port: '1234',
          sourceName: 'some source',
          username: 'val user'
        })
      })
    })
  })
})
