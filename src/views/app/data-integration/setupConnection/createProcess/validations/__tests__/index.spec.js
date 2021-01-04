import { validateTarget, validateSchedule, validateProcessName } from '..'
describe('create process validations', () => {
  describe('validateTarget', () => {
    it('should fail when there is no target content', () => {
      expect(validateTarget(undefined, 1)()).toBe(false)
    })

    describe('with target content', () => {
      const unfilledTargetContent = {
        anotherField: '',
        targetTableOne: { targetTable: null },
        targetTableTwo: { targetTable: undefined }
      }
      it('should fail when there is no target table selected for a target content', () => {
        expect(validateTarget(unfilledTargetContent, 1)()).toBe(false)
      })
      it('should fail when the size of the target content is different than the source content', () => {
        expect(validateTarget(unfilledTargetContent, 2)()).toBe(false)
      })
    })
  })

  describe('validateSchedule', () => {
    it('should return false when some schedule already exists', () => {
      const schedules = [{ some: 1, sch_interval: 'daily' }]
      expect(validateSchedule(schedules, { some: 1, sch_interval: 'daily' })).toBe(false)
    })
    it('should return false when there is no interval in schedule', () => {
      const schedules = [{ some: 1 }]
      expect(validateSchedule(schedules, { some: 1 })).toBe(false)
    })
    it('should return true when there is interval in schedule and it does not exists in list', () => {
      const schedules = [{ some: 1, src_interval: 'monthly' }]
      expect(validateSchedule(schedules, { some: 2, sch_interval: 'daily' })).toBe(true)
    })
  })

  describe('validateProcessName', () => {
    it('should return true when process name is not empty', () => {
      expect(validateProcessName('some')).toBe(true)
    })
    it('should return false when process name is empty', () => {
      expect(validateProcessName('')).toBe(false)
    })
  })
})
