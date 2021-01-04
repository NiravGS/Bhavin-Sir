import PropTypes from 'prop-types'
import * as R from 'ramda'
import React, { memo, useEffect, useState } from 'react'
import { injectIntl } from 'react-intl'
import { Input, InputGroup, Label, ListGroup, ListGroupItem } from 'reactstrap'
import IntlMessages from '../../helpers/IntlMessages'

const ExpandedSelectComp = ({ intl, onChange, data, label, disabled, active }) => {
  const [content, setContent] = useState()
  const [textFilter, setTextFilter] = useState()

  useEffect(() => {
    setContent(filterAndOrder(data))
  }, [data, textFilter])

  const isItemActive = (item) => {
    return active?.value !== undefined ? active?.value === item.value : false
  }

  const filterByText = (val) => {
    if (textFilter) {
      return isItemActive(val) || val.ignoreSearch ? true : val.label.includes(textFilter)
    }
    return true
  }

  const filterAndOrder = R.compose(R.sortBy(R.prop('label')), R.filter(filterByText))

  const onSearch = (event) => {
    event.persist()
    setTextFilter(event?.target?.value)
  }

  return (
    <>
      <h6 className='pt-3 pb-2'><IntlMessages id={`label.${label}`} /></h6>
      <InputGroup>
        <Input disabled={disabled} placeholder={intl.messages['control.search']} className='p-2' onChange={onSearch} />
      </InputGroup>
      <div className='box-selection'>
        <ListGroup className='list-group-flush'>

          {content?.map((contentItem, index) => {
            const indexKey = `${index}_keyVal`
            return (
              <ListGroupItem
                disabled={disabled}
                className='text-left p-2'
                active={isItemActive(contentItem)}
                tag='button'
                type='button'
                data-testid={`${label}_${index}`}
                onClick={() => !R.equals(contentItem, active) ? onChange(contentItem) : ''}
                key={indexKey}
              >
                {contentItem.element || <Label className='mb-0'>{contentItem.label}</Label>}
              </ListGroupItem>
            )
          })}
        </ListGroup>
      </div>
    </>
  )
}

ExpandedSelectComp.propTypes = {
  intl: PropTypes.object,
  onChange: PropTypes.func,
  data: PropTypes.array,
  label: PropTypes.string,
  disabled: PropTypes.bool,
  active: PropTypes.object
}

ExpandedSelectComp.defaultProps = {
  data: [],
  onChange: () => {}
}

const ExpandedSelect = injectIntl(ExpandedSelectComp)

export default memo(ExpandedSelect)
