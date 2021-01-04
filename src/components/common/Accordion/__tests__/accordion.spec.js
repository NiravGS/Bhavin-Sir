import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'
import React from 'react'
import Accordion from '..'

describe('Accordion', () => {
  it('should collapse an accordion when click on its header', () => {
    const { getByTestId } = render(
      <Accordion.Group>
        <Accordion.Item title='some title'>some content</Accordion.Item>
      </Accordion.Group>
    )
    fireEvent.click(getByTestId('accordion-toggler'))
    expect(getByTestId('collapse-body')).toHaveClass('collapsing')
  })

  it('should collapse others when open another', () => {
    const { getAllByTestId } = render(
      <Accordion.Group>
        <Accordion.Item title='some title'>some content</Accordion.Item>
        <Accordion.Item title='some title x'>some content</Accordion.Item>
      </Accordion.Group>
    )
    const items = getAllByTestId('accordion-toggler')
    const collapseBodies = getAllByTestId('collapse-body')
    fireEvent.click(items[0])
    fireEvent.click(items[1])
    expect(collapseBodies[0]).toHaveClass('collapsing')
  })
})
