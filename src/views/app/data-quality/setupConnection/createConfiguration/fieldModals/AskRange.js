import PropTypes from 'prop-types'
import React from 'react'
import 'react-datepicker/dist/react-datepicker.css'
import { useForm } from 'react-hook-form'
import { injectIntl } from 'react-intl'
import { Col, Container, Form, Modal, Row } from 'reactstrap'
import Button from '../../../../../../components/button'
import InputCustom from '../../../../../../components/Input/Input'
import IntlMessages from '../../../../../../helpers/IntlMessages'
import { useConfigDispatch } from '../ConfigProvider'
import { changeDataCheckAction, DataQualityFields } from './DataQuality'

const AskRange = ({ open, toggle, intl }) => {
  const dispatch = useConfigDispatch()
  const { register, handleSubmit, errors } = useForm()

  const onSave = ({ upperLimit, lowerLimit, dataQuality }) => {
    dispatch(changeDataCheckAction(upperLimit, 'col_range_uplt'))
    dispatch(changeDataCheckAction(lowerLimit, 'col_range_lwlt'))
    dispatch(changeDataCheckAction(dataQuality, 'col_range_quality'))
    toggle()
  }

  return (
    <Modal isOpen={open} toggle={toggle}>
      <Form className='av-tooltip tooltip-label-right' onSubmit={handleSubmit(onSave)}>
        <Container className='mt-5 mb-2'>
          <InputCustom
            label='control.enterRangeUpper'
            name='upperLimit'
            innerRef={register({ required: intl?.messages['formError.enterRangeUpperReq'] })}
            errors={errors}
            type='text'
            formclass='error-l-100'
          />
          <InputCustom
            label='control.enterRangeLower'
            name='lowerLimit'
            innerRef={register({ required: intl?.messages['formError.enterRangeLowerReq'] })}
            errors={errors}
            type='text'
            formclass='error-l-100'
          />
          <Row>
            <Col>
              <DataQualityFields register={register} errors={errors} />
            </Col>
          </Row>
          <Row className='justify-content-center mb-3 mt-3'>
            <Col md='auto'>
              <Button type='submit' size='md' color='primary'>
                <IntlMessages id='control.save' />
              </Button>
            </Col>
            <Col md='auto'>
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

AskRange.propTypes = {
  open: PropTypes.bool,
  toggle: PropTypes.func,
  intl: PropTypes.object
}

export default injectIntl(AskRange)
