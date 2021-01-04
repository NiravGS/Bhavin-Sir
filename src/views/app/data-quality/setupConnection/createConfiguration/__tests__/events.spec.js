import { getCurrentDatachecks, getCurrentTableColumnIndex, tableSelector } from '../configurationSelector'
import { configReducer } from '../events'

jest.mock('../configurationSelector')

describe('events', () => {
  describe('configReducer', () => {
    const currentState = { state: { data: {} } }
    it('should setConfiguration set the initial state from configuration', () => {
      tableSelector.mockReturnValue({ table: 1 })
      const action = { type: 'setConfiguration', payload: { config: 'some', configData: 'data' } }
      const res = configReducer(currentState, action)
      expect(res).toEqual({
        ...currentState,
        contentTableInitial: { table: 1 },
        configuration: 'data',
        contentTable: { table: 1 },
        basicInfo: undefined,
        staticContentTableInitial: { table: 1 }
      })
    })

    it('should discard changes set the initial content on the content table current', () => {
      const action = { type: 'discardChanges' }
      const contentTable = [{ content: 'table changed' }]
      getCurrentTableColumnIndex.mockReturnValue([0])
      const initialState = {
        contentTableInitial: [{ content: 'table' }], otherData: 2, contentTable
      }
      const res = configReducer(initialState, action)
      expect(res).toHaveProperty('contentTable', [{ content: 'table' }])
    })

    describe('setSelectedTable', () => {
      let res
      beforeAll(() => {
        const action = { type: 'setSelectedTable', payload: { config: 'sometable' } }
        res = configReducer(currentState, action)
      })
      it('should reset the selected column', () => {
        expect(res).toHaveProperty('selectedColumn', undefined)
      })

      it('should reset current data checks as empty object', () => {
        expect(res).toHaveProperty('currentDataChecks', {})
      })
      it('should setSelectedTable set the selected table state', () => {
        expect(res).toHaveProperty('selectedTable', { config: 'sometable' })
      })
    })

    describe('selectNextTable', () => {
      let res
      const initialState = {
        contentTable: [{}, { some: 'some next' }]
      }
      beforeAll(() => {
        getCurrentTableColumnIndex.mockReturnValue([0])
        const action = { type: 'selectNextTable' }
        res = configReducer(initialState, action)
      })
      it('should reset the selected column', () => {
        expect(res).toHaveProperty('selectedColumn', undefined)
      })

      it('should reset current data checks as empty object', () => {
        expect(res).toHaveProperty('currentDataChecks', {})
      })
      it('should setSelectedTable set the next table state', () => {
        expect(res).toHaveProperty('selectedTable', { some: 'some next' })
      })

      it('should not set next table when there is no next one', () => {
        const lastIndex = 1
        getCurrentTableColumnIndex.mockReturnValue([lastIndex])
        const action = { type: 'selectNextTable' }
        res = configReducer(initialState, action)
        expect(res).toEqual(initialState, res)
      })
    })

    describe('setSelectedColumn', () => {
      let res
      beforeAll(() => {
        const initialState = { selectedTable: { value: 2 }, otherValue: 1 }
        getCurrentTableColumnIndex.mockReturnValue([0])
        getCurrentDatachecks.mockReturnValue({ currentChecks: {} })
        const action = { type: 'setSelectedColumn', payload: { value: 3 } }
        res = configReducer(initialState, action)
      })
      it('should "getCurrentDatachecks" be called with the right parameters', () => {
        expect(getCurrentDatachecks).toBeCalledWith({ otherValue: 1, selectedTable: { value: 2 } }, 2, 3)
      })

      it('should get the correct selected column when change it', () => {
        expect(res).toHaveProperty('selectedColumn', { value: 3 })
      })

      it('should get the current data checks as return', () => {
        expect(res).toHaveProperty('currentDataChecks', { currentChecks: {} })
      })
    })

    describe('changeDataCheck', () => {
      let res
      beforeAll(() => {
        const dataChecks = { dataOne: null, dataTwo: 'Y' }
        const initialState = {
          contentTable: [{
            value: 2, columns: [{}, { dataChecks }]
          }],
          otherValue: 1
        }
        getCurrentTableColumnIndex.mockReturnValue([0, 1])
        getCurrentDatachecks.mockReturnValue({ currentChecks: {} })
        const action = {
          type: 'changeDataCheck',
          payload: {
            column: 'dataTwo',
            value: 'N'
          }
        }
        res = configReducer(initialState, action)
      })

      it('should content table be updated with the new datacheck value for dataTwo', () => {
        expect(res).toHaveProperty(['contentTable', 0, 'columns', 1, 'dataChecks', 'dataTwo'], 'N')
      })

      it('should contentTable get the right structure', () => {
        expect(res).toHaveProperty('contentTable', [{
          columns:
              [{}, {
                dataChecks:
                  { dataOne: null, dataTwo: 'N' }
              }],
          value: 2
        }])
      })

      it('should extract the current datachecks', () => {
        expect(res).toHaveProperty('currentDataChecks', { dataOne: null, dataTwo: 'N' })
      })
    })
  })
})
