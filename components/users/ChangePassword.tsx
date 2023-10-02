import Link from "next/link";
import Modal from "../Modal";
import Button from "../Button";
import { toast } from "react-toastify";
import { useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { CHANGE_PASSWORD_QUERY } from "@/lib/queries/user";
import { useCallback, useState } from "react";
import useTranslation from "@/lib/hooks/useTranslation";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { IChangePassword, changePasswordSchema } from "@/lib/schemas/user";
import { zodResolver } from "@hookform/resolvers/zod";

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

  const [changePassword, { loading }] = useMutation(CHANGE_PASSWORD_QUERY);

  // If validation passes successfully, i.e formState is valid, then the below callback is executed.
  const onSubmit = useCallback(
    async (data: IChangePassword) => {
      try {
        const result = await changePassword({
          variables: { username: username ?? session?.user.username, ...data },
        });

        if (result.data.changePassword.status === 200) {
          setIsSaving(false);
          toast.success(result.data.changePassword.message);
          setOpen(false);
        } else {
          setIsSaving(false);
          toast.error(result.data.changePassword.message);
        }
      } catch (e) {
        toast.error(e?.toString());
        setIsSaving(false);
      }
    },
    [changePassword, router]
  );

  // Handles errors coming from GraphQL server after executing onSubmit
  const onError = (errors: any, e: any) => console.log(errors, e);

  return (
    <Modal
      className="button cursor-pointer"
      value={t("Change password")}
      done={t("Close")}
    >
      <h2 className="mt-10 mb-6 font-medium text-xl text-center">
        {username
          ? `${t("Change password for")} @${username}`
          : t("Change your password")}
      </h2>
      <form
        onSubmit={handleChangePassword(onSubmit, onError)}
        className="flex flex-col gap-3 max-w-xl mx-auto"
      >
        <div className="flex flex-col">
          <label htmlFor="current">{t("Current password")}</label>
          <input
            id="current"
            type="password"
            className="input"
            {...registerChangePassword("currentPassword")}
          />
          {!username && (
            <Link href="/forgotpassword">
              {t("Forgot your current password?")}
            </Link>
          )}
          <p className="text-sm text-red-600">
            {t(changePasswordErrors.currentPassword?.message)}
          </p>
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="new">{t("New password")}</label>
          <input
            id="new"
            type="password"
            className="input"
            data-error={changePasswordErrors.newPassword}
            {...registerChangePassword("newPassword")}
          />
          <p className="text-sm text-red-600">
            {t(changePasswordErrors.newPassword?.message)}
          </p>
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="confirm">{t("Confirm new password")}</label>
          <input
            id="confirm"
            type="password"
            className="input"
            data-error={changePasswordErrors.confirmNewPassword}
            {...registerChangePassword("confirmNewPassword")}
          />
          <p className="text-sm text-red-600">
            {t(changePasswordErrors.confirmNewPassword?.message)}
          </p>
        </div>
        <div>
          <Button isProgress={loading} className="button">
            {t("Save")}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default ChangePassword;
