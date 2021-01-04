
import { tablesFieldSelector } from '../selector'

describe('selectors', () => {
  it('tablesFieldSelector', () => {
    expect(tablesFieldSelector([{ tableName: 'some table' }])).toEqual([
      { label: 'some table', value: 'some table' }
    ])
  })
})
