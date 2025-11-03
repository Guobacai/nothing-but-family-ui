import { NavLink } from 'react-router-dom';

export default function TopNavigation() {
  return (
    <nav className="mm-bg-sky-300 mm-text-slate-50 mm-px-4 mm-py-2 mm-flex mm-gap-4">
      <NavLink to="/home">Family</NavLink>
      <NavLink to="/home/finance">Finance</NavLink>
    </nav>
  );
}
