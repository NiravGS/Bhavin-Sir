import '@testing-library/jest-dom/extend-expect'
import { fireEvent } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import { renderWithLangForm } from '../../../../../../helpers/appTestUtils'
import { Notification } from '../../../../../../helpers/appUtils'
import request from '../../../../../../helpers/Request'
// import { useFormContext } from 'react-hook-form'
import { useAsyncValidateProcessName } from '../../requests'
import SelectNewDatabase from '../SelectNewDatabase'

jest.mock('../../../../../../helpers/appUtils')

jest.mock('../../../../../../helpers/Request', () => {
  return {
    post: jest.fn(),
    get: jest.fn()
  }
})

// jest.mock('../../requests', () => {
//   return {
//     useAsyncValidateProcessName: jest.fn().mockReturnValue([jest.fn()])
//   }
// })

describe('SelectNewDatabase', () => {
  it('should show connection fields when click on ok', async () => {
    request.post.mockResolvedValue({})
    const showConnectionFields = jest.fn()
    const { getByText } = renderWithLangForm(SelectNewDatabase, { showConnectionFields })
    await act(async () => {
      await fireEvent.click(getByText('Ok'))
    })
    expect(showConnectionFields).toBeCalled()
  })

  describe('when there is ui field validation errors', () => {
    const showConnectionFields = jest.fn()
    beforeEach(async () => {
      request.post.mockResolvedValue({
        data: {
          error: { name: 'conn_name_already_exists' }
        }
      })

      const { getByText } = renderWithLangForm(SelectNewDatabase, { showConnectionFields })
      await act(async () => {
        await fireEvent.click(getByText('Ok'))
      })
    })
    it('should show error message "already_exist"', async () => {
      expect(Notification.error).toBeCalledWith('already exists with that name')
    })

    it('should not call showConnectionFields', async () => {
      expect(showConnectionFields).not.toBeCalled()
    })
  })
})
