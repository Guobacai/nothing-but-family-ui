import { useMemo } from 'react'
import { useNavigate } from 'react-router'
const MONTHS = [
  'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN',
  'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'
]

function MonthSquare({ month, year } : { month: number, year : number }) {
  const navigate = useNavigate()

  const headerColor = useMemo(() => {
    const curMonth = new Date().getMonth() + 1

    if (month === curMonth) {
      return 'mm-bg-sky-300'
    } else if (month < curMonth) {
      return 'mm-bg-green-300'
    } else {
      return 'mm-bg-neutral-200'
    }
  }, [month])

  return (
    <div className='mm-flex mm-flex-col mm-h-full mm-w-full mm-bg-sky-50 mm-rounded-t-lg mm-cursor-pointer' onClick={() => navigate(`/finance/${year}/${month}`)}>
      <div className={`mm-h-1/5 ${headerColor} mm-rounded-t-lg`}></div>
      <div className='mm-h-4/5 mm-flex mm-justify-center mm-items-center mm-text-lg mm-text-bold'>{MONTHS[month - 1]}</div>
    </div>
  )
}

export default MonthSquare
