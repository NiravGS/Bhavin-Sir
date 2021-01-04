import React, { Component } from 'react'
import { Row } from 'reactstrap'
import PropTypes from 'prop-types'
import IntlMessages from '../../../helpers/IntlMessages'
import { Colxx, Separator } from '../../../components/common/CustomBootstrap'
import Breadcrumb from '../../../containers/navs/Breadcrumb'

export default class Start extends Component {
  render () {
    return (
      <>
        <Row>
          <Colxx xxs='12'>
            <Breadcrumb heading='menu.set-up-connection' match={this.props.match} />
            <Separator className='mb-5' />
          </Colxx>
        </Row>
        <Row>
          <Colxx xxs='12' className='mb-4'>
            <p><IntlMessages id='menu.set-up-connection' /></p>
          </Colxx>
        </Row>
      </>
    )
  }
}

Start.propTypes = {
  match: PropTypes.object
}
