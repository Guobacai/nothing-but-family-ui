import { Outlet } from 'react-router-dom';

function App() {
  return (
    <>
      <div className='mm-relative mm-w-screen mm-h-screen mm-bg-neutral-300'>
        <Outlet />
      </div>
    </>
  )
}

export default App
