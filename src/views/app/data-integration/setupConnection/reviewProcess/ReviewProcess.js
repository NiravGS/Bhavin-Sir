/* eslint-disable react/prop-types */
/* eslint-disable camelcase */
import React from 'react'
import { useIntl } from 'react-intl'
import Button from '../../../../../components/button'
import { BottomNavigation } from '../../../../../components/wizard/BottomNavigation'
import IntlMessages from '../../../../../helpers/IntlMessages'
import ReviewProcessBase from './ReviewProcessBase'

const ReviewProcess = ({ prev, actionButtonLabel, onCreateProcess, loadingSubmit }) => {
  const { messages } = useIntl()

  return (
    <>
      <ReviewProcessBase />
      <BottomNavigation
        onClickPrev={prev}
        customNextButton={
          <Button
            onClick={onCreateProcess}
            loading={loadingSubmit}
            color='primary'
            size='lg'
          >
            <IntlMessages id={actionButtonLabel} />
          </Button>
        }
        className='justify-content-center mt-3'
        prevLabel={messages['wizard.prev']}
        nextLabel={messages['wizard.next']}
      />
    </>
  )
}

export default ReviewProcess
