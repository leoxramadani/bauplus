import ChangePassword from '@/components/users/ChangePassword';
import Disable2FA from '@/components/users/Disable2FA';
import EditProfile from '@/components/users/EditProfile';
import { GET_SPECIFIC_USER } from '@/lib/constants/endpoints/users';
import useData from '@/lib/hooks/useData';
import useTranslation from '@/lib/hooks/useTranslation';
import { withAuthorization } from '@/lib/withAuthorization';
import { User2 } from 'lucide-react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

const Settings = () => {
  const { t } = useTranslation();

  const { data: session } = useSession();

  const { data } = useData<any>(
    ['specific-user'],
    GET_SPECIFIC_USER + `?us=${session?.user.username}`,
    !!session
  );

  console.log(data);
  return (
    <>
      <div className="rounded-xl bg-[#F2F2F2] p-10">
        {/* Name and username*/}
        <div className="title flex gap-4 font-bold">
          <div className="flex flex-col justify-center">
            <div className="flex flex-col justify-center">
              <User2 />
            </div>
          </div>
          <div className="flex h-full flex-col justify-center">
            <p>
              {data?.result?.user?.firstName}{' '}
              {data?.result?.user?.lastName}
            </p>
            <p className="text-base">@{session?.user.username}</p>
          </div>
          <div className="text-sm ">
            <EditProfile />
          </div>
        </div>

        {/* Email*/}
        <div className="my-6">
          <h1 className="my-2 text-xl">{t('Email')}</h1>
          <div className="">
            <span>{session?.user.email ?? '-'}</span>
          </div>
        </div>
        <div className="my-6">
          <h1 className="my-2 text-xl">{t('Password')}</h1>
          <div className="flex">
            {/* <Link href={`/forgotpassword?back=/settings`} className="button">
            Reset your password
          </Link> */}
            {/** This below is a Modal that initially outputs a button */}
            <ChangePassword />
          </div>
        </div>
        <div className="my-6">
          <h1 className="my-2 text-xl">
            {t('Two factor authentication')}
          </h1>
          {data?.specificUser?.result?.user?.twoFactorEnabled ? (
            <div>
              {t(
                'Two-factor authentication is enabled for your account.'
              )}
              <div className="my-3 flex">
                <Disable2FA />
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              <i>
                {t(
                  'Two factor authentication is disabled for your account.'
                )}
              </i>
              <div className="flex">
                <Link href={`/settings/2fa`} className="button">
                  {t('Enable')}
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default withAuthorization(Settings);
