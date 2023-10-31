import Topbar from '@/components/layout/Topbar';
import dynamic from 'next/dynamic';

const NoSSR = dynamic(
  () => import('@/components/molecules/GridLayout/GridLayout'),
  {
    ssr: false,
  }
);

const Dashboard = () => {
  return (
    <>
      <Topbar />
      <NoSSR />
    </>
  );
};

export default Dashboard;
