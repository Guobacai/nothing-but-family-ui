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

export default SpendingPieChart
