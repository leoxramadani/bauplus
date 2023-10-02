import { useQuery } from "@apollo/client";
import { GET_ALL_COMPANIES_QUERY } from "@/lib/queries/company";
import { Key } from "react";
import CompanyPrivileges from "./CompanyWithPrivileges";
import useTranslation from "@/lib/hooks/useTranslation";
const CompaniesRolesAndPrivileges = ({
  companiesWithPrivileges,
  setCompaniesWithPrivileges,
  values,
}: any) => {
  const { data: companies } = useQuery(GET_ALL_COMPANIES_QUERY);
  const { t } = useTranslation();
  return (
    <div className="flex flex-col">
      {t("Companies")}
      <div className="border-b my-2"></div>
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
                  (_c: any) => _c.companyId === c.company_ID.toString()
                ) && {
                  id: values?.companies.find(
                    (_c: any) => _c.companyId === c.company_ID.toString()
                  ).roleId,
                  name: values?.companies.find(
                    (_c: any) => _c.companyId === c.company_ID.toString()
                  ).roleName,
                }
              }
              privilegesInit={
                values?.companies.find(
                  (_c: any) => _c.companyId === c.company_ID.toString()
                ) &&
                values?.companies.find(
                  (_c: any) => _c.companyId === c.company_ID.toString()
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
