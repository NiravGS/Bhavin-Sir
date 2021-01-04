import * as R from 'ramda'
import React from 'react'
import { useFormContext } from 'react-hook-form'
import Select from '../../../../../components/Input/Select'
import { useFormWithQueryParam } from '../../../../../helpers/useFormWithQueryParam'
import SelectDataBaseField from '../SelectDataBaseField'
import { useFetchUserProcesses } from './requests'
import { processNameSelector, selectDatabase, selectSourceNames } from './selector'

export const useExistingConnectionData = (localForm) => {
  const formInstance = useFormContext()
  useFormWithQueryParam(R.or(localForm, formInstance), { connectionId: Number })
  const connections = useFetchUserProcesses()
  const databaseContentList = selectDatabase(connections)

  return { formInstance, connections, databaseContentList }
}

const ExistingFormRefreshed = () => {
  const { formInstance, connections, databaseContentList } = useExistingConnectionData()

  const { watch, setValue } = formInstance
  const type = watch('type')
  const connectionId = watch('connectionId')

  const processNameList = processNameSelector(connections, connectionId)
  return (
    <>
      <SelectDataBaseField
        onChange={() => setValue('connectionId', null)}
        content={databaseContentList}
      />
      <Select
        label='label.database-source-name'
        id='database-source-name'
        onChange={() => setValue('processName', null)}
        options={selectSourceNames(connections, type)}
        name='connectionId'
      />
      <Select
        label='label.process-name'
        id='database-process-name'
        options={processNameList}
        name='processName'
      />
    </>
  )
}

export default ExistingFormRefreshed
