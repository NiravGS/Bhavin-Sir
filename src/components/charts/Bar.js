import React from 'react'
import * as R from 'ramda'
import ChartComponent, { Chart } from 'react-chartjs-2'
import ChartDataLabels from 'chartjs-plugin-datalabels'

import { barChartOptions } from './config'
import { transformPercentageTooltip } from './util'
Chart.plugins.unregister(ChartDataLabels)

export default class Bar extends React.Component {
  constructor (props) {
    super(props)
    if (this.props.shadow) {
      Chart.defaults.barWithShadow = Chart.defaults.bar
      Chart.controllers.barWithShadow = Chart.controllers.bar.extend({
        draw: function (ease) {
          Chart.controllers.bar.prototype.draw.call(this, ease)
          var ctx = this.chart.ctx
          ctx.save()
          ctx.shadowColor = 'rgba(0,0,0,0.2)'
          ctx.shadowBlur = 7
          ctx.shadowOffsetX = 5
          ctx.shadowOffsetY = 7
          ctx.responsive = true
          Chart.controllers.bar.prototype.draw.apply(this, arguments)

          ctx.restore()
        }
      })
    }
  }

  render () {
    const { data, shadow, yLabel, xLabel, ...restProps } = this.props
    const options = R.clone(barChartOptions)
    if (restProps.type === 'horizontalBar') {
      options.scales.xAxes[0].gridLines.display = true
      options.scales.yAxes[0].gridLines.display = false
    }
    const maxValue = Math.max(...data.datasets[0].data)
    options.scales.yAxes[0].ticks.suggestedMax = maxValue * 1.1
    if (restProps.isPercentage) {
      options.tooltips = transformPercentageTooltip(options)
      options.plugins.datalabels.formatter = value => `${parseInt(value)}%`
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
        type={shadow ? 'barWithShadow' : 'bar'}
        options={options}
        data={data}
        {...restProps}
      />
    )
  }
}
