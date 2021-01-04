import PropTypes from 'prop-types'
import * as R from 'ramda'
import React, { useState } from 'react'
import { injectIntl } from 'react-intl'
import { Col, Row } from 'reactstrap'
import ExpandedSelect from '../../../../../components/ExpandedSelect'
import { toggle } from '../../../../../helpers/appUtils'
import AskDateFormat from './fieldModals/AskDateFormat'
import { AskMatchFormat, AskRegexFormat } from './fieldModals/AskMatch'
import AskRange from './fieldModals/AskRange'
import { isChecked, getVisualValue } from './helper'
import { mountCheckBox, mountColumns } from './mountCheckbox'
import AskChangeTable from './fieldModals/AskChangeTable'
import { useConfigState, useConfigDispatch } from './ConfigProvider'
import { resetColumn } from './events'
import { hasUnsavedChanges } from './configurationSelector'
import { AskDataQuality } from './fieldModals/AskDataQuality'
import AskFilter from './fieldModals/AskFilter';
import AskCustomReqirement from './fieldModals/AskCustomReqirement';

const labelModal = ['filter', 'dateFormat', 'regexValidation', 'range', 'likeNot', 'unique', 'null', 'notNull', 'customRequirement']

const SettingFields = ({ intl }) => {
  const state = useConfigState()
  const { selectedTable, selectedColumn, contentTable, currentDataChecks, pendingTable } = state
  const dispatch = useConfigDispatch()
  const [modalOpened, setModalOpened] = useState()

  const onChangeCheckbox = (item) => {
    const checked = isChecked(item, currentDataChecks)
    const label = item?.label
    if (!checked) {
      if (labelModal.includes(label)) {
        setModalOpened(label)
      } else {
        dispatch({ type: 'changeDataCheck', payload: { ...item, value: 'Y' } })
      }
    } else {
      resetColumn(dispatch, item.column)
    }
  }

  const onChangeTable = (table) => {
    if (hasUnsavedChanges(state)) {
      dispatch({ type: 'setNextPendingTable', payload: table })
    } else {
      dispatch({ type: 'setSelectedTable', payload: table })
    }
  }

  const onChangeColumn = ({ label, value }) => {
    dispatch({ type: 'setSelectedColumn', payload: { label, value } })
  }

  const modalProps = { toggle: toggle(setModalOpened) }
  const modalOpen = R.equals(modalOpened)

  const columns = mountColumns(selectedTable.columns, state, intl?.messages)
  
  return (
    <>
      <Row className='justify-content-center'>
        <Col xs={12} md={4} lg={3}>
          <ExpandedSelect
            name='table'
            onChange={onChangeTable}
            active={selectedTable}
            data={contentTable} label='table'
          />
        </Col>
        <Col xs={12} md={4} lg={3}>
          <ExpandedSelect
            name='column'
            onChange={onChangeColumn}
            data={columns}
            active={selectedColumn}
            label='column'
          />
        </Col>
        <Col xs={12} md={4} lg={3}>
          <ExpandedSelect
            disabled={!selectedColumn}
            data={mountCheckBox(onChangeCheckbox, state?.currentDataChecks, !selectedColumn, intl)}
            label='dataCheck'
          />
        </Col>
      </Row>
      <AskDateFormat open={modalOpen('dateFormat')} {...modalProps} />
      <AskMatchFormat open={modalOpen('likeNot')} {...modalProps} />
      <AskRange open={modalOpen('range')} {...modalProps} />
      <AskRegexFormat open={modalOpen('regexValidation')} {...modalProps} />
      <AskDataQuality
        columnLabel={modalOpened}
        open={['unique', 'null', 'notNull'].includes(modalOpened)}
        {...modalProps}
      />
      <AskChangeTable open={!!pendingTable} {...modalProps} />
      <AskFilter open={modalOpen('filter')} {...modalProps} columns={columns} data={getVisualValue({label: 'filter', column: 'col_filter'}, state?.currentDataChecks, intl)} />
      <AskCustomReqirement open={modalOpen('customRequirement')} {...modalProps} />
    </>
  )
}

SettingFields.propTypes = {
  configuration: PropTypes.array,
  onChange: PropTypes.func,
  currentValues: PropTypes.object,
  intl: PropTypes.object
}

export default injectIntl(SettingFields)
