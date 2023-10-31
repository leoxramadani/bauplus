import Topbar from '@/components/layout/Topbar';
import { DataTable } from '@/components/molecules/table/DataTable';
import { GET_ALL_USERS } from '@/lib/constants/endpoints/users';
import useData from '@/lib/hooks/useData';
import useTranslation from '@/lib/hooks/useTranslation';
import { columns } from '@/lib/schemas/user';

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
      {data && (
        <DataTable columns={columns} data={data.result}></DataTable>
      )}
    </>
  );
};

export default Users;
