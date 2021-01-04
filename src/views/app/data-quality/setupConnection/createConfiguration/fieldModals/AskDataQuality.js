import PropTypes from 'prop-types'
import React, { memo } from 'react'
import { useForm } from 'react-hook-form'
import { Button, Col, Container, Form, Modal, Row } from 'reactstrap'
import IntlMessages from '../../../../../../helpers/IntlMessages'
import { useConfigDispatch } from '../ConfigProvider'
import { changeDataCheckAction, DataQualityFields } from './DataQuality'

const columnMap = {
  colUnique: 'col_unique',
  notNull: 'col_not_null',
  null: 'col_null'
}

export const AskDataQuality = memo(({ toggle, open, columnLabel }) => {
  const dispatch = useConfigDispatch()
  const { register, handleSubmit, errors } = useForm()

  const onSave = ({ dataQuality }) => {
    const column = columnMap[columnLabel]
    dispatch(changeDataCheckAction('Y', column))
    dispatch(changeDataCheckAction(dataQuality, `${column}_quality`))
    toggle()
  }

  return (
    <Modal isOpen={open} toggle={toggle}>
      <Form className='av-tooltip tooltip-label-right' onSubmit={handleSubmit(onSave)}>
        <Container className='mt-5 mb-2'>
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
})

AskDataQuality.propTypes = {
  toggle: PropTypes.func,
  open: PropTypes.bool,
  columnLabel: PropTypes.any
}
