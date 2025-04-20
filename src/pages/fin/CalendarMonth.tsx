import MonthSquare from './MonthSquare'
import _range from 'lodash/range'
import { useParams } from 'react-router'

function CalendarMonth() {
  const {year} = useParams()

  return (
    <div className='mm-grid mm-grid-rows-4 mm-grid-cols-3 mm-gap-4'>
      {
        _range(1, 13).map((month: number) => (
          <div className='mm-flex mm-justify-center mm-items-center'>
            <div className='mm-w-24 mm-h-24'>
              <MonthSquare key={month} year={year} month={month} />
            </div>
          </div>
        ))  
      }
    </div>
  )
}

export default CalendarMonth
