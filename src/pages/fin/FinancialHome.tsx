import { Outlet } from 'react-router'

function FinancialHome() {
  return (
    <div className='mm-w-full mm-h-full'>
      <div>Financial Home Page</div>
      <Outlet />
    </div>
  )
}

export default FinancialHome
