import React, { Fragment } from 'react'
import { Breadcrumb, BreadcrumbItem } from 'reactstrap'
import { NavLink } from 'react-router-dom'
import IntlMessages from '../../helpers/IntlMessages'

const getMenuTitle = sub => {
  return <IntlMessages id={`menu.${sub}`} />
}

const getUrl = (path, sub, index) => {
  if (index === 0) {
    return ''
  } else {
    return path.split(sub)[0] + sub
  }
}

const BreadcrumbContainer = ({ heading, match }) => {
  return (
    <>
      {heading && <h1><IntlMessages id={heading} /></h1>}
      <BreadcrumbItems match={match} />
    </>
  )
}

export const BreadcrumbItems = ({ match }) => {
  const pathname = match.pathname || match.path
  const path = pathname.substr(1)
  let paths = path.split('/')
  if (paths[paths.length - 1].indexOf(':') > -1) {
    paths = paths.filter(x => x.indexOf(':') === -1)
  }

  return (
    <>
      <Breadcrumb className='pt-0 breadcrumb-container d-none d-sm-block d-lg-inline-block'>
        {paths.filter(val => isNaN(val)).map((sub, index) => {
          return (
            <BreadcrumbItem key={index} active={paths.length === index + 1}>
              {paths.length !== index + 1 ? (
                <NavLink to={'/' + getUrl(path, sub, index)}>
                  {getMenuTitle(sub)}
                </NavLink>
              ) : (
                getMenuTitle(sub)
              )}
            </BreadcrumbItem>
          )
        })}
      </Breadcrumb>
    </>
  )
}

export default BreadcrumbContainer