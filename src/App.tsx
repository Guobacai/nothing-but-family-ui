import { Outlet } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie'

function App() {
  return (
    <>
      <CookiesProvider>
        <div className='mm-relative mm-w-screen mm-h-screen mm-bg-neutral-100'>
          <Outlet />
        </div>
      </CookiesProvider>
    </>
  )
}

export default App
