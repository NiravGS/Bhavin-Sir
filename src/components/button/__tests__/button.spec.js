import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Button from '..'

describe('Button', () => {
  it('should have loading class when button is loading', () => {
    const { getByTestId } = render(<Button loading>OK</Button>)
    expect(getByTestId('custom-button')).toHaveClass('btn-multiple-state')
    expect(getByTestId('custom-button')).toHaveClass('show-spinner')
  })

  it('should not have loading class when button is not loading', () => {
    const { getByTestId } = render(<Button>OK</Button>)
    expect(getByTestId('custom-button')).not.toHaveClass('btn-multiple-state')
    expect(getByTestId('custom-button')).not.toHaveClass('show-spinner')
  })

  it('should be disabled when loading', () => {
    const { getByTestId } = render(<Button loading>OK</Button>)
    expect(getByTestId('custom-button')).toBeDisabled()
  })
})
