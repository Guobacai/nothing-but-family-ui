import { Outlet } from 'react-router';
import TopNavigation from '../../components/top-navigation/TopNavigation';

export default function Home() {
  return (
    <div>
      <TopNavigation />
      <Outlet />
    </div>
  );
}
