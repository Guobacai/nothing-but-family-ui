import { NavLink } from 'react-router-dom';
import { Outlet } from 'react-router'

export default function Home() {
    return <div>
        <NavLink to="/home/finance">See the finance of your home.</NavLink>
        <Outlet />
    </div>
}