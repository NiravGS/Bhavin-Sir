import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useIntl } from 'react-intl'
import { Col, Row } from 'reactstrap'
import Input from '../../../../../components/Input/Input'
import { useConnectFormWithRedux } from '../../../../../helpers/useConnectFormRedux'
import { useSelectorProcessBasicInfo } from '../processEvents'

const ProcessName = () => {
  const { messages } = useIntl()
  const processNamesForm = useForm()
  const basicInfo = useSelectorProcessBasicInfo()

  useConnectFormWithRedux('setProcessBasicInfo', processNamesForm, basicInfo)

  return (
    <FormProvider {...processNamesForm}>
      <Row className='d-flex justify-content-center'>
        <Col sm={12} md={3}>
          <Input
            name='processName'
            innerRef={processNamesForm.register({ required: messages['formError.processReq'] })}
            label='label.processName'
          />
        </Col>
        <Col sm={12} md={5}>
          <Input name='processDescription' label='label.processDescription' />
        </Col>
      </Row>
    </FormProvider>
  )
}

ProcessName.propTypes = {}

export default ProcessName
