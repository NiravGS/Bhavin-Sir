/* eslint-disable react/prop-types */
import PropTypes from 'prop-types'
import * as R from 'ramda'
import React, { useEffect, useState } from 'react'
import { useIntl } from 'react-intl'
import {
  Card, CardBody,
  Label
} from 'reactstrap'
import { toggle } from '../../../../../helpers/appUtils'
import { AskActivation, AskDelete, processAskTypeEvents } from './ProcessActionButtons'
import ProcessControlSideBar from './ProcessControlSideBar'
import ProcessTable from './ProcessTable'
import { useToggleModal, useViewProcesses } from './reducer'
import { useSwrFetchAllProcess } from './request'

const ProcessContent = ({ processNameFilter }) => {
  const { toggleModal, cleanModal } = useToggleModal()
  const { messages } = useIntl()
  const [allProcesses, mutateProcesses] = useSwrFetchAllProcess()
  const {
    currentProcess: { processId, processName }
  } = useViewProcesses()
  const [openAskModal, setOpenAskModal] = useState()

  useEffect(() => {
    return cleanModal
  }, [])

  const processFiltered = allProcesses?.filter(R.compose(
    R.contains(processNameFilter), R.prop('processName')
  ))

  const updateProcess = (newProcesses) => {
    mutateProcesses(newProcesses)
    toggleModal()
    setOpenAskModal()
  }

  return R.isEmpty(allProcesses) ? (
    <Card className='mt-4'>
      <CardBody>
        <Label className='mb-0'>
          {messages['label.noProcess']}
        </Label>
      </CardBody>
    </Card>
  )
    : (
      <>
        <ProcessTable processData={processFiltered} onClickRow={toggleModal} />

        <ProcessControlSideBar onChangeStatus={setOpenAskModal} />

        <AskDelete
          onFinishDelete={updateProcess}
          processId={processId}
          open={R.equals(processAskTypeEvents.delete, openAskModal)}
          toggle={toggle(setOpenAskModal)}
          processName={processName}
        />

        <AskActivation
          onFinish={updateProcess}
          open={R.equals(processAskTypeEvents.activate, openAskModal)}
          toggle={toggle(setOpenAskModal)}
          label={processAskTypeEvents.activate}
        />

        <AskActivation
          onFinish={updateProcess}
          open={R.equals(processAskTypeEvents.deactivate, openAskModal)}
          toggle={toggle(setOpenAskModal)}
          label={processAskTypeEvents.deactivate}
        />

      </>)
}

ProcessContent.propTypes = {
  processNameFilter: PropTypes.string
}

export default ProcessContent
