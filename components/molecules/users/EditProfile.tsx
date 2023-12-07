import useTranslation from '@/lib/hooks/useTranslation';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useState } from 'react';
const EditProfile = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const { data: session } = useSession();
  const [values, setValues] = useState<any>();

  // const {
  //   data,
  //   loading: dataLoading,
  //   error: dataError,
  //   refetch,
  // } = useQuery(GET_SPECIFIC_USER_QUERY, {
  //   variables: {
  //     username: session?.user.username,
  //   },
  // });

  // useEffect(() => {
  //   if (data) {
  //     setValues({
  //       user: data.specificUser.result.user,
  //     });
  //   }
  // }, [data]);

  return (
    // <Modal value={t('Edit profile')} className="button">
    //   {dataLoading && <p>Loading...</p>}
    //   {!dataLoading && !dataError && (
    //     <div className="flex justify-center">
    //       <UsersForm
    //         mutation={UPDATE_USER_QUERY}
    //         values={values}
    //         refetch={refetch}
    //         setCompanies={false}
    //       />
    //     </div>
    //   )}
    //   {dataError && (
    //     <p className="text-red-600">{t(dataError.message)}</p>
    //   )}
    // </Modal>
    <div>Edit profile</div>
  );
};

export default EditProfile;
