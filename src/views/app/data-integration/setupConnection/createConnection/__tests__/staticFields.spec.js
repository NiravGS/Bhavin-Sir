const { ingestionTypeOptions, getLabelByOption } = require('../../../../staticFields')

jest.mock('../../../../../../IntlProvider', () => {
  return {
    getIntl: () => ({ messages: require('../../../../../../lang/locales/en_US') })
  }
})

describe('staticFields', () => {
  describe('getLabelByOption', () => {
    it('should get label by the option value from ingestion type options', () => {
      expect(getLabelByOption(ingestionTypeOptions, 'F')).toBe('Full Refresh')
    })
  })
})
