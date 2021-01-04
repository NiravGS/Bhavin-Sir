import React from 'react'
import * as R from 'ramda'
import ChartComponent, { Chart } from 'react-chartjs-2'
import ChartAnnotationsPlugin from 'chartjs-plugin-annotation'
import { lineChartOptions } from './config'
import { transformPercentageTooltip } from './util'

Chart.plugins.register(ChartAnnotationsPlugin)

export default class Line extends React.Component {
  constructor (props) {
    super(props)
    if (this.props.shadow) {
      Chart.defaults.lineWithShadow = Chart.defaults.line
      Chart.controllers.lineWithShadow = Chart.controllers.line.extend({
        draw: function (ease) {
          Chart.controllers.line.prototype.draw.call(this, ease)
          var ctx = this.chart.ctx
          ctx.save()
          ctx.shadowColor = 'rgba(0,0,0,0.15)'
          ctx.shadowBlur = 10
          ctx.shadowOffsetX = 0
          ctx.shadowOffsetY = 10
          ctx.responsive = true
          ctx.stroke()
          Chart.controllers.line.prototype.draw.apply(this, arguments)
          ctx.restore()
        }
      })
    }
  }

  render () {
    const { data, shadow, extraOptions, yLabel, xLabel, ...restSettings } = this.props
    const options = R.clone(lineChartOptions)
    if (restSettings.isPercentage) {
      options.tooltips = transformPercentageTooltip(options)
    }

    if (yLabel || xLabel) {
      options.scales.yAxes[0].scaleLabel = {
        display: true,
        labelString: yLabel
      }
      options.scales.xAxes[0].scaleLabel = {
        display: true,
        labelString: xLabel
      }
    }

    return (
      <ChartComponent
        ref={ref => (this.chart_instance = ref && ref.chart_instance)}
        type={shadow ? 'lineWithShadow' : 'line'}
        options={{
          ...options,
          ...extraOptions
        }}
        data={data}
        {...restSettings}
      />
    )
  }
}
