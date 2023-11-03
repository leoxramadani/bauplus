import { DataTableLoading } from '@/components/molecules/DataTable/DataTableLoading';
import { DataTable } from '@/components/molecules/DataTable';
import Topbar from '@/components/layout/Topbar';
import { GET_ALL_USERS } from '@/lib/constants/endpoints/users';
import useData from '@/lib/hooks/useData';
import { searchParamsSchema } from '@/lib/schemas/params';
import { columns } from '@/lib/schemas/user';

interface UsersPageProps {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

const Users = ({ searchParams }: UsersPageProps) => {
  // Parse search params using zod schema
  const params = searchParamsSchema.safeParse(searchParams);

  console.log(params);
  const { data, isLoading, isError, error }: any = useData(
    ['users'],
    GET_ALL_USERS
  );

  return (
    <>
      {isLoading && <DataTableLoading columnCount={columns.length} />}
      {isLoading && <p>Loading...</p>}
      {/*@ts-ignore*/}
      {isError && <p className="error">{error.message}</p>}
      {data && <DataTable columns={columns} data={data} pageCount={10} advancedFilter={true} />}
    </>
  );
};

export default Users;
