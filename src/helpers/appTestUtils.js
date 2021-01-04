import React, { Suspense } from 'react'
import { render } from '@testing-library/react'
import { IntlProvider } from 'react-intl'
import EnLang from '../lang/entries/en-US'
import { MemoryRouter } from 'react-router'
import { FormProvider, useForm } from 'react-hook-form'
import { FilterProvider } from '../views/app/data-quality/setupConnection/Dashboard/filters/events'
import { configureStore } from '../redux/store'
import { Provider } from 'react-redux'

export const renderBase = (Component, props = {}) => {
  return (
    <Provider store={configureStore()}>
      <IntlProvider locale='en-US' messages={EnLang.messages}>
        <Component {...props} />
      </IntlProvider>
    </Provider>
  )
}

export const renderWithLang = (Component, props = {}) =>
  render(renderBase(Component, props))

export const renderWithFilterContext = (Component, props = {}) => render(
  <FilterProvider extraValue={props.extraValue}>
    {renderBase(Component, props)}
  </FilterProvider>
)

export const renderWithLangRouter = (Component, props = {}) => {
  return render(
    <MemoryRouter>
      {renderBase(Component, props)}
    </MemoryRouter>
  )
}

// eslint-disable-next-line react/prop-types
const FormWrapper = ({ component, props }) => {
  const methods = useForm()
  return (
    <FormProvider {...methods}>
      {renderBase(component, props)}
    </FormProvider>
  )
}

export const renderWithLangForm = (Component, props = {}) => {
  return render(
    <MemoryRouter>
      <FormWrapper component={Component} props={props} />
    </MemoryRouter>
  )
}

export const renderWithLangSuspense = (Component, props = {}) => {
  return render(
    <MemoryRouter>
      <Suspense fallback='loading...'>
        {renderBase(Component, props)}
      </Suspense>
    </MemoryRouter>
  )
}
