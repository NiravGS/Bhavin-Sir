import '@testing-library/jest-dom/extend-expect'
import { screen } from '@testing-library/react'
import CreateProcess from '..'
import { renderWithLangForm } from '../../../../../../helpers/appTestUtils'

// file mock src/helpers/__mocks__/Request.js
jest.mock('../../../../../../helpers/Request')
// file mock src/__mocks__/firebase/app.js
jest.mock('firebase/app')

describe('CreateProcess', () => {
  beforeEach(() => {
    renderWithLangForm(CreateProcess)
  })
  it('should find the process name field', async () => {
    const element = await screen.findByLabelText('Process Name')
    expect(element).toBeInTheDocument()
  })
})
