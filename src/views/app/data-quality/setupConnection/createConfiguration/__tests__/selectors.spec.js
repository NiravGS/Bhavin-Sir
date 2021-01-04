import * as selector from '../configurationSelector'

const { currentContentTableDiff } = selector

describe('currentContentTableDiff', () => {
  it('should get null when there is no current content table', () => {
    expect(currentContentTableDiff({ contentTable: undefined })).toBeNull()
  })
  it('should get empty columns to save when there are no changes', () => {
    const dataChecks = { some: 'N', another: 'Y', col_s: null }
    const state = {
      selectedTable: { value: 1 },
      contentTableInitial: [{ columns: [{ dataChecks }] }],
      contentTable: [{ value: 1, columns: [{ dataChecks }] }]
    }
    expect(currentContentTableDiff(state)).toHaveProperty('columns', [])
  })

  it('should get empty array column to save when there are no changes', () => {
    const dataChecks = { some: 'N', another: 'Y', col_s: null }
    const dataChecksDifferent = { some: 'N', another: 'Y', col_s: 'diff_here' }

    const state = {
      selectedTable: { value: 1 },
      contentTableInitial: [{ columns: [{ dataChecks }] }],
      contentTable: [{ value: 1, columns: [{ dataChecks: dataChecksDifferent }] }]
    }
    expect(currentContentTableDiff(state)).toHaveProperty(['columns', 0, 'dataChecks'],
      {
        another: 'Y',
        col_s: 'diff_here',
        some: 'N'
      })
  })
})
