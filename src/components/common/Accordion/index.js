import PropTypes from 'prop-types'
import React, { useState, useContext, useEffect } from 'react'
import { Card, CardBody, CardHeader, Collapse } from 'reactstrap'
import { toggle } from '../../../helpers/appUtils'
import * as R from 'ramda'

const AccordionContext = React.createContext()

const Item = ({ title, children, openWhenStart }) => {
  const [collapse, setCollapse] = useState(false)
  const { setOpen, opened } = useContext(AccordionContext)
  const toggleItem = () => {
    toggle(setCollapse)()
    setOpen(title)
  }

  useEffect(() => {
    setCollapse(R.equals(opened, title))
  }, [opened])

  useEffect(() => {
    setOpen(openWhenStart && title)
    setCollapse(openWhenStart)
  }, [openWhenStart])

  return (
    <Card className='mb-1 mt-2'>

      <CardHeader
        color='primary'
        onClick={toggleItem}
        className={`btn pt-2 ${collapse ? 'accordion-header' : ''}`}
        data-testid='accordion-toggler'
      >
        <h5 className='mb-0 text-left'>
          {title}
        </h5>

      </CardHeader>
      <Collapse isOpen={collapse} data-testid='collapse-body'>
        <CardBody>
          {children}
        </CardBody>
      </Collapse>
    </Card>
  )
}

const Group = ({ children }) => {
  const [opened, setOpen] = useState()
  return (
    <AccordionContext.Provider value={{ opened, setOpen }}>
      {children}
    </AccordionContext.Provider>
  )
}

Group.propTypes = {
  children: PropTypes.any
}

Item.propTypes = {
  title: PropTypes.string,
  children: PropTypes.any,
  openWhenStart: PropTypes.bool
}

export default { Group, Item }
