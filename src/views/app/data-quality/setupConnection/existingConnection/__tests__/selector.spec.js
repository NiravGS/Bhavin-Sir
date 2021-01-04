import { processNameSelector } from '../selector'

describe('processNameSelector', () => {
  it('should find all the process sames related to the db type and source name', () => {
    const data = [
      {
        id: 272,
        sourceMasters: [{ databaseType: 'mysql', sourceName: 'sourceName one', processName: 'some process', process_id: 272 },
          { databaseType: 'postgres', sourceName: 'sourceName two', processName: 'some process two', process_id: 1 }]
      }

    ]
    expect(processNameSelector(data, 272)).toEqual([
      { label: 'some process', value: '272' },
      { label: 'some process two', value: '1' }
    ])
  })
})
