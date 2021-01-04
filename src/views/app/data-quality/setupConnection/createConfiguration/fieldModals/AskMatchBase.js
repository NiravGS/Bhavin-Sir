import React from 'react'
import PropTypes from 'prop-types'
import 'react-datepicker/dist/react-datepicker.css'
import { useForm } from 'react-hook-form'
import { injectIntl } from 'react-intl'
import { Col, Container, Form, FormGroup, Input, Label, Modal, Row } from 'reactstrap'
import Button from '../../../../../../components/button'
import InputCustom from '../../../../../../components/Input/Input'
import IntlMessages from '../../../../../../helpers/IntlMessages'
import { DataQualityFields } from './DataQuality'

const AskMatchBase = ({ open, toggle, intl, onSave, label }) => {
  const { register, handleSubmit, errors } = useForm({
    defaultValues: {
      match: 'false'
    }
  })

  return (
    <Modal isOpen={open} toggle={toggle}>
      <Form className='av-tooltip tooltip-label-right' onSubmit={handleSubmit(onSave)}>
        <Container className='mt-5 mb-2'>
          <InputCustom
            label={`label.${label}`}
            name={label}
            innerRef={register({ required: intl?.messages[`formError.${label}Req`] })}
            errors={errors}
            type='text'
            formclass='error-l-100'
          />
          <Row>
            <Col>
              <FormGroup check>
                <Label check>
                  <Input type='radio' innerRef={register} name='match' value={false} />
                  <IntlMessages id='label.dontMatchPattern' />
                </Label>
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input type='radio' innerRef={register} name='match' value />
                  <IntlMessages id='label.matchPattern' />
                </Label>
              </FormGroup>
            </Col>
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

AskMatchBase.propTypes = {
  open: PropTypes.bool,
  toggle: PropTypes.func,
  intl: PropTypes.object,
  onSave: PropTypes.func,
  label: PropTypes.string
}

export default injectIntl(AskMatchBase)
