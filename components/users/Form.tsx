import useTranslation from '@/lib/hooks/useTranslation';
import { IUserForm, userFormSchema } from '@/lib/schemas/user';
import { useMutation } from '@apollo/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/router';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import Button from '../Button';
import CompaniesRolesAndPrivileges from './CompaniesRolesAndPrivileges';
import { CompanyWithRoleAndPrivileges } from './CompanyWithPrivileges';
const UsersForm = ({
  mutation,
  values,
  refetch,
  setCompanies = true,
}: {
  mutation: any;
  values?: any | null;
  refetch?: any | null;
  setCompanies?: boolean;
}) => {
  const router = useRouter();
  const { t } = useTranslation();
  /** This state and the effect below are in this component for now,
   * as the mutation for saving needs the company and privileges data when saving */
  const [companiesWithPrivileges, setCompaniesWithPrivileges] =
    useState<CompanyWithRoleAndPrivileges[]>([]);

  console.log(companiesWithPrivileges);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUserForm>({
    //@ts-ignore
    values: {
      firstName: values?.user?.firstName,
      lastName: values?.user?.lastName,
      username: values?.user?.userName,
      password: values && '00000000',
      email: values?.user?.email,
      phoneNumber: values?.user?.phoneNumber,
      address: values?.user?.adress,
    },
    resolver: zodResolver(userFormSchema),
  });

  const [saveUser, { loading }] = useMutation(mutation);

  const onSubmit = useCallback(
    async (data: IUserForm) => {
      console.log('Submitted: ', companiesWithPrivileges);
      const result = saveUser({
        variables: {
          entity: setCompanies
            ? {
                ...data,
                companies: companiesWithPrivileges,
              }
            : {
                ...data,
              },
        },
      })
        .then((res) => {
          //@ts-ignore
          if (Object.values(res.data)[0].status === 200) {
            toast.success('Saved successfully.');
            if (values && refetch) {
              refetch({ username: values?.user.userName });
            }
            //router.push("/users");
          }
          //@ts-ignore
          else toast.error(Object.values(res.data)[0].message);
        })
        .catch((error) => {
          toast.error("Couldn't save. \n" + error);
        });
    },
    [companiesWithPrivileges, values]
  );

  return (
    <form className="add-edit-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="my-10 flex flex-col sm:mx-auto sm:flex-row sm:gap-10 md:gap-32 xl:gap-32 min-[1360px]:gap-40 min-[1500px]:gap-80">
        {/* Inputs */}
        <div className="my-auto flex flex-col gap-3">
          {/* First and Last name */}
          <div className="doubleInput-container">
            <div className="flex flex-col gap-1">
              <label htmlFor="firstName">{t('First name')}</label>
              <input
                type="text"
                id="firstName"
                className="input"
                data-error={errors.firstName}
                {...register('firstName')}
              />
              {errors.firstName && (
                <p className="text-red-600">
                  {t(errors.firstName.message)}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="lastName">{t('Last name')}</label>
              <input
                type="text"
                id="lastName"
                className="input"
                data-error={errors.lastName}
                {...register('lastName')}
              />
              {errors.lastName && (
                <p className="text-red-600">
                  {t(errors.lastName.message)}
                </p>
              )}
            </div>
          </div>

          {/* Username*/}
          <div className="flex flex-col gap-1">
            <label htmlFor="username">{t('Username')}</label>
            <input
              type="text"
              id="username"
              className="input"
              data-error={errors.username}
              disabled={values && true}
              {...register('username', {})}
            />
            {errors.username && (
              <p className="text-red-600">
                {t(errors.username.message)}
              </p>
            )}
          </div>

          {/* Password */}
          {!values && (
            <div className="flex flex-col gap-1">
              <label htmlFor="password">{t('Password')}</label>

              <input
                type="password"
                id="password"
                className="input"
                data-error={errors.password}
                {...register('password', { required: false })}
              />

              {errors.password && (
                <p className="text-red-600">
                  {errors.password.message}
                </p>
              )}
            </div>
          )}

          {/* Email */}
          <div className="flex flex-col gap-1">
            <label htmlFor="email">{t('Email')}</label>
            <input
              type="text"
              id="email"
              className="input"
              data-error={errors.email}
              {...register('email')}
            />
            {errors.email && (
              <p className="text-red-600">
                {t(errors.email.message)}
              </p>
            )}
          </div>

          {/* Phone number and email */}
          <div className="doubleInput-container">
            {/* Phone number */}
            <div className="flex flex-col gap-1">
              <label htmlFor="phone">{t('Phone Number')}</label>
              <input
                type="text"
                id="phone"
                className="input"
                data-error={errors.phoneNumber}
                {...register('phoneNumber')}
              />
              {errors.phoneNumber && (
                <p className="text-red-600">
                  {t(errors.phoneNumber.message)}
                </p>
              )}
            </div>
            {/* Email */}
            <div className="flex flex-col gap-1">
              <label htmlFor="address">{t('Address')}</label>
              <input
                type="text"
                id="address"
                className="input"
                {...register('address')}
              />
            </div>
          </div>
        </div>

        <div className="mx-auto sm:mx-0">
          {setCompanies && (
            <CompaniesRolesAndPrivileges
              values={values}
              companiesWithPrivileges={companiesWithPrivileges}
              setCompaniesWithPrivileges={setCompaniesWithPrivileges}
            />
          )}
        </div>
      </div>

      {/* Butoni */}
      <div className="form-save-button">
        <Button type="submit" className="button" isProgress={loading}>
          {t('Save')}
        </Button>
      </div>
    </form>
  );
};

export default UsersForm;
