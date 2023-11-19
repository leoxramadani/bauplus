import { DataTableLoading } from '@/components/molecules/table/DataTableLoading';
import { DataTable } from '@/components/molecules/table/DataTable';
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
      {/*@ts-ignore*/}
      {isError && <p className="error">{error.message}</p>}
      {data && <DataTable columns={columns} data={data}/>}
    </>
  );
};

export default Users;
