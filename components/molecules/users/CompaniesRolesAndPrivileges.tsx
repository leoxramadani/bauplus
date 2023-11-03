import useTranslation from '@/lib/hooks/useTranslation';
import { Key } from 'react';
import CompanyPrivileges from './CompanyWithPrivileges';
import useData from '@/lib/hooks/useData';
const CompaniesRolesAndPrivileges = ({
  companiesWithPrivileges,
  setCompaniesWithPrivileges,
  values,
}: any) => {
  const companies:any = [];

  const { t } = useTranslation();
  return (
    <div className="flex flex-col">
      {t('Companies')}
      <div className="my-2 border-b"></div>
      <div className="flex flex-col flex-wrap gap-6">
        {companies?.allCompanies.map((c: any, i: Key) => {
          return (
            <CompanyPrivileges
              company={c}
              key={i}
              companiesWithPrivileges={companiesWithPrivileges}
              setCompaniesWithPrivileges={setCompaniesWithPrivileges}
              isCheckedInit={values?.companies.some(
                (_c: any) => _c.companyId === c.company_ID.toString()
              )}
              roleInit={
                values?.companies.find(
                  (_c: any) =>
                    _c.companyId === c.company_ID.toString()
                ) && {
                  id: values?.companies.find(
                    (_c: any) =>
                      _c.companyId === c.company_ID.toString()
                  ).roleId,
                  name: values?.companies.find(
                    (_c: any) =>
                      _c.companyId === c.company_ID.toString()
                  ).roleName,
                }
              }
              privilegesInit={
                values?.companies.find(
                  (_c: any) =>
                    _c.companyId === c.company_ID.toString()
                ) &&
                values?.companies.find(
                  (_c: any) =>
                    _c.companyId === c.company_ID.toString()
                ).privileges
              }
            />
          );
        })}
        {!companies && <p>Loading...</p>}
      </div>
    </div>
  );
};

export default CompaniesRolesAndPrivileges;
