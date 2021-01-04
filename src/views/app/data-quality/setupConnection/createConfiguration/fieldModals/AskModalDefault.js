/* eslint-disable react/prop-types */
import PropTypes from 'prop-types'
import React from 'react'
import { Col, Container, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap'
import Button from '../../../../../../components/button'
import IntlMessages from '../../../../../../helpers/IntlMessages'

const AskModalDefault = ({
  open,
  loading,
  titleLabel, toggle,
  onSubmit, children,
  submitLabel = 'save'
}) => {
  return (
    <Modal isOpen={open} toggle={toggle}>
      <ModalHeader toggle={toggle}>
        <IntlMessages id={titleLabel} />
      </ModalHeader>
      {children && (
        <ModalBody>
          {children}
        </ModalBody>)}
      <ModalFooter>
        <Container>
          <Row className='justify-content-center'>
            <Col xs={12} md='auto'>
              <Button loading={loading} type='submit' size='md' color='primary' onClick={onSubmit}>
                <IntlMessages id={submitLabel || `control.${submitLabel}`} />
              </Button>
            </Col>
            <Col xs={12} md='auto'>
              <Button size='md' color='secondary' onClick={toggle}>
                <IntlMessages id='control.cancel' />
              </Button>
            </Col>
          </Row>
        </Container>
      </ModalFooter>
    </Modal>
  )
}

export const AskModal = ({
  open,
  titleLabel,
  toggle,
  children,
  footerContent
}) => {
  return (
    <Modal isOpen={open} toggle={toggle}>
      {titleLabel && (
        <ModalHeader toggle={toggle}>
          <IntlMessages id={titleLabel} />
        </ModalHeader>)}
      {children && (
        <ModalBody>
          {children}
        </ModalBody>)}
      {footerContent && (
        <ModalFooter>
          {footerContent}
        </ModalFooter>)}
    </Modal>
  )
}

AskModalDefault.propTypes = {
  open: PropTypes.bool,
  toggle: PropTypes.func,
  onSubmit: PropTypes.func,
  submitLabel: PropTypes.string,
  children: PropTypes.any,
  titleLabel: PropTypes.string,
  loading: PropTypes.bool
}

AskModalDefault.defaultProps = {
  asyncFetchDbInfo: {}
}

export default AskModalDefault
