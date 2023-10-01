import { useContext } from "react";

import { CompanyContext } from "../contexts/CompanyContext";
import nProgress from "nprogress";
import { ICompany } from "next-auth";

{
  /**
  Custom hook to use the CompanyContext.
  Useful if we require to modify what's returned and/or add additional data to context.
*/
}
export const useCompany = () => {
  const [company, setContextCompany] = useContext(CompanyContext);

  const setCompany = (company: ICompany) => {
    if (!window) return;
    nProgress.start();
    localStorage.setItem("company", JSON.stringify(company));
    setContextCompany(company);
    nProgress.done();
  };

  const startsWith = (privilege: string) =>
    company.privileges?.some((p) => p.startsWith(privilege));

  const hasPrivilege = (privilege: string) =>
    company.privileges?.some((p) => p === privilege);

  return { company, setCompany, startsWith, hasPrivilege };
};
