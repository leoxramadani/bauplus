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
      <NoSSR />
    </>
  );
};

export default Dashboard;
