import React from 'react'
import PropTypes from 'prop-types'
import { Pie } from 'react-chartjs-2'

function SpendingPieChart({ chartData }) {
  return (
    <div>
      <Pie data={chartData} options={{
        plugins: {
          legend: {
            display: true,
            position: 'top',
          },
          title: {
            display: true,
            text: 'Spending Distribution',
          },
        },
      }}/>
    </div>
  )
}

SpendingPieChart.propTypes = {}

export default SpendingPieChart
