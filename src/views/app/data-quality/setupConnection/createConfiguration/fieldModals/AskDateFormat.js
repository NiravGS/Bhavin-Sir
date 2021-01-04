import PropTypes from 'prop-types'
import React from 'react'
import 'react-datepicker/dist/react-datepicker.css'
import { useForm } from 'react-hook-form'
import { injectIntl } from 'react-intl'
import { Col, Container, Form, Modal, Row } from 'reactstrap'
import Button from '../../../../../../components/button'
import Input from '../../../../../../components/Input/Input'
import IntlMessages from '../../../../../../helpers/IntlMessages'
import { useConfigDispatch } from '../ConfigProvider'
import { changeDataCheckAction, DataQualityFields } from './DataQuality'

const AskDateFormat = ({ open, toggle, intl }) => {
  const { register, handleSubmit, errors } = useForm()
  const dispatch = useConfigDispatch()

  const onSave = ({ format, dataQuality }) => {
    dispatch(changeDataCheckAction(format, 'col_date_format'))
    dispatch(changeDataCheckAction(dataQuality, 'col_date_format_quality'))
    toggle()
  }

  return (
    <Modal isOpen={open} toggle={toggle}>
      <Form className='av-tooltip tooltip-label-right' onSubmit={handleSubmit(onSave)}>
        <Container className='mt-5 mb-2'>
          <Input
            label='label.enterDateFormat'
            type='text'
            name='format'
            innerRef={register({ required: intl?.messages['formError.dateFormatReq'] })}
            errors={errors}
            formclass='error-l-125'
          />
          <DataQualityFields register={register} errors={errors} />

          <Row className='justify-content-center mb-3'>
            <Col xs={12} md='auto'>
              <Button type='submit' size='md' color='primary'>
                <IntlMessages id='control.save' />
              </Button>
            </Col>
            <Col xs={12} md='auto'>
              <Button size='md' color='secondary' onClick={toggle}>
                <IntlMessages id='control.cancel' />
              </Button>
            </Col>
          </Row>
        </Container>
      </Form>
    </Modal>
  )
}

AskDateFormat.propTypes = {
  open: PropTypes.bool,
  toggle: PropTypes.func,
  intl: PropTypes.object
}

AskDateFormat.defaultProps = {
  asyncFetchDbInfo: {}
}

export default injectIntl(AskDateFormat)
