/* eslint-disable react/prop-types */
import * as R from 'ramda'
import React, { useState } from 'react'
import { useIntl } from 'react-intl'
import { Link, useHistory } from 'react-router-dom'
import { DropdownItem, DropdownMenu, DropdownToggle, Label, UncontrolledDropdown } from 'reactstrap'
import Button from '../../../../../components/button'
import { Notification, toggle } from '../../../../../helpers/appUtils'
import AskModalDefault from '../../../data-quality/setupConnection/createConfiguration/fieldModals/AskModalDefault'
import { useViewProcesses } from './reducer'
import { useASyncActivation, useASyncDeleteProcess } from './request'

export const AskDelete = ({ onFinishDelete, toggle, open }) => {
  const { currentProcess: { processId, processName } } = useViewProcesses()
  const { messages } = useIntl()
  const [runDelete, loadingDelete] = useASyncDeleteProcess()

  return (
    <AskModalDefault
      titleLabel='label.ask-delete-process'
      onSubmit={async () => {
        const newContent = await runDelete(processId)
        onFinishDelete(newContent?.data)
        Notification.success(`"${processName}" ${messages['label.deleted']}`)
      }}
      loading={loadingDelete}
      open={open}
      toggle={toggle}
      submitLabel='delete'
    >
      <Label className='font-weight-bold'>{processName}</Label>
    </AskModalDefault>
  )
}

export const processAskTypeEvents = {
  activate: 'activate',
  deactivate: 'deactivate',
  delete: 'delete'
}

export const AskActivation = ({ onFinish, toggle, open, label }) => {
  const { currentProcess: { processId, processName } } = useViewProcesses()
  const { messages } = useIntl()
  const [runActivation, loadingActivation] = useASyncActivation(label)

  return (
    <AskModalDefault
      titleLabel={`label.ask-${label}-process`}
      onSubmit={async () => {
        const newContent = await runActivation(processId)
        onFinish && onFinish(newContent?.data)
        Notification.success(`"${processName}" ${messages[`label.success.${label}`]}`)
      }}
      loading={loadingActivation}
      open={open}
      toggle={toggle}
      submitLabel={label}
    >
      <Label className='font-weight-bold'>{processName}</Label>
    </AskModalDefault>
  )
}

export const ActivateStatusProcess = () => {
  const { currentProcess: { processId, activeFlag } } = useViewProcesses()
  const [openAskModal, setOpenAskModal] = useState()
  const { messages } = useIntl()
  const history = useHistory()

  const redirectToViewAllProcesses = () => {
    history.push('/app/data-integration/set-up-connection/view-all-processes')
  }

  return (
    <>
      <UncontrolledDropdown>
        <DropdownToggle tag='div'>
          <Button
            color='primary'
            outline
            size='sm'
          >
            {messages['label.options']}
          </Button>
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem tag={Link} to={`/app/data-integration/set-up-connection/process/${processId}`}>
            {messages['label.edit']}
          </DropdownItem>
          {R.equals('N', activeFlag) ? (
            <DropdownItem onClick={() => setOpenAskModal('activate')}>{messages['label.activate']}</DropdownItem>
          ) : (
            <DropdownItem onClick={() => setOpenAskModal('deactivate')}>
              {messages['label.deactivate']}
            </DropdownItem>)}
          <DropdownItem onClick={() => setOpenAskModal('delete')}>
            {messages['label.delete']}
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>

      <AskActivation
        open={R.equals(processAskTypeEvents.deactivate, openAskModal)}
        toggle={toggle(setOpenAskModal)}
        label={processAskTypeEvents.deactivate}
      />
      <AskActivation
        open={R.equals(processAskTypeEvents.activate, openAskModal)}
        toggle={toggle(setOpenAskModal)}
        label={processAskTypeEvents.activate}
      />
      <AskDelete
        onFinishDelete={redirectToViewAllProcesses}
        open={R.equals(processAskTypeEvents.delete, openAskModal)}
        toggle={toggle(setOpenAskModal)}
      />
    </>
  )
}
