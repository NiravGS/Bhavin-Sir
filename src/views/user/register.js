/* eslint-disable react/jsx-handler-names */
import { yupResolver } from '@hookform/resolvers'
import PropTypes from 'prop-types'
import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useIntl } from 'react-intl'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { Card, CardTitle, Form, Row } from 'reactstrap'
import * as yup from 'yup'
import Button from '../../components/button'
import { Colxx } from '../../components/common/CustomBootstrap'
import Input from '../../components/Input/Input'
import { Notification } from '../../helpers/appUtils'
import IntlMessages from '../../helpers/IntlMessages'
import { requestWithoutVerification } from '../../helpers/Request'
import { useAsync } from '../../helpers/requestHelpers'

const getValidations = (messages = []) => yup.object().shape({
  name: yup.string().required(messages['formError.name']),
  email: yup.string().required(messages['formError.email']),
  password: yup.string().required(messages['formError.password'])
})

const useRegister = () => {
  // const history = useHistory()
  const { messages } = useIntl()
  // const dispatch = useDispatch()
  const [runRegisterUser, loading] = useAsync(
    (name, email, password) =>
      requestWithoutVerification.post('/user', { name, email, password }),
    { canThrow: true }
  )

  const userRegistered = async (user, registerInfo) => {
    Notification.success(messages['label.userCreated'])
    // todo this is the previous flow to login directly
    // localStorage.setItem('user_id', user.uid)
    // dispatch(loginUser(registerInfo, history))
  }

  const registerUser = async (userData) => {
    const { email, password, name } = userData
    try {
      const registeredUser = await runRegisterUser(name, email, password)
      userRegistered(registeredUser.user, userData)
    } catch (error) {
      Notification.error(messages['formError.failedToCreateUser'])
    }
  }

  return { loading, registerUser }
}

const Register = () => {
  const { messages } = useIntl()
  const { loading, registerUser } = useRegister()

  const methods = useForm({
    resolver: yupResolver(getValidations(messages))
  })

  return (
    <Row className='h-100'>
      <Colxx xxs='12' md='10' className='mx-auto my-auto'>
        <Card className='auth-card'>
          <div className='position-relative image-side '>
            <p className='text-white h2'>MAGIC IS IN THE DETAILS</p>
            <p className='white mb-0'>
              Please use this form to register. <br />
              If you are a member, please{' '}
              <NavLink to='/user/login' className='white'>
                login
              </NavLink>
              .
            </p>
          </div>
          <div className='form-side'>
            <NavLink to='/' className='white'>
              <span className='logo-single' />
            </NavLink>
            <CardTitle className='mb-4'>
              <IntlMessages id='user.register' />
            </CardTitle>
            <FormProvider {...methods}>
              <Form onSubmit={methods.handleSubmit(registerUser)}>
                <Input label='user.fullname' type='text' name='name' />
                <Input label='user.email' type='email' name='email' />
                <Input label='user.password' type='password' name='password' />
                <div className='d-flex justify-content-end align-items-center'>
                  <Button
                    loading={loading}
                    color='primary'
                    className='btn-shadow'
                    size='lg'
                    type='submit'
                  >
                    <IntlMessages id='user.register-button' />
                  </Button>
                </div>
              </Form>
            </FormProvider>
          </div>
        </Card>
      </Colxx>
    </Row>
  )
}

Register.propTypes = {
  registerUser: PropTypes.func,
  loading: PropTypes.bool
}

const mapStateToProps = ({ authUser }) => {
  const { user, loading } = authUser
  return { user, loading }
}

export default connect(
  mapStateToProps
)(Register)
