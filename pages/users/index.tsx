import { useSession } from 'next-auth/react';
import useTranslation from '@/lib/hooks/useTranslation';
import { DataTable } from '@/components/molecules/table/DataTable';
import { columns } from '@/lib/schemas/user';
import useData from '@/lib/hooks/useData';
import { GET_ALL_USERS } from '@/lib/constants/endpoints/users';

const Users = () => {
  const { t } = useTranslation();

  const { data, isLoading, isError, error }: any = useData(
    ['users'],
    GET_ALL_USERS
  );

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {/*@ts-ignore*/}
      {isError && <p className="error">{error.message}</p>}
      {data && <DataTable columns={columns} data={data.result}></DataTable>}
    </>
  );
};

export default Users;
