import '@testing-library/jest-dom'
import { fireEvent } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import CreateConfiguration from '..'
import { renderWithLangRouter } from '../../../../../../helpers/appTestUtils'
import { useAsyncGetConfiguration } from '../../requests'
import { mockConfig } from '../mockedConfig'
import { useAsyncCreateConfig } from '../requests'

jest.mock('../../requests')
jest.mock('../requests')

describe('createConfiguration', () => {
  describe('render', () => {
    let render
    let tableElementOne
    beforeEach(async () => {
      useAsyncCreateConfig.mockReturnValue([jest.fn(), false])
      const match = { params: { processId: 12 } }
      useAsyncGetConfiguration.mockReturnValue({ configuration: { configData: mockConfig, basicInfo: {} }, loading: false })
      render = renderWithLangRouter(CreateConfiguration, { match })
      tableElementOne = await render.findByTestId('table_0')
    })

    it('should not find column without select a table', async () => {
      expect(render.queryByTestId('column_0')).not.toBeInTheDocument()
    })

    it('should datachecks be disabled when there is no selected column', async () => {
      expect(render.queryByTestId('columnCount_checkbox')).toBeDisabled()
    })

    it('should find a column after select the table', async () => {
      fireEvent.click(tableElementOne)
      const columnOne = await render.findByTestId('column_0')
      expect(columnOne).toBeInTheDocument()
    })

    it('should datachecks be enabled when select a column', async () => {
      fireEvent.click(tableElementOne)
      const columnOne = await render.findByTestId('column_0')
      fireEvent.click(columnOne)
      expect(render.queryByTestId('columnCount_checkbox')).toBeEnabled()
    })

    describe('on finish', () => {
      beforeEach(() => {
        const finishButton = render.getByTestId('finish-button')
        fireEvent.click(finishButton)
      })
      it('should show finish popup when click on finish', () => {
        expect(render.getByText('Finish?')).toBeInTheDocument()
      })
    })

    describe('on select datachecks', () => {
      beforeEach(async () => {
        fireEvent.click(tableElementOne)
        const columnOne = await render.findByTestId('column_0')
        fireEvent.click(columnOne)
      })

      it('should save and continue button be disabled when there is no data check selected', () => {
        const buttonSaveAndContinue = render.getByTestId('bt-save-and-continue')
        expect(buttonSaveAndContinue).toBeDisabled()
      })

      describe('select a datackeck', () => {
        let buttonSaveAndContinue
        let runCreateConfig
        beforeEach(async () => {
          runCreateConfig = jest.fn()
          const creating = false
          useAsyncCreateConfig.mockReturnValue([runCreateConfig, creating])
          const nullDatacheck = await render.findByTestId('null_checkbox')
          fireEvent.click(nullDatacheck)
          const badDataOption = await render.findByLabelText('Bad Data')
          fireEvent.click(badDataOption)
          const saveGoodBadDataModalForm = await render.findByRole('button', { name: 'Save' })
          await act(async () => {
            await fireEvent.click(saveGoodBadDataModalForm)
          })
          buttonSaveAndContinue = render.getByTestId('bt-save-and-continue')
        })
        it('should save and continue button be enabled after select a datacheck', async () => {
          expect(buttonSaveAndContinue).toBeEnabled()
        })

        it('should find the column tooltip as (1) when there is only one data check selected', async () => {
          const tooltip = render.getByTestId('tooltip_object_id')
          expect(tooltip).toHaveTextContent('(1)')
        })

        it('should not find anymore the column tooltip as (1) when it is unselected', async () => {
          const nullDatacheck = await render.findByTestId('null_checkbox')
          fireEvent.click(nullDatacheck)
          const tooltip = render.queryByTestId('tooltip_object_id')
          expect(tooltip).toBeNull()
        })

        describe('on open discard changes table changes', () => {
          let tableElementTwo
          beforeEach(async () => {
            tableElementTwo = await render.findByTestId('table_1')
            fireEvent.click(tableElementTwo)
          })

          it('should show discard popup when try to change table without save', async () => {
            const popupMessage = render.getByText('Discard the changes for table: covid')
            expect(popupMessage).toBeInTheDocument()
          })

          describe('on discard changes', () => {
            beforeEach(() => {
              const discardChangesButton = render.getByTestId('button-fetch')
              fireEvent.click(discardChangesButton)
            })
            it('should next table be selected when discard changes', async () => {
              expect(tableElementTwo).toHaveClass('active')
            })

            it('should column not be selected', async () => {
              const columnOne = await render.findByTestId('column_0')
              expect(columnOne).not.toHaveClass('active')
            })

            it('should datachecks be disabled', () => {
              expect(render.queryByTestId('columnCount_checkbox')).toBeDisabled()
            })
          })
        })

        it('should call "runCreateConfig" with col_null as "Y" when it is checked', async () => {
          await act(async () => {
            await fireEvent.click(buttonSaveAndContinue)
          })
          expect(runCreateConfig).toBeCalledWith(12, {
            columns: [{
              dataChecks: {
                col_null: 'Y',
                col_null_quality: 'B',
                column_datatype: 'int',
                column_id: 2,
                column_length: null,
                column_name: 'object_id',
                column_order_position: 2,
                column_precision: 10,
                column_scale: 0,
                object_id: 1,
                process_id: 272
              },
              label: 'object_id',
              value: 2
            }],
            label: 'covid',
            value: 1
          })
        })
      })
    })
  })
})
