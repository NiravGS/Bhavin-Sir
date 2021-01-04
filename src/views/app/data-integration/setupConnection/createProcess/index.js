import React, { useEffect } from 'react'
import { connect, useDispatch } from 'react-redux'
import CreateProcessContent from './CreateProcessContent'
import { useCreateProcess } from './requests'
import LayoutBase from '../../../../../components/LayoutContainer'
import { DelayComponent } from '../../../../../helpers/appUtils'

const CreateProcess = () => {
  const { createProcess, loadingCreateProcess } = useCreateProcess()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch({ type: 'cleanProcessContent' })
  }, [])

  return (
    <LayoutBase label='create-process'>
      <CreateProcessContent
        loadingSubmit={loadingCreateProcess}
        actionButtonLabel='label.create'
        onSubmit={createProcess}
      />

    </LayoutBase>
  )
}

const DelayedCreateProcess = () => {
  return (
    <DelayComponent>
      <CreateProcess />
    </DelayComponent>)
}

export default connect()(DelayedCreateProcess)
