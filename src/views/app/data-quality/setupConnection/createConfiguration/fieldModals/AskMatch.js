import PropTypes from 'prop-types'
import React from 'react'
import AskMatchBase from './AskMatchBase'
import { useConfigDispatch } from '../ConfigProvider'
import { changeDataCheckAction } from './DataQuality'

export const AskRegexFormat = ({ toggle, ...rest }) => {
  const dispatch = useConfigDispatch()
  const onSave = ({ regexFormat, match, dataQuality }) => {
    const colName = match === 'true' ? 'col_regex_match' : 'col_regex_not_match'
    dispatch(changeDataCheckAction(regexFormat, colName))
    dispatch(changeDataCheckAction(dataQuality, `${colName}_quality`))
    toggle()
  }

  return (
    <AskMatchBase
      toggle={toggle}
      onSave={onSave}
      label='regexFormat'
      {...rest}
    />)
}

AskRegexFormat.propTypes = {
  toggle: PropTypes.func
}

export const AskMatchFormat = ({ toggle, ...rest }) => {
  const dispatch = useConfigDispatch()

  const onSave = ({ likeNotMatch, dataQuality, match }) => {
    const colName = match === 'true' ? 'col_like' : 'col_not_like'
    dispatch({
      type: 'changeDataCheck',
      payload: {
        column: colName,
        value: likeNotMatch
      }
    })
    dispatch(changeDataCheckAction(dataQuality, 'col_like_quality'))
    toggle()
  }

  return (
    <AskMatchBase
      toggle={toggle}
      onSave={onSave}
      label='likeNotMatch'
      {...rest}
    />)
}

AskMatchFormat.propTypes = {
  toggle: PropTypes.func
}
