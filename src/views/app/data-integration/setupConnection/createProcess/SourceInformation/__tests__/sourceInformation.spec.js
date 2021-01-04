import { when } from 'jest-when'
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import selectEvent from 'react-select-event'
import request from '../../../../../../../helpers/Request'
import { connections } from '../mocks/connectionsMock'
import { Step, Steps, Wizard } from 'react-albus'
import { renderWithLangRouter, renderWithLangSuspense } from '../../../../../../../helpers/appTestUtils'
import SourceInformation from '../'
import { fireEvent, screen, waitFor } from '@testing-library/react'
import { Notification } from '../../../../../../../helpers/appUtils'
import { act } from 'react-dom/test-utils'

jest.mock('../../../../../../../helpers/Request')

const SourceInformationWrapper = (props) => (
  <Wizard>
    <Steps>
      <Step id='sourceInformation' name=''>
        <SourceInformation {...props} />
      </Step>
    </Steps>
  </Wizard>
)

describe('DI Source Information', () => {
  beforeEach(async () => {
    when(request.get)
      .calledWith('/data-integration/connections')
      .mockResolvedValue({ data: connections })

    await act(async () => {
      await renderWithLangSuspense(SourceInformationWrapper)
    })
  })
  it('should ask for required fields when try to submit without type and system', async () => {
    const notificationError = jest.spyOn(Notification, 'error')
    fireEvent.click(await screen.findByRole('button', { name: /Next/i }))

    await waitFor(() => {
      expect(notificationError).toBeCalledWith('Missing required fields')
    })
  })

  it('should show a link to create a new source connection', async () => {
    await waitFor(() => {
      expect(
        screen
          .getByText('Not able to find the source? Click here to add a new source')
      ).toBeInTheDocument()
    })
  })

  it('should not find message to create a new connection after select a source system', async () => {
    selectEvent.select(screen.getByLabelText('Source System *'), 'local system')
    await waitFor(() => {
      expect(
        screen
          .queryByText('Not able to find the source? Click here to add a new source')
      ).not.toBeInTheDocument()
    })
  })
})
