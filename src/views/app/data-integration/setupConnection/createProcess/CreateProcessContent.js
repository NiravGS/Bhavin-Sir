import PropTypes from 'prop-types'
import * as R from 'ramda'
import React, { useEffect, useState } from 'react'
import { Step, Steps, Wizard } from 'react-albus'
import { useIntl } from 'react-intl'
import { useDispatch } from 'react-redux'
import { Prompt } from 'react-router-dom'
import { TopNavigation } from '../../../../../components/wizard/TopNavigation'
import { SuspenseChart } from '../../../data-quality/setupConnection/Dashboard/SuspenseChart'
import { useSelectorProcess } from '../processEvents'
import ReviewProcess from '../reviewProcess/ReviewProcess'
import ProcessName from './ProcessName'
import ScheduleProcess from './ScheduleProcess'
import SourceInformation from './SourceInformation'
import TargetInformation from './targetInformation'
import {
  validateProcessName, validateScheduleExists,
  validateSource, validateTarget
} from './validations'

const CreateProcessContent = ({
  onSubmit, loadingSubmit, actionButtonLabel
}) => {
  const dispatch = useDispatch()
  const { messages } = useIntl()
  const [currentStep, setCurrentStep] = useState()
  const { basicInfo, targetInfo, sourceInfo, schedules, fileColumns, processConnections } = useSelectorProcess()

  useEffect(() => {
    return () => {
      dispatch({ type: 'cleanProcessContent' })
    }
  }, [])

  const validations = {
    targetInformation: validateTarget(targetInfo, sourceInfo?.table?.length),
    schedulingInformation: validateScheduleExists(schedules),
    sourceInformation: validateSource(sourceInfo)
  }

  const topNavClick = (stepItem, push) => {
    push(stepItem.id)
  }

  const onClickNext = (goToNext, steps, step) => {
    const validation = validations[step.id]

    if (!validation) {
      goToNext()
      return
    }

    if (validation()) {
      step.isDone = true
      if (steps.length - 1 <= steps.indexOf(step)) {
        return
      }
      setCurrentStep(steps[steps.indexOf(step) + 1]?.id)
      goToNext()
    }
  }

  const onClickPrev = (goToPrev, steps, step) => {
    if (steps.indexOf(step) <= 0) {
      return
    }
    setCurrentStep(steps[steps.indexOf(step) - 1]?.id)
    goToPrev()
  }

  const createProcess = async () => {
    if (validateProcessName(basicInfo.processName)) {
      onSubmit({
        processName: basicInfo.processName,
        processDescription: basicInfo.processDescription,
        sourceValues: sourceInfo,
        schedules,
        targetValues: targetInfo,
        fileColumns,
        processConnections
      })
    }
  }

  const isReviewStep = R.equals(currentStep, 'review')
  return (
    <div className='wizard wizard-default'>
      <Prompt
        when={!isReviewStep}
        message={messages['label.confirmLeaveRoute']}
      />
      <ProcessName />
      <Wizard>
        <TopNavigation className='justify-content-center' disableNav topNavClick={topNavClick} />
        <Steps>
          <Step id='sourceInformation' name={messages['label.sourceInformation']}>
            <div className='wizard-basic-step'>
              <SuspenseChart>
                <SourceInformation next={onClickNext} />
              </SuspenseChart>
            </div>
          </Step>
          <Step id='targetInformation' name={messages['label.targetInformation']}>
            <div className='wizard-basic-step'>
              <TargetInformation next={onClickNext} prev={onClickPrev} />
            </div>

          </Step>
          <Step id='schedulingInformation' name={messages['label.schedulingInformation']}>
            <div className='wizard-basic-step'>
              <ScheduleProcess next={onClickNext} prev={onClickPrev} />
            </div>
          </Step>
          <Step id='review' name={messages['label.review']}>
            <div className='wizard-basic-step'>
              <ReviewProcess
                prev={onClickPrev}
                actionButtonLabel={actionButtonLabel}
                onCreateProcess={createProcess}
                loadingSubmit={loadingSubmit}
              />
            </div>
          </Step>
        </Steps>
      </Wizard>
    </div>
  )
}

CreateProcessContent.propTypes = {
  onSubmit: PropTypes.func,
  loadingSubmit: PropTypes.bool,
  actionButtonLabel: PropTypes.string

}

export default CreateProcessContent
