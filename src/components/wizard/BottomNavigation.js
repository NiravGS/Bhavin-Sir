import React, { Component } from 'react'
import { WithWizard } from 'react-albus'
import Button from '../button'

export class BottomNavigation extends Component {
  render () {
    return (
      <WithWizard render={({ next, previous, step, steps }) => (
        <div className={'wizard-buttons ' + this.props.className}>
          <Button
            color='primary'
            className={'mr-1 ' + (steps.indexOf(step) <= 0 ? 'disabled' : '')}
            onClick={() => { this.props.onClickPrev(previous, steps, step) }}
          >
            {this.props.prevLabel}
          </Button>
          {this.props.customNextButton ? this.props.customNextButton : (
            <Button
              loading={this.props.loadingNext}
              color='primary'
              className={(steps.indexOf(step) >= steps.length - 1 ? 'disabled' : '')}
              onClick={() => { this.props.onClickNext(next, steps, step) }}
            >
              {this.props.nextLabel}
            </Button>

          )}
        </div>
      )}
      />
    )
  }
}
