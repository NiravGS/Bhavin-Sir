import PropTypes from 'prop-types'
import * as R from 'ramda'
import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import ReactTreeView from 'react-treeview'
import 'react-treeview/react-treeview.css'
import { Label } from 'reactstrap'
import IntlMessages from '../../helpers/IntlMessages'

const LinkBase = ({ label, ...rest }) => {
  return (
    <NavLink {...rest}>
      <Label className='underline-span'>
        <IntlMessages id={`label.${label}`} />
      </Label>
    </NavLink>
  )
}

LinkBase.propTypes = {
  label: PropTypes.string
}

const TreeView = ({ data }) => {
  const [collapsedList, setCollapsedList] = useState(R.repeat(false, data.length))

  const handleClick = (i) => {
    const newCollapsedList = [...collapsedList]
    newCollapsedList[i] = !collapsedList[i]
    setCollapsedList(newCollapsedList)
  }
  return data.map(({ title, content }, i) => {
    const label =
      <Label onClick={() => handleClick(i)}>
        <IntlMessages id={`label.${title}`} />
      </Label>
    return (
      <ReactTreeView
        key={i}
        nodeLabel={label}
        collapsed={collapsedList[i]}
      >
        {content.map((props, index) => (
          <div className='info' key={`entry_${index}`}>
            <LinkBase {...props} />
          </div>))}
      </ReactTreeView>
    )
  })
}

TreeView.propTypes = {
  data: PropTypes.array
}

export default TreeView
