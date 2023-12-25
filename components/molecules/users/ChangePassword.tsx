import useTranslation from '@/lib/hooks/useTranslation';
import { CHANGE_PASSWORD_QUERY } from '@/lib/queries/user';
import {
  IChangePassword,
  changePasswordSchema,
} from '@/lib/schemas/user';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
// import { toast } from 'react-toastify';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Input } from '../../ui/input';

const ChangePassword = ({ username }: { username?: string }) => {
  const router = useRouter();
  const { t } = useTranslation();
  const [isSaving, setIsSaving] = useState(false);
  const { data: session, status } = useSession();
  const [open, setOpen] = useState(false);

  /**
   * useForm hook, returns:
   * @register - object with the fields defined in schema - accessible as register("fieldname").
   * @handleSubmit -  function that's called from within onSubmit of the form,
   *                  as the first parameter expects a function which will execute whatever action necessary.
   * @formState - includes the @errors object with the errors from schema, see schema for more.
   */
  const {
    register: registerChangePassword,
    handleSubmit: handleChangePassword,
    formState: { errors: changePasswordErrors },
  } = useForm<IChangePassword>({
    resolver: zodResolver(changePasswordSchema),
  });


  // If validation passes successfully, i.e formState is valid, then the below callback is executed.
  const onSubmit = useCallback(
    async (data: IChangePassword) => {
      try {
        console.log('try')
      } catch (e) {
        toast.error(e?.toString());
        setIsSaving(false);
      }
    },
    [router]
  );

  // Handles errors coming from GraphQL server after executing onSubmit
  const onError = (errors: any, e: any) => console.log(errors, e);

  return (
    <div
      className="button cursor-pointer"
      // value={t('Change password')}
      // done={t('Close')}
    >
      <h2 className="mb-6 mt-10 text-center text-xl font-medium">
        {username
          ? `${t('Change password for')} @${username}`
          : t('Change your password')}
      </h2>
      <form
        onSubmit={handleChangePassword(onSubmit, onError)}
        className="mx-auto flex max-w-xl flex-col gap-3"
      >
        <div className="flex flex-col">
          <label className="sr-only" htmlFor="current">
            {t('Current password')}
          </label>
          <Input
            id="current"
            type="password"
            className="input"
            placeholder="Current password"
            {...registerChangePassword('currentPassword')}
          />
          {!username && (
            <Link href="/forgotpassword">
              {t('Forgot your current password?')}
            </Link>
          )}
          <p className="text-sm text-red-600">
            {t(changePasswordErrors.currentPassword?.message)}
          </p>
        </div>
        <div className="flex flex-col gap-1">
          <label className="sr-only" htmlFor="new">
            {t('New password')}
          </label>
          <Input
            id="new"
            type="password"
            className="input"
            placeholder="New password"
            data-error={changePasswordErrors.newPassword}
            {...registerChangePassword('newPassword')}
          />
          <p className="text-sm text-red-600">
            {t(changePasswordErrors.newPassword?.message)}
          </p>
        </div>
        <div className="flex flex-col gap-1">
          <label className="sr-only" htmlFor="confirm">
            {t('Confirm new password')}
          </label>
          <Input
            id="confirm"
            type="password"
            className="input"
            placeholder="Confirm new password"
            data-error={changePasswordErrors.confirmNewPassword}
            {...registerChangePassword('confirmNewPassword')}
          />
          <p className="text-sm text-red-600">
            {t(changePasswordErrors.confirmNewPassword?.message)}
          </p>
        </div>
        <div>
          <Button>Save</Button>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
