import PropTypes from 'prop-types'
import React from 'react'
import 'react-datepicker/dist/react-datepicker.css'
import { useForm } from 'react-hook-form'
import { injectIntl } from 'react-intl'
import { Col, Container, Form, Modal, Row, ModalHeader } from 'reactstrap'
import Button from '../../../../../../components/button'
import Input from '../../../../../../components/Input/Input'
import IntlMessages from '../../../../../../helpers/IntlMessages'
import { useConfigDispatch } from '../ConfigProvider'
import { changeDataCheckAction, DataQualityFields } from './DataQuality'

const AskCustomReqirement = ({ open, toggle, intl }) => {
    const { register, handleSubmit, errors } = useForm()
    const dispatch = useConfigDispatch()

    const onSave = ({ format }) => {
        dispatch(changeDataCheckAction(format, 'col_requirement'))
        toggle()
    }

    return (
        <Modal isOpen={open} toggle={toggle}>
        <ModalHeader toggle={toggle}>
            <IntlMessages id='control.customRequirement' />
        </ModalHeader>
            <Form className='av-tooltip tooltip-label-right' onSubmit={handleSubmit(onSave)}>
                <Container className='mt-5 mb-2'>
                    {/* <h4 style={{fontSize=""}}>CUSTOM REQUIREMENT</h4> */}
                    <Input
                        label='label.customrequirement'
                        type='text'
                        name='format'
                        innerRef={register({ required: intl?.messages['formError.customReq'] })}
                        errors={errors}
                        formclass='error-l-125'
                        placeholder={'Unitprice*Totalqty'}
                    />

                    <Row className='justify-content-center mb-3'>
                        <Col xs={12} md='auto'>
                            <Button type='submit' size='md' color='primary'>
                                <IntlMessages id='control.finish' />
                            </Button>
                        </Col>
                    </Row>
                </Container>
            </Form>
        </Modal>
    )
}

AskCustomReqirement.propTypes = {
    open: PropTypes.bool,
    toggle: PropTypes.func,
    intl: PropTypes.object
}

AskCustomReqirement.defaultProps = {
    asyncFetchDbInfo: {}
}

export default injectIntl(AskCustomReqirement)
