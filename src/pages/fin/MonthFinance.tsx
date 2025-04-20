import { useParams } from 'react-router'
import {useGetRecordByYearAndMonthQuery} from '../../api/fin'
import Chart from 'chart.js/auto'
import { CategoryScale } from 'chart.js'
import SpendingPieChart from './SpendingPieChart';

Chart.register(CategoryScale)

function MonthFinance() {
  const {year, month} = useParams();

  console.log('year month', year, month)

  const { data, isSuccess } = useGetRecordByYearAndMonthQuery({ year, month });

  console.log("fin data", data)

  return (
    <div>
      <div>
        <div className='mm-text-2xl'>{year}</div>
        <div className='mm-text-xl'>{month}</div>
      </div>
      {
        isSuccess && (<div>
          <div className='mm-h-96 mm-w-96'>
            <SpendingPieChart chartData={{
              labels: ["test1", "test2", "test3"],
              datasets: [{
                label: "Spending",
                data: [10, 20, 30],
              }],
            }} />
          </div>
        </div>)
      }
    </div>
  )
}

export default MonthFinance
